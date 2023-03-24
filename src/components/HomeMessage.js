import React from 'react';

import "./HomeMessage.css";
import mainLogo from '../images/logo.png'


function HomeMessage() {
  return (
    <div className='Main-message'>
      <img style={{height: "50vmin", borderRadius: "2rem", marginTop: "1rem"}} alt="sesohaeng-logo" src={mainLogo} />
      <h1>"세상의 소소한 문화행복 생활을 즐기다, 세소행"</h1>
    </div>
  );
}

export default HomeMessage;
