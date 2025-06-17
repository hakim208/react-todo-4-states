import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchData } from "./fetchData";
import toast from "react-hot-toast";

export const deleteUser = createAsyncThunk('user/deleteUser', async (id, { dispatch }) => {
    try {
        await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`)
        toast.success('Successfully toasted!')
        dispatch(fetchData())
    } catch (error) {
        toast.error("This didn't work.")
        console.error(error);
    }
})