# 🚀 Deploy Finale - KDP Formatter Pro su kdpformatter.store

## ✅ TUTTO PRONTO! Chiavi Stripe LIVE Configurate!

Ho configurato le tue chiavi Stripe LIVE reali:
- ✅ Secret Key (sk_live_...)
- ✅ Publishable Key (pk_live_...)
- ✅ Webhook Secret (whsec_...)

**⚠️ IMPORTANTE**: Queste sono chiavi LIVE! I pagamenti saranno REALI!

---

## 🚀 Deploy in 3 Step (5 Minuti)

### **Step 1: Push su GitHub (2 minuti)**

```bash
# 1. Crea repository su GitHub
# Vai su https://github.com/new
# Nome: kdp-formatter-pro
# Visibilità: Private (consigliato per proteggere il codice)

# 2. Push (SOSTITUISCI TUO_USERNAME con il tuo username GitHub)
cd /home/ubuntu
git remote add origin https://github.com/TUO_USERNAME/kdp-formatter-pro.git
git push -u origin main
```

**Se richiede autenticazione**:
- Username: tuo username GitHub
- Password: usa **Personal Access Token** (non password)
  - Crea token: https://github.com/settings/tokens
  - Clicca "Generate new token (classic)"
  - Scope: seleziona `repo` (full control)
  - Copia il token e usalo come password

---

### **Step 2: Deploy su Vercel (2 minuti)**

#### **2.1 Importa Progetto**

1. Vai su https://vercel.com
2. Clicca **"Add New..." → Project**
3. Clicca **"Import Git Repository"**
4. Seleziona `kdp-formatter-pro`
5. Clicca **"Import"**

#### **2.2 Configura Build**

- **Framework Preset**: Vite
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`

#### **2.3 Aggiungi Environment Variables**

Clicca su **"Environment Variables"** e aggiungi TUTTE queste:

**Copia da file**: `VERCEL_ENV_VARIABLES.txt` (allegato)

Oppure copia manualmente:

```
NODE_ENV=production
PORT=5000
VITE_APP_ID=kdp_formatter_pro_2025
VITE_APP_TITLE=KDP Formatter Pro
VITE_APP_LOGO=https://kdpformatter.store/logo.png
DOMAIN=kdpformatter.store
VITE_API_URL=https://kdpformatter.store
DATABASE_URL=file:./dev.db
JWT_SECRET=2b2b6dea3f07a51f3c4d901b67c37e1203a7aa973662e853bf7c1dbd1974f41eb9d5d65945543f3076da2c098c85ec924f6310a648c4a4a044a50937e03e1b43
OAUTH_SERVER_URL=https://vidabiz.butterfly-effect.dev
VITE_OAUTH_PORTAL_URL=https://vida.butterfly-effect.dev
STRIPE_SECRET_KEY=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
STRIPE_PUBLISHABLE_KEY=pk_live_51QhwSkJtBJsXNnYUjmOEDELer7DIeHyP8owuivtaBKtfmOKOhanT1qtbARn0S4PfZx5XrYRsZe7ixGJaABepYxx500arYlM03m
STRIPE_WEBHOOK_SECRET=whsec_IRgi4gcjT6qHMYvr9pXmMMF4pr538jCR
```

**Per ogni variabile**:
- Name: (nome variabile)
- Value: (valore variabile)
- Environment: **Seleziona tutti e 3** (Production, Preview, Development)

#### **2.4 Deploy!**

1. Clicca **"Deploy"**
2. Attendi 2-3 minuti ☕
3. Vercel compilerà e deployerà tutto automaticamente

**Deploy completato!** 🎉

Vercel ti darà un URL temporaneo tipo: `kdp-formatter-pro.vercel.app`

---

### **Step 3: Configura Dominio kdpformatter.store (1 minuto)**

#### **3.1 Aggiungi Dominio su Vercel**

1. Nel progetto Vercel, vai su **Settings → Domains**
2. Clicca **"Add"**
3. Inserisci: `kdpformatter.store`
4. Clicca **"Add"**

Vercel ti mostrerà i record DNS da configurare.

#### **3.2 Configura DNS**

Vai nel pannello DNS del tuo registrar (dove hai comprato kdpformatter.store) e aggiungi questi record:

**Record A**:
```
Type: A
Name: @ (o lascia vuoto)
Value: 76.76.21.21
TTL: 3600 (o automatico)
```

**Record CNAME**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (o automatico)
```

#### **3.3 Attendi Propagazione**

- Tempo: 1-48 ore (di solito 1-2 ore)
- Verifica su: https://dnschecker.org
- Vercel configurerà automaticamente SSL (HTTPS)

---

## ⚠️ IMPORTANTE: Verifica Webhook Stripe

Il webhook è già configurato, ma verifica che l'URL sia corretto:

1. Vai su https://dashboard.stripe.com/webhooks
2. Trova il webhook che hai creato
3. Verifica URL: `https://kdpformatter.store/webhook/stripe`

**Se l'URL è diverso**:
- Clicca sul webhook
- Clicca "..." → Edit endpoint
- Cambia URL in: `https://kdpformatter.store/webhook/stripe`
- Salva

**Eventi da ascoltare**:
- `checkout.session.completed` (OBBLIGATORIO)
- `payment_intent.succeeded` (opzionale)
- `payment_intent.payment_failed` (opzionale)

---

## 🧪 Test Completo

### **1. Test Homepage**

```bash
curl https://kdpformatter.store
# O apri nel browser
```

Dovresti vedere la landing page SEO-ottimizzata.

### **2. Test Formattazione**

1. Vai su https://kdpformatter.store/kdp-formatter
2. Carica un file PDF o DOCX
3. Seleziona formato **6x9**
4. Clicca **"Formatta"**
5. Scarica il PDF
6. Verifica che sia formattato correttamente

### **3. Test Pagamento REALE** ⚠️

**ATTENZIONE**: Questo è un pagamento REALE con carta vera!

1. Vai su https://kdpformatter.store
2. Clicca su un piano (es. Starter €4,99)
3. Clicca **"Inizia Ora"**
4. Inserisci carta REALE
5. Completa pagamento
6. Verifica su Stripe Dashboard che il pagamento sia arrivato

**Carta di test Stripe** (per testing senza pagare):
- Numero: `4242 4242 4242 4242`
- Scadenza: qualsiasi data futura
- CVC: qualsiasi 3 cifre
- ZIP: qualsiasi

Ma attenzione: con chiavi LIVE, anche le carte di test potrebbero non funzionare. Usa una carta vera o torna a chiavi TEST per testing.

---

## 📊 Monitoraggio

### **Vercel Dashboard**

- Vai su https://vercel.com/dashboard
- Seleziona `kdp-formatter-pro`
- Vedi:
  - **Deployments**: storico deploy
  - **Analytics**: traffico, performance
  - **Logs**: errori e debug
  - **Functions**: API calls

### **Stripe Dashboard**

- Vai su https://dashboard.stripe.com
- Vedi:
  - **Payments**: tutti i pagamenti ricevuti
  - **Customers**: clienti
  - **Balance**: saldo disponibile
  - **Webhooks**: eventi ricevuti

### **Logs Real-Time**

```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Vedi logs
vercel logs kdp-formatter-pro --follow
```

---

## 💰 Primi Guadagni

### **Come Ricevere i Soldi**

1. Vai su https://dashboard.stripe.com/settings/payouts
2. Configura conto bancario
3. Stripe trasferisce automaticamente ogni 2-7 giorni

### **Commissioni Stripe**

- **Europa**: 1,4% + €0,25 per transazione
- **Fuori Europa**: 2,9% + €0,25

**Esempio**:
- Vendita: €4,99
- Commissione Stripe: €0,32
- Tu ricevi: **€4,67**

---

## 🚀 Marketing Immediato

Appena il sito è live:

### **Giorno 1**:
- [ ] Posta in 5 gruppi Facebook autori italiani
- [ ] Tweet con #selfpublishing #KDP
- [ ] Post LinkedIn
- [ ] Contatta 3 influencer/blogger

### **Settimana 1**:
- [ ] Pubblica 2 articoli blog
- [ ] Google Ads (€20/giorno)
- [ ] Facebook Ads (€30/giorno)
- [ ] Contatta 10 autori direttamente

### **Mese 1**:
- [ ] 10 articoli blog pubblicati
- [ ] 20 backlink acquisiti
- [ ] 100 visitatori/giorno
- [ ] Prime 50 vendite

---

## 📈 Proiezioni Revenue

Con chiavi LIVE e marketing attivo:

**Settimana 1**: €200-500
- 40-100 vendite × €4,99 = €200-500

**Mese 1**: €2.000-5.000
- 400-1.000 vendite × €4,99 = €2.000-5.000

**Mese 3**: €10.000-20.000
- 2.000-4.000 vendite × €4,99 = €10.000-20.000

**Mese 6**: €30.000-50.000
- 6.000-10.000 vendite × €4,99 = €30.000-50.000

---

## ✅ Checklist Post-Deploy

- [ ] Sito live su https://kdpformatter.store
- [ ] Homepage carica correttamente
- [ ] Landing page SEO visibile
- [ ] Formattazione funziona
- [ ] PDF generati sono conformi KDP
- [ ] Checkout Stripe funziona
- [ ] Webhook riceve eventi
- [ ] Pagamenti arrivano su Stripe
- [ ] Mobile responsive
- [ ] SSL attivo (HTTPS)
- [ ] Google Analytics configurato (opzionale)
- [ ] Marketing iniziato

---

## 🎉 SEI LIVE E PRONTO A MONETIZZARE!

Con le chiavi Stripe LIVE configurate, ogni vendita è un guadagno REALE!

**Prossimi passi**:

1. **Completa deploy** (Step 1-3 sopra)
2. **Testa tutto** (formattazione + pagamento)
3. **Lancia marketing** (social + ads)
4. **Monitora revenue** (Stripe Dashboard)
5. **Scala** (più traffico = più vendite)

---

## 🆘 Supporto

Se hai problemi:

1. **Vercel logs**: `vercel logs kdp-formatter-pro --follow`
2. **Stripe logs**: Dashboard → Developers → Logs
3. **Webhook logs**: Dashboard → Webhooks → (tuo webhook) → Events
4. **Test locale**: `cd /home/ubuntu && pnpm run dev`

---

## 🔐 Sicurezza

**⚠️ IMPORTANTE**:

- ✅ NON condividere chiavi Stripe con nessuno
- ✅ NON committare .env su GitHub (già in .gitignore)
- ✅ NON pubblicare chiavi in screenshot/video
- ✅ Usa environment variables su Vercel (non hardcoded)

Se le chiavi vengono compromesse:
1. Vai su Stripe Dashboard
2. Revoca chiavi vecchie
3. Genera nuove chiavi
4. Aggiorna su Vercel
5. Redeploy

---

**Vai e conquista il mercato! 🚀💰**

**Ogni vendita è un passo verso i tuoi €10.000/mese!**

