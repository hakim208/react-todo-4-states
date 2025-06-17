import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchData } from './fetchData';
import toast from 'react-hot-toast';

export const updateStatus = createAsyncThunk(
  'user/updateStatus',
  async (id, { dispatch }) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`);
      toast.success('Status updated!');
      await dispatch(fetchData());
    } catch (error) {
      toast.error("Update failed.");
      throw error;
    }
  }
);