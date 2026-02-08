import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import './styles/App.css';

function App() {
  // Check if user has seen splash today
  const [showSplash, setShowSplash] = useState(() => {
    const lastSplashDate = localStorage.getItem('lastSplashDate');
    const today = new Date().toDateString();
    return lastSplashDate !== today; // Show splash if not seen today
  });

  useEffect(() => {
    if (showSplash) {
      // Show splash for 5 seconds
      const timer = setTimeout(() => {
        setShowSplash(false);
        // Save today's date
        const today = new Date().toDateString();
        localStorage.setItem('lastSplashDate', today);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <div className="app">
      <div className="app-container">
        {showSplash ? <SplashScreen /> : <HomeScreen />}
      </div>
    </div>
  );
}

export default App;
