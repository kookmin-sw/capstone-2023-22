import React from "react";

import "./Project.css"
import StyledButton from "./StyledButtton";

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
        2022년 10월 29일 발생한 이태원 사건은 사회적으로 큰 충격을 불러일으켰으며, 동시에 "인구밀집"을 중요한 사회적 키워드로 부각시켰습니다. <br />
        <a href="https://www.hani.co.kr/arti/society/society_general/1069820.html">‘이태원 참사’ 트라우마 83%가 2030…또래 희생 충격 컸나</a> <br />
        저희는 이러한 문제점으로부터 '만약 특정 지역의 인구 밀집 정도를 예측할 수 있고, 실제 인구밀집이 발생하는 이유를 확인할 수 있다면 사회적 문제의 해결로도 이어질 수 있지 않을까?'라고 생각하였습니다.
        이러한 인구밀집 현상을 '트렌드'의 측면에서 바라보고, 문화 생활을 즐길 수 있는 장소에 대한 정보를 추가적으로 소비자에게 제공하여 보다 다양한 장소에서 문화생활을 즐길 수 있도록 해당 애플리케이션 서비스를 기획하였습니다.
      </p>
      <h1>기술 스택</h1>
      <p>서비스 개발 과정에서 저희가 사용한 주요 기술 스택은 다음과 같습니다.</p>
      <table>
        <thead><th>PART</th><th>STACKS</th></thead>
        <tr><td>Frontend</td><td><img alt="React Native Logo" src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=black"/></td></tr>
        <tr><td>Backend</td><td><img alt="Spring" src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/></td></tr>
        <tr><td>MLOps</td><td></td></tr>
        <tr><td>Cloud</td><td><img alt="AWS" src="https://img.shields.io/badge/Amazon AWS-232F3E?style=flat-square&logo=amazonaws&logoColor=white"/></td></tr>
      </table>
      <h1>시스템 구조</h1>
      <p>(추가 예정입니다.)</p>
    </div>
  );
}

export default Project;
