const { makeAutoObservable, action } = require("mobx");

class TodoStoreSync {
    data = [
        {
            id: 1,
            name: "ALi",
            description: "alo",
            status: true,
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
        }
    ]

    constructor() {
        makeAutoObservable(this)
    }

    editUser(e) {
        this.data = this.data.map((el) => {
            return (
                e.id == el.id ? { ...el, status: !e.status } : el
            )
        })
    }

    deleteUser(id) {
        this.data = this.data.filter((e) => e.id != id)
    }

    addTodo(newTodo) {
        this.data = [...this.data, newTodo]
    }

}
const todoStoreSync = new TodoStoreSync()
export default todoStoreSync