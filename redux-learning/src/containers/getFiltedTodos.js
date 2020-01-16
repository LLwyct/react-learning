import { toggleTodo } from "../actions";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id));
        }
    }
}
const FiltedTodoList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);

export default FiltedTodoList;