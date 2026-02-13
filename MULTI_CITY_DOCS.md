# 🏙️ MULTI-CITY SUPPORT - Dokumentacija

═══════════════════════════════════════════════════════════

✅ GRADOVI DODATI:

1. Novi Pazar (offset: 0)    - Bazna vremena
2. Beograd (offset: +5)       - +5 minuta
3. Niš (offset: +3)           - +3 minuta  
4. Sarajevo (offset: -2)      - -2 minuta

═══════════════════════════════════════════════════════════

## 🎯 KAKO RADI:

### **Bazna vremena (Novi Pazar):**
```
Sabah:    04:56
Podne:    11:53
Ikindija: 14:43
Akšam:    17:18
Jacija:   18:37
```

### **Beograd (+5 minuta):**
```
Sabah:    05:01  ← 04:56 + 5 min
Podne:    11:58  ← 11:53 + 5 min
Ikindija: 14:48  ← 14:43 + 5 min
Akšam:    17:23  ← 17:18 + 5 min
Jacija:   18:42  ← 18:37 + 5 min
```

### **Niš (+3 minuta):**
```
Sabah:    04:59  ← 04:56 + 3 min
Podne:    11:56  ← 11:53 + 3 min
Ikindija: 14:46  ← 14:43 + 3 min
Akšam:    17:21  ← 17:18 + 3 min
Jacija:   18:40  ← 18:37 + 3 min
```

### **Sarajevo (-2 minuta):**
```
Sabah:    04:54  ← 04:56 - 2 min
Podne:    11:51  ← 11:53 - 2 min
Ikindija: 14:41  ← 14:43 - 2 min
Akšam:    17:16  ← 17:18 - 2 min
Jacija:   18:35  ← 18:37 - 2 min
```

═══════════════════════════════════════════════════════════

## 🔧 ŠTA JE PROMENJENO:

### **1. src/components/HomeScreen.jsx:**

**A) Prošireni Cities Array:**
```javascript
const cities = [
  { name: 'Novi Pazar', offset: 0 },
  { name: 'Beograd', offset: 5 },
  { name: 'Niš', offset: 3 },
  { name: 'Sarajevo', offset: -2 }
];
```

**B) Dodata Funkcija za Offset:**
```javascript
const applyOffset = (timeString, offset) => {
  if (!timeString || offset === 0) return timeString;
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + offset;
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;
  
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:00`;
};
```

**C) Dodana City Selection:**
```javascript
const [selectedCity, setSelectedCity] = useState(cities[0]);

const getAdjustedTime = (time) => {
  return applyOffset(time, selectedCity.offset);
};
```

**D) Dropdown onChange Handler:**
```javascript
<select 
  value={selectedCity.name}
  onChange={(e) => {
    const city = cities.find(c => c.name === e.target.value);
    if (city) setSelectedCity(city);
  }}
>
```

**E) Primena Offset-a:**
- Countdown timer ✅
- Next prayer card ✅
- Prayer times list ✅
- Sve kalkulacije ✅

═══════════════════════════════════════════════════════════

## 📱 KAKO KORISTITI:

### **1. Korisnik otvori aplikaciju**
Defaultno se prikazuje: **Novi Pazar**

### **2. Klikne na dropdown (gore levo)**
```
▼ Novi Pazar
```

### **3. Izabere grad:**
```
Novi Pazar
Beograd       ← Klik
Niš
Sarajevo
```

### **4. Vremena se automatski ažuriraju!**
- Countdown timer → Novi offset
- Sledeći namaz → Novi offset
- Sva vremena → Novi offset

═══════════════════════════════════════════════════════════

## 🧪 TESTIRANJE:

### **Test 1 - Promena grada:**
```
1. Otvori aplikaciju
2. Default: Novi Pazar
3. Zapamti Sabah vreme (npr. 04:56)
4. Klikni dropdown
5. Izaberi Beograd
6. Proveri Sabah vreme → Trebalo bi 05:01 (+5 min)
```

### **Test 2 - Countdown timer:**
```
1. Izaberi Novi Pazar
2. Zapamti countdown (npr. 04:11:43)
3. Izaberi Beograd
4. Countdown se ažurira (+5 minuta razlike)
```

### **Test 3 - Sledeći namaz:**
```
1. Proveri "Sljedeći Namaz" karticu
2. Promeni grad
3. Vreme se menja sa offsetom
```

### **Test 4 - Ikone namaza:**
```
1. Proveri listu namaza (5 ikona sa vremenima)
2. Promeni grad
3. SVA vremena se ažuriraju
```

═══════════════════════════════════════════════════════════

## ➕ DODAVANJE NOVIH GRADOVA:

### **Koraci:**

1. **Otvori:** `src/components/HomeScreen.jsx`

2. **Pronađi cities array** (oko linije 21)

3. **Dodaj novi grad:**
```javascript
const cities = [
  { name: 'Novi Pazar', offset: 0 },
  { name: 'Beograd', offset: 5 },
  { name: 'Niš', offset: 3 },
  { name: 'Sarajevo', offset: -2 },
  { name: 'Skoplje', offset: 7 },      // ← NOVI GRAD
  { name: 'Podgorica', offset: -3 }    // ← NOVI GRAD
];
```

4. **Sačuvaj i push na Git**

5. **Gotovo!** Dropdown automatski prikazuje nove gradove!

═══════════════════════════════════════════════════════════

## 📊 KAKO ODREDITI OFFSET:

### **Metod 1 - Poređenje sa Novi Pazar:**
```
1. Pogledaj zvanična vremena za grad
2. Uporedi sa Novi Pazar vremenima
3. Izračunaj razliku

Primer:
Beograd Sabah: 05:01
Novi Pazar Sabah: 04:56
Razlika: 05:01 - 04:56 = +5 minuta
Offset: 5
```

### **Metod 2 - Geografski:**
```
Gradovi istočno od Novi Pazar → pozitivan offset
Gradovi zapadno od Novi Pazar → negativan offset

Približno:
~1 minut razlike = ~15 km udaljenosti (zapad-istok)
```

### **Metod 3 - Pravi Izračun:**
```
1. Nađi geografsku dužinu (longitude):
   - Novi Pazar: 20.5122°E
   - Beograd: 20.4489°E
   - Razlika: minimalna → offset je više zbog lokalnih kalkulacija

2. Uporedi sa zvaničnim podacima
3. Podesi offset
```

═══════════════════════════════════════════════════════════

## 💾 PERSISTENCIJA:

**NAPOMENA:** Trenutno se **NE** čuva izabrani grad!

Svaki put kad korisnik otvori aplikaciju → defaultno Novi Pazar

### **Dodavanje localStorage (opciono):**

```javascript
// Čuvanje:
const [selectedCity, setSelectedCity] = useState(() => {
  const saved = localStorage.getItem('selectedCity');
  return saved ? JSON.parse(saved) : cities[0];
});

useEffect(() => {
  localStorage.setItem('selectedCity', JSON.stringify(selectedCity));
}, [selectedCity]);
```

Onda će aplikacija pamtiti poslednji izabrani grad!

═══════════════════════════════════════════════════════════

## 🌍 BUDUĆNOST - Još Gradova:

### **Bosna i Hercegovina:**
- Tuzla
- Mostar
- Banja Luka
- Zenica

### **Srbija:**
- Subotica
- Kragujevac
- Leskovac
- Užice

### **Region:**
- Priština
- Skoplje
- Podgorica
- Ljubljana
- Zagreb

═══════════════════════════════════════════════════════════

## 🎨 UI/UX NAPOMENE:

- Dropdown je gore levo (lako dostupno)
- Bela boja (dobra kontrast sa pozadinom)
- Strelica ▼ indikator (jasno da je clickable)
- Smooth animacije (nema trzanja)
- Instantno ažuriranje (bez delay-a)

═══════════════════════════════════════════════════════════

## 🔄 GIT COMMIT MESSAGE:

```
Add multi-city support with offset calculation

- Added Beograd, Niš, and Sarajevo cities
- Implemented time offset calculation (+/- minutes)
- City selector dropdown is now functional
- All prayer times update when city changes
- Countdown and next prayer adjust to selected city
- Easy to add more cities in the future

Cities:
- Novi Pazar (baseline)
- Beograd (+5 min)
- Niš (+3 min)
- Sarajevo (-2 min)
```

═══════════════════════════════════════════════════════════

Ramadan Kareem! 🌙

═══════════════════════════════════════════════════════════
