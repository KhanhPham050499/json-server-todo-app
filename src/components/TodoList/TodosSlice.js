// const initialState = [
//     { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//     { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//     { id: 3, name: 'Learn Javascript', completed: false, priority: 'Low' },
// ];

// const TodoReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'todoList/addTodo':
//             return [...state, action.payload];

//         case 'todoList/completedTodo':
//             return [...state, action.payload];

//         default:
//             return state;
//     }
// }

// export default TodoReducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todoList: [],
    loading: false,
    loadingAdd: false,
    error: null,
}

export default createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        fetchTodoLoading: (state) => {
            state.loading = true;
        },

        fetchTodoSuccess: (state, action) => {
            state.loading = false;
            state.todoList = action.payload;
        },

        fetchTodoError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        fetchTodoAddLoading: (state) => {
            state.loadingAdd = true;
        },

        fetchTodoAddSuccess: (state) => {
            state.loadingAdd = false;
        },

        fetchTodoAddError: (state) => {
            state.loadingAdd = false;
        },
    }
})

// export const { addTodo, toggleTodo } = TodoSlice.actions;