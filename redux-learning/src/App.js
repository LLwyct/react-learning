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
