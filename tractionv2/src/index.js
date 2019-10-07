import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
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
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDVkOTZjN2FiZmJmZDllMGRmMWRhOTNhNiJ9LCJuaWNrbmFtZSI6ImRhbmlsbyIsIm5hbWUiOiJkYW5pbG9AbXl0cmFjdGlvbnRvb2xzLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8wNTU5N2RkNjI4MDM1YWZjOTJmNzM1ZGQ2NmIyMmQ5YT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmRhLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE5LTEwLTA0VDA0OjE2OjQ0LjMxNFoiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZDk2YzdhYmZiZmQ5ZTBkZjFkYTkzYTYiLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTU3MDQxMjQwMCwiZXhwIjoxNTcwNDQ4NDAwLCJhdF9oYXNoIjoiOEpBbjRyZmdoRk9LYzRxNVVGaXFjUSIsIm5vbmNlIjoiYVlSUGJMcGcuYVNaYUUzNk51U3JQT1ZJR0xkekU3SkQifQ.L3kDuBGcVW7iA5MpcRKgSPjLXC-zEOT0aO6aKbVOvOEvZEvcUn5yn64VsQ6LYCLLAWxt3QeP5cBr7fkBh-AKCPfv2spsREXO-tj7gdLqHCoAWBKiRt91JFuGuknk5_yq4N9WuH3SeTSClJDwAxd78ISyjLWchbcZxgiTIf5F1CgUVWaPO1SbUvB1g8F-o23bkBUF0MXX1UeANDezEuRGc1E-GDCOtC68DMM3B5x7RB3yIwn4I-hK1s9vk9AgsW9_QkeG_4orC5480H85QoDGiHz2Rl-EQWbR_y6eTEZpMU5gyXfxLV465UYoa7k4wbgGs_ZEGODPECXQr699pBWacw'
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
