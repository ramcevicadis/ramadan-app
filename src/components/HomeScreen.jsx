import React, { useState, useEffect } from 'react';
import prayerTimesData from '../data/prayerTimes.json';
import specialDaysData from '../data/specialDays.json';
import ayatData from '../data/ayat.json';

const HomeScreen = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [countdown, setCountdown] = useState('');
  const [nextPrayer, setNextPrayer] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [slideDirection, setSlideDirection] = useState('');

  const currentDay = prayerTimesData[currentDayIndex];
  const specialDay = specialDaysData.find(d => d.day === currentDay.day);
  const ayat = ayatData.find(a => a.day === currentDay.day);

  const cities = [
    { name: 'Novi Pazar', offset: 0 },
    { name: 'Beograd', offset: -2 },
    { name: 'Nis', offset: -5 },
    { name: 'Sarajevo', offset: 9 }
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const prayerNames = {
    sabah: 'Sabah',
    podne: 'Podne',
    ikindija: 'Ikindija',
    aksam: 'Aksam',
    jacija: 'Jacija'
  };

  const applyOffset = (timeString, offset) => {
    if (!timeString || offset === 0) return timeString;
    const parts = timeString.split(':');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    const totalMinutes = hours * 60 + minutes + offset;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return String(newHours).padStart(2, '0') + ':' + String(newMinutes).padStart(2, '0') + ':00';
  };

  const getAdjustedTime = (time) => {
    return applyOffset(time, selectedCity.offset);
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const aksam = getAdjustedTime(currentDay.aksam);
      const aksParts = aksam.split(':');
      const akshamTime = new Date(now);
      akshamTime.setHours(parseInt(aksParts[0]), parseInt(aksParts[1]), 0, 0);
      
      let targetTime = null;
      let label = '';

      if (now < akshamTime) {
        targetTime = akshamTime;
        label = 'Iftar u ' + aksam.substring(0, 5);
      } else {
        if (currentDayIndex < prayerTimesData.length - 1) {
          const nextDayData = prayerTimesData[currentDayIndex + 1];
          const nextSabah = getAdjustedTime(nextDayData.sabah);
          const sabParts = nextSabah.split(':');
          const sabH = parseInt(sabParts[0]);
          const sabM = parseInt(sabParts[1]);
          
          targetTime = new Date(now);
          targetTime.setDate(targetTime.getDate() + 1);
          targetTime.setHours(sabH, sabM, 0, 0);
          
          let suhurM = sabM - 10;
          let suhurH = sabH;
          if (suhurM < 0) {
            suhurM = 60 + suhurM;
            suhurH = sabH - 1;
          }
          
          label = 'Suhur u ' + String(suhurH).padStart(2, '0') + ':' + String(suhurM).padStart(2, '0');
        }
      }

      if (targetTime) {
        const diff = targetTime - now;
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'));
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentDayIndex, currentDay, selectedCity]);

  useEffect(() => {
    const updateNextPrayer = () => {
      const now = new Date();
      const prayers = ['sabah', 'podne', 'ikindija', 'aksam', 'jacija'];
      
      for (let i = 0; i < prayers.length; i++) {
        const prayerTime = getAdjustedTime(currentDay[prayers[i]]);
        const parts = prayerTime.split(':');
        const pTime = new Date(now);
        pTime.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
        
        if (pTime > now) {
          setNextPrayer({
            name: prayerNames[prayers[i]],
            time: prayerTime,
            icon: prayers[i],
            label: prayerNames[prayers[i]] + ' u ' + prayerTime.substring(0, 5)
          });
          return;
        }
      }
      
      if (currentDayIndex < prayerTimesData.length - 1) {
        const nextDayData = prayerTimesData[currentDayIndex + 1];
        const nextSabah = getAdjustedTime(nextDayData.sabah);
        setNextPrayer({
          name: prayerNames.sabah,
          time: nextSabah,
          icon: 'sabah',
          label: prayerNames.sabah + ' u ' + nextSabah.substring(0, 5)
        });
      }
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000);
    return () => clearInterval(interval);
  }, [currentDayIndex, currentDay, selectedCity]);

  const getActivePrayer = () => {
    const now = new Date();
    const prayers = ['sabah', 'podne', 'ikindija', 'aksam', 'jacija'];
    
    for (let i = 0; i < prayers.length; i++) {
      const parts = currentDay[prayers[i]].split(':');
      const prayerTime = new Date(now);
      prayerTime.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
      
      if (prayerTime > now) {
        return i > 0 ? prayers[i - 1] : null;
      }
    }
    return 'jacija';
  };

  const activePrayer = getActivePrayer();

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setSlideDirection('slide-right');
      setTimeout(() => {
        setCurrentDayIndex(currentDayIndex - 1);
        setSlideDirection('');
      }, 50);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < prayerTimesData.length - 1) {
      setSlideDirection('slide-left');
      setTimeout(() => {
        setCurrentDayIndex(currentDayIndex + 1);
        setSlideDirection('');
      }, 50);
    }
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    
    if (distance > minSwipeDistance) {
      goToNextDay();
    } else if (distance < -minSwipeDistance) {
      goToPreviousDay();
    }
  };

  const getPrayerIcon = (prayer, isActive) => {
    const iconMap = {
      sabah: isActive ? 'sabah_on.png' : 'sabah_of.png',
      podne: isActive ? 'podne_on.png' : 'podne_off.png',
      ikindija: isActive ? 'ikindija_on.png' : 'ikindija_off.png',
      aksam: isActive ? 'aksam_onn.png' : 'aksam_offf.png',
      jacija: isActive ? 'jacija_on.png' : 'jacija_off.png'
    };
    return process.env.PUBLIC_URL + '/images/' + iconMap[prayer];
  };

  return (
    <div
      className={'home-screen swipeable ' + slideDirection}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="home-header">
        <div className="city-selector">
          <span>▼</span>
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const city = cities.find(c => c.name === e.target.value);
              if (city) setSelectedCity(city);
            }}
          >
            {cities.map(city => (
              <option key={city.name} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
        <button className="info-button" onClick={() => setShowInfoModal(true)}>
          ℹ️
        </button>
      </div>

      <div
        className="countdown-card"
        style={{ backgroundImage: 'url(' + process.env.PUBLIC_URL + '/images/ramadan_pozadina.png)' }}
      >
        <div className="countdown-timer">{countdown}</div>
        <div className="countdown-label">Ucitavanje...</div>
      </div>

      <div className="date-navigation">
        <button className="nav-arrow" onClick={goToPreviousDay} disabled={currentDayIndex === 0}>
          ◀
        </button>
        <div className="date-info">
          <div className="current-date">{currentDay.dayName}</div>
          <div className="ramadan-progress">
            <span className="progress-text">{currentDay.day} / 30</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: (currentDay.day / 30 * 100) + '%' }} />
            </div>
          </div>
          <div className="full-date">Novi Pazar {currentDay.date}</div>
        </div>
        <button className="nav-arrow" onClick={goToNextDay} disabled={currentDayIndex === prayerTimesData.length - 1}>
          ▶
        </button>
      </div>

      {specialDay && (
        <div className="special-day-banner">
          🌙 {specialDay.event}
        </div>
      )}

      {nextPrayer && (
        <div className="next-prayer-card">
          <div className="prayer-icon-large">
            <img src={getPrayerIcon(nextPrayer.icon, true)} alt={nextPrayer.name} />
          </div>
          <div className="prayer-info">
            <div className="prayer-label">Sljedeci Namaz</div>
            <div className="prayer-name-time">
              {nextPrayer.name} <span className="prayer-time-large">{nextPrayer.time.substring(0, 5)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="prayer-times-list">
        {['sabah', 'podne', 'ikindija', 'aksam', 'jacija'].map(prayer => (
          <div key={prayer} className={'prayer-item ' + (activePrayer === prayer ? 'active' : '')}>
            <div className="prayer-icon">
              <img src={getPrayerIcon(prayer, activePrayer === prayer)} alt={prayerNames[prayer]} />
            </div>
            <div className="prayer-name">{prayerNames[prayer]}</div>
            <div className="prayer-time">{getAdjustedTime(currentDay[prayer]).substring(0, 5)}</div>
          </div>
        ))}
      </div>

      {ayat && (
        <div className="ayat-card">
          <div className="ayat-label">Ajet Dana</div>
          <div className="ayat-text">"{ayat.text}"</div>
          <div className="ayat-reference">{ayat.reference}</div>
        </div>
      )}

      {showInfoModal && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">ℹ️ Informacija</div>
            <div className="modal-body">
              Bajram namaz ce se klanjati u petak 20. Marta 06:21h
            </div>
            <button className="modal-close" onClick={() => setShowInfoModal(false)}>
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
