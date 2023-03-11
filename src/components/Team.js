import React from "react";
import StyledButton from "./StyledButtton";

import "./Team.css";

function PersonInfo( { image, name, sn, githubLink, part } ) {
  return (
    <div className="Person-info">
      <img className="Profile-image" alt={`${name}'s profile`} src={image} />
      <div className="Person-name">{name}</div>
      <div className="Person-details">
        <div className="Person-details-self">{sn}</div>
        <div className="Person-details-self"><StyledButton text="Github" link={githubLink}/></div>
        <div className="Person-details-self">{part}</div>
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
        part="팀장, 디자인, Frontend"
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/66306573?v=4"
        name="김유진"
        sn="****3044"
        githubLink="https://github.com/yuujinkim"
        part="Backend (Logic)"
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/79959576?v=4"
        name="박세열"
        sn="****2648"
        githubLink="https://github.com/SeYeol00"
        part="Backend
        (Security, Infrastructure)"
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/105899098?v=4"
        name="이상현"
        sn="****1665"
        githubLink="https://github.com/Halfmbbn"
        part="Frontend"
      />
      <PersonInfo
        image="https://avatars.githubusercontent.com/u/80037682?v=4"
        name="평선호"
        sn="****1703"
        githubLink="https://github.com/sunho1999"
        part="AI"
      />
    </div>
  );
}

export default Team;
