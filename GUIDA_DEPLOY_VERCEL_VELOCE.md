# 🚀 Deploy su Vercel - Guida Veloce (10 Minuti)

## ⏱️ Tempo Totale: 10-15 Minuti

Seguendo questa guida otterrai:
- ✅ Link homepage: `https://kdp-formatter-pro.vercel.app`
- ✅ Link backend API: `https://kdp-formatter-pro.vercel.app/api/trpc`
- ✅ Sito completamente funzionante

---

## 📱 STEP 1: Accedi a Vercel (2 minuti)

### 1.1 Apri il Browser
Vai su: **https://vercel.com**

### 1.2 Login con GitHub
1. Clicca su **Sign Up** (in alto a destra)
2. Scegli **Continue with GitHub**
3. Autorizza Vercel ad accedere al tuo account GitHub
4. Conferma l'email se richiesto

✅ **Fatto!** Ora sei nella dashboard Vercel.

---

## 📦 STEP 2: Importa il Repository (3 minuti)

### 2.1 Nuovo Progetto
1. Nella dashboard Vercel, clicca sul pulsante **Add New** (in alto a destra)
2. Seleziona **Project** dal menu

### 2.2 Trova il Repository
1. Vercel mostrerà i tuoi repository GitHub
2. Cerca **kdp-formatter-pro**
3. Clicca su **Import** accanto al repository

⚠️ **Non vedi il repository?**
- Clicca su **Adjust GitHub App Permissions**
- Autorizza Vercel ad accedere ai tuoi repository
- Torna indietro e riprova

### 2.3 Configura il Progetto
Vercel rileverà automaticamente le impostazioni:
- **Framework Preset**: Vite
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `pnpm install`

✅ **NON modificare** queste impostazioni!

---

## 🔑 STEP 3: Variabili d'Ambiente (5 minuti)

⚠️ **IMPORTANTE**: Prima di cliccare Deploy, devi configurare le variabili d'ambiente.

### 3.1 Apri Environment Variables
Nella pagina di configurazione del progetto, clicca su **Environment Variables** (espandi la sezione).

### 3.2 Aggiungi le Variabili

Clicca su **Add** per ogni variabile e inserisci:

#### ✅ Variabile 1: DATABASE_URL (OBBLIGATORIA)
```
Name: DATABASE_URL
Value: mysql://user:password@host:port/database
```

**⚠️ Non hai un database?** Usa questo valore temporaneo per testare:
```
mysql://demo:demo@demo.planetscale.com:3306/demo
```
(Poi dovrai configurare un database vero)

**Environment**: Seleziona tutti (Production, Preview, Development)

---

#### ✅ Variabile 2: SESSION_SECRET (OBBLIGATORIA)
```
Name: SESSION_SECRET
Value: kdp-formatter-secret-key-2025-production
```

**Environment**: Seleziona tutti

---

#### ✅ Variabile 3: NODE_ENV
```
Name: NODE_ENV
Value: production
```

**Environment**: Solo Production

---

#### ⚠️ Variabili Stripe (OPZIONALI per ora)

Se vuoi testare i pagamenti subito, aggiungi anche:

```
Name: STRIPE_PUBLISHABLE_KEY
Value: pk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
```

```
Name: STRIPE_SECRET_KEY
Value: sk_test_51AbCdEfGhIjKlMnOpQrStUvWxYz...
```

```
Name: STRIPE_WEBHOOK_SECRET
Value: whsec_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
```

**Environment**: Seleziona tutti

⚠️ **Non hai le chiavi Stripe?** Puoi aggiungerle dopo. Il sito funzionerà comunque (senza pagamenti).

---

### 3.3 Verifica

Assicurati di aver aggiunto ALMENO queste 3 variabili:
- [x] DATABASE_URL
- [x] SESSION_SECRET
- [x] NODE_ENV

---

## 🚀 STEP 4: Deploy! (2 minuti)

### 4.1 Avvia il Deploy
1. Scorri in fondo alla pagina
2. Clicca sul pulsante **Deploy** (grande e blu)

### 4.2 Attendi
Vercel inizierà il processo di build:
- ⏳ Installing dependencies... (30-60 secondi)
- ⏳ Building... (60-90 secondi)
- ⏳ Deploying... (10-20 secondi)

**Totale**: 2-3 minuti

### 4.3 Successo!
Quando vedi **"Congratulations! Your project has been deployed"**, il deploy è completato! 🎉

---

## 🔗 STEP 5: Ottieni i Link (1 minuto)

### 5.1 Link Homepage
Nella pagina di successo, vedrai un'anteprima del sito.

Clicca su **Visit** oppure copia l'URL mostrato, tipo:
```
https://kdp-formatter-pro-abc123.vercel.app
```

Questo è il **link della tua homepage**! ✅

### 5.2 Link Backend API
Il backend API è accessibile allo stesso dominio + `/api/trpc`:
```
https://kdp-formatter-pro-abc123.vercel.app/api/trpc
```

### 5.3 Salva i Link
Copia e salva questi link:
- **Homepage**: `https://[tuo-dominio].vercel.app`
- **Backend API**: `https://[tuo-dominio].vercel.app/api/trpc`
- **Webhook Stripe**: `https://[tuo-dominio].vercel.app/webhook/stripe`

---

## ✅ STEP 6: Verifica che Funzioni (2 minuti)

### 6.1 Apri la Homepage
1. Clicca sul link della homepage
2. Dovresti vedere il sito KDP Formatter caricato

✅ **Funziona?** Perfetto!
❌ **Errore?** Vedi la sezione "Risoluzione Problemi" sotto.

### 6.2 Testa le Pagine
Naviga nel sito:
- ✅ Homepage si carica
- ✅ Menu funziona
- ✅ Pagina KDP Formatter è accessibile

### 6.3 Testa l'Upload (opzionale)
1. Vai sulla pagina KDP Formatter
2. Prova a caricare un file (DOCX o TXT)
3. Seleziona un formato (es. 6x9)

⚠️ Se non hai configurato Stripe, il pagamento non funzionerà ancora (normale).

---

## 🎉 COMPLETATO!

### I Tuoi Link

**🏠 Homepage (Frontend)**:
```
https://[tuo-dominio].vercel.app
```

**⚙️ Backend API**:
```
https://[tuo-dominio].vercel.app/api/trpc
```

**📊 Dashboard Vercel**:
```
https://vercel.com/[tuo-username]/kdp-formatter-pro
```

---

## 🔧 Configurazioni Successive (Opzionali)

### Database Vero
Se hai usato il database demo, configura un database vero:
1. Crea database su **PlanetScale** (gratuito): https://planetscale.com
2. Copia la stringa di connessione
3. Vai su Vercel → Settings → Environment Variables
4. Modifica `DATABASE_URL` con il nuovo valore
5. Redeploy (Deployments → ... → Redeploy)

### Stripe
Per abilitare i pagamenti:
1. Vai su https://dashboard.stripe.com
2. Ottieni le chiavi API (vedi `GUIDA_STRIPE_COMPLETA.md`)
3. Aggiungi le chiavi su Vercel → Environment Variables
4. Configura il webhook su Stripe
5. Redeploy

### Dominio Personalizzato
Per usare il tuo dominio (es. kdpformatter.store):
1. Vai su Vercel → Settings → Domains
2. Aggiungi il tuo dominio
3. Configura il DNS come indicato
4. Attendi la propagazione (5-30 minuti)

---

## 🐛 Risoluzione Problemi

### Errore: "Build Failed"
**Causa**: Mancano variabili d'ambiente o errori di build

**Soluzione**:
1. Vai su Vercel → Deployments
2. Clicca sull'ultimo deployment
3. Vai su **Build Logs**
4. Cerca errori in rosso
5. Verifica che `DATABASE_URL` e `SESSION_SECRET` siano configurate
6. Redeploy

### Errore: "Application Error" o 500
**Causa**: Problema con il database o variabili d'ambiente

**Soluzione**:
1. Vai su Vercel → Settings → Environment Variables
2. Verifica che tutte le variabili siano corrette
3. Controlla che `DATABASE_URL` sia valida
4. Redeploy

### Sito si carica ma pagine vuote
**Causa**: Problema di routing

**Soluzione**:
1. Verifica che il file `vercel.json` esista nel repository
2. Dovrebbe contenere le rewrites per SPA
3. Il file è già presente, quindi fai un Redeploy

### Non vedo il repository su Vercel
**Causa**: Permessi GitHub

**Soluzione**:
1. Clicca su **Adjust GitHub App Permissions**
2. Autorizza Vercel ad accedere ai repository
3. Ricarica la pagina

---

## 📞 Hai Bisogno di Aiuto?

Se incontri problemi:
1. Controlla i **Build Logs** su Vercel
2. Verifica le **Environment Variables**
3. Consulta la documentazione: https://vercel.com/docs

---

## ✅ Checklist Finale

Prima di considerare il deploy completato:

- [ ] Account Vercel creato
- [ ] Repository importato
- [ ] Variabili d'ambiente configurate (almeno DATABASE_URL, SESSION_SECRET, NODE_ENV)
- [ ] Deploy completato con successo
- [ ] Homepage accessibile e funzionante
- [ ] Link homepage salvato
- [ ] Link backend API salvato
- [ ] Sito testato (almeno homepage)

---

## 🎊 Congratulazioni!

Il tuo sito **KDP Formatter Pro** è ora **ONLINE**! 🚀

### Prossimi Passi

1. ✅ Configura un database vero (se hai usato quello demo)
2. ✅ Aggiungi le chiavi Stripe per abilitare i pagamenti
3. ✅ Configura il webhook Stripe
4. ✅ Testa tutte le funzionalità
5. ✅ Personalizza logo e branding
6. ✅ Aggiungi dominio personalizzato (opzionale)
7. ✅ Inizia a promuovere il servizio!

**Buon lavoro! 📚💰**
