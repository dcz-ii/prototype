import React, { useState } from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import { useMutation, useSubscription } from "react-apollo-hooks";
import { toJS } from 'mobx'

import ToDoList from '../../components/Todo/TodoList';
import { GET_MY_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from '../../constants/todoGql';
import todoModel from '../../models/todoModel';

const Home = observer((props) => {
	const store = useObservable(todoModel);

	const [todoTitle, handleTitle] = useState('');
	const [editId, setId] = useState(null);

	let todoData = toJS(store.todos);

	let { error, loading } = useSubscription(GET_MY_TODOS, {
		onSubscriptionData: ({ client, subscriptionData }) => {
			store.todos = subscriptionData.data;
		}
	});

	let [toggleAddToDo, { loadingAdd }] = useMutation(ADD_TODO, {
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
				data={todoData} 
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
