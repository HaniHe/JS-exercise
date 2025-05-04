 // 获取DOM元素
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');
const welcomeMessage = document.getElementById('welcome-message');

// 预设的用户名和密码
const validCredentials = [
    { username: 'admin', password: '000000' },
    { username: 'user', password: '123456' }
];

// 账号验证正则表达式
const usernameRegex = /^[a-zA-Z_][a-zA-Z0-9_]{0,11}$/;

// 添加输入事件监听器
usernameInput.addEventListener('input', () => {
    validateUsername();
});

passwordInput.addEventListener('input', () => {
    validatePassword();
});

// 验证账号
function validateUsername() {
    const username = usernameInput.value;
    if (username.length === 0) {
        usernameInput.classList.add('error');
        usernameError.textContent = '请输入账号';
        usernameError.classList.add('show');
        return false;
    }
    if (!usernameRegex.test(username)) {
        usernameInput.classList.add('error');
        usernameError.textContent = '账号必须以字母或下划线开头，且只能包含字母、数字和下划线';
        usernameError.classList.add('show');
        return false;
    }
    usernameInput.classList.remove('error');
    usernameError.classList.remove('show');
    return true;
}

// 验证密码
function validatePassword() {
    const password = passwordInput.value;
    if (password.length === 0) {
        passwordInput.classList.add('error');
        passwordError.textContent = '请输入密码';
        passwordError.classList.add('show');
        return false;
    }
    if (password.length > 8) {
        passwordInput.classList.add('error');
        passwordError.textContent = '密码长度不能超过8位';
        passwordError.classList.add('show');
        return false;
    }
    passwordInput.classList.remove('error');
    passwordError.classList.remove('show');
    return true;
}


// 检查用户名和密码是否匹配预设数据
function checkCredentials(username, password) {
    return validCredentials.some(cred => 
        cred.username === username && cred.password === password
    );
}

// 登录按钮点击事件
loginBtn.addEventListener('click', () => {
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (!isUsernameValid || !isPasswordValid) {
        // 如果格式验证失败，不进行后续检查
        return;
    }

    if (checkCredentials(username, password)) {
        // 清除错误信息
        usernameError.classList.remove('show');
        passwordError.classList.remove('show');
        usernameInput.classList.remove('error');
        passwordInput.classList.remove('error');

        // 显示欢迎信息
        welcomeMessage.textContent = '欢迎回来!'+ username;
        welcomeMessage.style.display = 'block';
    } else {
        // 显示错误信息
        welcomeMessage.textContent = '账号/密码错误！';
        welcomeMessage.style.display = 'block';
        welcomeMessage.style.color = 'red';
    }
});

