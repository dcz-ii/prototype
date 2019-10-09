import React, { useState } from 'react';
import { useMutation, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import moment from 'moment';
import _ from 'lodash';

import './App.css';
// import { DirectiveLocation } from 'graphql';

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

  const DELETE_TODO = gql`
    mutation removeTodo ($id: Int!) {
      delete_todos(where: {id: {_eq: $id}}) {
        affected_rows
      }
    }
  `

  let { data, error, loading } = useSubscription(GET_MY_TODOS);

  let [toggleAddToDo, { loadingAdd }] = useMutation(ADD_TODO, {
    update: (proxy, mutationResult) => {
      /* your custom update logic */
      console.log(mutationResult)
    },
    variables: { todoTitle }
  });

  const [toggleDelete, { loadingDel }] = useMutation(DELETE_TODO);

  if (loading || loadingAdd || loadingDel) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  console.log(data)
  return (
    <div className="App">
      <table>
        <tr>
          <th>Title</th>
          <th>ID</th>
          <th>Name</th>
          <th>completed</th>
          <th>created</th>
          <th>delete?</th>
        </tr>
        {_.map(data.todos, (data, idx) => {
          return(
            <tr key={idx}>
              <td width="25%">{data.title}</td>
              <td width="25%">{data.id}</td>
              <td width="25%">{data.user.name}</td>
              <td width="25%">{_.toString(data.is_completed)}</td>
              <td width="25%">{moment(data.created_at).format('MMMM Do, h:mm')}</td>
              <td width="25%">
                {data.user.name === 'danilo' && <button onClick={() => {
                  toggleDelete({ variables: { id: data.id } });
                }}>
                  delete
                </button>}
              </td>
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
