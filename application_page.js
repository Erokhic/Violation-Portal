
// document.addEventListener('DOMContentLoaded', function() {
    

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
    

    if (userName) {
        userName.textContent = currentUser.fio + ' (' + currentUser.login + ')'
    }
    

    if (container_statements) {
        container_statements.style.display = 'block'
    }
    
if(logout_btn){
    logout_btn.addEventListener('click', (e)=>{
        e.preventDefault()

        if (confirm('Вы уверены,что хотте выйти?')) {
            localStorage.removeItem('currentUser')
            window.location.href = 'index.html'
        }
    })
}


if (add_statement) {
    add_statement.addEventListener('click', (e)=>{
        e.preventDefault()
        window.location.href = 'create_statement.html'
    })
}

    
   