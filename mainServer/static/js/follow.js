function showFollow() {
    document.querySelector('#following').style.display = 'flex';
    document.querySelector('#follower').style.display = 'None';
    document.querySelector('.main-body').scrollTo(0, 0);
}
function showFollower() {
    document.querySelector('#following').style.display = 'None';
    document.querySelector('#follower').style.display = 'flex';
    document.querySelector('.main-body').scrollTo(0, 0);
}
showFollower();
buttons = document.querySelectorAll('.follow-button');

async function follow(e) {
    const response = await fetch(`/follow?id=${e.id.split('-')[1]}`, {
        method: 'GET'
    });
    const res = await response.json();
    if (res.isFollow) {
        e.innerText = "언팔로우";
    } else {
        e.innerText = "팔로우";
    }
}