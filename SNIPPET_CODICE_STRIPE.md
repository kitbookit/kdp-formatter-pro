# 💻 Snippet di Codice per Configurare Stripe

## 📋 Panoramica

Il tuo progetto ha **già la maggior parte del codice Stripe configurato**! Devi solo:
1. Aggiungere l'endpoint webhook nel server
2. Configurare le variabili d'ambiente su Vercel

---

## ✅ Codice Già Presente

Il progetto ha già questi file configurati:

### `/server/_core/env.ts`
```typescript
export const ENV = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? "",
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  // ... altre variabili
};
```

### `/server/stripe.ts`
Contiene tutte le funzioni necessarie:
- ✅ `createCheckoutSession()` - Crea sessione di pagamento
- ✅ `getCheckoutSession()` - Recupera sessione
- ✅ `verifyWebhookSignature()` - Verifica webhook
- ✅ `handlePaymentSuccess()` - Gestisce pagamento riuscito

---

## 🔧 Codice da Aggiungere

### 1. Endpoint Webhook nel Server

Devi aggiungere l'endpoint webhook in `/server/_core/index.ts`.

**Posizione**: Subito dopo la configurazione di `express.json()` (circa riga 58)

**Codice da inserire**:

```typescript
// ============================================
// STRIPE WEBHOOK ENDPOINT
// ============================================
// IMPORTANTE: Questo deve essere PRIMA di express.json()
// perché Stripe richiede il body raw per verificare la firma
app.post(
  '/webhook/stripe',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    
    if (!sig) {
      console.error('Missing stripe-signature header');
      return res.status(400).send('Missing signature');
    }

    try {
      // Importa le funzioni Stripe
      const { verifyWebhookSignature, handlePaymentSuccess } = await import('../stripe');
      const { ENV } = await import('./env');
      const { db } = await import('../db');
      
      // Verifica la firma del webhook
      const event = verifyWebhookSignature(
        req.body.toString(),
        sig,
        ENV.stripeWebhookSecret
      );

      if (!event) {
        console.error('Invalid webhook signature');
        return res.status(400).send('Invalid signature');
      }

      console.log('Webhook received:', event.type);

      // Gestisci i diversi tipi di eventi
      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object as any;
          console.log('Payment successful:', session.id);
          
          // Estrai i dati del pagamento
          const paymentData = await handlePaymentSuccess(session);
          
          if (paymentData && paymentData.userId) {
            // Aggiungi 1 credito all'utente
            try {
              await db.addCreditsToUser(paymentData.userId.toString(), 1);
              console.log(`Added 1 credit to user ${paymentData.userId}`);
              
              // Salva il pagamento nel database
              await db.createPayment({
                userId: paymentData.userId.toString(),
                amount: paymentData.amount || 0,
                currency: paymentData.currency || 'eur',
                status: 'completed',
                stripeSessionId: paymentData.sessionId,
              });
              
              console.log('Payment recorded in database');
            } catch (dbError) {
              console.error('Database error:', dbError);
              // Non restituire errore a Stripe, il pagamento è andato a buon fine
            }
          }
          break;
        }

        case 'payment_intent.succeeded': {
          const paymentIntent = event.data.object as any;
          console.log('PaymentIntent succeeded:', paymentIntent.id);
          break;
        }

        case 'payment_intent.payment_failed': {
          const paymentIntent = event.data.object as any;
          console.error('Payment failed:', paymentIntent.id);
          break;
        }

        default:
          console.log('Unhandled event type:', event.type);
      }

      // Rispondi a Stripe che il webhook è stato ricevuto
      res.json({ received: true });
      
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
);
```

---

### 2. Funzioni Database Mancanti

Aggiungi queste funzioni in `/server/db.ts`:

```typescript
/**
 * Add credits to a user
 */
export async function addCreditsToUser(userId: string, credits: number) {
  const { users } = await import('../drizzle/schema');
  const { eq, sql } = await import('drizzle-orm');
  
  await database
    .update(users)
    .set({ 
      credits: sql`${users.credits} + ${credits}` 
    })
    .where(eq(users.id, userId));
}

/**
 * Create a payment record
 */
export async function createPayment(payment: {
  userId: string;
  amount: number;
  currency: string;
  status: string;
  stripeSessionId: string;
}) {
  const { payments } = await import('../drizzle/schema');
  const { nanoid } = await import('nanoid');
  
  await database.insert(payments).values({
    id: nanoid(),
    userId: payment.userId,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    stripeSessionId: payment.stripeSessionId,
  });
}

/**
 * Get user credits
 */
export async function getUserCredits(userId: string): Promise<number> {
  const { users } = await import('../drizzle/schema');
  const { eq } = await import('drizzle-orm');
  
  const user = await database
    .select({ credits: users.credits })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
    
  return user[0]?.credits || 0;
}
```

---

### 3. Esportare le Funzioni in db.ts

Assicurati che queste funzioni siano esportate alla fine di `/server/db.ts`:

```typescript
export const db = {
  // ... funzioni esistenti
  addCreditsToUser,
  createPayment,
  getUserCredits,
};
```

---

## 🌐 Variabili d'Ambiente su Vercel

### Passo 1: Accedi a Vercel
1. Vai su https://vercel.com/dashboard
2. Seleziona il progetto `kdp-formatter-pro`
3. Clicca su **Settings**
4. Vai su **Environment Variables**

### Passo 2: Aggiungi le Variabili

Clicca su **Add** per ogni variabile:

#### Variabile 1: STRIPE_PUBLISHABLE_KEY
```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
Environment: Production, Preview, Development (seleziona tutti)
```

#### Variabile 2: STRIPE_SECRET_KEY
```
Name: STRIPE_SECRET_KEY
Value: sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
Environment: Production, Preview, Development (seleziona tutti)
```

#### Variabile 3: STRIPE_WEBHOOK_SECRET
```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
Environment: Production, Preview, Development (seleziona tutti)
```

#### Altre Variabili Necessarie

```
Name: DATABASE_URL
Value: mysql://user:password@host:port/database
Environment: Production, Preview, Development

Name: SESSION_SECRET
Value: [genera una stringa casuale lunga, es: openssl rand -base64 32]
Environment: Production, Preview, Development

Name: NODE_ENV
Value: production
Environment: Production
```

### Passo 3: Redeploy
Dopo aver aggiunto tutte le variabili:
1. Vai su **Deployments**
2. Clicca sui tre puntini dell'ultimo deployment
3. Clicca su **Redeploy**

---

## 🔄 Come Applicare le Modifiche al Codice

### Metodo 1: Tramite GitHub (Consigliato)

1. **Clona il repository localmente**:
```bash
git clone https://github.com/kitbookit/kdp-formatter-pro.git
cd kdp-formatter-pro
```

2. **Apri il file `/server/_core/index.ts`**:
   - Trova la riga con `app.use(express.json({ limit: "50mb" }));`
   - **PRIMA** di questa riga, inserisci il codice dell'endpoint webhook

3. **Apri il file `/server/db.ts`**:
   - Scorri fino alla fine del file
   - Aggiungi le tre nuove funzioni prima dell'export finale
   - Aggiungi le funzioni all'oggetto `db` esportato

4. **Commit e push**:
```bash
git add server/_core/index.ts server/db.ts
git commit -m "Add Stripe webhook endpoint and credit management"
git push origin main
```

5. **Vercel farà automaticamente il deploy** delle modifiche

### Metodo 2: Tramite GitHub Web Interface

1. Vai su https://github.com/kitbookit/kdp-formatter-pro
2. Naviga su `server/_core/index.ts`
3. Clicca sull'icona della matita (Edit)
4. Trova la riga 58 circa con `app.use(express.json...`
5. Inserisci il codice webhook PRIMA di quella riga
6. Clicca su **Commit changes**
7. Ripeti per `server/db.ts`

---

## 🧪 Testare il Webhook Localmente (Opzionale)

Se vuoi testare in locale prima del deploy:

### 1. Installa Stripe CLI
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Linux
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.5/stripe_1.19.5_linux_x86_64.tar.gz
tar -xvf stripe_1.19.5_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin
```

### 2. Login a Stripe
```bash
stripe login
```

### 3. Forward dei Webhook
```bash
stripe listen --forward-to localhost:3000/webhook/stripe
```

Questo comando ti darà un **webhook signing secret** temporaneo tipo:
```
whsec_abc123...
```

### 4. Configura il .env locale
Crea un file `.env` nella root del progetto:
```env
STRIPE_PUBLISHABLE_KEY=pk_test_tua_chiave
STRIPE_SECRET_KEY=sk_test_tua_chiave
STRIPE_WEBHOOK_SECRET=whsec_abc123...
DATABASE_URL=mysql://...
SESSION_SECRET=your-secret-here
```

### 5. Avvia il server
```bash
pnpm install
pnpm dev
```

### 6. Testa un pagamento
```bash
stripe trigger checkout.session.completed
```

---

## ✅ Checklist Implementazione

Prima di andare live, verifica:

- [ ] Endpoint webhook aggiunto in `server/_core/index.ts`
- [ ] Funzioni database aggiunte in `server/db.ts`
- [ ] Codice committato e pushato su GitHub
- [ ] Vercel ha fatto il deploy automatico
- [ ] Variabili d'ambiente configurate su Vercel
- [ ] Webhook creato su Stripe Dashboard
- [ ] URL webhook: `https://[tuo-dominio].vercel.app/webhook/stripe`
- [ ] Eventi webhook selezionati: `checkout.session.completed`, `payment_intent.succeeded`
- [ ] Webhook secret copiato e aggiunto su Vercel
- [ ] Redeploy fatto su Vercel
- [ ] Test con carta 4242 4242 4242 4242 completato
- [ ] Verifica crediti aggiunti all'utente dopo pagamento

---

## 🐛 Debugging

### Verificare i Log del Webhook

**Su Vercel**:
1. Vai su **Deployments**
2. Clicca sull'ultimo deployment
3. Vai su **Functions**
4. Cerca i log dell'endpoint `/webhook/stripe`

**Su Stripe**:
1. Vai su **Developers** → **Webhooks**
2. Clicca sul tuo webhook
3. Vai su **Recent events**
4. Verifica che gli eventi siano stati inviati e ricevuti (200 OK)

### Errori Comuni

**400 Bad Request - Invalid signature**:
- Verifica che `STRIPE_WEBHOOK_SECRET` sia corretto
- Assicurati che il webhook sia configurato con l'URL giusto

**500 Internal Server Error**:
- Controlla i log su Vercel
- Verifica che le funzioni database siano state aggiunte
- Controlla che `DATABASE_URL` sia configurato

**Webhook non riceve eventi**:
- Verifica l'URL del webhook su Stripe
- Controlla che il sito sia deployato e raggiungibile
- Verifica che gli eventi giusti siano selezionati

---

## 🎉 Conclusione

Dopo aver applicato queste modifiche:

✅ Il webhook sarà attivo e funzionante  
✅ I pagamenti aggiungeranno automaticamente crediti  
✅ Gli utenti potranno formattare libri dopo il pagamento  
✅ Tutto sarà tracciato nel database  

**Il sistema di monetizzazione sarà completo!** 💰
