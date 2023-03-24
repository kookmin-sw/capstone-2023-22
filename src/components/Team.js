import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import StyledButton from "./StyledButtton";

import "./Team.css";

function PersonInfo( { image, name, sn, githubLink, part, message } ) {
  return (
    <div style={{display: "flex", flexDirection: "row"}}>
      <img className="Profile-image" alt={`${name}'s profile`} src={image} />
      <div className="Person-info">
        <div className="Person-info-main">
          <div className="Person-represent">{name} ({sn})</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <StyledButton text="Github" link={githubLink}/>
        </div>
        <div className="Person-details-part">{part}</div>
        <blockquote className="Person-details-quote"><ReactMarkdown children={message} /></blockquote>
      </div>
    </div>
    );
}

function Team() {
  return (
    <div className="Team">
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/97018331?v=4"
        name="김진재"
        sn="****2648"
        githubLink="https://github.com/jin-jae"
        part="팀장, 디자인(기획), Frontend"
        message={`안녕하세요, 다양성의 가치를 추구하는 개발자 **김진재**입니다.

넓고 깊은 **탐색가의 삶**을 지향합니다 :)`}
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/66306573?v=4"
        name="김유진"
        sn="****3044"
        githubLink="https://github.com/yuujinkim"
        part="Backend (Logic)"
        message={`안녕하세요. 꾸준한 학습과 성장을 추구하는 김유진입니다. 함께 성장해가는 개발 문화를 지향합니다.`}
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/79959576?v=4"
        name="박세열"
        sn="****2648"
        githubLink="https://github.com/SeYeol00"
        part="Backend (Security, Infrastructure)"
        message={`안녕하세요, 박세열입니다.`}
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/105899098?v=4"
        name="이상현"
        sn="****1665"
        githubLink="https://github.com/Halfmbbn"
        part="Frontend"
        message={`안녕하세요. 기초가 튼튼한 개발자를 꿈꾸는 이상현입니다.`}
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/80037682?v=4"
        name="평선호"
        sn="****1703"
        githubLink="https://github.com/sunho1999"
        part="MLOps"
        message={`현재 99년생 18학번 소프트웨어학부 재학중인 평선호 라고 합니다.

**배우는것을 공유하고 나누는것**이 **공부의 이상**이라 생각합니다.

감사합니다 :-)`}
      />
    </div>
  );
}

export default Team;
