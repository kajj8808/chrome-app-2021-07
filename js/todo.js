const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector("#todo-list");

let todos = [];
const TODOS_KEY = "todos";

/* load todos .. */
const loadTodo = () => {
  const savedTodos = localStorage.getItem(TODOS_KEY);
  if (!savedTodos) {
    return;
  }
  const parsedToDos = JSON.parse(savedTodos);
  todos = parsedToDos;
  todos.forEach(printTodo);
};

/* save todos to localstorage. */
const saveTodo = () => localStorage.setItem(TODOS_KEY, JSON.stringify(todos));

/* delete todo localstorage and browser Element.*/
const deleteTodo = (event) => {
  const li = event.target.parentElement;
  todos = todos.filter((todo) => todo.id !== Number(li.id));
  saveTodo();
  li.remove();
};

/* print todo */
const printTodo = (newTodo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  li.id = newTodo.id;
  span.innerText = `${newTodo.text} `;
  
  button.innerText = "✔";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.prepend(button);
  todoList.appendChild(li);
};

/* todo submit */
const toDoSubmit = (event) => {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  };
  todos.push(newTodoObj);
  printTodo(newTodoObj);
  saveTodo();
};

loadTodo();
todoForm.addEventListener("submit", toDoSubmit);
