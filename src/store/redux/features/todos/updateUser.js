import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchData } from './fetchData';
import toast from 'react-hot-toast';

export const updateUser = createAsyncThunk(
  'user/updateStatus',
  async (obj, { dispatch }) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/api/to-dos`,obj);
      toast.success('User updated!');
      await dispatch(fetchData());
    } catch (error) {
      toast.error("Update failed.");
      throw error;
    }
  }
);