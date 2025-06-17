import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "./fetchData";
import toast from "react-hot-toast";

export const deleteImageTodo = createAsyncThunk('user/deleteUser', async (id, { dispatch }) => {
    try {
        await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`)
        toast.success('Successfully toasted!')
        dispatch(fetchData())
    } catch (error) {
        toast.error("This didn't work.")
        console.error(error);
    }
})