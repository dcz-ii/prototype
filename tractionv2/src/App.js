import React, { useState, useEffect } from 'react';
import { useMutation, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import moment from 'moment';
import _ from 'lodash';

import './App.css';
import { DirectiveLocation } from 'graphql';

function App(props) {
  const [todoTitle, handleTitle] = useState('');

  const GET_MY_TODOS = gql`
    subscription {
      todos(limit: 10, order_by: {created_at: desc}) {
        id
        is_completed
        created_at
        title
        user {
          id
          name
        }
      }
    }`;

  const ADD_TODO = gql`
    mutation AddTodo($todoTitle: String!) {
      insert_todos(objects: {is_public: true, title: $todoTitle }) {
        returning {
          id
          is_completed
          is_public
        }
      }
    }
  `;

  let { data, error, loading } = useSubscription(GET_MY_TODOS);
  let [toggleAddToDo, { loadingAdd }] = useMutation(ADD_TODO, {
    update: (proxy, mutationResult) => {
      /* your custom update logic */
      console.log(mutationResult)
    },
    variables: { todoTitle }
  });

  if (loading || loadingAdd) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  console.log(data)
  return (
    <div className="App">
      <table>
        <tr>
          <th>Title</th>
          <th>Name</th>
          <th>completed</th>
          <th>created</th>
        </tr>
        {_.map(data.todos, (data, idx) => {
          return(
            <tr key={idx}>
              <td width="25%">{data.title}</td>
              <td width="25%">{data.user.name}</td>
              <td width="25%">{data.is_completed}</td>
              <td width="25%">{moment(data.created_at).format('MMMM Do, h:mm')}</td>
            </tr>
          )
        })}
      </table>

        <div>
        <label>Title: </label>
        <input 
          value={todoTitle}
          onChange={e => handleTitle(e.target.value)}
        />  
        </div>
        <button onClick={() => {
          handleTitle('')
          toggleAddToDo()
        }}>ADD TODO</button>
    </div>
  );
}

export default App;
