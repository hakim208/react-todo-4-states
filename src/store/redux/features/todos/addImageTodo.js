import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "./fetchData";
import toast from "react-hot-toast";

export const addImageTodo = createAsyncThunk('user/deleteUser', async ({formAddImages, idxAddImages}, { dispatch }) => {
    try {
        await axios.post(`https://to-dos-api.softclub.tj/api/to-dos/${idxAddImages}/images`, formAddImages)
        toast.success('Successfully toasted!')
        dispatch(fetchData())
    } catch (error) {
        toast.error("This didn't work.")
        console.error(error);
    }
})