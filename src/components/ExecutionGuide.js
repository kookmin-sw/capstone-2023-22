import React from 'react';

import "./ExecutionGuide.css";


function ExecutionGuide() {
  return (
    <div className="user-guide">
      <h1>사용법</h1>
      <blockquote className="message-quote">전체 프로젝트의 실행에는 각 Part 에서 .gitignore 처리된 API Key 등 민감정보가 포한된 파일이 필요합니다.</blockquote>
      <h2>Frontend</h2>
      <p>
        <ol>
          <li>Project Directory 를 clone 합니다.</li>
          <li>clone 한 폴더의 경로에 접근하여 <code className="code">npm start</code> 를 실행합니다.</li>
        </ol>
      </p>
      <h2>Backend</h2>
      <p>
        <ol>
          <li>Project Directory 를 clone 합니다.</li>
        </ol>
      </p>
      <h2>MLOps</h2>
      <p>
        <ol>
          <li>Project Directory 를 clone 합니다.</li>
        </ol>
      </p>
    </div>
  );
}

export default ExecutionGuide;
