# 💳 Guida Completa alla Configurazione Stripe

## 📋 Panoramica

Stripe è il sistema di pagamento integrato nel tuo sito KDP Formatter Pro. Permette di accettare pagamenti con carta di credito in modo sicuro e professionale.

**Prezzo attuale configurato**: €4.99 per formattazione

---

## 🎯 Passo 1: Creare Account Stripe

### 1.1 Registrazione

1. Vai su **https://stripe.com**
2. Clicca su **Sign up** (Registrati)
3. Compila il form con:
   - Email
   - Nome completo
   - Password
   - Paese (Italia)
4. Conferma l'email ricevuta

### 1.2 Completare il Profilo

Dopo la registrazione, Stripe ti chiederà:

**Informazioni aziendali**:
- Tipo di attività (Ditta individuale / Società)
- Partita IVA o Codice Fiscale
- Indirizzo sede legale
- Settore di attività: "Software / SaaS"

**Informazioni bancarie**:
- IBAN del conto corrente per ricevere i pagamenti
- Nome intestatario del conto

**Documenti**:
- Documento d'identità (per verifica)
- Eventuale visura camerale (se società)

⚠️ **Nota**: Puoi iniziare in **modalità test** senza completare subito tutte le informazioni. Ti serviranno solo per passare in produzione.

---

## 🔑 Passo 2: Ottenere le Chiavi API

### 2.1 Modalità Test vs Live

Stripe ha due modalità separate:

**Modalità Test** (per sviluppo):
- Usa carte di credito fittizie
- Non vengono addebitati soldi reali
- Perfetta per testare il sito
- Chiavi iniziano con `pk_test_` e `sk_test_`

**Modalità Live** (per produzione):
- Accetta pagamenti reali
- Richiede account verificato
- Chiavi iniziano con `pk_live_` e `sk_live_`

### 2.2 Trovare le Chiavi Test

1. Vai su **https://dashboard.stripe.com**
2. In alto a destra, assicurati che sia attiva la **modalità Test** (interruttore su "Test mode")
3. Nel menu laterale, clicca su **Developers** (Sviluppatori)
4. Clicca su **API keys** (Chiavi API)

Vedrai due chiavi:

#### **Publishable key** (Chiave Pubblicabile)
```
pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
```
- Usata nel **frontend** (codice JavaScript)
- È sicura da esporre pubblicamente
- Permette di creare sessioni di checkout

#### **Secret key** (Chiave Segreta)
```
sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
```
- Usata nel **backend** (server Node.js)
- ⚠️ **NON deve mai essere esposta** nel codice frontend
- Permette di creare pagamenti, rimborsare, ecc.

### 2.3 Copiare le Chiavi

1. Clicca sull'icona **"Reveal test key"** per vedere la Secret key
2. Copia entrambe le chiavi in un posto sicuro (es. note sul computer)
3. Le userai nelle variabili d'ambiente di Vercel

---

## 🔔 Passo 3: Configurare i Webhook

I webhook permettono a Stripe di notificare il tuo sito quando un pagamento è completato.

### 3.1 Cosa Sono i Webhook

Quando un utente paga:
1. Viene reindirizzato a Stripe Checkout
2. Inserisce i dati della carta
3. Stripe processa il pagamento
4. Stripe invia una notifica al tuo server (webhook)
5. Il tuo server aggiunge crediti all'utente

### 3.2 Creare il Webhook (Dopo il Deploy)

⚠️ **Importante**: Devi prima deployare il sito su Vercel per avere l'URL.

1. Vai su **https://dashboard.stripe.com**
2. Assicurati di essere in **modalità Test**
3. Vai su **Developers** → **Webhooks**
4. Clicca su **Add endpoint** (Aggiungi endpoint)

### 3.3 Configurazione Webhook

**Endpoint URL**:
```
https://[il-tuo-dominio-vercel].vercel.app/webhook/stripe
```

Esempio:
```
https://kdp-formatter-pro-abc123.vercel.app/webhook/stripe
```

**Eventi da selezionare**:
- ✅ `checkout.session.completed` (quando il checkout è completato)
- ✅ `payment_intent.succeeded` (quando il pagamento ha successo)
- ✅ `payment_intent.payment_failed` (quando il pagamento fallisce)

**Versione API**: Lascia quella predefinita (latest)

### 3.4 Ottenere il Webhook Secret

Dopo aver creato il webhook:

1. Clicca sul webhook appena creato
2. Nella sezione **Signing secret**, clicca su **Reveal**
3. Copia il valore (inizia con `whsec_`)

Esempio:
```
whsec_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
```

Questa chiave serve per verificare che le notifiche provengano davvero da Stripe.

---

## 🔧 Passo 4: Configurare le Variabili d'Ambiente su Vercel

### 4.1 Accedere alle Impostazioni

1. Vai su **https://vercel.com/dashboard**
2. Seleziona il progetto **kdp-formatter-pro**
3. Clicca su **Settings** (Impostazioni)
4. Vai su **Environment Variables** (Variabili d'ambiente)

### 4.2 Aggiungere le Chiavi Stripe

Aggiungi queste tre variabili:

#### Variabile 1: STRIPE_PUBLISHABLE_KEY
- **Name**: `STRIPE_PUBLISHABLE_KEY`
- **Value**: `pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...` (la tua chiave)
- **Environment**: Seleziona tutti (Production, Preview, Development)

#### Variabile 2: STRIPE_SECRET_KEY
- **Name**: `STRIPE_SECRET_KEY`
- **Value**: `sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...` (la tua chiave)
- **Environment**: Seleziona tutti

#### Variabile 3: STRIPE_WEBHOOK_SECRET
- **Name**: `STRIPE_WEBHOOK_SECRET`
- **Value**: `whsec_AbCdEfGhIjKlMnOpQrStUvWxYz123456789` (il tuo webhook secret)
- **Environment**: Seleziona tutti

### 4.3 Redeploy

Dopo aver aggiunto le variabili:
1. Vai su **Deployments**
2. Clicca sui tre puntini del deployment più recente
3. Clicca su **Redeploy**

Questo riavvia il sito con le nuove configurazioni.

---

## 🧪 Passo 5: Testare i Pagamenti

### 5.1 Carte di Test Stripe

Stripe fornisce carte di credito fittizie per testare:

#### Pagamento con Successo
```
Numero: 4242 4242 4242 4242
Data: 12/34 (qualsiasi data futura)
CVC: 123 (qualsiasi 3 cifre)
CAP: 12345 (qualsiasi CAP)
```

#### Pagamento Rifiutato (carta insufficiente)
```
Numero: 4000 0000 0000 9995
Data: 12/34
CVC: 123
```

#### Pagamento Rifiutato (carta rubata)
```
Numero: 4000 0000 0000 9979
Data: 12/34
CVC: 123
```

#### Richiede Autenticazione 3D Secure
```
Numero: 4000 0025 0000 3155
Data: 12/34
CVC: 123
```

### 5.2 Flusso di Test

1. Vai sul tuo sito deployato
2. Carica un file da formattare
3. Clicca su **Formatta** o **Paga**
4. Verrai reindirizzato a Stripe Checkout
5. Inserisci una carta di test (es. 4242 4242 4242 4242)
6. Completa il pagamento
7. Verrai reindirizzato al sito
8. Controlla che l'utente abbia ricevuto i crediti

### 5.3 Verificare i Pagamenti su Stripe

1. Vai su **https://dashboard.stripe.com**
2. Clicca su **Payments** (Pagamenti)
3. Vedrai tutti i pagamenti di test
4. Clicca su un pagamento per vedere i dettagli

### 5.4 Verificare i Webhook

1. Vai su **Developers** → **Webhooks**
2. Clicca sul tuo webhook
3. Vai su **Recent events** (Eventi recenti)
4. Verifica che gli eventi `checkout.session.completed` siano stati ricevuti
5. Se vedi errori, clicca per vedere i dettagli

---

## 🚀 Passo 6: Passare in Produzione

Quando sei pronto ad accettare pagamenti reali:

### 6.1 Completare la Verifica Account

1. Vai su **https://dashboard.stripe.com**
2. Completa tutte le informazioni richieste:
   - Dati aziendali completi
   - IBAN per ricevere pagamenti
   - Documenti di identità
   - Eventuale visura camerale
3. Attendi la verifica (1-3 giorni lavorativi)

### 6.2 Ottenere le Chiavi Live

1. In Stripe Dashboard, passa alla **modalità Live** (interruttore in alto a destra)
2. Vai su **Developers** → **API keys**
3. Copia le nuove chiavi:
   - `pk_live_...` (Publishable key)
   - `sk_live_...` (Secret key)

### 6.3 Creare Webhook Live

1. Vai su **Developers** → **Webhooks** (in modalità Live)
2. Crea un nuovo webhook con lo stesso URL
3. Seleziona gli stessi eventi
4. Copia il nuovo **Webhook Secret** (`whsec_...`)

### 6.4 Aggiornare Vercel

1. Vai su Vercel → Settings → Environment Variables
2. **Modifica** le tre variabili Stripe sostituendo i valori test con quelli live:
   - `STRIPE_PUBLISHABLE_KEY` → `pk_live_...`
   - `STRIPE_SECRET_KEY` → `sk_live_...`
   - `STRIPE_WEBHOOK_SECRET` → `whsec_...` (nuovo)
3. Fai un **Redeploy**

### 6.5 Test Finale

1. Usa una carta di credito reale (anche la tua)
2. Fai un pagamento di test di €4.99
3. Verifica che tutto funzioni
4. Puoi rimborsare il pagamento da Stripe Dashboard

---

## 💰 Passo 7: Gestione Pagamenti e Commissioni

### 7.1 Commissioni Stripe

Stripe applica queste commissioni in Europa:

**Carte europee**:
- 1.5% + €0.25 per transazione

**Carte non europee**:
- 2.9% + €0.25 per transazione

**Esempio con €4.99**:
- Incasso: €4.99
- Commissione Stripe: €0.32 (1.5% + €0.25)
- **Netto a te**: €4.67

### 7.2 Quando Ricevi i Soldi

**Timing predefinito**:
- Primi pagamenti: 7 giorni lavorativi
- Pagamenti successivi: 2 giorni lavorativi

**Esempio**:
- Lunedì: Cliente paga €4.99
- Mercoledì: Stripe trasferisce sul tuo conto

Puoi modificare la frequenza su Stripe Dashboard → Settings → Bank accounts and scheduling.

### 7.3 Rimborsare un Cliente

Se un cliente non è soddisfatto:

1. Vai su **Payments** in Stripe Dashboard
2. Trova il pagamento
3. Clicca su **Refund** (Rimborsa)
4. Scegli importo (totale o parziale)
5. Conferma

Il rimborso arriva al cliente in 5-10 giorni lavorativi.

---

## 🔒 Passo 8: Sicurezza e Best Practices

### 8.1 Proteggere le Chiavi

✅ **DA FARE**:
- Salvare le chiavi solo nelle variabili d'ambiente
- Non committare mai le chiavi su Git
- Usare `.env` locale per sviluppo
- Revocare chiavi se compromesse

❌ **NON FARE**:
- Non mettere chiavi nel codice frontend
- Non condividere le Secret Keys
- Non pubblicare le chiavi su forum/chat

### 8.2 Monitorare i Pagamenti

Controlla regolarmente:
- **Payments**: Tutti i pagamenti ricevuti
- **Disputes**: Eventuali contestazioni
- **Radar**: Frodi rilevate automaticamente
- **Webhooks**: Eventi ricevuti correttamente

### 8.3 Gestire le Frodi

Stripe ha protezione antifrode integrata (Radar):
- Blocca automaticamente transazioni sospette
- Puoi configurare regole personalizzate
- Ricevi alert per attività anomale

---

## 📊 Passo 9: Modificare il Prezzo

Se vuoi cambiare il prezzo da €4.99:

### 9.1 Nel Codice

Modifica il file `shared/const.ts`:

```typescript
export const PRICE_PER_FORMAT = 499; // €4.99 in centesimi
```

Cambia in:
```typescript
export const PRICE_PER_FORMAT = 999; // €9.99 in centesimi
```

### 9.2 Commit e Deploy

```bash
git add shared/const.ts
git commit -m "Update price to €9.99"
git push
```

Vercel farà automaticamente il redeploy.

---

## 🎁 Passo 10: Creare Codici Sconto (Opzionale)

### 10.1 Creare un Coupon

1. Vai su **Products** → **Coupons**
2. Clicca su **Create coupon**
3. Configura:
   - Nome: `FIRST20` (20% di sconto)
   - Tipo: Percentage (Percentuale)
   - Valore: 20%
   - Durata: Once (Una volta)
4. Salva

### 10.2 Usare il Coupon nel Checkout

Nel codice, quando crei la sessione Stripe, aggiungi:

```typescript
const session = await stripe.checkout.sessions.create({
  // ... altre opzioni
  discounts: [{
    coupon: 'FIRST20',
  }],
});
```

---

## 📞 Supporto Stripe

Se hai problemi:

**Documentazione**: https://stripe.com/docs
**Supporto**: support@stripe.com
**Community**: https://stripe.com/community
**Status**: https://status.stripe.com

---

## ✅ Checklist Finale

Prima di andare live, verifica:

- [ ] Account Stripe completamente verificato
- [ ] Chiavi API live configurate su Vercel
- [ ] Webhook live creato e funzionante
- [ ] IBAN configurato per ricevere pagamenti
- [ ] Test con carta reale completato con successo
- [ ] Politica di rimborso pubblicata sul sito
- [ ] Privacy policy e termini di servizio aggiornati
- [ ] Sistema di crediti utente funzionante
- [ ] Email di conferma pagamento configurate (opzionale)

---

## 🎉 Conclusione

Ora hai tutto configurato per accettare pagamenti! Il sistema è:

✅ **Sicuro**: Stripe gestisce tutti i dati sensibili  
✅ **Automatico**: Webhook aggiornano i crediti automaticamente  
✅ **Professionale**: Checkout Stripe di alta qualità  
✅ **Scalabile**: Gestisce da 1 a 10.000+ transazioni/giorno  

**Buone vendite!** 💰🚀
