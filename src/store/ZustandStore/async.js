import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


const GetStore = create((set, get) => ({
    data: [],
    fetchData: async () => {
        try {
            const { data } = await axios.get(`https://to-dos-api.softclub.tj/api/to-dos`);
            set({ data });
        } catch (error) {
            console.error("Fetch error:", error);
        }
    },
    deleteUser: async (id) => {
        try {
            await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`)
            toast.success('Successfully toasted!')
            get().fetchData()
        } catch (error) {
            toast.error("This didn't work.")
            console.error(error);
        }
    },
    editUser: async (obj) => {
        try {
            await axios.put("https://to-dos-api.softclub.tj/api/to-dos", obj)
            toast.success('Successfully toasted!')
            get().fetchData()
        } catch (error) {
            toast.error("This didn't work.")
            console.error(error);
        }
    },
    addUser: async (form) => {
        try {
            await axios.post("https://to-dos-api.softclub.tj/api/to-dos", form)
            toast.success('Successfully toasted!')
            get().fetchData()
        } catch (error) {
            toast.error("This didn't work.")
            console.error(error);
        }
    },
    editStatus: async (id) => {
        try {
            await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
            toast.success('Successfully toasted!')
            get().fetchData()
        } catch (error) {
            toast.error("This didn't work.")
            console.error(error);
        }
    },
    deleteImages: async (id) => {
        try {
            await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos/images/${id}`)
            toast.success('Successfully toasted!')
            get().fetchData()
        } catch (error) {
            toast.error("This didn't work.")
            console.error(error);
        }
    },
    addImages: async ({ formAddImages, idxAddImages }) => {
        try {
            toast.promise(
                await axios.post(`https://to-dos-api.softclub.tj/api/to-dos/${idxAddImages}/images`, formAddImages,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                ),
                {
                    loading: 'Uploading images...',
                    success: <b>Images uploaded successfully!</b>,
                    error: <b>Upload failed.</b>,
                }
            );
            get().fetchData()
        } catch (error) {
            console.error(error);
        }
    }
}));

export default GetStore;
