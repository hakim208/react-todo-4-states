import { createSlice } from '@reduxjs/toolkit'

const fetchData = createSlice({
    name: "todo",
    initialState: {
        data: [
            {
                id: 1,
                name: "ALi",
                status: true,
                description: "ALO",
                image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            }
        ]
    },
    reducers: {
        deleteTodo: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)
        },
        editStatus: (state, action) => {
            const item = state.data.find(todo => todo.id === action.payload)
            if (item) {
                item.status = !item.status
            }
        },
        editUser: (state, action) => {
            const { id, ...updatedFields } = action.payload;
            state.data = state.data.map(user =>
                user.id === id ? { ...user, ...updatedFields } : user
            );
        },
        addUser: (state, actions) => {
            state.data = [...state.data, ...actions.payload]
        }
    }
})

export const { deleteTodo, editStatus, editUser ,addUser} = fetchData.actions
export default fetchData.reducer;