# WH:ILE, 챌린지 SNS
![logo](https://github.com/C-dtd/gyer-u/assets/129096109/93ba1eb4-cb7f-477c-bb6d-03c9e0774eda)


## 👀 서비스 소개
* 서비스명: 일일 챌린지 현황 공유 SNS 및 챌린지 주제 추천
* 서비스설명: <br>
같은 챌린지 주제 안에서 각자의 일일 현황을 공유하고 정보를 교환하거나 서로 독려하는 sns 시스템<br>
사용자가 작성하는 글을 기반으로 사용자의 관심사 파악, 관련된 챌린지 주제를 추천
<br>

## 📅 프로젝트 기간
2022.06.07 ~ 2022.07.11 (5주)
<br>

## ⭐ 주요 기능
* 사용자 회원가입, 로그인, 사용자간 팔로우 기능
* 하루 한번 참여하는 챌린지에 인증글 작성, 인증 내역 한눈에 보기
* 자신, 다른 사용자가 작성한 게시글 모아보기, 게시글 댓글 작성
* 벡터임베딩과 코사인 유사도를 이용해 사용자가 작성한 글을 기반으로 챌린지 주제 추천, 검색어와 관련도 높은 순 검색
* 서버 용량을 위해 연산용 서버와 이미지 저장용 서버 분리
<br>

## ⛏ 기술스택
<table>
    <tr>
        <th>구분</th>
        <th>내용</th>
    </tr>
    <tr>
        <td>사용언어</td>
        <td>
            <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white"/>
            <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"/>
            <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
            <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>개발도구</td>
        <td>
            <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=VisualStudioCode&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>서버환경</td>
        <td>
            <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>데이터베이스</td>
        <td>
            <img src="https://img.shields.io/badge/Oracle 11g-F80000?style=for-the-badge&logo=Oracle&logoColor=white"/>
            <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white"/>
            <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
        </td>
    </tr>
    <tr>
        <td>협업도구</td>
        <td>
            <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
            <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/>
        </td>
    </tr>
</table>


<br>

## ⚙ 시스템 아키텍처(구조) 예시 
![시스템 아키텍쳐](https://github.com/C-dtd/gyer-u/assets/129096109/48358227-fbc2-410d-b640-9c57110f6003)
<br>

## 📌 SW유스케이스
![image](https://github.com/C-dtd/gyer-u/assets/129096109/b04960ad-0df4-48da-837b-24c5d80914b3)
<br>

## 📌 서비스 흐름도
![서비스 흐름도](https://github.com/C-dtd/gyer-u/assets/129096109/7444a719-716e-4b6f-ab85-690ab788371b)
<br>

## 📌 ER다이어그램
![image](https://github.com/C-dtd/gyer-u/assets/129096109/86334def-5dff-43ac-aa99-8dcf12ab8e3b)
<br>

## 🖥 화면 구성

### 로그인, 회원가입 페이지
![image](https://github.com/C-dtd/gyer-u/assets/129096109/13908da5-b483-48a4-b83f-df2c267d199d)
![image](https://github.com/C-dtd/gyer-u/assets/129096109/496bbc27-a778-4539-b19d-88156d9a619a)
<br>
### 메인페이지(챌린지, 피드)
![image](https://github.com/C-dtd/gyer-u/assets/129096109/50ca06e5-94b1-4f65-9a6c-668d02c556fd)
![image](https://github.com/C-dtd/gyer-u/assets/129096109/3a322c0e-1efd-45f9-9e62-e8f98dbcb165)
<br>
### 챌린지 상세 페이지(챌린지 정보, 인증글 작성, 참여 기록)
![image](https://github.com/C-dtd/gyer-u/assets/129096109/1eab74fe-1cca-48c1-a40d-d9eb8ba4e20d)
<br>
### 검색 페이지(챌린지, 피드, 사용자 검색)
![image](https://github.com/C-dtd/gyer-u/assets/129096109/829d0be3-9e0d-4eb8-b60d-2f5e9e687229)
<br>

## 👨‍👩‍👦‍👦 팀원 역할
![image](https://github.com/C-dtd/WHILE/assets/129096109/46108c23-8d4a-49f1-8bdc-7c6f5b7fd171)


## 🤾‍♂️ 트러블슈팅
* 페이지 렌더링 시간

문제점: jinja2 템플릿을 사용한 서버측 페이지 렌더링(Server-side rendering)이 서버 연산속도가 느려지면서 페이지 로딩이 약 6초까지 지연됨

해결법: 페이지 렌더링시 사용자가 바로 보게되는 화면만 서버에서 렌더링해서 전달한 후 클라이언트 측에서 렌더링되지 않은 부분으로 이동시 비동기통신을 통해 서버에서 데이터를 받아 클라이언트에서 렌더링하는 유니버셜 렌더링(universal rendering) 사용

결과: 최대 3초, 평균 0.5초 수준으로 로딩속도 개선
 
* 임베딩 모델의 정확도

문제점: 유저가 작성했던 글들과 챌린지에 작성된 글들을 임베딩해 코사인 유사도로 추천 점수를 계산하는 추천 알고리즘 사용 중, gemini(models/text-embedding-004) 모델을 사용했을 때 연관성 없는 문장이 높은 점수를 받음, 점수 범위가 0.95 ~ 0.79로 변별력이 낮음.

해결법: gemini 모델에 에 한글 데이터가 부족해 생긴 현상으로 추측, 한글 문장 학습이 잘 되어있는 huggingface(jhgan/ko-sroberta-nli) 모델로 변경해 사용

결과: 같은 데이터 셋에 대해서 0.79 ~ 0.06이라는 높은 변별력과 유사한 문장이 높은 점수를 받는 결과 획득

* DB connection 강제 종료

문제점: 서버 구동시에 커넥션을 하나 연결한 후 그 커넥션을 계속해서 사용함. 5분 이상 커넥션을 사용하지않거나 한번에 여러 요청이 들어올 경우 커넥션이 강제 종료되는 문제 발생

해결법: 서버 구동시에 DB connection pool을 만들어 커넥션을 여러개 연결, DB에 요청을 보낼때 pool에서 커넥션을 받아와 사용한 후 다시 반납하는 식으로 코드 변경

결과: 커넥션 응답 없음이나 요청 동시처리 문제 해결

