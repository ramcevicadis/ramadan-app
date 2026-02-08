# 🌙 Ramadan Kareem Web App

Moderna web aplikacija za praćenje vremena namaza tokom Ramazana.

## ✨ Funkcionalnosti

- ✅ Splash screen sa automatskim prelaskom (5 sekundi)
- ✅ Live countdown do iftara/suhura
- ✅ Navigacija između dana (strelice + swipe na mobilnom)
- ✅ Progress bar Ramazana (dan/ukupno)
- ✅ Prikaz mubarek dana i noći (Džuma, Lejletul-kadr, itd.)
- ✅ Sledeći namaz sa countdown-om
- ✅ Ikone namaza (aktivni = pun, ostali = outline)
- ✅ Ajet dana
- ✅ Info modal sa informacijom o Bajram namazu
- ✅ Izbor gradova (spremno za proširenje)
- ✅ Potpuno responsive dizajn

## 🚀 Pokretanje lokalno

### Preduslov
- Node.js instaliran na računaru (https://nodejs.org/)

### Koraci

1. **Navigiraj u folder projekta:**
```bash
cd ramadan-app
```

2. **Instaliraj zavisnosti:**
```bash
npm install
```

3. **Pokreni development server:**
```bash
npm start
```

4. **Otvori browser:**
   - Aplikacija će se automatski otvoriti na `http://localhost:3000`

## 📦 Deploy na Vercel

### Opcija 1: Preko GitHub (preporučeno)

1. **Push projekat na GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/KORISNICKO_IME/ramadan-app.git
git push -u origin main
```

2. **Deploy na Vercel:**
   - Idi na [vercel.com](https://vercel.com)
   - Klikni "New Project"
   - Importuj GitHub repo
   - Vercel će automatski detektovati React app
   - Klikni "Deploy"

### Opcija 2: Vercel CLI

1. **Instaliraj Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd ramadan-app
vercel
```

4. **Prati upute i potvrdi build settings:**
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

## 🏙️ Dodavanje novih gradova

Za dodavanje novih gradova, uredi `src/components/HomeScreen.jsx`:

```javascript
const cities = [
  { name: 'Novi Pazar', offset: 0 },
  { name: 'Beograd', offset: 5 },      // +5 minuta
  { name: 'Niš', offset: 3 },          // +3 minuta
  { name: 'Sarajevo', offset: -2 }     // -2 minuta
];
```

Offset se automatski dodaje/oduzima od baznih vremena (Novi Pazar).

## 📁 Struktura projekta

```
ramadan-app/
├── public/
│   ├── images/           # Sve slike i ikone
│   └── index.html
├── src/
│   ├── components/
│   │   ├── SplashScreen.jsx
│   │   └── HomeScreen.jsx
│   ├── data/
│   │   ├── prayerTimes.json   # Vremena namaza (30 dana)
│   │   ├── specialDays.json    # Mubarek dani
│   │   └── ayat.json          # Ajeti
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Customizacija

### Promena vremena Bajram namaza
Uredi `src/components/HomeScreen.jsx`, linija sa modalом:

```javascript
Bajram namaz će se klanjati u petak 20. Marta 06:21h
```

### Promena splash screen trajanja
Uredi `src/App.jsx`:

```javascript
setTimeout(() => {
  setShowSplash(false);
}, 5000); // 5000ms = 5 sekundi
```

## 📱 Testiranje

### Desktop
- Chrome, Firefox, Safari, Edge

### Mobile
- iOS Safari
- Android Chrome
- Responsive design testiran na raznim rezolucijama

## 🛠️ Tehnologije

- React 18
- CSS3 (Animations, Gradients, Backdrop Filter)
- Touch Events (Swipe gestures)
- Responsive Design

## 📞 Podrška

Za pitanja i pomoć, kontaktirajte autora.

---

**Ramadan Kareem! 🌙**
# ramadan-app
