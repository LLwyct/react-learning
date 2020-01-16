---
title: "react-redux学习指南"
date: "2020-01-16"
---
前面的话
Redux
1. 先简单了解什么是Redux？
2. 如何理解Redux的设计理念
3. Action

3.1 什么是Action

3.2 Action

3.3 Action创建函数

3.3 Action的原则及注意事项（不断补充）

4. Reducer

4.1什么是Reducer

4.2 设计State结构

4.3 处理上一节提到的Action

4.4 合并Redecer

4.5 Reducer的原则及注意事项（不断补充）

5. Store

5.1 Store提供的一些方法

6. 结合React自己的案例展示

6.1 安装准备
6.2 组件设计
6.3 项目结构
6.4 编写Actions
6.5 编写Reducers
6.6 编写布局组件
6.7 编写容器组件
6.8 收尾工作

————————————————

# 前面的话
说实话，官方文档真的写得不行，它不是基于实例的教学，而是基于抽象的教学，让人想起了数据结构课本，代码例子中的很多变量都是突兀地呈现出来，让人摸不着头脑，于是我删了很多东西。

**因此，这篇博客是基于原文档的一篇学习POST，但是在原文档的基础上增删了很多东西，并加入了自己的想法。**
# Redux
# 1. 先简单了解什么是Redux？
Redux只是一个JavaScript框架并不是一个只针对React的框架，在任何情况下都可以用Rudex。
图片转载至[蒙朦的文章](https://segmentfault.com/a/1190000011474522)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200109161759408.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)
首先为什么我感觉看Redux的文档很吃力，这是因为我是先学的react，对应上图中的Component，而文档是从Action开始讲解的，而且递归的定义了很多变量，直接就把人绕进去了。

# 2. 如何理解Redux的设计理念
很多刚学Redux的人总是要将文档中的概念和react联系起来，其实这是不对的，这会阻碍你理解很多概念，应该先忘掉react，把Redux当成一个独立的框架。

我才刚学Redux不到20min，我暂时是这么理解的。

**首先，状态(state)即数据，它存储在商店(store)里，这个商店只是用来存放数据，它不能管理数据，商店本身是死的。store本身被Component订阅（subscribe），当组件的state要改变时，商店只能触发（trigger）行为(Action)来通知商店管理员(Reducer)来处理数据的变化，必须要调度（dispatch）Reducer来帮她改变Store。**

上面的话即上图中的内容，它保证了数据是单向流动的。接下来分别讲Action，Reducer，Store。
# 3. Action
## 3.1 什么是Action
**Action即动作、行为，一个人既然有动作了，就一定要改变一些事，在redux里自然改变的就是状态State。**

官网定义如下
> Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。
## 3.2 Action
Action在数据结构的本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。下面就是一个Action，很简单吧。

```javascript
{
  type: 'ADD_TODO',
  text: '学数学'
}
```
## 3.3 Action创建函数
Action 创建函数 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

上面提到过，Action实际上是一个普通的js对象，那么Action创建函数就是一个简单的可以返回js对象的函数。
```javascript
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text: text
  }
}
```
由于action是由Reducer的dispatch调度的，那么我们可以直接这么写。
```javascript
const boundAddTodo = text => dispatch(addTodo(text))
```
然后直接调用它们：
```javascript
boundAddTodo("学数学");
```
## 3.3 Action的原则及注意事项（不断补充）
 - **我们应该尽量减少在 action 中传递的数据**
例如在Todo应用中，传递item的index要比把整个item传过去要好

# 4. Reducer
## 4.1什么是Reducer
商店就是一个笨比，你对着商店大喊我要拿走一个苹果，商店是不会理你的，它也不会在库存中自动减一，你要把你的Action告诉商店管理员Reducer才行，因此Reducer决定了如何响应那些Action，并改变过去的State，返回一个改变后的State。

>Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的。actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state，这是由Reducer描述的。
## 4.2 设计State结构
**在处理上一节提到的Action之前，我们需要先来设计State结构。** 在 Redux 应用中，所有的 state 都被保存在一个单一对象中。建议在写代码前先想一下这个对象的结构。如何才能以最简的形式把应用的 state 用对象描述出来？

以 todo 应用为例：
```javascript
{
  todos: [
    {
      text: '学数学',
      completed: true,
    },
    {
      text: '学英语',
      completed: false
    }
  ]
}
```
## 4.3 处理上一节提到的Action
我们已经确定了 state 对象的结构，而且处理Action必须要用到Reducer，现在就可以开始开发 reducer。reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state。

```javascript
(previousState, action) => newState
```
永远不要在 reducer 里做这些操作：
1. 修改传入参数；
2. 执行有副作用的操作，如 API 请求和路由跳转；
3. 调用非纯函数，如 Date.now() 或 Math.random()。

在高级篇里会介绍如何执行有副作用的操作。**现在只需要谨记 reducer 一定要保持纯净。只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。**

**我们之前说过，Reducer就是一个纯函数，用来接收旧的 state 和 action，返回新的 state。**
```javascript
const initialState = {
  todos: []
};

function todoApp(state = initialState, action) {
  // 当state为undefined时，赋值为默认初值
  // 这里暂不处理任何 action，
  // 仅返回传入的 state。
  return state
}
```
```javascript
function todoApp(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      })
    default:
      return state
  }
}
```
上面代码的意思是，如果接收的action的类型是'ADD_TODO'，意为添加一条新的待办事项。返回值是一个新的对象（state），这个对象是由旧的state和action的新TODO共同确定的。因为我们说过，不能直接更改state，因此需要返回一个新的对象（深拷贝），不懂的可以查一下Object.assign()函数。如果出现了意料之外的action.type，则不改变state。


## 4.4 合并Redecer
假设我们还有一个action，切换TODO的状态（未完成 - 已完成），那么我们可以编写两个Reducer，并在最后合并。

假设为了代码的耦合性能低一些，我们将添加todo、切换todo状态的Reducer拆开。而现在我们需要将其合为一个Reducer并暴露出去。

```javascript
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  toggle,
  todo
})

export default todoApp
```
## 4.5 Reducer的原则及注意事项（不断补充）
1. 开发复杂的应用时，不可避免会有一些数据相互引用。建议你尽可能地把 state 范式化，不存在嵌套。把所有数据放到一个对象里，每个数据以 ID 为主键，不同实体或列表间通过 ID 相互引用数据。把应用的 state 想像成数据库。这种方法在 normalizr 文档里有详细阐述。例如，实际开发中，在 state 里同时存放 todosById: { id -> todo } 和 todos: array<id> 是比较好的方式，本文中为了保持示例简单没有这样处理。
2. **保持 reducer 纯净非常重要**。永远不要在 reducer 里做这些操作：
	- 修改传入参数；
	- 执行有副作用的操作，如 API 请求和路由跳转；
	- 调用非纯函数，如 Date.now() 或 Math.random()；
3. 在[高级篇](https://www.redux.org.cn/docs/advanced/)里会介绍如何执行有副作用的操作。现在只需要谨记 reducer 一定要保持纯净。只要传入参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况、没有副作用，没有 API 请求、没有变量修改，单纯执行计算。
# 5. Store
在前面的章节中，我们学会了使用 action 来描述“发生了什么”，和使用 reducers 来根据 action 更新 state 的用法。
## 5.1 Store提供的一些方法
Store 就是把它们联系到一起的对象。Store 有以下职责：

维持应用的 state；
提供 getState() 方法获取 state；
提供 dispatch(action) 方法更新 state；
通过 subscribe(listener) 注册监听器;
通过 subscribe(listener) 返回的函数注销监听器。返回值是一个函数，直接执行就可以注销。

# 6. 结合React自己的案例展示
**在看到这一部分之前，建议先自己用js + Redux(不使用React)完成一个计数器的实现，要不然会感到很跳跃，后面的内容可能很难接受。**
## 6.1 安装准备
```shell
npm install -g create-react-app
create-react-app redux-learning
cd redux-learning
npm install --save redux react-redux
npm run start
```
## 6.2 组件设计
先设计一下UI以确定有哪些组件，以及他们之间的关系：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200116110026864.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)
我们可以提取出如下组件：
1. 布局组件：
Todo：保存一项待办事项
TodoList： Todo的父组件，展示多个Todo
Input-Block：输入框以及按钮
2. 容器组件：
FiltedTodoList：用来获取todos数据，以及负责处理切换完成状态等逻辑。
## 6.3 项目结构
修改一下目录结构，删除一些没用的文件，改成如图所示的结构：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200116104810855.png)
对于我这样的新手来说，最难以理解的应该是容器组件和布局组件的区别，文档中讲到在react-redux中，容器组件用来处理逻辑，布局组件只用来处理布局不参与逻辑运算，但你可以这么理解，事实上你所看到的整个项目都是由布局组件形成的，容器组件只不过是一层抽象的东西，它把布局组件包裹了起来，没错你可以理解为容器组件是布局组件的父组件。比如你有个组件A它里面不需要逻辑处理，那么它就直接可以使用了，但如果A里面有要用到数据处理，那么你应该抽象出一个容器组件把它包裹起来。虽然你最终挂载到App上的虽然是容器组件，但其实展示的样子和你写的布局组件一模一样。

这里要提前说一嘴，我上面说到，容器组件把布局组件包裹起来，没错，容器组件同过逻辑处理拿到数据以及更新数据，并通过Props把数据、函数注入布局组件，说到这里，是不是可以看出容器布局是组件布局的父组件？因为在React中，父子通信用的就是Props。

不说废话，直接看例子就能理解了。

## 6.4 编写Actions
```javascript
// /actions/index.js
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
```
## 6.5 编写Reducers
```javascript
// /reducers/todoReducer.js
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
```
```javascript
// /reducers/index.js
import todoReducer from './todoReducer';
import { combineReducers } from 'redux';
let todoApp = combineReducers({
	// 这里的名字决定了state在store中的名字
    todos: todoReducer,
})
export default todoApp;
```
## 6.6 编写布局组件
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';
let InputBlock = ({dispatch}) => {
    let input = null;
    function clickHandler () {
        if (input !== null) {
            if (input.value !== "") {
                dispatch(addTodo(input.value));
                input.value = '';
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
// 这个组件太简单不值得把布局和逻辑拆开，后面会详细讲
InputBlock = connect(
// 当connect函数里什么都不写时，只向InputBlock注入一个{ dispatch() }
)(InputBlock);
export default InputBlock;
```
```javascript
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
```
```javascript
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
```
## 6.7 编写容器组件
这里可以看到，其实容器组件其实什么布局都没有，它不参与页面展示，他就是个负责处理逻辑的，说白了，就是一页普通的js代码，根本称不上是组件，只不过他会以布局组件为子组件生成一个新的组件罢了。
```javascript
// containers/FiltedTodoList.js
import { toggleTodo } from "../actions";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";

// 一个向子组件注入Props的函数
const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}
// 一个向子组件注入方法的函数
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
// 以TodoList作为子组件，生成一个名为FiltedTodoList的容器组件，它的样子其实就是TodoList的样子。
)(TodoList);
export default FiltedTodoList;
```
## 6.8 收尾工作
> npm install --save @emotion/core
```javascript
// src/App.js
/** @jsx jsx */
import { jsx, css } from '@emotion/core' 
import InputBlock from './components/input-block'
import FiltedTodoList from './containers/getFiltedTodos'
const _style = {
  container: css`
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-conent: center;
    flex-direction: column;
    align-items: center;
  `,
  subBlock: css`
    width: 100%;
  `,
}
const App = () => {
  return (
    <main 
      css={_style.container}
    >
      <section>
        <InputBlock></InputBlock>
      </section>
      <section css={_style.subBlock}>
        <FiltedTodoList finished={false}></FiltedTodoList>
      </section>
      <section css={_style.subBlock}>
        <FiltedTodoList finished={true}></FiltedTodoList>
      </section>
    </main>
  );
}
export default App;
```
```javascript
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux'
import todoApp from './reducers';
import { Provider } from 'react-redux';
let store = createStore(todoApp)
ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>
    ,
    document.getElementById('root'));
```
# 终于写完了，累死爷了，如果有用可以点个赞