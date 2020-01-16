import React from 'react';
import types from 'prop-types';
import Todo from './todo';

const TodoList = ({todos, onTodoClick, finished}) => {
    return (
        <div>
            <h1>{finished ? `已完成` : `待完成`}</h1>
            <ul>
                {
                    todos.map((todo, index) => {
                        if (todo.finished === finished) {
                            return (
                                <Todo
                                    key={`${index}`}
                                    text={todo.text}
                                    finished={todo.finished}
                                    onClick={() => {onTodoClick(todo.id)}}
                                />
                            )
                        } else {
                            return null;
                        }
                    })
                }
            </ul>
        </div>
    )
}

TodoList.prototype = {
    todos: types.arrayOf(
        types.shape({
            id: types.number.isRequired,
            finished: types.bool.isRequired,
            text: types.string.isRequired
        })
    ),
    onTodoClick: types.func.isRequired,
    finished: types.bool.isRequired
}

export default TodoList
