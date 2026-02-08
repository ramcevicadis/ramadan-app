# 🚀 Brzo Pokretanje - Ramadan App

## 📥 Preuzimanje

Preuzmite `ramadan-app.zip` i raspakirajte ga.

## 💻 Lokalno Pokretanje (Testiranje)

### 1. Otvorite Terminal/Command Prompt

**Windows:**
- Pritisnite `Win + R`
- Unesite `cmd` i pritisnite Enter

**Mac/Linux:**
- Otvorite Terminal aplikaciju

### 2. Navigirajte u folder

```bash
cd putanja/do/ramadan-app
```

**Primer (Windows):**
```bash
cd C:\Users\Adis\Downloads\ramadan-app
```

**Primer (Mac/Linux):**
```bash
cd ~/Downloads/ramadan-app
```

### 3. Instalirajte zavisnosti

```bash
npm install
```

⏳ Ovo može trajati 2-3 minuta (preuzima React i druge biblioteke).

### 4. Pokrenite aplikaciju

```bash
npm start
```

🎉 **Aplikacija će se automatski otvoriti u browseru na `http://localhost:3000`**

---

## 🌐 Deploy na Vercel (LIVE na internetu)

### Opcija 1: Preko GitHub (Najbolje)

#### Korak 1: Kreirajte GitHub nalog
1. Idi na [github.com](https://github.com)
2. Registruj se (besplatno)

#### Korak 2: Kreirajte novi repozitorijum
1. Klikni "New repository" 
2. Ime: `ramadan-app`
3. Klikni "Create repository"

#### Korak 3: Upload kod na GitHub
U terminalu (u ramadan-app folderu):

```bash
git init
git add .
git commit -m "Ramadan app初始化"
git branch -M main
git remote add origin https://github.com/VASE_KORISNICKO_IME/ramadan-app.git
git push -u origin main
```

**Zamenite `VASE_KORISNICKO_IME` sa vašim GitHub username-om!**

#### Korak 4: Deploy na Vercel
1. Idi na [vercel.com](https://vercel.com)
2. Klikni "Sign Up" sa GitHub nalogom
3. Klikni "New Project"
4. Izaberi `ramadan-app` repo
5. Klikni "Deploy"

⏳ Čekaj 2-3 minuta...

✅ **GOTOVO! Dobit ćete link tipa:** `ramadan-app-xyz.vercel.app`

---

### Opcija 2: Direktan Upload (Brže, bez Git-a)

#### Korak 1: Registracija
1. Idi na [vercel.com](https://vercel.com)
2. Registruj se sa email-om

#### Korak 2: Instaliraj Vercel CLI
```bash
npm install -g vercel
```

#### Korak 3: Login
```bash
vercel login
```

Unesi svoj email i potvrdi preko linka koji dobiješ.

#### Korak 4: Deploy
```bash
cd ramadan-app
vercel
```

Odgovori na pitanja:
- **Set up and deploy?** → Yes
- **Which scope?** → Tvoj nalog
- **Link to existing project?** → No
- **Project name?** → ramadan-app
- **Directory?** → ./
- **Override settings?** → No

⏳ Čekaj 2-3 minuta...

✅ **GOTOVO! Link će biti prikazan u terminalu!**

---

## 🎯 Šta sad?

### Testiranje
- Otvorite link na telefonu
- Testirajte swipe (prevlačenje između dana)
- Proverite da li sve radi kako treba

### Deljenje
- Pošaljite link prijateljima
- Možete dodati na početni ekran telefona (kao app)

### Dodavanje gradova
Uredi `src/components/HomeScreen.jsx`, linija ~22:

```javascript
const cities = [
  { name: 'Novi Pazar', offset: 0 },
  { name: 'Beograd', offset: 5 },      // +5 min
  { name: 'Niš', offset: 3 }            // +3 min
];
```

Nakon izmene, ponovo deploy:
```bash
vercel --prod
```

---

## ❓ Problemi?

### "npm nije prepoznat kao komanda"
→ Instalirajte Node.js sa [nodejs.org](https://nodejs.org)

### Port 3000 već zauzet
→ Koristite drugi port:
```bash
PORT=3001 npm start
```

### Build greške
→ Obrišite `node_modules` i ponovo:
```bash
rm -rf node_modules
npm install
```

---

## 📞 Pomoć

Za dodatnu pomoć, pogledajte `README.md` ili kontaktirajte developera.

**Ramadan Kareem! 🌙**
