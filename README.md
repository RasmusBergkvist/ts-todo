# Todo-applikation

## Laborationsbeskrivning
I denna laboration har jag skapat en ”att göra-applikation” där man kan lägga till uppgifter och prioritet. Det går att markera uppgifterna som slutförda samt att de sparas till Local Storage. Det finns även ett interface med objektets egenskaper och en klass som hanterar metoderna som utförs.

### Url till appplikation
https://rb-todo-list.netlify.app/

### Tekniker
* HTML
* CSS
* TypeScript
* Objektorienterad programmering

---

## Interface Todo
Applikationen använder ett interface bestående av:

```
export interface Todo {
    id: number,
    task: string,
    priority: number,
    completed: boolean
}
```

---

## Klass TodoList
Klassen hanterar följande metoder:

* **addToDo(task: string, priority: number):** Validerar inmatningen och lägger till en ny uppgift med ett id som skapas med hjälp av Date.now(). Uppgiften sparas sedan till Local Storage.

```
const newTodo: Todo = {
    id: Date.now(),
    task: task,
    priority: priority,
    completed: false
};
```

* **getTodos():** Hämtar arrayen med alla todos som ska skrivas ut till DOM.

* **markTodoCompleted(todoId: number):** Letar upp rätt uppgift med hjälp av dess id, ändrar boolean om uppgiften är slutförd samt sparar detta till Local Storage.

* **sortTodosPrio():** Sorterar listan efter prioritering från hög (1) till låg (3) och växlar ordning vid klick.

```typescript
if (this.sortAscending) {
    this.todos.sort((a, b) => a.priority - b.priority);
} else {
    this.todos.sort((a, b) => b.priority - a.priority);
}
```

* **deleteTodos(deleteId: number):** Hanterar borttagning av en specifik uppgift som filtreras bort baserat på dess id, samtidigt som övriga uppgifter i listan behålls.

---

## Local Storage
Klassen StorageTodo hanterar att uppgifterna sparas och laddas från webbläsarens minne:

* **saveTodo(todos: Todo[]):** Omvandlar arrayen med uppgifter till JSON-data och sparar den i Local Storage.
* **loadTodo():** Hämtar sparad data från webbläsarens minne. Om det finns sparade uppgifter omvandlas JSON-data tillbaka till JavaScript-objekt, annars returneras en tom array.

---

## Main.ts
Här kopplas klassen TodoList med applikationens funktioner och interaktion.

* **Manager:** Kopplar samman metoderna addToDo(), markTodoCompleted() och sortTodosPrio().
* **Validering och felmeddelande:**  Kontroll att texten är mellan 3 och 60 tecken och att en prioritet har valts. Vid fel skrivs meddelanden ut till användaren. Om uppgifterna är korrekt ifyllda skickas task och priority till metoden addTodo.
* **Funktionen renderToDos():** Hämtar data från getTodos() och skapar element som innehåller nya eller befintliga uppgifter som ska skrivas ut till DOM.
* **Funktionen sortPrio():** Lyssnar efter klick på knappen och anropar metoden sortTodosPrio för att uppdatera listans ordning.
