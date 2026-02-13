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

  // Get current day data
  const currentDay = prayerTimesData[currentDayIndex];
  const specialDay = specialDaysData.find(d => d.day === currentDay.day);
  const ayat = ayatData.find(a => a.day === currentDay.day);

  // Cities data
  const cities = [
    { name: 'Novi Pazar', offset: 0 },
    { name: 'Beograd', offset: 5 },      // +5 minuta
    { name: 'Niš', offset: 3 },          // +3 minuta
    { name: 'Sarajevo', offset: -2 }     // -2 minuta
  ];
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  // Apply offset to prayer time
  const applyOffset = (timeString, offset) => {
    if (!timeString || offset === 0) return timeString;
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + offset;
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    
    return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:00`;
  };

  // Get adjusted prayer times with offset
  const getAdjustedTime = (time) => {
    return applyOffset(time, selectedCity.offset);
  };

  // Calculate countdown and next prayer (ONLY Iftar and Suhur)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      
      // Get Aksam (Iftar) time for today
      const aksam = getAdjustedTime(currentDay.aksam);
      const [aksHours, aksMin] = aksam.split(':');
      const akshamTime = new Date(now);
      akshamTime.setHours(parseInt(aksHours), parseInt(aksMin), 0, 0);

      let targetTime = null;
      let label = '';
      let nextPrayerData = null;

      // If BEFORE Aksam today -> countdown to IFTAR
      if (now < akshamTime) {
        targetTime = akshamTime;
        label = `Iftar u ${aksam.substring(0, 5)}`;
        nextPrayerData = { name: 'Akšam', time: aksam, icon: 'aksam' };
      } 
      // If AFTER Aksam -> countdown to next day SUHUR
      else {
        if (currentDayIndex < prayerTimesData.length - 1) {
          const nextDayData = prayerTimesData[currentDayIndex + 1];
          const nextSabah = getAdjustedTime(nextDayData.sabah);
          const [sabHours, sabMin] = nextSabah.split(':');
          targetTime = new Date(now);
          targetTime.setDate(targetTime.getDate() + 1);
          targetTime.setHours(parseInt(sabHours), parseInt(sabMin), 0, 0);
          
          // Suhur is ~10 minutes before Sabah
          const suhurMinutes = parseInt(sabMin) - 10;
          const suhurHours = suhurMinutes < 0 ? parseInt(sabHours) - 1 : sabHours;
          const adjustedSuhurMin = suhurMinutes < 0 ? 60 + suhurMinutes : suhurMinutes;
          
          label = `Suhur u ${String(suhurHours).padStart(2, '0')}:${String(adjustedSuhurMin).padStart(2, '0')}`;
          nextPrayerData = { name: 'Sabah', time: nextSabah, icon: 'sabah' };
        }
      }

      if (targetTime) {
        const diff = targetTime - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        
        if (nextPrayerData) {
          setNextPrayer({
            ...nextPrayerData,
            label
          });
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [currentDayIndex, currentDay, selectedCity]);

  // Get active prayer
  const getActivePrayer = () => {
    const now = new Date();
    const prayers = ['sabah', 'podne', 'ikindija', 'aksam', 'jacija'];
    
    for (let i = 0; i < prayers.length; i++) {
      const [hours, minutes] = currentDay[prayers[i]].split(':');
      const prayerTime = new Date(now);
      prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      if (prayerTime > now) {
        return i > 0 ? prayers[i - 1] : null;
      }
    }
    return 'jacija'; // After last prayer
  };

  const activePrayer = getActivePrayer();

  // Navigation handlers
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

  // Touch handlers for swipe
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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextDay();
    } else if (isRightSwipe) {
      goToPreviousDay();
    }
  };

  // Prayer icons map
  const getPrayerIcon = (prayer, isActive) => {
    const iconMap = {
      sabah: isActive ? 'sabah_on.png' : 'sabah_of.png',
      podne: isActive ? 'podne_on.png' : 'podne_off.png',
      ikindija: isActive ? 'ikindija_on.png' : 'ikindija_off.png',
      aksam: isActive ? 'aksam_onn.png' : 'aksam_offf.png',
      jacija: isActive ? 'jacija_on.png' : 'jacija_off.png'
    };
    return `${process.env.PUBLIC_URL}/images/${iconMap[prayer]}`;
  };

  const prayerNames = {
    sabah: 'Sabah',
    podne: 'Podne',
    ikindija: 'Ikindija',
    aksam: 'Akšam',
    jacija: 'Jacija'
  };

  return (
    <div 
      className={`home-screen swipeable ${slideDirection}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
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

      {/* Main Countdown Card */}
      <div 
        className="countdown-card"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/ramadan_pozadina.png)`
        }}
      >
        <div className="countdown-timer">{countdown}</div>
        <div className="countdown-label">
          {nextPrayer ? nextPrayer.label : 'Učitavanje...'}
        </div>
      </div>

      {/* Date Navigation */}
      <div className="date-navigation">
        <button 
          className="nav-arrow" 
          onClick={goToPreviousDay}
          disabled={currentDayIndex === 0}
        >
          ◀
        </button>
        
        <div className="date-info">
          <div className="current-date">
            {currentDay.dayName}
          </div>
          <div className="ramadan-progress">
            <span className="progress-text">{currentDay.day} / 30</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(currentDay.day / 30) * 100}%` }}
              />
            </div>
          </div>
          <div className="full-date">
            Novi Pazar {currentDay.date}
          </div>
        </div>
        
        <button 
          className="nav-arrow" 
          onClick={goToNextDay}
          disabled={currentDayIndex === prayerTimesData.length - 1}
        >
          ▶
        </button>
      </div>

      {/* Special Day Banner */}
      {specialDay && (
        <div className="special-day-banner">
          🌙 {specialDay.event}
        </div>
      )}

      {/* Next Prayer Card */}
      {nextPrayer && (
        <div className="next-prayer-card">
          <div className="prayer-icon-large">
            <img src={getPrayerIcon(nextPrayer.icon, true)} alt={nextPrayer.name} />
          </div>
          <div className="prayer-info">
            <div className="prayer-label">Sljedeći Namaz</div>
            <div className="prayer-name-time">
              {nextPrayer.name} <span className="prayer-time-large">{nextPrayer.time.substring(0, 5)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Prayer Times List */}
      <div className="prayer-times-list">
        {['sabah', 'podne', 'ikindija', 'aksam', 'jacija'].map(prayer => (
          <div 
            key={prayer} 
            className={`prayer-item ${activePrayer === prayer ? 'active' : ''}`}
          >
            <div className="prayer-icon">
              <img 
                src={getPrayerIcon(prayer, activePrayer === prayer)} 
                alt={prayerNames[prayer]} 
              />
            </div>
            <div className="prayer-name">{prayerNames[prayer]}</div>
            <div className="prayer-time">{getAdjustedTime(currentDay[prayer]).substring(0, 5)}</div>
          </div>
        ))}
      </div>

      {/* Ayat of the Day */}
      {ayat && (
        <div className="ayat-card">
          <div className="ayat-label">Ajet Dana</div>
          <div className="ayat-text">"{ayat.text}"</div>
          <div className="ayat-reference">{ayat.reference}</div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              ℹ️ Informacija
            </div>
            <div className="modal-body">
              Bajram namaz će se klanjati u petak 20. Marta 06:21h
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
