import { atom } from 'jotai';
import axios from 'axios';

export const dataAtom = atom([]);
export const refreshAtom = atom(0)

export const fetchDataAtom = atom(
  null,
  async (get, set) => {
    try {
      const response = await axios.get('https://to-dos-api.softclub.tj/api/to-dos');
      set(dataAtom, response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);

export const addUserAtom = atom(
  null,
  async (get, set, formData) => {
    try {
      await axios.post('https://to-dos-api.softclub.tj/api/to-dos', formData);
      setRefresh((prev) => prev + 1)
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }
);

export const addImageAtom = atom(
  null,
  async (get, set, { formAddImages, idxAddImages }) => {
    try {
      await axios.post(`https://to-dos-api.softclub.tj/api/to-dos/${idxAddImages}/images`, formAddImages)
      get(fetchDataAtom);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }
);

export const editUserAtom = atom(
  null,
  async (get, set, updatedUser) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/api/to-dos`, updatedUser);
      get(fetchDataAtom);
    } catch (error) {
      console.error("Error editing user:", error);
    }
  }
);

export const deleteUserAtom = atom(
  null,
  async (get, set, id) => {
    try {
      await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`);
      await get(fetchDataAtom);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
);

export const deleteImageAtom = atom(
  null,
  async (get, set, id) => {
    try {
      await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`);
      await get(fetchDataAtom);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
);

export const editStatusAtom = atom(
  null,
  async (get, set, id) => {
    try {
      await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`);
      await get(fetchDataAtom);
    } catch (error) {
      console.error("Error editing status:", error);
    }
  }
);
