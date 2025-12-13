const registration_form = document.querySelector('.registration-form')
const reg_login = document.querySelector('.reg-login')
const reg_password = document.querySelector('.reg-password')
const reg_fio = document.querySelector('.reg-fio')
const reg_tel = document.querySelector('.reg-tel')
const reg_email = document.querySelector('.reg-email')
const reg_btn = document.querySelector('.reg-btn')
const reg = document.querySelector('.reg')
const next_btn = document.querySelector('.next-btn')

const authorization_form = document.querySelector('.authorization-form')
const authZ_login = document.querySelector('.authZ-login')
const authZ_password = document.querySelector('.authZ-password')
const authZ = document.querySelector('.authZ')
const authZ_btn = document.querySelector('.authZ-btn')
const ex_btn = document.querySelector('.ex-btn')





let users = JSON.parse(localStorage.getItem('users')) || []
let flag = true
authorization_form.style.display = 'none'
reg.reset()



if (ex_btn) {
    ex_btn.addEventListener('click', () => {
        registration_form.style.display = ''
        authorization_form.style.display = 'none'
        reg.reset()
    })
}


if (next_btn) {
    next_btn.addEventListener('click', (e) => {
        e.preventDefault()
        registration_form.style.display = 'none'
        authorization_form.style.display = ''

    })
}

reg_btn.addEventListener('click', (e) => {
    e.preventDefault()
    flag = true

    if (reg_login.value.trim() === '') {
        reg_login.style.borderColor = 'red'
        reg_login.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    } else {
        reg_login.style.borderColor = 'pink'
    }

    if (reg_password.value.trim() === '') {
        reg_password.style.borderColor = 'red'
        reg_password.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    } else if (reg_password.value.length < 6) {
        alert('Пароль должен быть минимум 6 символов')
        reg_password.style.borderColor = 'red'
        reg_password.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    }
    else {
        reg_password.style.borderColor = 'pink'
    }

    if (reg_fio.value.trim() === '') {
        reg_fio.style.borderColor = 'red'
        reg_fio.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    } else {
        reg_fio.style.borderColor = 'pink'
    }


    if (reg_tel.value.trim() === '') {
        reg_tel.style.borderColor = 'red'
        reg_tel.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    } else if (reg_tel.value.length !== 11) {
        alert('Номер должен состоять из 11 цифр')
        reg_tel.style.borderColor = 'red'
        reg_tel.style.backgroundColor = 'rgb(255, 171, 171)'

    } else {
        reg_tel.style.borderColor = 'pink'
    }


    if (reg_email.value.trim() === '') {
        reg_email.style.borderColor = 'red'
        reg_email.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    }else if (!reg_email.value.includes('@')) {
        alert('Введите правильную почту')
        flag = false
    }else {
        reg_email.style.borderColor = 'pink'
    }



    if (flag === false) {
        console.log('Объект не создан');
        return
    } else {
        const user = {
            login: reg_login.value.trim(),
            password: reg_password.value.trim(),
            fio: reg_fio.value.trim(),
            tel: reg_tel.value.trim(),
            email: reg_email.value.trim()
        }
        const uniq = users.some(u => u.login === reg_login.value.trim())
        if (uniq) {
            alert('Пользователь с таким логином уже существует')
            return
        }
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
        console.log(user);
        console.log(users);

        registration_form.style.display = 'none'
        authorization_form.style.display = ''
        reg.reset()


        authZ_login.value = ''
        authZ_password.value = ''
        authZ_login.style.borderColor = ''
        authZ_login.style.backgroundColor = ''
        authZ_password.style.borderColor = ''
        authZ_password.style.backgroundColor = ''
    }

})


authZ_btn.addEventListener('click', (e) => {
    e.preventDefault()
    flag = true

    authZ_login.style.borderColor = ''
    authZ_login.style.backgroundColor = ''
    authZ_password.style.borderColor = ''
    authZ_password.style.backgroundColor = ''


    if (authZ_login.value.trim() === '' || authZ_password.value.trim() === '') {
        authZ_login.style.borderColor = 'red'
        authZ_login.style.backgroundColor = 'rgb(255, 171, 171)'
        authZ_password.style.borderColor = 'red'
        authZ_password.style.backgroundColor = 'rgb(255, 171, 171)'
        alert('Заполните все поля')
        flag = false

    } else {

        const foundUser = users.find(user =>
            user.login === authZ_login.value.trim() &&
            user.password === authZ_password.value.trim()
        )
        if (!foundUser) {
            alert('Вы ввели неправильный логин или пароль')
            authZ_login.style.borderColor = 'red'
            authZ_login.style.backgroundColor = 'rgb(255, 171, 171)'
            authZ_password.style.borderColor = 'red'
            authZ_password.style.backgroundColor = 'rgb(255, 171, 171)'
            flag = false
        } else {
            authZ_login.style.borderColor = ''
            authZ_login.style.backgroundColor = ''
            authZ_password.style.borderColor = ''
            authZ_password.style.backgroundColor = ''
            localStorage.setItem('Useer', JSON.stringify(foundUser))
        }
    }



    if (flag === false) {
        console.log('Объект не создан');

    } else {
        registration_form.style.display = 'none'
        authorization_form.style.display = 'none'
        alert('Успешная авторизация')
    }
})
