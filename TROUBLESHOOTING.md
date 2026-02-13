# 🔧 Troubleshooting Guide - Ramadan App

## Česti Problemi i Rešenja

---

### 1️⃣ "Module not found" greške

**Problem:**
```
Module not found: Error: Can't resolve '/images/...'
```

**Rešenje:**
✅ Sve slike sada koriste `process.env.PUBLIC_URL`
✅ Preuzmi NAJNOVIJI `ramadan-app.zip`
✅ Pokreni:
```bash
rm -rf node_modules
npm install
npm start
```

---

### 2️⃣ "npm" nije prepoznat kao komanda

**Problem:**
```
'npm' is not recognized as an internal or external command
```

**Rešenje:**
1. Instaliraj Node.js sa: https://nodejs.org/
2. Preuzmi **LTS verziju** (preporučeno)
3. Restartuj terminal posle instalacije
4. Proveri:
   ```bash
   node --version
   npm --version
   ```

---

### 3️⃣ Port 3000 je već zauzet

**Problem:**
```
Something is already running on port 3000
```

**Rešenje A - Ubij proces:**
```bash
# Mac/Linux:
lsof -ti:3000 | xargs kill

# Windows (Command Prompt):
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Rešenje B - Koristi drugi port:**
```bash
# Mac/Linux:
PORT=3001 npm start

# Windows:
set PORT=3001 && npm start
```

---

### 4️⃣ Build greške prilikom instalacije

**Problem:**
```
npm ERR! code ELIFECYCLE
```

**Rešenje:**
```bash
# 1. Obriši node_modules i package-lock.json
rm -rf node_modules package-lock.json

# 2. Očisti npm cache
npm cache clean --force

# 3. Ponovo instaliraj
npm install

# 4. Pokreni
npm start
```

---

### 5️⃣ Slike se ne učitavaju (prazne pozadine)

**Problem:**
Pozadine su crne ili bez slika

**Provera:**
1. Da li su sve slike u `public/images/` folderu?
   ```bash
   ls public/images/
   ```
   
2. Trebao bi da vidiš:
   - gazilar2.png
   - ramadan_pozadina.png
   - logoi_beli.png
   - 123.png
   - sabah_on.png, sabah_of.png
   - podne_on.png, podne_off.png
   - ikindija_on.png, ikindija_off.png
   - aksam_onn.png, aksam_offf.png
   - jacija_on.png, jacija_off.png

**Rešenje:**
✅ Raspakiraj PONOVO `ramadan-app.zip`
✅ Proveri da se slike kopiraju

---

### 6️⃣ CSS ne radi kako treba

**Problem:**
Stilovi izgledaju loše ili nisu primenjeni

**Rešenje:**
```bash
# Očisti cache i restartuj
npm start -- --reset-cache
```

**ILI:**

```bash
# Hard refresh u browseru
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R
```

---

### 7️⃣ Countdown ne radi (prikazuje 00:00:00)

**Provera:**
1. Da li su vremena u `src/data/prayerTimes.json`?
2. Otvori konzolu (F12) i proveri greške

**Rešenje:**
✅ Proveri `src/data/prayerTimes.json` - treba da ima 30 dana
✅ Svaki dan treba da ima: sabah, podne, ikindija, aksam, jacija

---

### 8️⃣ Swipe gestures ne rade na mobilnom

**Provera:**
Da li testirate na pravom mobilnom uređaju ili emulatoru?

**Napomena:**
- Na desktop browseru: koristi ◀ ▶ dugmad
- Na mobilnom: swipe levo/desno radi

**Test:**
1. Otvori `http://localhost:3000` na telefonu
2. Prevuci (swipe) levo ili desno

---

### 9️⃣ Deployment na Vercel ne radi

**Problem:**
Build fails na Vercel

**Provera:**
1. Da li je `vercel.json` u root folderu?
2. Da li je `package.json` ispravan?

**Rešenje:**
```bash
# Lokalno testiranje build-a
npm run build

# Ako radi lokalno, deployuj:
vercel --prod
```

---

### 🔟 Vremena namaza nisu tačna

**Customizacija:**
Uredi: `src/data/prayerTimes.json`

```json
{
  "day": 1,
  "date": "19.02.2026",
  "dayName": "Četvrtak",
  "sabah": "04:56:00",
  "podne": "11:53:00",
  "ikindija": "14:43:00",
  "aksam": "17:18:00",
  "jacija": "18:37:00"
}
```

Promeni vremena i restartuj app.

---

## 🆘 Dodatna Pomoć

Ako ništa od gore navedenog ne radi:

1. **Proveri Node.js verziju:**
   ```bash
   node --version
   # Trebalo bi: v16.x ili novije
   ```

2. **Reinstaliraj Node.js:**
   - Preuzmi sa: https://nodejs.org/
   - Instaliraj LTS verziju

3. **Kreiraj novi projekat od početka:**
   ```bash
   # Raspakiraj ramadan-app.zip u novi folder
   cd ramadan-app
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

---

## 📞 Kontakt

Za dodatnu pomoć, kontaktirajte developera sa screenshot-om greške.

**Ramadan Kareem! 🌙**
