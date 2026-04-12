import { createContext, useContext } from "react";

export const ToDoContext  = createContext({
    todos: [
        {id: 1,
         todo : "To do message",
         completed: false
        }
    ],
    addToDo: (todo) => {},
    updateToDo: (is, todo) => {},
    deleteToDo: (id) => {},
    toggleComplete: (id) => {}
    // It is like a interface we just define here it have just whata we have  
})

export const useToDo = () =>  {
    return useContext(ToDoContext)
}

export const ToDoProvider = ToDoContext.Provider