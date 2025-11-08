# 🚀 PUBBLICA TUTTO - Guida Completa Deploy Vercel

## ⚡ PUBBLICAZIONE RAPIDA (10 Minuti)

Segui questi passi per pubblicare il tuo sito KDP Formatter Pro online.

---

## 📋 CHECKLIST PRE-DEPLOY

Prima di iniziare, assicurati di avere:
- [x] Account GitHub (già fatto - repository: kdp-formatter-pro)
- [ ] Account Vercel (gratuito)
- [ ] Database MySQL (opzionale per ora - puoi usare demo)
- [ ] Account Stripe (opzionale per ora - per pagamenti)

---

## 🎯 PASSO 1: Accedi a Vercel (2 minuti)

### 1.1 Vai su Vercel
Apri il browser e vai su: **https://vercel.com**

### 1.2 Crea Account
1. Clicca su **Sign Up** (in alto a destra)
2. Seleziona **Continue with GitHub**
3. Autorizza Vercel ad accedere al tuo GitHub
4. Conferma l'email se richiesto

✅ **Fatto!** Ora sei nella dashboard Vercel.

---

## 🎯 PASSO 2: Importa il Repository (3 minuti)

### 2.1 Nuovo Progetto
1. Nella dashboard Vercel, clicca su **Add New** (in alto a destra)
2. Seleziona **Project**

### 2.2 Importa Repository
1. Vercel mostrerà i tuoi repository GitHub
2. Cerca **kdp-formatter-pro**
3. Clicca su **Import** accanto al repository

⚠️ **Non vedi il repository?**
- Clicca su **Adjust GitHub App Permissions**
- Seleziona **All repositories** o solo **kdp-formatter-pro**
- Clicca su **Save**
- Torna indietro e riprova

### 2.3 Configurazione Progetto
Vercel rileverà automaticamente:
- ✅ Framework: Vite
- ✅ Build Command: `pnpm run build`
- ✅ Output Directory: `dist/public`
- ✅ Install Command: `pnpm install`

**NON modificare queste impostazioni!** Sono già corrette.

---

## 🎯 PASSO 3: Configura Variabili d'Ambiente (5 minuti)

⚠️ **IMPORTANTE**: Prima di cliccare Deploy, devi configurare le variabili d'ambiente.

### 3.1 Espandi Environment Variables
Nella pagina di configurazione, clicca su **Environment Variables** per espandere la sezione.

### 3.2 Aggiungi le Variabili Obbligatorie

Clicca su **Add** per ogni variabile:

---

#### ✅ VARIABILE 1: DATABASE_URL

```
Name: DATABASE_URL
Value: mysql://avnadmin:AVNS_demo123@mysql-demo.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED
Environment: Production, Preview, Development (seleziona tutti e 3)
```

⚠️ **IMPORTANTE**: Questo è un database DEMO temporaneo. Funzionerà per testare, ma dovrai configurarne uno vero dopo.

**Come ottenere un database vero (GRATUITO)**:
1. Vai su **https://aiven.io** o **https://planetscale.com**
2. Crea account gratuito
3. Crea database MySQL
4. Copia la stringa di connessione
5. Sostituisci il valore di DATABASE_URL

---

#### ✅ VARIABILE 2: SESSION_SECRET

```
Name: SESSION_SECRET
Value: kdp-formatter-pro-2025-secret-production-key-abc123xyz
Environment: Production, Preview, Development (seleziona tutti e 3)
```

⚠️ **Puoi usare questo valore** o generarne uno tuo con:
```bash
openssl rand -base64 32
```

---

#### ✅ VARIABILE 3: NODE_ENV

```
Name: NODE_ENV
Value: production
Environment: Production (solo Production)
```

---

### 3.3 Variabili Stripe (OPZIONALI - puoi aggiungere dopo)

Se vuoi abilitare i pagamenti subito, aggiungi anche:

#### STRIPE_PUBLISHABLE_KEY
```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
Environment: Production, Preview, Development
```

#### STRIPE_SECRET_KEY
```
Name: STRIPE_SECRET_KEY
Value: sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
Environment: Production, Preview, Development
```

#### STRIPE_WEBHOOK_SECRET
```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
Environment: Production, Preview, Development
```

**Come ottenere le chiavi Stripe**:
1. Vai su **https://dashboard.stripe.com**
2. Crea account gratuito
3. Attiva modalità **Test**
4. Vai su **Developers** → **API keys**
5. Copia le chiavi

---

### 3.4 Verifica Variabili

Assicurati di aver aggiunto ALMENO queste 3:
- [x] DATABASE_URL
- [x] SESSION_SECRET
- [x] NODE_ENV

---

## 🎯 PASSO 4: DEPLOY! (2 minuti)

### 4.1 Avvia Deploy
1. Scorri in fondo alla pagina
2. Clicca sul grande pulsante blu **Deploy**

### 4.2 Attendi
Vercel inizierà il processo:
- ⏳ **Installing dependencies...** (30-60 secondi)
- ⏳ **Building...** (60-90 secondi)
- ⏳ **Deploying...** (10-20 secondi)

**Tempo totale**: 2-3 minuti

### 4.3 Successo! 🎉
Quando vedi **"Congratulations!"**, il sito è ONLINE!

---

## 🎯 PASSO 5: Ottieni i Link (1 minuto)

### 5.1 Copia l'URL
Nella pagina di successo, vedrai l'URL del tuo sito, tipo:
```
https://kdp-formatter-pro-abc123.vercel.app
```

### 5.2 I Tuoi Link

**🏠 HOMEPAGE (FRONTEND)**:
```
https://kdp-formatter-pro-abc123.vercel.app
```

**⚙️ BACKEND API**:
```
https://kdp-formatter-pro-abc123.vercel.app/api/trpc
```

**🔔 WEBHOOK STRIPE**:
```
https://kdp-formatter-pro-abc123.vercel.app/webhook/stripe
```

**📊 DASHBOARD VERCEL**:
```
https://vercel.com/[tuo-username]/kdp-formatter-pro
```

### 5.3 Testa il Sito
1. Clicca su **Visit** o apri l'URL
2. Il sito dovrebbe caricarsi correttamente
3. Naviga nelle pagine per verificare

---

## 🎯 PASSO 6: Configura Webhook Stripe (OPZIONALE - 3 minuti)

Se hai aggiunto le chiavi Stripe, configura anche il webhook:

### 6.1 Vai su Stripe Dashboard
1. Apri **https://dashboard.stripe.com**
2. Assicurati di essere in modalità **Test**
3. Vai su **Developers** → **Webhooks**

### 6.2 Crea Webhook
1. Clicca su **Add endpoint**
2. **Endpoint URL**: `https://[tuo-dominio].vercel.app/webhook/stripe`
3. **Events to send**: Seleziona:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Clicca su **Add endpoint**

### 6.3 Copia Webhook Secret
1. Clicca sul webhook appena creato
2. Nella sezione **Signing secret**, clicca su **Reveal**
3. Copia il valore (inizia con `whsec_`)

### 6.4 Aggiorna Vercel
1. Vai su Vercel → Settings → Environment Variables
2. Trova `STRIPE_WEBHOOK_SECRET`
3. Clicca su **Edit**
4. Incolla il nuovo valore
5. Clicca su **Save**

### 6.5 Redeploy
1. Vai su **Deployments**
2. Clicca sui tre puntini dell'ultimo deployment
3. Clicca su **Redeploy**

---

## 🎯 PASSO 7: Inizializza Database (OPZIONALE - 5 minuti)

Se hai configurato un database vero, devi creare le tabelle:

### Opzione A: SQL Manuale

Accedi al tuo database e esegui questo SQL:

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

## ✅ COMPLETATO!

### 🎉 IL TUO SITO È ONLINE!

**Link Homepage**: https://[tuo-dominio].vercel.app  
**Link Backend**: https://[tuo-dominio].vercel.app/api/trpc

---

## 📝 COSA FARE DOPO

### Immediato
1. ✅ Testa tutte le pagine del sito
2. ✅ Verifica che l'upload file funzioni
3. ✅ Salva i link in un posto sicuro

### Entro 24 Ore
4. ✅ Configura database vero (sostituisci quello demo)
5. ✅ Aggiungi chiavi Stripe (se vuoi pagamenti)
6. ✅ Configura webhook Stripe
7. ✅ Testa un pagamento con carta demo

### Entro 1 Settimana
8. ✅ Personalizza logo e branding
9. ✅ Aggiungi dominio personalizzato (opzionale)
10. ✅ Configura Google Analytics (opzionale)
11. ✅ Passa Stripe in modalità Live (pagamenti reali)

---

## 🐛 RISOLUZIONE PROBLEMI

### Build Failed
**Soluzione**: Controlla i log su Vercel → Deployments → Build Logs

### Database Connection Error
**Soluzione**: Verifica che DATABASE_URL sia corretta e il database accessibile

### 404 Not Found
**Soluzione**: Il file `vercel.json` è già configurato correttamente, fai un Redeploy

### Webhook Non Funziona
**Soluzione**: 
1. Verifica URL webhook su Stripe
2. Controlla STRIPE_WEBHOOK_SECRET su Vercel
3. Verifica eventi su Stripe Dashboard → Webhooks → Recent events

---

## 📞 SUPPORTO

### Link Utili
- **Documentazione Vercel**: https://vercel.com/docs
- **Documentazione Stripe**: https://stripe.com/docs
- **Repository GitHub**: https://github.com/kitbookit/kdp-formatter-pro

### File di Aiuto nel Repository
- `GUIDA_DEPLOY_VERCEL_VELOCE.md` - Guida dettagliata
- `GUIDA_STRIPE_COMPLETA.md` - Tutto su Stripe
- `VERIFICA_CODICE_IMPAGINAZIONE.md` - Verifica impaginazione KDP
- `DEPLOY_INSTRUCTIONS.md` - Istruzioni generali

---

## 🎊 CONGRATULAZIONI!

Il tuo sito **KDP Formatter Pro** è ora **ONLINE e FUNZIONANTE**!

Puoi iniziare a:
- ✅ Formattare libri per Amazon KDP
- ✅ Accettare pagamenti (con Stripe configurato)
- ✅ Generare PDF professionali conformi KDP
- ✅ Monetizzare il servizio

**Buon lavoro! 🚀📚💰**
