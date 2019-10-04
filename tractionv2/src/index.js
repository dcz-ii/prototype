import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
// import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducers from './redux/reducer'
import rootSaga from './redux/saga/rootSaga'

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: []
  }
  
const persistedRecuder = persistReducer(persistConfig, reducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedRecuder, applyMiddleware(sagaMiddleware));

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://learn.hasura.io/graphql',
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDVkOTZjN2FiZmJmZDllMGRmMWRhOTNhNiJ9LCJuaWNrbmFtZSI6ImRhbmlsbyIsIm5hbWUiOiJkYW5pbG9AbXl0cmFjdGlvbnRvb2xzLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wNTU5N2RkNjI4MDM1YWZjOTJmNzM1ZGQ2NmIyMmQ5YT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmRhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE5LTEwLTA0VDA0OjE2OjQ0LjMxNFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZDk2YzdhYmZiZmQ5ZTBkZjFkYTkzYTYiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTU3MDE2MjYwNCwiZXhwIjoxNTcwMTk4NjA0LCJhdF9oYXNoIjoiWUNlVVFLUi05ODc5dHNpdFJka3p1USIsIm5vbmNlIjoiQy1WNzF5cVF5cUxETmdETnRZb1RublVfbVZKNDlsSlEifQ.ApS8x0mD3aLa0lAP9crI8MGDOynwR-4x8b1iwbcytn3r2PD2YDbyieyp39k7oHVyRQ-8O6QFOfw8o5efPibdKysiFqj6VihXKXdJXSiGg-EH23syvQuFPS6Kv_mWUeXludIhZtPTego7RQKiSh192N0C5l0EQqQzR5l9bL4OG9QX59WdpF4hW5_bggMNgGxc20XiqaDlj09zjhv-vd-5a0prh8regFaeqSOmqva7jcftZE6S3lyZlVCuSk4b1145HCUyPo4iuIAhk8eltQgvi1Ker6H5XhashH6258-Ue0H9D5ffI0guN07-Sl6-Fh-3vuvILxO4kYBaBHyaSvDolg'
      }
    }),
    cache: new InMemoryCache(),
  });
 };

 const client = createApolloClient();

ReactDOM.render(
	<Provider store={store}>
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<App />
			</ApolloHooksProvider>
		</ApolloProvider>
	</Provider>,
document.getElementById('root'));

sagaMiddleware.run(rootSaga);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
