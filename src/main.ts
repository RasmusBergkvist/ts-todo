import "./css/style.css";
import { TodoList } from "./todolist";

const manager = new TodoList();

//Hämtar element från DOM.
const todoForm = document.getElementById("todo-form")! as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const completedList = document.getElementById("completed-list") as HTMLUListElement;
const taskInput = document.getElementById("task-input") as HTMLInputElement;
const prioritySelect = document.getElementById("priority-select") as HTMLSelectElement;
const error = document.getElementById("error") as HTMLUListElement;
const completedMessage = document.getElementById("completed-message") as HTMLSpanElement;
const taskMessage = document.getElementById("task-message") as HTMLSpanElement;
const sort = document.getElementById("sort") as HTMLButtonElement;


if (todoForm) {
  todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //Hämtar värden från formulär
    const task = taskInput.value;
    const priority = Number(prioritySelect.value);


    //Rensar tidigare felmeddelande.
    error.innerHTML = "";

    //Validerar värderna
    if (!task.length) {
      error.innerHTML += "<li>Du måste fylla i en uppgift.</li>"
    } else if  (task.length < 3 || task.length > 60) {
      error.innerHTML += "<li>Uppgiften måste bestå av 3 - 60 tecken.</li>"
    }

    if (!priority) {
      error.innerHTML += "<li>Du måste välja prioritet.</li>";
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


  if (todoList && completedList) {
    //Rensar lista innan utskrift
    todoList.innerHTML = "";
    completedList.innerHTML = "";



    if (todos.length === 0) {
      taskMessage.innerHTML = "Det är tomt på listan. Lägg till en uppgift.";
      completedMessage.innerHTML = "";
      return;
    }

    //Filtrer antal upppgifter att göra eller som är slutförda
    const countTask = todos.filter(to => !to.completed);
    const countCompleted = todos.filter(to => to.completed);



    if (countTask.length === 0) {
      taskMessage.innerHTML = "Allt är klart!"
    } else {
      taskMessage.innerHTML = `Kämpa på! Du har ${countTask.length} ${countTask.length === 1 ? "sak" : "saker"} kvar på listan.`
    }

    if (countCompleted.length === 0) {
      completedMessage.innerHTML = "Inget på listan är klart, men du är på gång!"
    } else {
      completedMessage.innerHTML = `Bra jobbat! Du är färdig med ${countCompleted.length} ${countCompleted.length === 1 ? "sak" : "saker"}!`
    }



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
      liEl.innerHTML = `
      <label>
      <input type="checkbox" ${todo.completed ? "checked" : ""}> 
      <span class="task">${todo.task}</span>
      </label>
      <div class="items-right">
      <span class="prios prio${todo.priority}">Prio: ${priorityText[todo.priority] || todo.priority}</span>
      <button class="delete-btn">Ta bort</button>
      </div>
      
     
      `;

      //Hämtar input-element från skapat element
      const checkbox = liEl.querySelector("input") as HTMLInputElement;

      //Lyssnar om checkbox ändras. I så fall skickas uppgiftens id till metoden markTodoCompleted.
      checkbox.addEventListener("change", () => {
        manager.markTodoCompleted(todo.id);
        //Uppdaterar listan i DOM
        renderToDos();

      });

      //Hämtar button-element
      const deleteBtn = liEl.querySelector(".delete-btn") as HTMLButtonElement;

      //Lyssnar på klick i knappen och anopar metod som filtrerar bort uppgiften med rätt id.
      deleteBtn.addEventListener("click", ()=>{
        manager.deleteTodos(todo.id);
        renderToDos();

      });

      //Lägger till uppgiften i rätt lista beoende om den är utförd eller inte.
      if (todo.completed) {
        completedList.appendChild(liEl);
      } else {
        todoList.append(liEl);

      }
    });
    
  }
}

//Hämtar metod och sortera prioriteringar.
function sortPrio() {
  if (sort) {

    sort.addEventListener("click", () => {
      manager.sortTodosPrio();
      renderToDos();

    });
  }
}
sortPrio();
renderToDos();