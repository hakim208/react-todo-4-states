import { atom } from 'jotai';
import axios from 'axios';

export const dataAtom = atom([
    {
        id: 1,
        name: "ALI",
        description: "Alo",
        status: true,
        Image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
    }
]);

export const deleteTodoAtom = atom(
    null,
    (get, set, id) => {
        const currentData = get(dataAtom)
        const filterData = currentData.filter((e) => e.id != id)
        set(dataAtom, filterData)
    }
)


export const editStatusTodoAtom = atom(
    null,
    (get, set, id) => {
        const currentData = get(dataAtom)
        const filterData = currentData.map((e) => {
            return (
                e.id == id ? { ...e, status: !e.status } : e
            )
        })
        set(dataAtom, filterData)
    }
)

export const addTodoAtom = atom(
    null,
    (get, set, obj) => {
        const prev = get(dataAtom)
        set(dataAtom, [...prev, obj])
    }
)

export const editTodoAtom = atom(
    null,
    (get, set, obj) => {
        const currentData = get(dataAtom)
        const filterData = currentData.map((e) => {
            return (
                e.id == obj.id ? { ...e, ...obj } : e
            )
        })
        console.log(2);

        set(dataAtom, filterData)
    }
)