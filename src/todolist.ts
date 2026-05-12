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
    public getTodos(): Todo[]{
        return this.todos;
    }

    //Hanterar utförda uppgifter.
    public markTodoCompleted(todoIndex: number):void{
        //Om uppgiften inte finns i todoIndex, avbryt.
        if(!this.todos[todoIndex]) return;

        //Skiftar statusen mellan utförd och inte utförda uppgifter.
        this.todos[todoIndex].completed = !this.todos[todoIndex].completed;
        //Sparar till local storage.
        StorageTodo.saveTodo(this.todos);
    }

    public addToDo(task: string, priority: number): boolean {
        //Kontroll att input-värde har minst tre tecken samt att prioritet är valt. 
        if (task.length < 3 || !priority) {
            return false;
        }

        //Skapar nytt todo-objekt
        const newTodo: Todo = {
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


}


