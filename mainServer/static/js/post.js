const index = new URLSearchParams(window.location.search).get('index');
nextComment();

async function newComment() {
    const content = document.querySelector('#content');
    const response = await fetch('/newcomment', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "CONTENT": content.value,
            "INDEX": index
        })
    });
    const res = await response.json();
    content.value = '';
    commentUpdate();
}
if (document.querySelector('#submit') !== null) {
    document.querySelector('#submit').addEventListener("click", () => {
        newComment();
    });
}

async function commentUpdate() {
    document.querySelector('#cmt').innerHTML = '';
    nextComment();
}

async function nextComment() {
    const cmtsec = document.querySelector('#cmt');
    const cmtnum = document.querySelectorAll('#cmt>.comment-box').length;
    const response = await fetch(`/nextcmt?post=${index}&cmtnum=${cmtnum}`, {
        method: 'GET'
    });
    const res = await response.json();
    const cmtInfo = res['cmtInfo'];
    const userInfo = res['userInfo'];
    const key = res['key'];
    const cuser = res['cuser'];

    key.forEach(e => {
        user = userInfo[cmtInfo[e]['WRITER']];
        let comment = document.createElement('div');
        comment.setAttribute('class', 'comment-box')
        html = 
        `<div class="profile">
            <img class="comment-profile-image" src="http://${imgserver}/getimg?id=${user['IMG_ID']}" alt="">
            <div class="comment-content">
                <div class="comment-username">${user['NICK']}</div>
                <div class="comment-detail" id="detail-${e}">${cmtInfo[e]['CONTENT']}</div>
            </div>
        </div>
            ${cuser == user['ID'] ? `<div class="comment-buttons">
                <button class="edit-button" id="edit-${e}" onclick="editcmt(this)">수정</button>
                <button class="delete-button" id="del-${e}" onclick="delcmt(this)">삭제</button>
            </div>` : ""}
        <div class="post-menu-container">
            <div class="post-menu" id="cmtlike-${cmtInfo[e]['ID']}" onclick='cmtLike(this)'><a hef="#"><i class="fa-solid fa-heart"></i> <span>${cmtInfo[e]['LIKE_LIST'].length}</span></a></div>
        </div>`;
        comment.innerHTML = html;
        cmtsec.appendChild(comment);
    });
}
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        nextComment();
    }
});

async function postLike(e) {
    let id = e.id.split('-')[1];
    const response = await fetch(`/likepost?id=${id}`, {
        method: 'GET'
    });
    const res = await response.json();

    e.querySelector('span').innerText = res.likenum;
}

async function cmtLike(e) {
    let id = e.id.split('-')[1];
    const response = await fetch(`/likecmt?id=${id}`, {
        method: 'GET'
    });
    const res = await response.json();

    e.querySelector('span').innerText = res.likenum;
}

async function delcmt(e) {
    idx = e.id.split('-').pop();
    const response = await fetch(`/deletecomment?index=${idx}`, {
        method: 'GET'
    });
    document.querySelector('#cmt').innerHTML = '';
    nextComment();
}

async function editcmt(e) {
    idx = e.id.split('-').pop();
    content = document.querySelector(`#detail-${idx}`);
    if (content == null) {
        area = document.querySelector(`#area-${idx}`);
        condiv = document.createElement('div');
        condiv.setAttribute('id', `detail-${idx}`);
        const response = await fetch(`/updatecomment?index=${idx}&content=${area.value}`, {
            method: 'GET'
        });
        condiv.innerText = area.value;
        area.parentNode.appendChild(condiv);
        area.remove();
    } else {
        text = content.innerText;
        area = document.createElement('textarea');
        area.setAttribute('id', `area-${idx}`)
        area.innerText = text;
        content.parentNode.appendChild(area);
        content.remove();
    }
}