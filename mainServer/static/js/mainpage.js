function joinChal() {
    document.querySelector('#rec-challenge').style.display = "None";
    document.querySelector('#join-challenge').style.display = "flex";
    document.querySelector('#feed').style.display = "None";
    window.scrollTo(0, 0);
}
function recChal() {
    document.querySelector('#rec-challenge').style.display = "flex";
    document.querySelector('#join-challenge').style.display = "None";
    document.querySelector('#feed').style.display = "None";
    window.scrollTo(0, 0);
}
function feed() {
    document.querySelector('#rec-challenge').style.display = "None";
    document.querySelector('#join-challenge').style.display = "None";
    document.querySelector('#feed').style.display = "flex";
    window.scrollTo(0, 0);
    if (document.querySelectorAll('#feed>.feed').length == 0) {
        nextpost();
    }
}
let t = 0;
async function nextpost() {
    const feedsec = document.querySelector('#feed');
    let feednum = document.querySelectorAll('#feed>.feed').length;
    const response = await fetch('/nextpost?feednum='+feednum, {
        method: 'get'
    });
    const res = await response.json();
    const user = res['userInfo'];
    const post = res['postInfo'];
    const key = res['key'];
    let postInfo = {};
    const keymap = key.map(async e => {
        const response = await fetch('/postinfo?index='+e);
        postInfo[e] = await response.json();
    });
    await Promise.all(keymap);
    key.forEach(e => {
        let divfeed = document.createElement('div');
        let userInfo = user[post[e]['WRITER']];
        divfeed.setAttribute('class', 'feed');
        html = 
        `<div class="post-profile">
            <img class="post-profile-img" src="http://127.0.0.1:5051/getimg?id=${userInfo['IMG_ID']}">${userInfo['NICK']}
        </div>
        <a href="/post?index=${e}">
            <div class="detail">${post[e]['CONTENT']}</div>
            ${post[e]['IMG_ID'] == null ? "": `<img class="feed-img" src="http://127.0.0.1:5051/getimg?id=${post[e]['IMG_ID']}">`}
        </a>
        <div class="content-menu-container">
            <div class="content-menu comment">🗨 <span>${postInfo[e]['cmt'].length}</span></div>
            <div class="content-menu like">👍 <span>${postInfo[e]['like'].length}</span></div>
        </div>`;
        divfeed.innerHTML = html;
        
        feedsec.appendChild(divfeed);
    });
}
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight
        && document.querySelector('#feed').style.display == 'flex') {
        nextpost();
    }
});