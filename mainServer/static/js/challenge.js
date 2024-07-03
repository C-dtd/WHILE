document.addEventListener('DOMContentLoaded', function() {
    // 챌린지 시작일/종료일 사용자 정보 입력(예시로 7월 1일 입력)
    let db_stChallengeDate = "2024-07-01"
    let db_endChallengeDate = "2024-07-31"

    // jsp 객체변환
    let stDate = new Date(db_stChallengeDate);
    let endDate = new Date(db_endChallengeDate);
    let currentDate = new Date();

    // 시작일자 업데이트
    document.getElementById('st-date').innerText = db_stChallengeDate;
    // 종료일자 업데이트
    document.getElementById('end-date').innerText = db_endChallengeDate;

    // 남은기간 계산
    let term = endDate - currentDate;
    let remainDays = Math.floor(term/(1000*60*60*24));

    //챌린지 종료일
    if (remainDays<0){
        remainDays = 0;
    }
    // 남은기간 업데이트
    document.getElementById('duration').innerText = remainDays;

    let totalDays = Math.floor((endDate-stDate)/(1000*60*60*24));
    let progress = 0;

    function verifychallenge() {
        // localStorage에서 가져오는 마지막인증 날짜 : lastVerified
        // let lastVer = localStorage.getItem('lastVerified');
        // let today = new Date().toISOString().split('T')[0];

        // if (lastVer === today){
        //     alert("오늘은 이미 인증하셨습니다. 내일 시도해주세요.")
        //     return;
        // }
        // // 오늘날짜로 인증날짜 업데이트
        // localStorage.setItem('lastVerified',today);
        progress ++;
        console.log('Progress',progress);
        let barPercentage = Math.min((progress/totalDays)*100,100);
        console.log('percentage', barPercentage);
        document.getElementById('progress-bar').style.width = barPercentage+"%";
        document.getElementById('progress-text').innerText = barPercentage.toFixed(2)+"%";

        if (barPercentage >= 100.00){
            alert("챌린지를 완료했습니다!");
        }
    }
    // 초기 바 업데이트
    let initialBarPercentage = Math.min((progress/totalDays)*100,100);
    document.getElementById('progress-bar').style.width = initialBarPercentage+"%";
    document.getElementById('progress-text').innerText = initialBarPercentage.toFixed(2)+"%";

    // 버튼 클릭 이벤트 리스터
    document.getElementById('verify-button').addEventListener('click',verifychallenge);
    document.querySelector('#feed').style.display = 'None';
});

function showChalInfo() {
    document.querySelector('#feed').style.display = 'None';
    document.querySelector('#challenge').style.display = 'flex';
}
function showFeed() {
    document.querySelector('#feed').style.display = 'flex';
    document.querySelector('#challenge').style.display = 'None';
}