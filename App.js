import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { navigationMiddleware, AppNavigator } from './src/components/NavigatorComponent';
import AppReducer from './src/reducers/AppReducer';
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'

const client = axios.create({
  baseURL: 'https://kitsu.io/api/edge',
  responseType: 'json'
});

const store = createStore(AppReducer, applyMiddleware(navigationMiddleware, axiosMiddleware(client)))

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <Provider store = { store } >
        <AppNavigator />
      </Provider>
    )
  }
}