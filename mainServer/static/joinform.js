let emailDuplicatedCheck = false;
let emailUsableCheck = false;
let emailRegulation = false;
let passwordUsableCheck = false;

function toggleDirectInput() {
    var select = document.getElementById('domain-select');
    var input = document.getElementById('email-domain');

    if (select.value === 'type') {
        input.disabled = false;
        input.value = '';
    } else {
        input.disabled = true;
        input.value = select.value;
    }
}
async function postJoin() {
    const id = document.querySelector('#email-id').value;
    const email = id +'@' +document.querySelector('#email-domain').value;
    const pw = document.querySelector('#pw').value;
    const pwCheck = document.querySelector('#pw-check').value;
    const name = document.querySelector('#name').value;
    const nick = document.querySelector('#nick').value;
    const year = document.querySelector('#year').value;
    const month = document.querySelector('#month').value;
    const day = document.querySelector('#day').value;

    if (!emailUsableCheck || !passwordUsableCheck) {
        return false;
    }
    if (!emailDuplicatedCheck) {
        document.querySelector('#email-text').innerHTML = '이메일 중복확인 해주세요';
        return false;
    }
    if (id === '') {
        document.querySelector('#email-text').innerHTML = '이메일은 비워둘 수 없습니다.';
        return false;
    }
    if (pw === '') {
        document.querySelector('#pw-check-text').innerHTML = '비밀번호는 비워둘 수 없습니다.';
        return false;
    }
    if (pwCheck === '') {
        document.querySelector('#pw-check-text').innerHTML = '비밀번호를 확인해주세요.';
        return false;
    }
    if (name === '') {
        document.querySelector('#name-text').innerHTML = '이름은 비워둘 수 없습니다.';
        return false;
    }
    if (nick === '') {
        document.querySelector('#nick-text').innerHTML = '이름은 비워둘 수 없습니다.';
        return false;
    }
    if (year === '' || month === '' || day === '') {
        document.querySelector('#birth-text').innerHTML = '생일은 비워둘 수 없습니다.';
        return false;
    }
    const response = await fetch('/join', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "ID": email,
            "PW": pw,
            "NAME": name,
            "NICK": nick,
            "BIRTH": year+'-'+month+'-'+day
        })
    });
    const res = await response.json();
    if (res.result == 0) {
        if (res.email) {
            document.querySelector('#email-text').innerHTML = res.email;
        }
        if (res.pw) {
            document.querySelector('#pw-check-text').innerHTML = res.pw;
        }
        if (res.name) {
            document.querySelector('#name-text').innerHTML = res.name;
        }
        if (res.nick) {
            document.querySelector('#nick-text').innerHTML = res.nick;
        }
        if (res.birth) {
            document.querySelector('#birth-text').innerHTML = res.birth;
        }
    } else {
        location.href = '/';   
    }
}

function emailInput() {
    const id = document.querySelector('#email-id').value;
    const domain = document.querySelector('#email-domain').value;
    const email = id +'@' +domain;
    emailDuplicatedCheck = false;
    emailUsableCheck = false;
    
    if (email.match(/^[\w\-\.]+\@[\w\-]+\.[\w\-]{2,4}$/g)) {
        document.querySelector('#email-text').innerHTML = '';
        emailRegulation = true;
    } else {
        document.querySelector('#email-text').innerHTML = '유효하지 않은 이메일입니다.';
        emailRegulation = false;
    }
}
document.querySelector('#email-id').addEventListener('input', () => emailInput());
document.querySelector('#email-domain').addEventListener('input', () => emailInput());

async function emailCheck() {
    const id = document.querySelector('#email-id').value;
    const domain = document.querySelector('#email-domain').value;

    if (id === '' || domain === '') {
        emailUsableCheck = false;
        document.querySelector('#email-text').innerHTML = '이메일을 입력해주세요.';
        return false;
    }
    if (!emailRegulation) {
        emailUsableCheck = false;
        document.querySelector('#email-text').innerHTML = '유효하지 않은 이메일입니다.';
        return false;
    }

    emailDuplicatedCheck = true;
    
    const response = await fetch('/joinEmail', {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "id": id,
            "domain": domain
        })
    });
    const res = await response.json();
    if (res.result == 0) {
        emailUsableCheck = false;
        document.querySelector('#email-text').innerHTML = res.msg;
    } else {
        emailUsableCheck = true;
        document.querySelector('#email-text').innerHTML = res.msg;
    }
}

function passwordInput() {
    const pw = document.querySelector('#pw').value;
    const pwCheck = document.querySelector('#pw-check').value;
    const pwCheckText = document.querySelector('#pw-check-text');
    if (pw.match(/[^0-9a-zA-Z\!\@\#\$\^\&\*\(\)]/)) {
        pwCheckText.innerHTML = '비밀번호에 사용할 수 없는 문자가 포함되어있습니다.';
        passwordUsableCheck = false;
    } else if (pw.length < 8) {
        pwCheckText.innerHTML = '비밀번호가 너무 짧습니다.(8자 이상)';
        passwordUsableCheck = false;
    } else if (pw.length > 16) {
        pwCheckText.innerHTML = '비밀번호가 너무 깁니다.(16자 이하)';
        passwordUsableCheck = false;
    } else if (pw.match(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\!\@\#\$\^\&\*\(\)])[0-9a-zA-Z\!\@\#\$\^\&\*\(\)]+$/) == null) {
        pwCheckText.innerHTML = '비밀번호는 영문, 숫자, 특수문자를 포함해야합니다.';
        passwordUsableCheck = false;
    } else if (pw !== pwCheck) {
        pwCheckText.innerHTML = '비밀번호를 확인해주세요';
        passwordUsableCheck = false;
    } else {
        pwCheckText.innerHTML = '';
        passwordUsableCheck = true;
    }
}
document.querySelector('#pw-check').addEventListener('input', () => passwordInput());
document.querySelector('#pw').addEventListener('input', () => passwordInput());

document.querySelector('#name').addEventListener('input', (e) => {
    if (e.target.value.length == 0) {
        document.querySelector('#name-text').innerHTML = '이름은 비워둘 수 없습니다.';
    } else {
        document.querySelector('#name-text').innerHTML = '';
    }
});

function birthInput() {
    const year = document.querySelector('#year').value;
    const month = document.querySelector('#month').value;
    const day = document.querySelector('#day').value;

    if (year.length != 0 && month.length != 0 && day.length != 0) {
        document.querySelector('#birth-text').innerHTML = '';
    }
}
document.querySelector('#year').addEventListener('input', () => birthInput());
document.querySelector('#month').addEventListener('input', () => birthInput());
document.querySelector('#day').addEventListener('input', () => birthInput());

function cutMaxLength(e, len, id) {
    let txt = e.target;
    if (txt.value.length > len) {
        txt.value = txt.value.substr(0, len);
        document.querySelector(id).focus();
    }
}
document.querySelector('#year').addEventListener('input',(e) => cutMaxLength(e, 4, '#month'));
document.querySelector('#month').addEventListener('input',(e) => cutMaxLength(e, 2, '#day'));
document.querySelector('#day').addEventListener('input',(e) => cutMaxLength(e, 2, '#day'));

function valueClamp(e, mn, mx) {
    let t = e.target;
    if (Number(t.value) < mn) {
        t.value = mn;
    }
    if (Number(t.value) > mx) {
        t.value = mx;
    }
}
document.querySelector('#year').addEventListener('blur', (e) => valueClamp(e,0,9999));
document.querySelector('#month').addEventListener('blur', (e) => valueClamp(e,1,12));
document.querySelector('#day').addEventListener('blur', (e) => valueClamp(e,1,31));