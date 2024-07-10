const feedSec = document.querySelector('#feed');
const chalSec = document.querySelector('#challenge');
const userSec = document.querySelector('#user');

function feed() {
    feedSec.style.display = 'flex';
    chalSec.style.display = 'None';
    userSec.style.display = 'None';
    document.querySelector('.main-body').scrollTo(0, 0);
    if (feedSec.innerText == '') {
        feedSearch();
    }
}
function chal() {
    chalSec.style.display = 'flex';
    feedSec.style.display = 'None';
    userSec.style.display = 'None';
    document.querySelector('.main-body').scrollTo(0, 0);
    if (chalSec.innerText == '') {
        chalSearch();
    }
}
function user() {
    userSec.style.display = 'flex';
    feedSec.style.display = 'None';
    chalSec.style.display = 'None';
    document.querySelector('.main-body').scrollTo(0, 0);
    if (userSec.innerText == '') {
        userSearch();
    }
}

const query = new URLSearchParams(window.location.search).get('q');
async function feedSearch() {
    const response = await fetch('/search/posts?q='+query, {
        method: 'GET'
    });
    const res = await response.json();
    const key = res.key;
    const postInfo = res.postInfo;
    const userInfo = res.userInfo;

    key.forEach(e => {
        let post = postInfo[e];
        let user = userInfo[post['WRITER']];

        let divfeed = document.createElement('div');
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
        feedSec.appendChild(divfeed);
    });
}
async function chalSearch() {
    const response = await fetch('/search/challenges?q='+query, {
        method: 'GET'
    });
    const res = await response.json();
    const key = res.key;
    const chalInfo = res.chalInfo;

    key.forEach(e => {
        let chal = chalInfo[e];

        let divfeed = document.createElement('div');
        divfeed.setAttribute('class', 'challenge');
        html = 
        `<a href="/challenge?index=${chal['ID']}">
            <img class="challenge-img" src="http://${imgserver}/getimg?id=${chal['IMG_ID']}" alt="">
            <div class="challenge-like"><i class="fa-regular fa-heart"></i>${chal['LIKE_LIST'].length}</div>
            <h3>${chal['TITLE']}</h3>
            <p>${chal['DETAIL']}</p>
        </a>`;
        divfeed.innerHTML = html;
        chalSec.appendChild(divfeed);
    });
}
async function userSearch() {
    const response = await fetch('/search/members?q='+query, {
        method: 'GET'
    });
    const res = await response.json();
    const key = res.key;
    const userInfo = res.userInfo;
    const isLogin = res.isLogin;
    const follow = res.follow;
    const follower = res.follower;
    const cuser = res.cuser;

    key.forEach(e => {
        let user = userInfo[e];
        let divfeed = document.createElement('div');
        divfeed.setAttribute('class', 'follow-item');

        followCheck = '';
        if (isLogin == '1' && user['ID'] != cuser) {
            followCheck = 
            `<div>
                <span class="follow-check" id="checkfollow-${user['ID']}">
                    ${follower.includes(user['ID']) ? "나를 팔로우하는 유저" : ""}
                </span>
                <button class="follow-button" id="follow-${user['ID']}" onclick="follow(this)">
                    ${follow.includes(user['ID']) ? "언팔로우" : "팔로우"}
                </button>
            </div>`
        }

        html = 
        `<a href="/user/${user['ID']}">
            <img class="followimg" src="http://${imgserver}/getimg?id=${user['IMG_ID']}" alt="">
            <span class="followname">${user['NICK']}</span>
        </a>
        ${followCheck}`;
        divfeed.innerHTML = html;
        userSec.appendChild(divfeed);
    });
}

async function follow(e) {
    const response = await fetch(`/follow?id=${e.id.split('-')[1]}`, {
        method: 'GET'
    });
    const res = await response.json();
    if (res.isFollow) {
        e.innerText = "언팔로우";
        document.querySelector('#check'+e.id).innerText = '나를 팔로우하는 유저';
    } else {
        e.innerText = "팔로우";
        document.querySelector('#check'+e.id).innerText = '';
    }
}

feed();
search.value = query;
