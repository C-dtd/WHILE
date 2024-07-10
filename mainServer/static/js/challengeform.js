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

    const responseImg = await fetch(`http://${imgserver}/imgupload`, {
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

document.getElementById('img-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewImg = document.getElementById('thumbnail');

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        previewImg.src = '';
        previewImg.style.display = 'none';
    }
});