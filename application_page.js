


const user_info = document.querySelector('.user-info')
const userName = document.querySelector('.userName')
const logout_btn = document.querySelector('.logout-btn')
const container_statements = document.querySelector('.container-statements')
const add_statement = document.querySelector('.add-statement')
const table_statements = document.querySelector('.table-statements')


const currentUser = JSON.parse(localStorage.getItem('currentUser'))

if (!currentUser) {
    alert('Пожалуйста, авторизуйтесь!')
    window.location.href = 'index.html'

}
console.log('Текущий пользователь:', currentUser)


userName.textContent = currentUser.fio || currentUser.login || 'User'



logout_btn.addEventListener('click', (e) => {
    e.preventDefault()

    if (confirm('Вы уверены,что хотите выйти?')) {
        localStorage.removeItem('currentUser')
        window.location.href = 'index.html'
    }
})


add_statement.addEventListener('click', (e) => {
    e.preventDefault()
    window.location.href = 'create_statement.html'
})


function loadStatements() {
    const statements = JSON.parse(localStorage.getItem('statements')) || []
    table_statements.innerHTML = `
    <tr>
    <th>ID</th>
    <th>Гос-номер авто</th>
    <th>Дата</th>
    <th>Описание нарушения</th>
    <th>Статус</th>
    </tr> 
    `

const userStatements = statements.filter(
    item => item.userId === currentUser.login
)
if (userStatements.length === 0) {
    table_statements.innerHTML += `
    <tr>
    <td colspan = "5"> Заявлений нет </td>
    </tr>
    `
    return
}
userStatements.forEach(item => {
    table_statements.innerHTML += `
    <tr>
    <td>${item.idUser}</td>
    <td>${item.gosZnak}</td>
    <td>${item.violation_date}</td>
    <td>${item.description}</td>
    <td>${item.status}</td>
    </tr>
    `
});
}   

loadStatements()
