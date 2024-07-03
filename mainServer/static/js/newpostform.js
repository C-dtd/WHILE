const index = new URLSearchParams(window.location.search).get('index');
const allowExt = ['png', 'pjp', 'jpg', 'jpeg', 'jfif', 'webp', 'bmp'];

const uploadFileInput = document.querySelector('#uploadFile');
const imagePreview = document.querySelector('#imagePreview');
const uploadImg = document.querySelector('#uploadImg');
const content = document.querySelector('#content');

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
            "CONTENT": content.value,
            "IMG_ID": imgId,
            "INDEX": index
        })
    });
    const resMain = await responseMain.json();
}