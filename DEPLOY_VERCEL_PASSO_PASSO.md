# 🚀 Deploy su Vercel - Guida Passo-Passo

## 📋 Cosa Otterrai

Dopo questa guida avrai:
- ✅ Sito web online e funzionante
- ✅ URL pubblico tipo: `https://kdp-formatter-pro.vercel.app`
- ✅ Backend API funzionante
- ✅ Deploy automatico ad ogni push su GitHub

---

## ⏱️ Tempo Richiesto

**15-20 minuti** (se hai già le chiavi Stripe e database)

---

## 🎯 PASSO 1: Accedi a Vercel

1. Vai su **https://vercel.com**
2. Clicca su **Sign Up** (se non hai account) o **Log In**
3. Scegli **Continue with GitHub**
4. Autorizza Vercel ad accedere al tuo account GitHub

---

## 🎯 PASSO 2: Importa il Repository

1. Nella dashboard Vercel, clicca su **Add New** → **Project**
2. Cerca il repository **kdp-formatter-pro**
3. Clicca su **Import** accanto al repository

---

## 🎯 PASSO 3: Configura il Progetto

### 3.1 Impostazioni Base

Vercel rileverà automaticamente:
- ✅ Framework: Vite
- ✅ Build Command: `pnpm run build`
- ✅ Output Directory: `dist/public`
- ✅ Install Command: `pnpm install`

**NON modificare** queste impostazioni, sono già corrette!

### 3.2 Variabili d'Ambiente (IMPORTANTE!)

Prima di fare il deploy, clicca su **Environment Variables** e aggiungi queste variabili:

#### Database (OBBLIGATORIO)
```
Name: DATABASE_URL
Value: mysql://user:password@host:port/database
Environment: Production, Preview, Development (seleziona tutti)
```

**Dove ottenere DATABASE_URL?**
- **PlanetScale** (gratuito): https://planetscale.com
- **Railway** (gratuito): https://railway.app
- **Aiven** (gratuito): https://aiven.io

#### Stripe (OBBLIGATORIO per pagamenti)
```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
Environment: Production, Preview, Development

Name: STRIPE_SECRET_KEY
Value: sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
Environment: Production, Preview, Development

Name: STRIPE_WEBHOOK_SECRET
Value: whsec_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
Environment: Production, Preview, Development
```

**Dove ottenere le chiavi Stripe?**
1. Vai su https://dashboard.stripe.com
2. Attiva modalità **Test** (interruttore in alto a destra)
3. Vai su **Developers** → **API keys**
4. Copia Publishable key e Secret key
5. Per il Webhook Secret, vedi PASSO 5

#### Session Secret (OBBLIGATORIO)
```
Name: SESSION_SECRET
Value: [genera una stringa casuale lunga]
Environment: Production, Preview, Development
```

**Come generare SESSION_SECRET?**
Apri il terminale e esegui:
```bash
openssl rand -base64 32
```
Oppure usa una stringa casuale lunga tipo: `my-super-secret-key-12345-abcdefg`

#### Node Environment
```
Name: NODE_ENV
Value: production
Environment: Production only
```

### 3.3 Verifica Variabili

Assicurati di aver aggiunto TUTTE queste variabili:
- [ ] DATABASE_URL
- [ ] STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] SESSION_SECRET
- [ ] NODE_ENV

---

## 🎯 PASSO 4: Deploy!

1. Clicca su **Deploy**
2. Attendi 2-5 minuti mentre Vercel:
   - Installa le dipendenze
   - Compila il progetto
   - Crea il deployment

3. Quando vedi **"Congratulations!"**, il deploy è completato!

4. Clicca su **Visit** per vedere il tuo sito online

---

## 🎯 PASSO 5: Configura Webhook Stripe

Ora che il sito è online, devi configurare il webhook Stripe:

### 5.1 Copia l'URL del Sito

Nella dashboard Vercel, copia l'URL del tuo sito, tipo:
```
https://kdp-formatter-pro-abc123.vercel.app
```

### 5.2 Crea il Webhook su Stripe

1. Vai su **https://dashboard.stripe.com**
2. Assicurati di essere in modalità **Test**
3. Vai su **Developers** → **Webhooks**
4. Clicca su **Add endpoint**

### 5.3 Configura il Webhook

**Endpoint URL**:
```
https://kdp-formatter-pro-abc123.vercel.app/webhook/stripe
```
(Sostituisci con il TUO URL Vercel + `/webhook/stripe`)

**Events to send**:
- Seleziona `checkout.session.completed`
- Seleziona `payment_intent.succeeded`
- Seleziona `payment_intent.payment_failed`

**Clicca su Add endpoint**

### 5.4 Copia il Webhook Secret

1. Clicca sul webhook appena creato
2. Nella sezione **Signing secret**, clicca su **Reveal**
3. Copia il valore (inizia con `whsec_`)

### 5.5 Aggiorna Vercel

1. Torna su Vercel → Settings → Environment Variables
2. Trova `STRIPE_WEBHOOK_SECRET`
3. Clicca su **Edit**
4. Incolla il nuovo valore
5. Clicca su **Save**

### 5.6 Redeploy

1. Vai su **Deployments**
2. Clicca sui tre puntini dell'ultimo deployment
3. Clicca su **Redeploy**
4. Attendi il completamento

---

## 🎯 PASSO 6: Inizializza il Database

Devi creare le tabelle nel database. Hai due opzioni:

### Opzione A: Usando Drizzle Kit (Locale)

1. Clona il repository:
```bash
git clone https://github.com/kitbookit/kdp-formatter-pro.git
cd kdp-formatter-pro
```

2. Installa dipendenze:
```bash
pnpm install
```

3. Crea file `.env`:
```bash
echo "DATABASE_URL=mysql://..." > .env
```
(Sostituisci con la tua stringa di connessione)

4. Esegui migrazioni:
```bash
pnpm db:push
```

### Opzione B: SQL Manuale

Accedi al tuo database (PlanetScale, Railway, ecc.) ed esegui questo SQL:

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

## 🎯 PASSO 7: Testa il Sito

### 7.1 Accedi al Sito

Vai su: `https://[tuo-dominio].vercel.app`

### 7.2 Verifica le Pagine

- ✅ Homepage si carica
- ✅ Pagina KDP Formatter funziona
- ✅ Puoi caricare un file

### 7.3 Testa un Pagamento

1. Carica un file di test (DOCX o TXT)
2. Seleziona formato (es. 6x9)
3. Clicca su **Formatta** o **Paga**
4. Verrai reindirizzato a Stripe Checkout
5. Usa carta di test: `4242 4242 4242 4242`
6. Data: `12/34`, CVC: `123`
7. Completa il pagamento
8. Dovresti essere reindirizzato al sito

### 7.4 Verifica il Webhook

1. Vai su Stripe Dashboard → Developers → Webhooks
2. Clicca sul tuo webhook
3. Vai su **Recent events**
4. Dovresti vedere `checkout.session.completed` con status 200

---

## 🎯 PASSO 8: Ottieni i Link

### Frontend (Sito Pubblico)
```
https://[tuo-dominio].vercel.app
```

### Backend API
```
https://[tuo-dominio].vercel.app/api/trpc
```

### Webhook Stripe
```
https://[tuo-dominio].vercel.app/webhook/stripe
```

### Dashboard Vercel
```
https://vercel.com/[tuo-username]/kdp-formatter-pro
```

---

## 🎯 PASSO 9: Configurazioni Opzionali

### Dominio Personalizzato

1. Vai su Vercel → Settings → Domains
2. Clicca su **Add**
3. Inserisci il tuo dominio (es. `kdpformatter.store`)
4. Segui le istruzioni per configurare il DNS
5. Aggiorna `APP_URL` nelle variabili d'ambiente
6. Aggiorna l'URL del webhook su Stripe

### Deploy Automatico

Già configurato! Ogni volta che fai push su GitHub:
```bash
git push origin main
```
Vercel farà automaticamente il deploy delle modifiche.

---

## 🐛 Risoluzione Problemi

### Build Failed

**Problema**: Il build fallisce su Vercel

**Soluzione**:
1. Controlla i log nella dashboard Vercel
2. Verifica che tutte le variabili d'ambiente siano configurate
3. Gli errori TypeScript non bloccano il build

### Database Connection Error

**Problema**: Errore di connessione al database

**Soluzione**:
1. Verifica che `DATABASE_URL` sia corretta
2. Assicurati che il database sia accessibile pubblicamente
3. Per PlanetScale, aggiungi `?ssl={"rejectUnauthorized":true}` alla fine dell'URL

### Webhook Non Funziona

**Problema**: I pagamenti non aggiungono crediti

**Soluzione**:
1. Verifica che l'URL del webhook sia corretto
2. Controlla che `STRIPE_WEBHOOK_SECRET` sia configurato
3. Verifica i log del webhook su Stripe Dashboard
4. Controlla i log su Vercel → Functions

### 404 Not Found

**Problema**: Alcune pagine danno 404

**Soluzione**:
1. Vercel potrebbe non gestire correttamente il routing SPA
2. Verifica che `vercel.json` contenga le rewrites
3. Il file dovrebbe avere:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## ✅ Checklist Finale

Prima di considerare il deploy completato:

- [ ] Sito accessibile pubblicamente
- [ ] Homepage si carica correttamente
- [ ] Pagina KDP Formatter funziona
- [ ] Upload file funziona
- [ ] Stripe Checkout funziona
- [ ] Pagamento test completato con successo
- [ ] Webhook riceve eventi (verifica su Stripe)
- [ ] Database connesso e tabelle create
- [ ] Tutte le variabili d'ambiente configurate
- [ ] URL frontend copiato e salvato
- [ ] URL backend API copiato
- [ ] Deploy automatico testato (push su GitHub)

---

## 🎉 Congratulazioni!

Il tuo sito KDP Formatter Pro è ora **ONLINE e FUNZIONANTE**!

### Link Utili

- **Sito**: https://[tuo-dominio].vercel.app
- **Dashboard Vercel**: https://vercel.com/dashboard
- **Repository GitHub**: https://github.com/kitbookit/kdp-formatter-pro
- **Stripe Dashboard**: https://dashboard.stripe.com

### Prossimi Passi

1. Testa tutte le funzionalità
2. Personalizza logo e branding
3. Configura dominio personalizzato
4. Aggiungi Google Analytics
5. Inizia a promuovere il servizio!

**Buon lavoro! 🚀📚**
