const userId = window.location.pathname.split('/').pop();

function joinChal() {
    document.querySelector('#like-challenge').style.display = "None";
    document.querySelector('#join-challenge').style.display = "flex";
    document.querySelector('#end-challenge').style.display = 'None';
    document.querySelector('#feed').style.display = "None";
    document.querySelector('.main-body').scrollTo(0, 0);
}
function likeChal() {
    document.querySelector('#like-challenge').style.display = "flex";
    document.querySelector('#join-challenge').style.display = "None";
    document.querySelector('#end-challenge').style.display = 'None';
    document.querySelector('#feed').style.display = "None";
    document.querySelector('.main-body').scrollTo(0, 0);
}
function endChal() {
    document.querySelector('#like-challenge').style.display = "None";
    document.querySelector('#join-challenge').style.display = "None";
    document.querySelector('#end-challenge').style.display = "flex";
    document.querySelector('#feed').style.display = "None";
    document.querySelector('.main-body').scrollTo(0, 0);
}
function feed() {
    document.querySelector('#like-challenge').style.display = "None";
    document.querySelector('#join-challenge').style.display = "None";
    document.querySelector('#end-challenge').style.display = 'None';
    document.querySelector('#feed').style.display = "flex";
    document.querySelector('.main-body').scrollTo(0, 0);
}

async function nextpost(entries) {
    if (!entries[0].isIntersecting) {
        return 0;
    }
    const feedsec = document.querySelector('#feed');
    let feednum = document.querySelectorAll('#feed>.feed').length;
    const response = await fetch(`/usernextpost?user=${userId}&feednum=${feednum}`, {
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
            <div class="content-menu like"><i class="fa-solid fa-heart"></i> <span>${post['LIKE_LIST'].length}</span></div>
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

async function endRecordUpdate(index) {
    const response = await fetch('/endchallengerecord', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "INDEX": index,
            "USER_ID": userId
        })
    })
    const res = await response.json();
    const inDate = new Date(res['joined_at']);
    const dues = res['due'];
    const records = res['record'];
    const end_idx = res['end_idx'];

    for (let i=0; i<dues.length; i++) {
        const area = document.querySelector('.block-area'+end_idx[i]);
        let due = dues[i];
        let record = records[i];
        let term = Math.floor((new Date(due[1]) -new Date(due[0]))/(1000*60*60*24));
        area.innerHTML = '';
        let start = new Date(due[0]);
        for (let j=0; j<=term; j++) {
            let day = date2str(start);
            let div = document.createElement('div');
            div.setAttribute('class', 'block');
            div.style.backgroundColor = record.includes(day) ? '#6A24FE' : 'lightgray';
            area.appendChild(div);
            start.setDate(start.getDate()+1);
        }
    }
}

function leftPad(value) {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
}

function date2str(source, delimiter = '-') {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
}

async function userFollow() {
    const response = await fetch(`/follow?id=${userId}`, {
        method: 'GET'
    });
    const button = document.querySelector('.user-follow');
    const res = await response.json();
    if (res.isFollow) {
        button.innerText = "언팔로우";
        button.classList.add('followed');
    } else {
        button.innerText = "팔로우";
        button.classList.remove('followed');
    }
}