import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux'
import store from './store/store'
import { Router } from 'react-router-dom';
import {createMemoryHistory} from "history"


test("Landing",()=>{
  const history = createMemoryHistory()
  render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )
  expect(screen.getByText(/PICANTE/i)).toBeInTheDocument()
})

test("NavBar",()=>{
  const history = createMemoryHistory();
  history.push('/recipes');
  render(
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  )
  expect(screen.getByText(/CREATE/i)).toBeInTheDocument()
})