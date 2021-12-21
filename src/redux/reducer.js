import { combineReducers } from 'redux';

import FiltersReducer from './../components/Filters/FiltersSlice';
import TodoReducer from './../components/TodoList/TodosSlice';


// const rootReducer = (state = {}, action) => {
//     return {
//         filters: FiltersReducer(state.filters, action),
//         todoList: TodoReducer(state.todoList, action),
//     }
// }

const rootReducer = combineReducers({
    filters: FiltersReducer,
    todoList: TodoReducer
})

export default rootReducer;