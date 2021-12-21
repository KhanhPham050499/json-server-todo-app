// const initialState = {
//     search: '',
//     status: 'All',
//     priority: []
// }

// const FiltersReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'filters/searchFilter':
//             return {
//                 ...state,
//                 search: action.payload
//             }

//         case 'filters/statusFilter':
//             return {
//                 ...state,
//                 status: action.payload
//             }

//         case 'filters/prioriryFilter':
//             return {
//                 ...state,
//                 priority: action.payload
//             }

//         default:
//             return state;
//     }
// }

// export default FiltersReducer;


import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'filters',
    initialState: {
        search: '',
        status: 'All',
        priority: ''
    },
    reducers: {
        searchFilter: (state, action) => {
            state = action.payload;
        },
    }
})

// export const { searchFilter, statusFilter, prioriryFilter } = FilterSlice.actions