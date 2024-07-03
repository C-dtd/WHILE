const allowExt = ['png', 'pjp', 'jpg', 'jpeg', 'jfif', 'webp', 'bmp'];

async function postChallengeOpen() {
    const title = document.querySelector('#title').value;
    const detail = document.querySelector('#detail').value;
    const img = document.querySelector('#img-input').files;
    if (img.length !== 1) {
        document.querySelector('#img-input').value = '';
        return false;
    }
    if (img[0].size > 3145728) { //3mb
        document.querySelector('#img-input').value = '';
        return false;
    }
    if (!allowExt.includes(img[0].name.split('.').pop())) {
        document.querySelector('#img-input').value = '';
        return false;
    }

    const data = new FormData();
    data.append('img', img[0]);

    const responseImg = await fetch('http://127.0.0.1:5051/imgupload', {
        method: 'POST',
        body: data
    });
    const resImg = await responseImg.json();

    const responseMain = await fetch('/newchallenge', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "TITLE": title,
            "DETAIL": detail,
            "IMG_ID": resImg.img_id
        })
    });
    const resMain = await responseMain.json();
    location.href = '/';
}