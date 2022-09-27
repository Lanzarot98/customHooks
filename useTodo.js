import { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer';

const initialState = []

const init = () => {
    // si es null el JSON.parse, hace la evaluación del array vacío y lo retorna
    // y si lo primero tiene valor, entonces eso es lo que se retorna
    return JSON.parse( localStorage.getItem('toDos')) || [];
}

export const useTodo = () => {
    
    const [ toDos, dispatch ] = useReducer( todoReducer, initialState, init );
    
    useEffect (() => {
        localStorage.setItem('toDos', JSON.stringify( toDos ));
    }, [toDos])

    const handleNewTodo = ( toDo ) => {
        // aquí es el todo que quiero insertar, es decir
        // el payload que quiero enviar a mi reducer
        const action = {
            type: '[TODO] Add ToDo',
            payload: toDo
        }
        dispatch( action );
    }
    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove ToDo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle ToDo',
            payload: id
        });
    }
    
    const toDosCount = toDos.length;
    const pendingTodosCount = toDos.filter((toDo)=> !toDo.done).length; // no agrega a los que estén en true

  return { 
    toDos, 
    toDosCount, 
    pendingTodosCount, 
    handleNewTodo, 
    handleDeleteTodo, 
    handleToggleTodo 
  }
}
