const index = new URLSearchParams(window.location.search).get('index');
const allowExt = ['png', 'pjp', 'jpg', 'jpeg', 'jfif', 'webp', 'bmp'];

const uploadFileInput = document.querySelector('#uploadFile');
const imagePreview = document.querySelector('#imagePreview');
const uploadImg = document.querySelector('#uploadImg');
const content = document.querySelector('#content');

document.querySelector('#feed').style.display = 'None';
if (uploadImg != null) {
    uploadImg.style.display = 'none';
}
if (document.querySelector('.block-area') != null) {
    recordUpdate();
}

function showChalInfo() {
    document.querySelector('#feed').style.display = 'None';
    document.querySelector('#challenge').style.display = 'flex';
}

function showFeed() {
    document.querySelector('#feed').style.display = 'flex';
    document.querySelector('#challenge').style.display = 'None';
}

function imgDel() {
    uploadImg.style.display = 'none';
    uploadFileInput.value = '';
}
function loadimg() {
    if (uploadFileInput.files.length > 1) {
        uploadFileInput.value = '';
        uploadImg.setAttribute('src', '');
        return false;
    }
    if (uploadFileInput.files[0].size > 3145728) { //3mb
        uploadFileInput.value = '';
        uploadImg.setAttribute('src', '');
        return false;
    }
    if (!allowExt.includes(uploadFileInput.files[0].name.split('.').pop())) {
        uploadFileInput.value = '';
        uploadImg.setAttribute('src', '');
        return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(uploadFileInput.files[0]);
    reader.onload = e => {
        uploadImg.setAttribute('src', e.target.result);
        uploadImg.style.display = 'block';
    };
}
if (uploadFileInput !== null) {
    uploadFileInput.addEventListener('change', (e) => {
        loadimg();
    });
}

async function newPost() {
    let imgId = null;
    if (uploadFileInput.files.length >= 1) {
        const data = new FormData();
        data.append('img', uploadFileInput.files[0]);
        const responseImg = await fetch(`http://${imgserver}/imgupload`, {
            method: 'POST',
            body: data
        });
        const resImg = await responseImg.json();
        imgId = resImg.img_id;
    }
    const responseMain = await fetch('/newpost', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "CONTENT": content.value,
            "IMG_ID": imgId,
            "INDEX": index
        })
    });
    const resMain = await responseMain.json();
    content.value = '';
    imgDel();
    recordUpdate();
}
if (document.querySelector('#submit-post') != null) {
    document.querySelector('#submit-post').addEventListener('click', () => {
        newPost();
    });
}
async function recordUpdate() {
    const response = await fetch('/challengerecord', {
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
    const record = res['record']
    const today = new Date();

    let term = Math.floor((today -inDate)/(1000*60*60*24));
    const area = document.querySelector('.block-area');
    area.innerHTML = '';
    let start = inDate;
    for (let i=0; i<=term; i++) {
        let day = date2str(start);
        // console.log(day);
        let div = document.createElement('div');
        div.setAttribute('class', 'block');
        div.style.backgroundColor = record.includes(day) ? '#6A24FE' : 'lightgray';
        area.appendChild(div);
        start.setDate(start.getDate()+1);
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

if (document.querySelector('#join-challenge') != null) {
    document.querySelector('#join-challenge').addEventListener('click', async (e) => {
        const response = await fetch(`/checkch?index=${index}&type=2`, {
            method: 'GET'
        });
        const res = await response.json();
        location.href = location.href;
    })
    async function joinUpdate() {
        const response = await fetch(`/challengeinfo/joinList?index=${index}`, {
            method: 'GET'
        });
        const res = await response.json();
        document.querySelector('#join-num').innerText = res.joinList.length;
    }
}

async function chalLike(e) {
    let id = index;
    const response = await fetch(`/checkch?index=${id}&type=1`, {
        method: 'GET'
    });
    const res = await response.json();
    e.querySelector('span').innerText = res.likenum;
}

async function postLike(e) {
    let id = e.id.split('-')[1];
    const response = await fetch(`/likepost?id=${id}`, {
        method: 'GET'
    });
    const res = await response.json();
    e.querySelector('span').innerText = res.likenum;
}

async function nextpost(entries) {
    if (!entries[0].isIntersecting) {
        return 0;
    }
    const feedsec = document.querySelector('#feed');
    let feednum = document.querySelectorAll('#feed>.feed').length;
    const response = await fetch(`/chalnextpost?feednum=${feednum}&index=${index}`, {
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