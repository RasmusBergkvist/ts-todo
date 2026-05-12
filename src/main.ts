import "./css/style.css";
import { TodoList } from "./todolist";

const manager = new TodoList();

//Hämtar element från DOM.
const todoForm = document.getElementById("todo-form")! as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const completedList = document.getElementById("completed-list") as HTMLUListElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const prioritySelect = document.getElementById("priority-select") as HTMLSelectElement;
const error = document.getElementById("error") as HTMLSpanElement;

if (todoForm) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //Hämtar värden från formulär
    const task = taskInput.value;
    const priority = Number(prioritySelect.value);


    //Rensar tidigare felmeddelande.
    error.innerHTML = "";

    //Validerar värderna
    if (task.length < 3) {
      error.innerHTML += "Du måste skriva en uppgift. Minst 3 tecken."
    }

    if (!priority) {
      error.innerHTML += "Du måste välja prioritet.";
    }

    //Om felmeddelande finns, avbryt.
    if (error.innerHTML) {
      return;
    }

    //Skickar ny uppgifter till addToDo i ToDoList.ts
    const addTask = manager.addToDo(task, priority);

    if (addTask) {
      //Anropar functiom rederToDos
      renderToDos();

      //Rensar formulär
      todoForm.reset();
    }
  });

}

function renderToDos() {
  //Hämtar uppgifter ska ska skrivas ut.
  const todos = manager.getTodos();


  if (todoList) {
    //Rensar lista innan utskrift
    todoList.innerHTML = "";

    //Objekt som översätter prioriteringnummer till text. 
    const priorityText: Record<number, string> = {
      1: "Hög",
      2: "Medel",
      3: "Låg"
    }


    todos.forEach((todo) => {
      //Skapar li-element med tillgörande klassnamn
      const liEl = document.createElement("li");
      liEl.className = "todo-item";

      //Skriv ut till DOM
      liEl.innerHTML += `
      <input type="checkbox">
      <span class="task">${todo.task}</span>
      <span class="prio">Prioritet: ${priorityText[todo.priority] || todo.priority}</span>
      <label>
      `;

      //Lägger till liEl i todoList
      todoList.append(liEl);

    });
  }
}

renderToDos();