const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('button[id^="filter-"]');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    const filteredTodos = filter === 'all' ? todos : todos.filter(todo => filter === 'active' ? !todo.completed : todo.completed);
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) li.classList.add('completed');
        li.addEventListener('click', () => toggleTodoCompletion(index));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(index);
        });
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
}

function toggleTodoCompletion(index) {
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

addTodoBtn.addEventListener('click', addTodo);
filterButtons.forEach(button => {
    button.addEventListener('click', () => renderTodos(button.id.split('-')[1]));
});

renderTodos();