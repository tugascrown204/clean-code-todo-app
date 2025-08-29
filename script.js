const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('button[id^="filter-"]');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Renders the list of todos based on the selected filter
function renderTodos(filter = 'all') {
    todoList.innerHTML = ''; // Clear the todo list
    // Filter todos based on the filter type
    const filteredTodos = filter === 'all' ? todos : todos.filter(todo => filter === 'active' ? !todo.completed : todo.completed);
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.textContent = todo.text; // Set the text for the todo item
        if (todo.completed) li.classList.add('completed'); // Mark completed todos
        li.addEventListener('click', () => toggleTodoCompletion(index)); // Toggle completion on click
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        // Add event listener for delete button
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent triggering the li click event
            deleteTodo(index); // Delete the todo
        });
        li.appendChild(deleteBtn); // Append delete button to the list item
        todoList.appendChild(li); // Append list item to the todo list
    });
}

// Adds a new todo to the list
function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({ text: todoText, completed: false }); // Add new todo
        localStorage.setItem('todos', JSON.stringify(todos)); // Save to local storage
        todoInput.value = ''; // Clear input field
        renderTodos(); // Re-render the todo list
    }
}

// Toggles the completion state of a todo
function toggleTodoCompletion(index) {
    todos[index].completed = !todos[index].completed; // Change completion status
    localStorage.setItem('todos', JSON.stringify(todos)); // Update local storage
    renderTodos(); // Re-render the todo list
}

// Deletes a todo from the list
function deleteTodo(index) {
    todos.splice(index, 1); // Remove the todo
    localStorage.setItem('todos', JSON.stringify(todos)); // Update local storage
    renderTodos(); // Re-render the todo list
}

addTodoBtn.addEventListener('click', addTodo); // Add event listener for adding todo
filterButtons.forEach(button => {
    button.addEventListener('click', () => renderTodos(button.id.split('-')[1])); // Add event listener for filtering
});

renderTodos(); // Initial render of the todo list