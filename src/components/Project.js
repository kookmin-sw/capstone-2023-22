import React from "react";

import "./Project.css"
import StyledButton from "./StyledButtton";

import systemStructure from "../images/system-structure.png"

function Project() {
  return (
    <div className="Project">
      <div style={{display: "flex", alignItems: "center"}}>
        <h1>프로젝트 소개</h1>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <StyledButton text="Source Code 링크" link="https://github.com/kookmin-sw/capstone-2023-22"/>
      </div>
      <h2>세소행: "세상의 소소한 문화행복 생활을 즐기다"</h2>
      <p className="main-text">
        지난 이태원 사고 이후로 인구 과밀에 대한 관심은 지속적으로 증가하고 있습니다.
        국내외 전문가들은 ‘인구 과밀로 인한 사고를 막기 위해서는 예측이 중요하다'고 말합니다. <br /><br />
        <a href="https://www.hani.co.kr/arti/society/society_general/1065148.html">과밀이 일상인 서울…위험은 빽빽이 들어차 있다</a> <br /><br />
        이러한 예측이 이루어지려면 인구 혼잡에 대한 정보를 확인할 수 있는 정보가 중요하지만, 현재의 검색 및 장소 정보 제공 플랫폼에서는 인구 혼잡 및 과밀에 대한 정보가 자세하게 제공되지 않고 있습니다.
        이러한 인구밀집 현상을 '트렌드'의 측면에서 바라보고, 문화 생활을 즐길 수 있는 장소에 대한 정보를 소비자에게 제공하여 보다 다양한 장소에서 문화생활을 즐길 수 있도록 해당 애플리케이션 서비스를 기획하였습니다.
      </p>
      <h1>기술 스택</h1>
      <p>서비스 개발 과정에서 저희가 사용한 주요 기술 스택은 다음과 같습니다.</p>
      <table>
        <thead><th>PART</th><th>STACKS</th></thead>
        <tr><td>Frontend</td><td><img alt="React Native Logo" src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"/></td></tr>
        <tr><td>Backend</td><td><img alt="Spring" src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/></td></tr>
        <tr><td>MLOps</td><td><img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/></td></tr>
        <tr><td>Cloud</td><td><img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/></td></tr>
        <tr><td>Data Preprocessing</td><td><a href="https://docs.python.org/3/reference/index.html"><img alt="Python Badge" src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white" /></a>&nbsp;<img alt="Pandas Badge" src="https://img.shields.io/badge/pandas-150458?style=flat-square&logo=pandas&logoColor=white" /></td></tr>
      </table>
      <h1>시스템 구조</h1>
      <p>시스템 구조는 아래 그림과 같습니다.</p>
      <img className="structure-pic" alt="System structure" src={systemStructure} />
    </div>
  );
}

export default Project;
