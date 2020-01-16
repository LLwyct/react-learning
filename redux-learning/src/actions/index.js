let todonums = 3;
export const addTodo = (text) => {
    return {
        type: 'ADD',
        id: todonums ++,
        text: text
    }
}
export const deleteTodo = (id) => {
    return {
        type: 'DELETE',
        id: id
    }
}
export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE',
        id: id
    }
}