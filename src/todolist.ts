//Hämtar interface
import type { Todo } from "./todo";

//Hämtar StorageTodo som hanterar Local Storage.
import { StorageTodo } from "./storagetodo";

class TodoList {
    //Skapar en array för uppgifterna. 
    private todos: Todo[] = []

    constructor() {
        //Hämtar data från local storage
        this.todos = StorageTodo.loadTodo();
    }

    public addToDo(task: string, priority: number): boolean {
        //Kontroll att task och prioritet har värde
        if (!task || !priority) {
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


