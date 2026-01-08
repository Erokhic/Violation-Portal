
document.addEventListener('DOMContentLoaded', function() {
    

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
        return
    }
    
    console.log('Текущий пользователь:', currentUser)
    

    if (userName) {
        userName.textContent = currentUser.fio || currentUser.login || 'Пользователь'
    }
    

    if (container_statements) {
        container_statements.style.display = 'block'
    }
    
    if (logout_btn) {
        logout_btn.addEventListener('click', function(e) {
            e.preventDefault()
            
            if (confirm('Вы уверены, что хотите выйти?')) {
                localStorage.removeItem('currentUser')
                window.location.href = 'index.html'
            }
        })
    }
    
    if (add_statement) {
        add_statement.addEventListener('click', function() {
            // Здесь код для открытия формы создания заявления
            alert('Форма создания заявления')
            // Ваш код для добавления заявлений...
        })
    }
    
    function loadStatements() {
        if (!table_statements) return
     
        let statements = JSON.parse(localStorage.getItem('statements')) || []
        
  
        const userStatements = statements.filter(st => st.userId === currentUser.login)
        
 
        if (userStatements.length === 0) {
            table_statements.innerHTML = '<tr><td colspan="4">Нет заявлений</td></tr>'
        } else {
          
            let tableHTML = ''
            userStatements.forEach((statement, index) => {
                tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${statement.title || 'Без названия'}</td>
                        <td>${statement.date || 'Не указана'}</td>
                        <td>${getStatusText(statement.status)}</td>
                    </tr>
                `
            })
            table_statements.innerHTML = tableHTML
        }
    }
    
    function getStatusText(status) {
        const statuses = {
            'new': 'Новое',
            'in_progress': 'В обработке',
            'completed': 'Завершено',
            'rejected': 'Отклонено'
        }
        return statuses[status] || status || 'Неизвестно'
    }
    

    loadStatements()
    
    
    window.createStatement = function(title, description) {
        let statements = JSON.parse(localStorage.getItem('statements')) || []
        
        const newStatement = {
            id: Date.now(),
            userId: currentUser.login,
            title: title,
            description: description,
            date: new Date().toLocaleDateString('ru-RU'),
            status: 'new'
        }
        
        statements.push(newStatement)
        localStorage.setItem('statements', JSON.stringify(statements))
        
    
        loadStatements()
        
        return newStatement
    }
})

