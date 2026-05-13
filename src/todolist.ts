//Hämtar interface
import type { Todo } from "./todo";

//Hämtar StorageTodo som hanterar Local Storage.
import { StorageTodo } from "./storagetodo";

export class TodoList {
    //Skapar en array för uppgifterna. 
    private todos: Todo[] = []

    constructor() {
        //Hämtar data från local storage
        this.todos = StorageTodo.loadTodo();
    }

    //Hämtar arrayen med Todos som ska skrivas ut till DOM
    public getTodos(): Todo[] {
        return this.todos;
    }

    //Hanterar utförda uppgifter.
    public markTodoCompleted(todoId: number): void {

        //Letar upp uppgiften med hjälp av id
        const todo = this.todos.find(todo => todo.id === todoId);

        //Om uppgiften inte finns, avbryt
        if(!todo) return;

        //Växlar status om uppgiften är utförd
        todo.completed = !todo.completed;

        //Sparar till Local Storage
        StorageTodo.saveTodo(this.todos);
    }

    public addToDo(task: string, priority: number): boolean {
        //Kontroll att input-värde har minst tre tecken samt att prioritet är valt. 
        if (task.length < 3 || !priority) {
            return false;
        }

        //Skapar nytt todo-objekt
        const newTodo: Todo = {
            id: Date.now(),
            task: task,
            priority: priority,
            completed: false
        };

        //Lägger till ny uppgift i arrayen
        this.todos.push(newTodo);

        //Spara uppgiften till Local Storage
        StorageTodo.saveTodo(this.todos);

        //Retunerar true om ny uppgift har skapats. 
        return true;


    }

    private sortAscending: boolean = false;

    public sortTodosPrio(): void {

        if (this.sortAscending) {
            //Hög prio först
            this.todos.sort((a, b) => a.priority - b.priority);
        } else {

            //Låg prio först
            this.todos.sort((a, b) => b.priority - a.priority)
        }

        //Växlar ordning vid nästa klick.
        this.sortAscending = !this.sortAscending;
    }
    
    //Hanterar borttagning av uppgift
    public deleteTodos(deleteId: number): void {

        //Filterar bort uppgiften med rätt id och behåller övriga
        this.todos = this.todos.filter((todo) => todo.id !== deleteId);

        //Sparar till Local Storage
        StorageTodo.saveTodo(this.todos);
        
    }
}


