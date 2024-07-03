function postJoin() {
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const nickname = document.getElementById('nickname').value;
    const birthdate = document.getElementById('birthdate').value;

    const pwRegulation = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\!\@\#\$\^\&\*\(\)])[0-9a-zA-Z\!\@\#\$\^\&\*\(\)]{8,16}$/;
    
    if (!pwRegulation.test(password)) {
        alert('비밀번호는 8-16자 길이, 숫자, 문자 및 특수문자를 포함해야 합니다.');
        return;
    }

    const data = {
        PW: password,
        NAME: name,
        NICK: nickname,
        BIRTH: birthdate
    };

    fetch('/userinfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('회원정보 수정 성공!');
        } else {
            alert('회원정보 수정 실패');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('회원정보 수정 중 오류가 발생했습니다.');
    });
}
