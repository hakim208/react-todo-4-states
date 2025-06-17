import { configureStore } from '@reduxjs/toolkit'
import todosSlice from './features/todos/todosSlice'
import fetchData from './features/syncTodo/fetchData'

export const store = configureStore({
    reducer: {
        user: todosSlice,
        todo: fetchData
    },
})