import { createSlice } from "@reduxjs/toolkit"
import { fetchData } from "./fetchData"

const todosSlice = createSlice({
    name: "user",
    initialState: {
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }
})

export default todosSlice.reducer