import { create } from "zustand";

const useStore = create((set) => ({
    data: [
        {
            id: 1,
            name: "ALI",
            status: true,
            description: "qurbonov",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        },
        {
            id: 2,
            name: "vali",
            status: false,
            description: "qurbonov",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        }
    ],
    editStatus: (id) =>
        set((state) => ({
            data: state.data.map((e) =>
                e.id === id ? { ...e, status: !e.status } : e
            )
        })),
    deleteUser: (id) => {
        set((state) => ({
            data: state.data.filter((e) => e.id != id)
        }))
    },
    editUser: (obj) => {
        set((state) => ({
            data: state.data.map((e) => {
                return e.id == obj.id ? { ...e, ...obj } : e
            })
        }))
    },
    addUser:(obj)=>{
        set((state)=>({
            data:[...state.data, obj] 
        }))
    }
}));

export default useStore;
