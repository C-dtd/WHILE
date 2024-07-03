async function postLogin() {
    const id = document.querySelector('#userId').value;
    const pw = document.querySelector('#userPw').value;

    if (id.length === 0 || pw.length === 0) {
        document.querySelector('.subtext').innerHTML = "아이디와 비밀번호를 입력해주세요.";
    } else {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "userId": id,
                "userPw": pw,
            })
        });
        const res = await response.json();

        if (res.result === 0) {
            document.querySelector('.subtext').innerHTML = res.msg;
        } else {
            location.href = res.msg;
            // console.log(res);
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        postLogin();
    }
});