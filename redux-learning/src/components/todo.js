import React from 'react';
import types from 'prop-types';

const Todo = ({text, finished, onClick}) => {
    return (
        <li
            onClick={onClick}
            style={{
                textDecoration: finished ? 'line-through' : 'none',
                cursor: 'pointer'
            }}
        >
            <p
                style={{fontSize: '32px'}}
            >{text}</p>
        </li>
    )
}

Todo.propTypes = {
    text: types.string.isRequired,
    finished: types.bool.isRequired,
    onClick: types.func.isRequired
}


export default Todo;