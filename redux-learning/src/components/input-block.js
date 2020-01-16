import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';


let InputBlock = ({dispatch}) => {

    let input = null;
    function clickHandler () {
        if (input !== null) {
            if (input.value !== "") {
                let a = dispatch(addTodo(input.value));
                if (a !== null) {
                    input.value = '';
                }
                
            }
        }
    }
    return (
        <div>
            <input type="text" ref={node => {input = node}}/>
            <button onClick={clickHandler}>ADD</button>
        </div>
    )
}

InputBlock = connect()(InputBlock);

export default InputBlock;