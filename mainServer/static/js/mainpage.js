function home() {
    document.querySelector('#rec-challenge').style.display = "flex";
    document.querySelector('#like-challenge').style.display = "None";
    document.querySelector('#feed').style.display = "None";
    document.querySelector('#home').style.display = "block";
    document.querySelector('.main-body').scrollTo(0, 0);
}
function likeChal() {
    document.querySelector('#rec-challenge').style.display = "None";
    document.querySelector('#like-challenge').style.display = "flex";
    document.querySelector('#feed').style.display = "None";
    document.querySelector('#home').style.display = "None";
    document.querySelector('.main-body').scrollTo(0, 0);
}
function recChal() {
    document.querySelector('#rec-challenge').style.display = "flex";
    document.querySelector('#like-challenge').style.display = "None";
    document.querySelector('#feed').style.display = "None";
    document.querySelector('#home').style.display = "None";
    document.querySelector('.main-body').scrollTo(0, 0);
}
function feed() {
    document.querySelector('#rec-challenge').style.display = "None";
    document.querySelector('#like-challenge').style.display = "None";
    document.querySelector('#feed').style.display = "flex";
    document.querySelector('#home').style.display = "None";
    document.querySelector('.main-body').scrollTo(0, 0);
}
home();

const items = document.querySelectorAll('.challenge-select');
items.forEach(item => {
    // 챌린지 카테고리 셀렉된 텍스트 색변화 후 음영
    selection = item.querySelectorAll('div');
    selection.forEach(select => {
        select.addEventListener('click', function() {
            item.querySelectorAll('div').forEach(s => {
            // 모든 요소에서 selected 클래스 제거
                s.classList.remove('selected');
            });
            // 클릭된 요소에 selected 클래스 추가
            this.classList.add('selected');
        });
    });
});

// 좌우 스크롤
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto', // 슬라이드 한 번에 보여질 개수를 자동으로 설정
    spaceBetween: 10, // 슬라이드 사이의 간격 설정
    loop: false, // 무한 루프 설정 (선택사항)
    navigation: {
        nextEl: '.swiper-button-next', // 다음 버튼 클래스 설정
        prevEl: '.swiper-button-prev', // 이전 버튼 클래스 설정
    },
});

async function nextpost(entries) {
    if (!entries[0].isIntersecting) {
        return 0;
    }
    const feedsec = document.querySelector('#feed');
    let feednum = document.querySelectorAll('#feed>.feed').length;
    const response = await fetch('/nextpost?feednum='+feednum, {
        method: 'get'
    });
    const res = await response.json();
    const userInfo = res['userInfo'];
    const postInfo = res['postInfo'];
    const key = res['key'];

    key.forEach(e => {
        let divfeed = document.createElement('div');
        let post = postInfo[e];
        let user = userInfo[post['WRITER']];
        divfeed.setAttribute('class', 'feed');
        html = 
        `<div class="feed-date">${post['POSTED_AT']}</div>
        <a href="/user/${user['ID']}">
        <div class="post-profile">
            <img class="post-profile-img" src="http://${imgserver}/getimg?id=${user['IMG_ID']}">
            ${user['NICK']}
        </div>
        </a>
        <a href="/post?index=${e}">
        <div class="detail">
            ${post['CONTENT']}
        </div>
        ${post['IMG_ID'] == null ? "" : `<img class="feed-img" src="http://${imgserver}/getimg?id=${post['IMG_ID']}" alt="">`}
        </a>
        <div class="content-menu-container">
            <div class="content-menu comment"><i class="fa-solid fa-comment"></i> <span>${post['CMT_LIST'].length}</span></div>
            <div class="content-menu like" id="like-${post['ID']}" onclick='postLike(this)'><a ref="#"><i class="fa-solid fa-heart"></i> <span>${post['LIKE_LIST'].length}</span></a></div>
        </div>`;

        divfeed.innerHTML = html;
        feedsec.insertBefore(divfeed, document.querySelector('.feedloader'));
    });
}

const observer = new IntersectionObserver(nextpost, {
    root: document.querySelector('.main-body'),
    threshold: 1    
});
observer.observe(document.querySelector('.feedloader'));


async function nextrecchal(entries) {
    if (!entries[0].isIntersecting) {
        return 0;
    }
    const recsec = document.querySelector('#rec-challenge>.challenge-container');
    let chalnum = document.querySelectorAll('#rec-challenge .challenge').length;
    const response = await fetch('/nextrecchal?chalnum='+chalnum, {
        method: 'get'
    });
    const res = await response.json();
    const chalInfo = res['chalInfo'];
    const key = res['key'];

    key.forEach(e => {
        let divfeed = document.createElement('div');
        let chal = chalInfo[e];
        divfeed.setAttribute('class', 'challenge');
        html = 
        `<a href="/challenge?index=${chal['ID']}">
            <img class="challenge-img" src="http://${imgserver}/getimg?id=${chal['IMG_ID']}" alt="">
            <div class="challenge-like"><i
                    class="fa-regular fa-heart"></i>${chal['LIKE_LIST'].length}</div>
            <h3>${chal['TITLE']}</h3>
            <p>${chal['DETAIL']}</p>
        </a>`;

        divfeed.innerHTML = html;
        recsec.insertBefore(divfeed, document.querySelector('.recloader'));
    });
}

const recobserver = new IntersectionObserver(nextrecchal, {
    root: document.querySelector('.main-body'),
    threshold: 1    
});
recobserver.observe(document.querySelector('.recloader'));

async function nextlikechal(entries) {
    if (!entries[0].isIntersecting) {
        return 0;
    }
    const likesec = document.querySelector('#like-challenge>.challenge-container');
    let chalnum = document.querySelectorAll('#like-challenge .challenge').length;
    const response = await fetch('/nextlikechal?chalnum='+chalnum, {
        method: 'get'
    });
    const res = await response.json();
    const chalInfo = res['chalInfo'];
    const key = res['key'];

    key.forEach(e => {
        let divfeed = document.createElement('div');
        let chal = chalInfo[e];
        divfeed.setAttribute('class', 'challenge');
        html = 
        `<a href="/challenge?index=${chal['ID']}">
            <img class="challenge-img" src="http://${imgserver}/getimg?id=${chal['IMG_ID']}" alt="">
            <div class="challenge-like"><i
                    class="fa-regular fa-heart"></i>${chal['LIKE_LIST'].length}</div>
            <h3>${chal['TITLE']}</h3>
            <p>${chal['DETAIL']}</p>
        </a>`;

        divfeed.innerHTML = html;
        likesec.insertBefore(divfeed, document.querySelector('.likeloader'));
    });
}

const likeobserver = new IntersectionObserver(nextlikechal, {
    root: document.querySelector('.main-body'),
    threshold: 1    
});
likeobserver.observe(document.querySelector('.likeloader'));

// 메인이미지
const imageList = [    
    '../static/img/Main01.svg',
    '../static/img/Main02.svg',
    '../static/img/Main03.svg',
    '../static/img/Main04.jpg'    
  ];

  const imageContainer = document.getElementById('main-image');
  let currentIndex = 0;

  function changeImage() {
    imageContainer.src = imageList[currentIndex];
    currentIndex = (currentIndex + 1) % imageList.length; 
  }
  // 초기 이미지 설정
  changeImage();
  // 5초마다 이미지 변경
  setInterval(changeImage, 5000);

async function postLike(e) {
    let id = e.id.split('-')[1];
    const response = await fetch(`/likepost?id=${id}`, {
        method: 'GET'
    });
    const res = await response.json();

    e.querySelector('span').innerText = res.likenum;
}