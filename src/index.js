import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: 'wss://graphql-be.herokuapp.com/v1/graphql',
      options: {
        reconnect: true,
        // connectionParams: {
        //   headers: {
        //     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDVkOTZjN2FiZmJmZDllMGRmMWRhOTNhNiJ9LCJuaWNrbmFtZSI6ImRhbmlsbyIsIm5hbWUiOiJkYW5pbG9AbXl0cmFjdGlvbnRvb2xzLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wNTU5N2RkNjI4MDM1YWZjOTJmNzM1ZGQ2NmIyMmQ5YT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmRhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE5LTEwLTIxVDAxOjQzOjA4LjgyOFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZDk2YzdhYmZiZmQ5ZTBkZjFkYTkzYTYiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTU3MTcyNDQ3MywiZXhwIjoxNTcxNzYwNDczLCJhdF9oYXNoIjoiZDlSS3ZrSUZnSW1MTmtCNWFVMGVxZyIsIm5vbmNlIjoiS09SZlFTWFVxdVlmMW1aaDRENWRNNlBIMklJaH5OWF8ifQ.IbcQCjr81YSv3fXDkfvwQp0J89dXVyxXQlWzjoKaDNXIpJZqqeVqIO0UrFcXC8wtirR8sbcvHh7lhg8f-FimfkC4bEAz4QBKf-ttGJDQhPIuN2bMqaCxDUzDLp28mX_fCxO55tCj-1TCBjRWA5ZS4ahBI96p6I8EEbfdMct-nzZCvIl3dVU3lVyqwOp3IoMR_vpxPnTJJy87xPHd_gS_NVtRJF-1rT4Zo31AChcEuVnyTdCMYvWbBPdgYaqTWyB4MyOMdtJsQ0MoRlmxPXQJOx559fO6i_Ea2jQQtmu9hWaAyVcDhKg2u0vm2hsMMrv_rzz0OYk06yqV-xwv3y-3Jw'
        //   }
        // }
      }
    }),
    cache: new InMemoryCache(),
  });
 };

 const client = createApolloClient();

ReactDOM.render(
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<App />
			</ApolloHooksProvider>
		</ApolloProvider>
	,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
