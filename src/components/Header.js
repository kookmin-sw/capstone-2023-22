import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import mainlogo from '../images/logo.png';

function Header() {
  return (
    <div>
      <Link to="/" style={{textDecoration: "none"}}>
        <div className='Home-header'>
            <img className='Home-logo' alt="logo" src={mainlogo} />
            <div className='Home-header-title'>
            <h2 className='Home-header-title-explanation'>세상의 소소한 문화행복 생활을 즐기다,</h2>
            <h1 className='Home-header-title-name'>세소행</h1>
            </div>
        </div>
      </Link>
      <div className='Home-navigator'>
        <Link to="/about-project" className="focused"><span>프로젝트 소개</span></Link>
        <Link to="/intro-movie" className="focused"><span>소개 영상</span></Link>
        <Link to="/about-team" className="focused"><span>팀원 소개</span></Link>
        <Link to="/exec-guide" className="focused"><span>사용법</span></Link>
      </div>
      <hr className='Div-line'/>
    </div>
  );
}

export default Header;
