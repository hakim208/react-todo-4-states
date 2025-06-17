import axios from 'axios';
import { action, makeAutoObservable } from 'mobx';

class TodoStore {
    todo = [];

    constructor() {
        makeAutoObservable(this, {
            getTodo: action
        });
    }


    async getTodo() {
        try {
            const { data } = await axios.get("https://to-dos-api.softclub.tj/api/to-dos");
            this.todo = data.data;
        } catch (error) {
            console.error(error);
        }
    }
    async updateStatus(id) {
        console.log(id);

        try {
            await axios.put(`https://to-dos-api.softclub.tj/completed?id=${id}`)
            this.getTodo()
        } catch (error) {
            console.error(error);
        }
    }

    async deleteUser(id) {
        try {
            await axios.delete(`https://to-dos-api.softclub.tj/api/to-dos?id=${id}`)
            this.getTodo()
        } catch (error) {
            console.error(error);
        }
    }

    async addTodo(formData) {
        try {
            await axios.post(`https://to-dos-api.softclub.tj/api/to-dos`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            this.getTodo()
        } catch (error) {
            console.error(error);
        }
    }
}

const todoStore = new TodoStore()
export default todoStore;
