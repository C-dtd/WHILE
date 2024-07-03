async function changeInfo() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const nickname = document.getElementById('nickname').value;

    if (currentPassword.length === 0) {
        document.querySelector(".subtext").innerHTML = "비밀번호를 입력하세요.";
        return;
    }

    if (newPassword.length === 0 && nickname.length > 0) {
        checkNickname(nickname);
    } else if (newPassword.length > 0 && nickname.length === 0) {
        if (newPassword !== confirmPassword) {
            document.querySelector(".newPwCheck").innerHTML = "비밀번호를 정확하게 입력해주세요.";
        } else if (newPassword.length < 9 || newPassword.length > 16) {
            document.querySelector(".newPw").innerHTML = "비밀번호는 9~16자리여야 합니다.";
        } else {
            alert("회원정보가 변경되었습니다.");
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            })
        }
    } else if (newPassword.length > 0 && nickname.length > 0) {
        if (newPassword !== confirmPassword) {
            document.querySelector(".newPwCheck").innerHTML = "비밀번호를 정확하게 입력해주세요.";
        } else if (newPassword.length < 9 || newPassword.length > 16) {
            document.querySelector(".newPw").innerHTML = "비밀번호는 9~16자리여야 합니다.";
        } else {
            checkNickname(nickname, async () => {
                alert("회원정보가 변경되었습니다.");
                const response = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        currentPassword: currentPassword,
                        newPassword: newPassword,
                        nickname: nickname
                    })
    
            });
        }
    )
    }
}

function checkNickname(nickname, callback) {

    const isNicknameTaken = false;

    if (isNicknameTaken) {
        document.querySelector(".newnick").innerHTML = "중복된 닉네임입니다.";
    } else {
        if (callback) callback();
    }
}
}