// DOM Elements
const submitBtn = document.querySelector("#submit");
const removeBtn = document.querySelector("#removeBtn");
const todoItemsList = document.querySelector("#todo-items");
const inputElement = document.querySelector("#inputTodo");
const filterAll = document.querySelector("#all");
const filterOpen = document.querySelector("#open");
const filterDone = document.querySelector("#done");
let count;

const state = {
  todos: [],
};

loadState();
render();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodo();
  saveState();
});

removeBtn.addEventListener("click", () => {
  state.todos = state.todos.filter((item) => {
    if (!item.done) {
      return true;
    }
    return false;
  });
  saveState();
  render();
});

// push todos to an array and localStorage
function addTodo() {
  const todo = {
    description: inputElement.value,
    id: new Date().getTime(),
    done: false,
  };
  state.todos.push(todo);
  saveState();
  render();
}

// render todos to the browser
function renderTodo(todo) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("data-id", todo.id);
  checkbox.checked = todo.done;

  checkbox.addEventListener("change", (e) => {
    todo.done = e.target.checked;
    saveState();
  });
  li.appendChild(checkbox);

  const label = document.createElement("label");
  label.setAttribute("data-id", todo.id);
  label.appendChild(document.createTextNode(todo.description));
  li.appendChild(label);

  todoItemsList.appendChild(li);
}

function render() {
  todoItemsList.innerHTML = "";

  state.todos.forEach((item) => {
    renderTodo(item);
  });
}

filterOpen.addEventListener("change", () => {});

function loadState() {
  const todoShow = localStorage.getItem("todos");
  if (todoShow !== null) {
    state.todos = JSON.parse(todoShow);
  }
}

// Load Todos in LocalStorage
function saveState() {
  localStorage.setItem("todos", JSON.stringify(state.todos));
}
