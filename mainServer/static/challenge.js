const index = new URLSearchParams(window.location.search).get('index');
const allowExt = ['png', 'pjp', 'jpg', 'jpeg', 'jfif', 'webp', 'bmp'];

document.querySelector('#like').addEventListener('click', async (e) => {
    const check = e.target.checked*1;
    const response = await fetch(`/checkch?index=${index}&check=${check}&type=1`, {
        method: 'GET'
    });
    const res = await response.json();
    likeUpdate();
})
document.querySelector('#join').addEventListener('click', async (e) => {
    const like = e.target.checked*1;
    const response = await fetch(`/checkch?index=${index}&check=${like}&type=2`, {
        method: 'GET'
    });
    const res = await response.json();
    joinUpdate();
})
async function likeUpdate() {
    const response = await fetch(`/challengeinfo/likeNum?index=${index}`, {
        method: 'GET'
    });
    const res = await response.json();
    document.querySelector('#like-num').innerText = res.likeNum;
}
async function joinUpdate() {
    const response = await fetch(`/challengeinfo/joinList?index=${index}`, {
        method: 'GET'
    });
    const res = await response.json();
    document.querySelector('#join-list').innerHTML = '';
    res.joinList.forEach(i => {
        document.querySelector('#join-list').innerHTML += `<p>${i}</p>`
    });
}
function loadimg() {
    let imgInput = document.querySelector('#image-input');
    let reader = new FileReader();
    if (imgInput.files.length > 1) {
        imgInput.value = '';
        document.querySelector('#thumbnail').setAttribute('src', '');
        return false;
    }
    if (imgInput.files[0].size > 3145728) { //3mb
        imgInput.value = '';
        document.querySelector('#thumbnail').setAttribute('src', '');
        return false;
    }
    if (!allowExt.includes(imgInput.files[0].name.split('.').pop())) {
        imgInput.value = '';
        document.querySelector('#thumbnail').setAttribute('src', '');
        return false;
    }
    reader.readAsDataURL(imgInput.files[0]);
    reader.onload = e => {
        document.querySelector('#thumbnail').setAttribute('src', e.target.result);
    };
}
if (document.querySelector('#image-input') !== null) {
    document.querySelector('#image-input').addEventListener('change', (e) => {
        loadimg();
    });
}
window.addEventListener('pageshow', (e) => {
    // likeUpdate();
    // joinUpdate();
    if (e.persisted) {
        location.reload(true);
    }
});

async function newPost() {
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const imgInput = document.querySelector('#image-input');
    let imgId = null;
    if (imgInput.files.length >= 1) {
        const data = new FormData();
        data.append('img', imgInput.files[0]);

        const responseImg = await fetch('http://127.0.0.1:5051/imgupload', {
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
            "TITLE": title.value,
            "CONTENT": content.value,
            "IMG_ID": imgId,
            "INDEX": index
        })
    });
    const resMain = await responseMain.json();
    title.value = '';
    content.value = '';
    imgInput.value = '';
    postUpdate();
}
if (document.querySelector("#submit") !== null) {
    document.querySelector("#submit").addEventListener("click", () => {
        newPost()
    });
}
function postUpdate() {
    postList.forEach(async i => {
        const detail = document.querySelector('#post-content-' +i);
        const response = await fetch(`/postinfo?index=${i}`, {
            method: "GET"
        });
        const res = await response.json();
        detail.innerHTML = res.TITLE;
    });
}