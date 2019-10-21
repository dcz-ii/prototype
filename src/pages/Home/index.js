import React, { useState } from 'react';
import { observer, useObservable } from 'mobx-react-lite'
import { useMutation, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";

import ToDoList from '../../components/Todo/TodoList';
import { GET_MY_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from '../../constants/todoGql';

const Home = observer((props) => {
  const store = useObservable({
	todos: [],
	toggleTodo(index) {
	  	store.todos[index].completed = !store.todos[index]
		.completed
	},
	get remainingTodos() {
	  	return store.todos.filter(t => !t.completed).length
	}
  })

  const [todoTitle, handleTitle] = useState('');
  const [editId, setId] = useState(null);

  let { data, error, loading } = useSubscription(GET_MY_TODOS);

  let [toggleAddToDo, { loadingAdd }] = useMutation(ADD_TODO, {
    update: (proxy, mutationResult) => {
      /* your custom update logic */
      console.log(mutationResult)
    },
    variables: { todoTitle }
  });
  
  let [toggleEditTodo, { loadingEdit }] = useMutation(EDIT_TODO, {
    variables: { title: todoTitle, id: editId }
  });

  const [toggleDelete, { loadingDel }] = useMutation(DELETE_TODO);

  if (loading || loadingAdd || loadingDel || loadingEdit) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  
  return (
	<div className="App">
		<ToDoList 
			data={data} 
			setId={setId}
			editId={editId}
			toggleEditTodo={toggleEditTodo}
			toggleDelete={toggleDelete}
			toggleAddToDo={toggleAddToDo}
			handleTitle={handleTitle}
			todoTitle={todoTitle}
		/>
	</div>
  );
})

export default Home;
