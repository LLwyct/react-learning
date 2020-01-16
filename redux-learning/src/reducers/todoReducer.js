const initTodos = [
    {
        id: 0,
        text: 'abc',
        finished: false,
    },
    {
        id: 1,
        text: 'def',
        finished: true,
    },
    {
        id: 2,
        text: '学数学',
        finished: true,
    }
]

const todoReducer = (state = initTodos, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    finished: false
                }
            ]
        case 'DELETE':
            return state.filter((cv) => {
                return cv.id !== action.id
            })
        case 'TOGGLE':
            return state.map((cv) => {
                if (cv.id !== action.id) {
                    return cv;
                } else {
                    return {...cv, finished: !cv.finished};
                }
            })
        default:
            return state
    }
}

export default todoReducer;