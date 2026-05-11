//Hämtar interface 
import type { Todo } from "./todo";

//Klass för att hanterar LocalStorage
export class StorageTodo {

    //Skapar nyckel till att hitta data i Localstorage
    private static key = "todoItems"

    //Sparar arrayen Todo till LocalStorage, som omvandlas till JSON-data
    static saveTodo(todos: Todo[]){
        localStorage.setItem(this.key, JSON.stringify(todos));
    }

    //Laddar innehåll i arrayen Todo. Om data finns omvandlas detta till JS-objekt, annars returneras en tom array.
    static loadTodo(): Todo[]{
        const data = localStorage.getItem(this.key);
        if(data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
}