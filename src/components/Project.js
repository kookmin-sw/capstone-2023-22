import React from "react";

import "./Project.css"
import StyledButton from "./StyledButtton";

function Project() {
  return (
    <div className="Project">
      <h1>Project Source Code</h1>
      <StyledButton text="Source Code 링크" link="https://github.com/kookmin-sw/capstone-2023-22"/>
      <img alt="github opened issues" src="https://img.shields.io/github/issues-raw/kookmin-sw/capstone-2023-22?style=for-the-badge&color=green" />
      <img alt="github closed issues" src="https://img.shields.io/github/issues-closed-raw/kookmin-sw/capstone-2023-22?style=for-the-badge&color=red" />
      <img alt="github opened pull requests" src="https://img.shields.io/github/issues-pr-raw/kookmin-sw/capstone-2023-22?style=for-the-badge&color=green" />
      <img alt="github closed pull requests" src="https://img.shields.io/github/issues-pr-closed-raw/kookmin-sw/capstone-2023-22?style=for-the-badge&color=red" />
    </div>
  );
}

export default Project;
