# 🚀 Guida Completa al Deploy di KDP Formatter Pro

## ✅ Stato Attuale

Il tuo progetto è stato pubblicato con successo su GitHub:
- **Repository**: https://github.com/kitbookit/kdp-formatter-pro
- **Codice**: Caricato e pronto per il deploy
- **File mancanti**: Creati (schema database, costanti, errori)

---

## 📋 Prerequisiti

Prima di procedere con il deploy, avrai bisogno di:

1. **Account Vercel** (gratuito) - https://vercel.com
2. **Database MySQL** - Puoi usare:
   - PlanetScale (gratuito) - https://planetscale.com
   - Railway (gratuito con limiti) - https://railway.app
   - Aiven (gratuito) - https://aiven.io
3. **Account Stripe** - https://stripe.com (per i pagamenti)
4. **Chiavi API Stripe** (modalità test per iniziare)

---

## 🎯 Passo 1: Configurare il Database

### Opzione A: PlanetScale (Consigliato)

1. Vai su https://planetscale.com e crea un account
2. Crea un nuovo database chiamato `kdp_formatter`
3. Ottieni la stringa di connessione (formato: `mysql://...`)
4. Salva la stringa di connessione per dopo

### Opzione B: Railway

1. Vai su https://railway.app
2. Crea un nuovo progetto
3. Aggiungi un servizio MySQL
4. Copia la stringa di connessione

---

## 🎯 Passo 2: Configurare Stripe

1. Vai su https://dashboard.stripe.com
2. Attiva la modalità **Test** (switch in alto a destra)
3. Vai su **Developers** → **API keys**
4. Copia:
   - **Publishable key** (inizia con `pk_test_`)
   - **Secret key** (inizia con `sk_test_`)
5. Vai su **Developers** → **Webhooks**
6. Clicca su **Add endpoint** (lo faremo dopo il deploy)

---

## 🎯 Passo 3: Deploy su Vercel

### 3.1 Importare il Repository

1. Vai su https://vercel.com e fai login
2. Clicca su **Add New** → **Project**
3. Importa il repository `kitbookit/kdp-formatter-pro`
4. Vercel rileverà automaticamente la configurazione

### 3.2 Configurare le Variabili d'Ambiente

Prima di fare il deploy, aggiungi queste variabili d'ambiente:

```env
# Database
DATABASE_URL=mysql://[inserisci la tua stringa di connessione]

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_[la tua chiave]
STRIPE_SECRET_KEY=sk_test_[la tua chiave]
STRIPE_WEBHOOK_SECRET=[lo configureremo dopo]

# Session
SESSION_SECRET=[genera una stringa casuale lunga, es: openssl rand -base64 32]

# App
APP_URL=https://[il-tuo-dominio].vercel.app
NODE_ENV=production
```

### 3.3 Deploy

1. Clicca su **Deploy**
2. Attendi che Vercel completi il build (2-5 minuti)
3. Una volta completato, avrai un URL tipo: `https://kdp-formatter-pro.vercel.app`

---

## 🎯 Passo 4: Configurare il Webhook Stripe

1. Torna su Stripe Dashboard → **Developers** → **Webhooks**
2. Clicca su **Add endpoint**
3. URL endpoint: `https://[il-tuo-dominio].vercel.app/webhook/stripe`
4. Seleziona questi eventi:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. Clicca su **Add endpoint**
6. Copia il **Signing secret** (inizia con `whsec_`)
7. Torna su Vercel → **Settings** → **Environment Variables**
8. Aggiungi `STRIPE_WEBHOOK_SECRET` con il valore copiato
9. Fai un **Redeploy** del progetto

---

## 🎯 Passo 5: Inizializzare il Database

Dopo il primo deploy, devi creare le tabelle nel database:

### Opzione A: Usando Drizzle Kit (Locale)

```bash
# Clona il repository
git clone https://github.com/kitbookit/kdp-formatter-pro.git
cd kdp-formatter-pro

# Installa le dipendenze
pnpm install

# Configura il .env con la tua DATABASE_URL
echo "DATABASE_URL=mysql://..." > .env

# Esegui le migrazioni
pnpm db:push
```

### Opzione B: Manualmente (SQL)

Esegui questo SQL nel tuo database:

```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  open_id VARCHAR(255),
  credits INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE formatted_documents (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  trim_size VARCHAR(50) NOT NULL,
  download_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  amount INT NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(50) NOT NULL,
  stripe_session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE projects (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE book_covers (
  id VARCHAR(255) PRIMARY KEY,
  project_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE project_images (
  id VARCHAR(255) PRIMARY KEY,
  project_id VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

---

## 🎯 Passo 6: Test del Sito

1. Visita il tuo sito: `https://[il-tuo-dominio].vercel.app`
2. Prova a caricare un file di test
3. Verifica che l'interfaccia funzioni
4. Prova il processo di pagamento (modalità test)
5. Usa le carte di test Stripe:
   - Successo: `4242 4242 4242 4242`
   - Fallimento: `4000 0000 0000 0002`
   - Data: qualsiasi data futura
   - CVC: qualsiasi 3 cifre

---

## 🔧 Risoluzione Problemi Comuni

### Build Failed

Se il build fallisce su Vercel:
1. Controlla i log nella dashboard Vercel
2. Verifica che tutte le variabili d'ambiente siano configurate
3. Gli errori TypeScript non bloccano il build (sono solo warning)

### Database Connection Error

- Verifica che la `DATABASE_URL` sia corretta
- Assicurati che il database sia accessibile pubblicamente
- PlanetScale richiede `?ssl={"rejectUnauthorized":true}` alla fine dell'URL

### Stripe Webhook Non Funziona

- Verifica che l'URL del webhook sia corretto
- Controlla che il `STRIPE_WEBHOOK_SECRET` sia configurato
- Usa Stripe CLI per testare localmente: `stripe listen --forward-to localhost:5000/webhook/stripe`

### Pagamenti Non Processati

- Verifica che le chiavi Stripe siano in modalità test
- Controlla i log su Stripe Dashboard → **Developers** → **Logs**
- Assicurati che il webhook sia attivo e riceva eventi

---

## 🎨 Personalizzazioni Consigliate

### 1. Dominio Personalizzato

1. Vai su Vercel → **Settings** → **Domains**
2. Aggiungi il tuo dominio (es: `kdpformatter.store`)
3. Segui le istruzioni per configurare il DNS
4. Aggiorna `APP_URL` nelle variabili d'ambiente

### 2. Logo e Branding

- Sostituisci i file in `client/public/`:
  - `logo.png` - Logo principale
  - `book-publishing-logo.png` - Logo secondario
  - `favicon.ico` - Icona del sito

### 3. Prezzi

Modifica il prezzo in `shared/const.ts`:
```typescript
export const PRICE_PER_FORMAT = 499; // €4.99 in centesimi
```

### 4. Email di Conferma

Per inviare email dopo il pagamento:
1. Configura un servizio email (SendGrid, Mailgun, Resend)
2. Aggiungi le credenziali nelle variabili d'ambiente
3. Implementa l'invio email nel webhook Stripe

---

## 📊 Monitoraggio e Analytics

### Google Analytics

1. Crea un account su https://analytics.google.com
2. Ottieni il Measurement ID (G-XXXXXXXXXX)
3. Aggiungi in `client/index.html` prima del `</head>`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

- Già integrato automaticamente
- Vai su Vercel Dashboard → **Analytics** per vedere le statistiche

---

## 💰 Passaggio a Produzione

Quando sei pronto per accettare pagamenti reali:

1. **Stripe**: Passa alla modalità **Live**
   - Ottieni le chiavi live (`pk_live_` e `sk_live_`)
   - Aggiorna le variabili d'ambiente su Vercel
   - Riconfigura il webhook in modalità live

2. **Database**: Assicurati di avere un piano adeguato
   - PlanetScale: passa al piano Scaler ($29/mese)
   - Railway: monitora l'uso per evitare costi imprevisti

3. **Vercel**: Il piano gratuito è sufficiente per iniziare
   - Upgrade a Pro ($20/mese) se superi i limiti

4. **Backup**: Configura backup automatici del database

5. **Monitoring**: Imposta alert per errori e downtime

---

## 📞 Supporto

Se hai problemi durante il deploy:

1. Controlla i log su Vercel Dashboard
2. Verifica le variabili d'ambiente
3. Consulta la documentazione:
   - Vercel: https://vercel.com/docs
   - Stripe: https://stripe.com/docs
   - PlanetScale: https://planetscale.com/docs

---

## 🎉 Congratulazioni!

Il tuo sito è ora online e pronto per iniziare a formattare libri per KDP!

**Prossimi passi:**
- Testa tutte le funzionalità
- Configura il dominio personalizzato
- Aggiungi Google Analytics
- Inizia a promuovere il servizio
- Monitora i primi utenti e raccogli feedback

Buona fortuna con il tuo business! 🚀
