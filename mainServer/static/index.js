// userJch.forEach(async i => {
//     const title = document.querySelector('#jch-title-' +i);
//     const detail = document.querySelector('#jch-detail-' +i);
//     const thumbnail = document.querySelector('#jch-img-' +i);
    
//     const response = await fetch(`/challengeinfo?index=${i}`, {
//         method: "GET"
//     });
//     const res = await response.json();
//     thumbnail.setAttribute('src', 'http://127.0.0.1:5051/getimg?id=' +res.IMG_ID);
//     title.innerHTML = res.TITLE;
//     detail.innerHTML = res.DETAIL;
// });
// userLch.forEach(async i => {
//     const title = document.querySelector('#lch-title-' +i);
//     const detail = document.querySelector('#lch-detail-' +i);
//     const thumbnail = document.querySelector('#lch-img-' +i);

//     const response = await fetch(`/challengeinfo?index=${i}`, {
//         method: "GET"
//     });
//     const res = await response.json();
//     thumbnail.setAttribute('src', 'http://127.0.0.1:5051/getimg?id=' +res.IMG_ID);
//     title.innerHTML = res.TITLE;
//     detail.innerHTML = res.DETAIL;
// });
// pch.forEach(async i => {
//     const title = document.querySelector('#pch-title-' +i);
//     const detail = document.querySelector('#pch-detail-' +i);
//     const thumbnail = document.querySelector('#pch-img-' +i);

//     const response = await fetch(`/challengeinfo?index=${i}`, {
//         method: "GET"
//     });
//     const res = await response.json();
//     thumbnail.setAttribute('src', 'http://127.0.0.1:5051/getimg?id=' +res.IMG_ID);
//     title.innerHTML = res.TITLE;
//     detail.innerHTML = res.DETAIL;
// });

window.onpageshow = function(e) {
    if (e.persisted) {
        location.reload(true);
    }
}