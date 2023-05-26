import React from "react";

import "./Project.css"
import StyledButton from "./StyledButtton";

import systemStructure from "../images/system-structure.png";
import teamPoster from "../images/team-poster.png";

function Project() {
  return (
    <div className="Project">
      <div style={{display: "flex", alignItems: "center"}}>
        <h1>프로젝트 소개</h1>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <StyledButton text="Source Code 링크" link="https://github.com/kookmin-sw/capstone-2023-22"/>
      </div>
      <img style={{width: "100%"}} alt="team-poster" src={teamPoster}/>
      <h2>세소행: "세상의 소소한 문화행복 생활을 즐기다"</h2>
      <p className="main-text">
        지난 이태원 사고 이후로 인구 과밀에 대한 관심은 지속적으로 증가하고 있습니다.
        국내외 전문가들은 ‘인구 과밀로 인한 사고를 막기 위해서는 예측이 중요하다'고 말합니다. <br /><br />
        <a href="https://www.hani.co.kr/arti/society/society_general/1065148.html">과밀이 일상인 서울…위험은 빽빽이 들어차 있다</a> <br /><br />
        이러한 예측이 이루어지려면 인구 혼잡에 대한 정보를 확인할 수 있는 정보가 중요하지만, 현재의 검색 및 장소 정보 제공 플랫폼에서는 인구 혼잡 및 과밀에 대한 정보가 자세하게 제공되지 않고 있습니다.
        이러한 인구밀집 현상을 '트렌드'의 측면에서 바라보고, 문화 생활을 즐길 수 있는 장소에 대한 정보를 소비자에게 제공하여 보다 다양한 장소에서 문화생활을 즐길 수 있도록 해당 애플리케이션 서비스를 기획하였습니다.
      </p>
      <h1>기술 스택</h1>
      <p>서비스 개발 과정에서 사용한 주요 기술 스택은 다음과 같습니다.</p>
      <h3>Introduction Webpage</h3>
        <p><img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black" /></p>
      <h3>Frontend</h3>
      <p>
        <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" />&nbsp;
        <img alt="React Native" src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black" />&nbsp;
        <img alt="Redux" src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" />&nbsp;
      </p>
      <h3>Backend</h3>
      <p>
        <img alt="Spring" src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white" />&nbsp;
        <img alt="Spring Security" src="https://img.shields.io/badge/Spring Security-6DB33F?style=flat-square&logo=Spring Security&logoColor=white" />&nbsp;
        <img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" />&nbsp;
        <img alt="Github Actions" src="https://img.shields.io/badge/Github Actions-2088FF?style=flat-square&logo=Github Actions&logoColor=white" />&nbsp;
        <img alt="QueryDSL" src="https://img.shields.io/badge/QueryDSL-000000?style=flat-square" />&nbsp;
        <img alt="Mockito" src="https://img.shields.io/badge/Mockito-000000?style=flat-square" />&nbsp;
      </p>
      <h3>MLOps</h3>
      <p>
        <img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>&nbsp;
        <img alt="Pandas" src="https://img.shields.io/badge/pandas-150458?style=flat-square&logo=pandas&logoColor=white" />&nbsp;
        <img alt="Matplotlib" src="https://img.shields.io/badge/Matplotlib-000000?style=flat-square" />&nbsp;
        <img alt="Prophet" src="https://img.shields.io/badge/Prophet-000000?style=flat-square" />&nbsp;
        <img alt="Apache Airflow" src="https://img.shields.io/badge/Apache Airflow-017CEE?style=flat-square&logo=Apache Airflow&logoColor=white" />&nbsp;
      </p>
      <h3>Cloud</h3>
      <p>
        <img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/>&nbsp;
        <img alt="AWS EC2" src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat-square&logo=Amazon EC2&logoColor=white"/>&nbsp;
        <img alt="AWS RDS" src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat-square&logo=Amazon RDS&logoColor=white"/>&nbsp;
        <img alt="AWS S3" src="https://img.shields.io/badge/Amazon S3-569A31?style=flat-square&logo=Amazon S3&logoColor=white"/>&nbsp;
        <img alt="Redshift" src="https://img.shields.io/badge/Redshift-000000?style=flat-square" />&nbsp;
      </p>
      <h3>Data Preprocessing</h3>
      <p>
        <img alt="Python Badge" src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white" />&nbsp;
        <img alt="Pandas" src="https://img.shields.io/badge/pandas-150458?style=flat-square&logo=pandas&logoColor=white" />&nbsp;
      </p>

      <h1>시스템 구조</h1>
      <p>시스템 구조는 아래 그림과 같습니다.</p>
      <img className="structure-pic" alt="System structure" src={systemStructure} />
    </div>
  );
}

export default Project;
