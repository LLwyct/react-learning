import todoReducer from './todoReducer';
import { combineReducers } from 'redux';


let todoApp = combineReducers({
    todos: todoReducer,
})

export default todoApp;