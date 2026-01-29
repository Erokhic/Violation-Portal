
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

const admin_panel = document.querySelector('.admin-panel')
const index = document.querySelector('.index')
const logout_btn = document.querySelector('.logout-btn')
const container_statements = document.querySelector('.container-statements')
const table = document.querySelector('.table')

let users = JSON.parse(localStorage.getItem('users')) || []
let flag = true



admin_panel.style.display = 'none'

const admin = {
    login: "admin",
    password: "password",
    fio: 'Админович',
    tel: '88005553535',
    email: 'admin@mail.ru'
};




if (authorization_form) {
    authorization_form.style.display = 'none'
}

if (reg) {
    reg.reset()
}


if (ex_btn) {
    ex_btn.addEventListener('click', () => {
        registration_form.style.display = ''
        authorization_form.style.display = 'none'
        reg.reset()
        authZ_login.style.borderColor = ''
        authZ_login.style.backgroundColor = ''
        authZ_password.style.borderColor = ''
        authZ_password.style.backgroundColor = ''
        authZ_login.value = ''
        authZ_password.value = ''
    })
}


if (next_btn) {
    next_btn.addEventListener('click', (e) => {
        e.preventDefault()
        registration_form.style.display = 'none'
        authorization_form.style.display = ''

    })
}

if (reg_btn) {
    reg_btn.addEventListener('click', (e) => {
        e.preventDefault()
        let flag = true


        if (reg_login.value.trim() === admin.login) {
            alert('Зарегистрировать имя администратора невозможно!')
            reg_login.style.borderColor = 'red'
            reg_login.style.backgroundColor = 'rgb(255, 171, 171)'
        }

        if (reg_login.value.trim() === '') {
            reg_login.style.borderColor = 'red'
            reg_login.style.backgroundColor = 'rgb(255, 171, 171)'
            flag = false
        } else {
            reg_login.style.borderColor = 'rgb(183, 201, 252)'
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
            reg_password.style.borderColor = 'rgb(183, 201, 252)'
        }

        if (reg_fio.value.trim() === '') {
            reg_fio.style.borderColor = 'red'
            reg_fio.style.backgroundColor = 'rgb(255, 171, 171)'
            flag = false
        } else {
            reg_fio.style.borderColor = 'rgb(183, 201, 252)'
        }


        if (reg_tel.value.trim() === '') {
            reg_tel.style.borderColor = 'red'
            reg_tel.style.backgroundColor = 'rgb(255, 171, 171)'
            flag = false
        } else if (reg_tel.value.replace(/\D/g, '').length !== 11) {
            alert('Номер должен состоять из 11 цифр')
            reg_tel.style.borderColor = 'red'
            reg_tel.style.backgroundColor = 'rgb(255, 171, 171)'
            flag = false

        } else {
            reg_tel.style.borderColor = 'rgb(183, 201, 252)'
        }


        if (reg_email.value.trim() === '') {
            reg_email.style.borderColor = 'red'
            reg_email.style.backgroundColor = 'rgb(255, 171, 171)'
            flag = false
        } else if (!reg_email.value.includes('@')) {
            alert('Введите правильную почту, используя спецзнак (@)')
            flag = false
        } else {
            reg_email.style.borderColor = 'rgb(183, 201, 252)'
        }



        if (flag === false) {
            console.log('Объект не создан');
            return
        } else {
            alert(reg_fio.value.trim() + ' ,Вы зарегистрированы!')
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
                reg_login.style.borderColor = 'red'
                reg_login.style.backgroundColor = 'rgb(255, 171, 171)'
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
}


if (authZ_btn) {
    authZ_btn.addEventListener('click', (e) => {
        e.preventDefault()
        let flag = true

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
            return

        } else {
            if (admin.login === authZ_login.value.trim() && admin.password === authZ_password.value.trim()) {
                registration_form.style.display = 'none'
                authorization_form.style.display = 'none'
                admin_panel.style.display = ''
                localStorage.setItem('currentUser', JSON.stringify(admin))
                alert('Приветствуем Вас в панеле администратора')
                createAdminPanel()
                return
            }
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


                localStorage.setItem('currentUser', JSON.stringify(foundUser))

            }
        }

        if (flag === false) {
            console.log('Объект не создан');

        }

        else {
            if (registration_form) registration_form.style.display = 'none'
            if (authorization_form) authorization_form.style.display = 'none'

            const currentUser = JSON.parse(localStorage.getItem('currentUser'))
            if (currentUser) {
                alert(currentUser.fio + ' , вы успешно авторизовались!')
                window.location.href = 'application_page.html'
            }


        }
    })
}

document.addEventListener('DOMContentLoaded', function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser && currentUser.login === 'admin') {
        if (registration_form) registration_form.style.display = 'none'
        if (authorization_form) authorization_form.style.display = 'none'
        if (admin_panel) {
            admin_panel.style.display = ''
            createAdminPanel()
        }
    }
})




function createAdminPanel() {
    localStorage.setItem('currentUser', JSON.stringify(admin))

    if (!admin) {
        alert('Пожалуйста, авторизуйтесь!')
        window.location.href = 'index.html'
    }

    logout_btn.addEventListener('click', (e) => {
        e.preventDefault()

        if (confirm('Вы уверены,что хотите выйти?')) {
            localStorage.removeItem('currentUser')
            window.location.href = 'index.html'
        }
    })
    loadAllStatements()

}


function loadAllStatements() {
    const statements = JSON.parse(localStorage.getItem('statements')) || []
    const users = JSON.parse(localStorage.getItem('users')) || []

    const STATUS = JSON.parse(localStorage.getItem('STATUS')) || {
        new: 'новая',
        approved: 'принята',
        rejected: 'отклонена'
    };


    table.innerHTML = `
        <tr>
        <th>ФИО подавшего</th>
        <th>Описание нарушения</th>
        <th>Гос-номер авто</th>
        <th>Дата</th>
        <th>Статус</th>
        </tr> 
    `
 window.statusChanges = []


    statements.forEach(statement => {
        const user = users.find(u => u.login === statement.userId)

        if (user) {
            const statementId = statement.id || '0'

            table.innerHTML += `
        <tr>
        <td>${user.fio}</td>
        <td>${statement.description}</td>
        <td>${statement.gosZnak}</td>
        <td>${statement.violation_date}</td>
        <td>
        <select onchange="changeStatus('${statementId}' , this.value)">
        <option ${statement.status === 'new' ? 'selected' : ''}>${STATUS.new}</option>
        <option ${statement.status === 'approved' ? 'selected' : ''}>${STATUS.approved}</option>
        <option ${statement.status === 'rejected' ? 'selected' : ''}>${STATUS.rejected}</option>
        </select>
        </td>
        </tr>
        `
        }

    });

// const saveBtn = document.getElementById('.saveBtn')
//    saveBtn.addEventListener('click', (e) => {
//     e.preventDefault()

}

function changeStatus(id, newStatus) {
    let statements = JSON.parse(localStorage.getItem('statements')) || []
    let statement = statements.find(s => s.id === String(id))
    if (!statement) return
    if (statement) {
        statement.status = newStatus
        localStorage.setItem('statements', JSON.stringify(statements))

        loadAllStatements()
    }
}
