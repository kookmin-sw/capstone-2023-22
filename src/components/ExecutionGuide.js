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
          <li>clone 한 폴더의 경로에 접근하여 <code className="code">expo start -c</code> 를 실행합니다.</li>
          <li><code className="code">npm install</code> 명령어를 통해 필요한 라이브러리를 설치합니다.</li>
        </ol>
      </p>
      <h2>Backend</h2>
      <p>
        <ol>
          <li>Project Directory 를 clone 합니다.</li>
          <li>clone 한 폴더의 경로에 접근하여 <code className="code">gradlew.bat</code> <code className="code">gradlew build</code> 명령어를 실행합니다.</li>
          <li>빌드가 완료되면 ./libs/dir 에 접근하여 jar 확장자 파일을 찾고, <code className="code">java -jar filename.jar</code>를 통해 실행합니다. </li>
        </ol>
      </p>
      <h2>MLOps</h2>
      <p>
        <ol>
          <li>Project Directory 를 clone 합니다.</li>
          <li>실행하고자 하는 기능의 폴더 내에 있는 .py 파일을 실행합니다. (적재 자동화)</li>
        </ol>
      </p>
    </div>
  );
}

export default ExecutionGuide;
