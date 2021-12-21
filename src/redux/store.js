// import { createStore } from 'redux';
// import rootReducer from './reducer';

// const store = createStore(rootReducer);

// export default store;


import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from '../components/Filters/FiltersSlice';
import todoListSlice from '../components/TodoList/TodosSlice';

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todoListSlice.reducer,
  },
})

export default store