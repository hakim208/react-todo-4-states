import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchData = createAsyncThunk('user/fetchData', async () => {
    try {
        let { data } = await axios.get("https://to-dos-api.softclub.tj/api/to-dos")
        return data.data
    } catch (error) {
        console.error(error);
    }
})