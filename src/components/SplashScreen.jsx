import React from 'react';

const SplashScreen = () => {
  return (
    <div 
      className="splash-screen"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/gazilar2.png)`,
        backgroundSize: 'cover',      // ← DODAJ OVO
        backgroundPosition: 'center', // ← DODAJ OVO
        backgroundRepeat: 'no-repeat' // ← DODAJ OVO
      }}
    >
      <div className="splash-sponsors">
        <img src={`${process.env.PUBLIC_URL}/images/logoi_beli.png`} alt="Sponsors" />
        {/* ↑ ISPRAVLJENO: bilo src=` sada src={ */}
      </div>
      
      <img 
        src={`${process.env.PUBLIC_URL}/images/123.png`}
        {/* ↑ ISPRAVLJENO: bilo src=` sada src={ */}
        alt="Ramadan Kareem" 
        className="splash-logo"
      />
      
      <div className="splash-footer">
        Novi Pazar, februar 2026 god
      </div>
    </div>
  );
};

export default SplashScreen;
