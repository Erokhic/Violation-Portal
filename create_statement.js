const title_container = document.querySelector('.title-container')
const gos_znak = document.querySelector('.gos-znak')
const violation_date = document.querySelector('.violation-date')
const description = document.querySelector('.description')
const push_statement = document.querySelector('.push-statement')

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
if(!currentUser){

    alert('Пожалуйста, авторизуйтесь!')
    window.location.href = 'index.html'
}



// function isValidDate(violation_date) {
//     const currentDate = new Date()
//     const currentYear = currentDate.getFullYear()

//     const UserDate = new Date(//)
//     const minDate = new Date('1900-01-01')

//     if (UserDate < minDate) {
//         violation_date.style.backgroundColor = 'red'
//         alert( 'Дата рождения не может быть раньше 01.01.1900')
//     } else if (UserDate > currentYear) {
//         violation_date.style.backgroundColor = 'red'
//         alert ('Дата рождения не может быть в будущем')
//     } else {
//         violation_date.style.borderColor = 'rgb(183, 201, 252)'

//     }

// }






push_statement.addEventListener('click', (e) => {
    e.preventDefault()
    let flag = true


    if (gos_znak.value.trim() === '') {
        gos_znak.style.borderColor = 'red'
        gos_znak.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    } else {
        gos_znak.style.borderColor = 'rgb(183, 201, 252)'
    }

    if (violation_date.value === '') {
        violation_date.style.borderColor = 'red'
        violation_date.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    }
    else {
        violation_date.style.borderColor = 'rgb(183, 201, 252)'
        
    }

    if (description.value.trim() === '') {
        description.style.borderColor = 'red'
        description.style.backgroundColor = 'rgb(255, 171, 171)'
        flag = false
    } else {
        description.style.borderColor = 'rgb(183, 201, 252)'
    }

    if (flag === false) {
        alert('Заявление не создано')
        return
    } else {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))

        const STATUS = {
            new: 'new',
            in_progress : 'in_progress',
            approved : 'approved',
            rejected : 'rejected'
        }

        const statement = {
            idUser: Date.now(),
            gosZnak: gos_znak.value.trim(),
            violation_date: violation_date.value,
            description: description.value.trim(),
            status: STATUS.new,
            userId:  currentUser.login
        }
        let statements = JSON.parse(localStorage.getItem('statements')) || []
        statements.push(statement);
        localStorage.setItem('statements', JSON.stringify(statements))
        console.log(statements)

        alert('Заявление успешно отправлено!')
        window.location.href = 'application_page.html'
    }
})