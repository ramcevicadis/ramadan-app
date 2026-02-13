import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import './styles/App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 5 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        {showSplash ? <SplashScreen /> : <HomeScreen />}
      </div>
    </div>
  );
}

export default App;
