import React, { useState } from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import { useMutation, useSubscription } from "react-apollo-hooks";
import { toJS } from 'mobx'
import CircularProgress from '@material-ui/core/CircularProgress';

import ToDoList from '../../components/Todo/TodoList';
import { GET_MY_TODOS, ADD_TODO, EDIT_TODO, DELETE_TODO } from '../../constants/todoGql';
import todoModel from '../../models/todoModel';

const Home = observer((props) => {
	const store = useObservable(todoModel);

	const [todoTitle, handleTitle] = useState('');
	const [loadingVal, setloadingVal] = useState(false);
	const [editId, setId] = useState(null);

	let todoData = toJS(store.todos);

	let { error, loading } = useSubscription(GET_MY_TODOS, {
		onSubscriptionData: ({ client, subscriptionData }) => {
			store.todos = subscriptionData.data;
			setloadingVal(false);
		}
	});

	const [toggleAddToDo] = useMutation(ADD_TODO, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
		variables: { todoTitle }
	});
	
	const [toggleEditTodo] = useMutation(EDIT_TODO, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
		variables: { title: todoTitle, id: editId }
	});

	const [toggleDelete] = useMutation(DELETE_TODO, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
	});

	if (error) return `Error! ${error.message}`;
	
	return (
		<div>
			{loading || loadingVal ? <div style={{
				height: '100%',
				width: '100%',
				position: 'absolute',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				background: 'rgba(0,0,0,0.4)',
				zIndex: 99,
			}}>
				<CircularProgress />
			</div> : ''}
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
