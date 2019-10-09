import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const createApolloClient = (authToken) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: 'wss://learn.hasura.io/graphql',
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDVkOTZjN2FiZmJmZDllMGRmMWRhOTNhNiJ9LCJuaWNrbmFtZSI6ImRhbmlsbyIsIm5hbWUiOiJkYW5pbG9AbXl0cmFjdGlvbnRvb2xzLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wNTU5N2RkNjI4MDM1YWZjOTJmNzM1ZGQ2NmIyMmQ5YT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmRhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE5LTEwLTA0VDA0OjE2OjQ0LjMxNFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZDk2YzdhYmZiZmQ5ZTBkZjFkYTkzYTYiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTU3MDYxODc2MCwiZXhwIjoxNTcwNjU0NzYwLCJhdF9oYXNoIjoiWHNEZ0dzTjZvTE1GbTlIWUpMUHFPQSIsIm5vbmNlIjoiYzd5eGh0WHVSajQzNUlFMDNJWDdhSDdsUko5ckpZbnkifQ.LfHdm9Aj3D2uMPW3gitvEoE0cHlEIm46_stMmAWJwq_VYsPTE7M3q5SxVFTUqZPKSDEYtEc05dkU04Rq5TV2cXWcEJzZsYMq6FkRAUy72sLCiBhcDveTOTUTuVT-riuqSsgAnfNFBJJEwwOamtdMw8Fi-2PF9kfWmQtr3_Wn8x28FzKbLLAjM-xb0iKy3CiK26wCoU6y3ZdbHcGTQlShxJEDBMbtXB7pifYjunllz2_NutTOkxH6wheEnFwWJdkP7gXcIEBbzETIHQZ6k1O4Bn-UsOvbjeCrR0mkLnxgn9DvbZdiQ8yaKWgYW-J5SMPS44t746TpIf_dotT_-19w0Q'
          }
        }
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
