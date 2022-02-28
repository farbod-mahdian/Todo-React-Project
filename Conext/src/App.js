import './App.css';
import React, { Suspense } from 'react';
import TodoContextProvider from './store/todo-context';
import Layout from './layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import UIContextProvider from './store/UI-context';

const AddTodoForm = React.lazy(() => import('./components/AddTodoForm'));
const TodoList = React.lazy(() => import('./components/TodoList'));

function App() {
  return (
    <UIContextProvider>
      <TodoContextProvider>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            <MainHeader />
            <Switch>
              <Route path="/" exact>
                <Redirect to="todos" />
              </Route>
              <Route path="/todos">
                <AddTodoForm />
                <TodoList isDone={false} />
              </Route>
              <Route path="/done">
                <TodoList isDone={true} />
              </Route>
              <Route path="*">
                <p>Page not found</p>
              </Route>
            </Switch>
          </Suspense>
        </Layout>
      </TodoContextProvider>
    </UIContextProvider>
  );
}

export default App;
