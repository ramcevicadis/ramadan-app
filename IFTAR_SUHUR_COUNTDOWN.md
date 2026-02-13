# ⏱️ IFTAR/SUHUR COUNTDOWN - Dokumentacija

═══════════════════════════════════════════════════════════

✅ NOVA LOGIKA IMPLEMENTIRANA!

Countdown timer sada odbrojava SAMO za:
1. 🌙 Iftar (Akšam vreme)
2. 🌅 Suhur (10 minuta prije Sabah vremena)

═══════════════════════════════════════════════════════════

## 🎯 KAKO RADI:

### **PRIJE Akšam-a (Iftara):**

```
Trenutno vrijeme: 10:00
Akšam (Iftar): 17:18

📱 PRIKAZ:
┌─────────────────────────┐
│   07:18:00              │ ← Countdown
│   Iftar u 17:18         │ ← Label
└─────────────────────────┘
```

### **POSLIJE Akšam-a (Iftara):**

```
Trenutno vrijeme: 20:00
Sutrašnji Sabah: 04:56
Suhur: 04:46 (10 min prije Sabah-a)

📱 PRIKAZ:
┌─────────────────────────┐
│   08:46:00              │ ← Countdown
│   Suhur u 04:46         │ ← Label
└─────────────────────────┘
```

═══════════════════════════════════════════════════════════

## 📊 RANIJE vs SADA:

### **RANIJE (loše):**

Odbrojava za SVE namaze:

```
08:00 → Countdown do Podne    ❌
13:00 → Countdown do Ikindija  ❌
15:00 → Countdown do Akšam     ✅ (ovo je OK)
18:00 → Countdown do Jacija    ❌
19:00 → Countdown do Sabah     ✅ (ovo je OK)
```

**PROBLEM:** 
- Korisnika ne zanima Podne, Ikindija, Jacija
- Samo Iftar i Suhur su relevantni za post!

---

### **SADA (dobro):**

Odbrojava SAMO za Iftar i Suhur:

```
08:00 → Countdown do Iftar (Akšam)  ✅
13:00 → Countdown do Iftar (Akšam)  ✅
15:00 → Countdown do Iftar (Akšam)  ✅
18:00 → Countdown do Suhur (Sabah)  ✅
19:00 → Countdown do Suhur (Sabah)  ✅
00:00 → Countdown do Suhur (Sabah)  ✅
04:00 → Countdown do Suhur (Sabah)  ✅
05:00 → Countdown do Iftar (Akšam)  ✅ (novi dan!)
```

**RJEŠENJE:** 
- Samo 2 stanja: prije Iftara ili poslije
- Uvijek relevantan countdown!

═══════════════════════════════════════════════════════════

## 🔧 TEHNIČKA IMPLEMENTACIJA:

### **Stara logika:**

```javascript
// Prolazi kroz SVE namaze
const prayers = [
  { name: 'Sabah', ... },
  { name: 'Podne', ... },    // ❌ Ne treba
  { name: 'Ikindija', ... }, // ❌ Ne treba
  { name: 'Akšam', ... },
  { name: 'Jacija', ... }    // ❌ Ne treba
];

// Pronalazi PRVI sledeći namaz
for (const prayer of prayers) {
  if (prayerTime > now) {
    nextPrayer = prayer;
    break;
  }
}
```

---

### **Nova logika:**

```javascript
// SAMO Akšam i Sabah!
const aksam = getAdjustedTime(currentDay.aksam);

// Ako je PRIJE Akšam-a
if (now < akshamTime) {
  // Countdown do IFTAR-a
  targetTime = akshamTime;
  label = `Iftar u ${aksam.substring(0, 5)}`;
}
// Ako je POSLIJE Akšam-a
else {
  // Countdown do SUHUR-a (sutra)
  const nextSabah = getAdjustedTime(nextDayData.sabah);
  targetTime = nextDayTime;
  label = `Suhur u ${suhurTime}`;
}
```

═══════════════════════════════════════════════════════════

## ⏰ SUHUR KALKULACIJA:

**Suhur je ~10 minuta PRIJE Sabah-a**

### **Primjeri:**

| Sabah | Suhur |
|-------|-------|
| 04:56 | 04:46 |
| 05:10 | 05:00 |
| 04:05 | 03:55 |
| 04:00 | 03:50 |

### **Kod:**

```javascript
const suhurMinutes = parseInt(sabMin) - 10;

// Handle negative minutes (npr. 04:05 - 10 min = 03:55)
const suhurHours = suhurMinutes < 0 ? parseInt(sabHours) - 1 : sabHours;
const adjustedSuhurMin = suhurMinutes < 0 ? 60 + suhurMinutes : suhurMinutes;

label = `Suhur u ${String(suhurHours).padStart(2, '0')}:${String(adjustedSuhurMin).padStart(2, '0')}`;
```

═══════════════════════════════════════════════════════════

## 📱 PRIKAZ NA EKRANU:

### **Countdown kartica:**

```
┌─────────────────────────────────┐
│ [Slika oca i sina]              │
│                                 │
│       07:18:43                  │ ← Countdown
│       Iftar u 17:18             │ ← Label
│                                 │
└─────────────────────────────────┘
```

**Label format:**
- `"Iftar u 17:18"` - prije Akšam-a
- `"Suhur u 04:46"` - poslije Akšam-a

---

### **Sledeći namaz kartica:**

```
┌─────────────────────────────────┐
│ 🌙  Sljedeći Namaz              │
│                                 │
│     Akšam 17:18                 │ ← Prije Iftar-a
│                                 │
└─────────────────────────────────┘
```

ILI:

```
┌─────────────────────────────────┐
│ 🌅  Sljedeći Namaz              │
│                                 │
│     Sabah 04:56                 │ ← Poslije Iftar-a
│                                 │
└─────────────────────────────────┘
```

═══════════════════════════════════════════════════════════

## 🧪 TESTIRANJE:

### **Test 1 - Jutro (prije Iftar-a):**

```
Vrijeme: 10:00
Akšam: 17:18

Očekivano:
✅ Countdown: 07:18:00 (ili manje kako vrijeme prolazi)
✅ Label: "Iftar u 17:18"
✅ Next prayer: Akšam ikona
```

---

### **Test 2 - Veče (poslije Iftar-a):**

```
Vrijeme: 20:00
Sutrašnji Sabah: 04:56

Očekivano:
✅ Countdown: 08:56:00 (ili manje)
✅ Label: "Suhur u 04:46"
✅ Next prayer: Sabah ikona
```

---

### **Test 3 - Promjena dana (midnight):**

```
Vrijeme: 23:59
Sutrašnji Sabah: 04:56

Countdown: 04:57:00

Poslije 1 minut (00:00):
✅ Isti countdown (sad je danas Sabah)
✅ Label: "Suhur u 04:46"
```

---

### **Test 4 - Poslije Suhur-a, prije Iftar-a:**

```
Vrijeme: 07:00 (poslije Sabah-a 04:56)
Akšam: 17:18

Očekivano:
✅ Countdown: 10:18:00
✅ Label: "Iftar u 17:18"
✅ Next prayer: Akšam ikona
```

═══════════════════════════════════════════════════════════

## 🌍 PODRŠKA ZA MULTI-CITY:

**Offset automatski primjenjen!**

### **Novi Pazar:**
```
Akšam: 17:18
Sabah: 04:56
Suhur: 04:46
```

### **Beograd (offset +5):**
```
Akšam: 17:23 (+5 min)
Sabah: 05:01 (+5 min)
Suhur: 04:51 (+5 min)
```

**Countdown automatski koristi adjusted vrijeme!**

═══════════════════════════════════════════════════════════

## 🎨 IKONE:

### **Iftar periode:**
```
🌙 Akšam ikona (mjesec)
```

### **Suhur periode:**
```
🌅 Sabah ikona (sunce)
```

═══════════════════════════════════════════════════════════

## 🔄 CIKLUS TOKOM DANA:

```
00:00 → Suhur countdown  🌅
01:00 → Suhur countdown  🌅
02:00 → Suhur countdown  🌅
03:00 → Suhur countdown  🌅
04:00 → Suhur countdown  🌅
04:56 → Sabah (počinje post)
05:00 → Iftar countdown  🌙
06:00 → Iftar countdown  🌙
...
17:00 → Iftar countdown  🌙
17:18 → Akšam (Iftar!)
18:00 → Suhur countdown  🌅
19:00 → Suhur countdown  🌅
20:00 → Suhur countdown  🌅
...
23:00 → Suhur countdown  🌅
```

**Ciklus:**
1. Poslije Akšam-a → Countdown do Suhur-a
2. Poslije Sabah-a → Countdown do Iftar-a
3. Repeat za 30 dana!

═══════════════════════════════════════════════════════════

## 📝 GIT COMMIT MESSAGE:

```
Change countdown to only Iftar and Suhur

- Countdown now only shows for Iftar (Aksam) and Suhur (Sabah)
- Before Aksam: countdown to Iftar with "Iftar u XX:XX" label
- After Aksam: countdown to next day Suhur with "Suhur u XX:XX"
- Suhur time calculated as 10 minutes before Sabah
- Removed countdowns for Podne, Ikindija, and Jacija
- Multi-city offset support maintained
- Cleaner user experience focused on fasting times
```

═══════════════════════════════════════════════════════════

## ✅ REZULTAT:

**PRIJE:**
❌ Countdown za 5 namaza (confusing)
❌ Korisnik vidi Podne, Ikindija countdown
❌ Nije fokusirano na post

**SADA:**
✅ Countdown samo za Iftar i Suhur
✅ Uvijek relevantan za post
✅ Čist, fokusiran UX
✅ Lako razumljiv

═══════════════════════════════════════════════════════════

Ramadan Kareem! 🌙

═══════════════════════════════════════════════════════════
