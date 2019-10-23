import React, { useState } from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import { useMutation, useSubscription } from "react-apollo-hooks";
import { toJS } from 'mobx'
import CircularProgress from '@material-ui/core/CircularProgress';

import ToDoList from '../../components/Todo/TodoList';
import { GET_MEETINGS, ADD_MEETING, EDIT_MEETING, DELETE_MEETING } from '../../constants/todoGql';
import todoModel from '../../models/todoModel';

const Home = observer((props) => {
	const store = useObservable(todoModel);

	const [title, handleTitle] = useState('');
	const [loadingVal, setloadingVal] = useState(false);
	const [editId, setId] = useState(null);

	let { error, loading } = useSubscription(GET_MEETINGS, {
		onSubscriptionData: ({ client, subscriptionData }) => {
			store.todos = toJS(subscriptionData.data.meetings);
			setloadingVal(false);
		}
	});

	const [toggleAddMeeting] = useMutation(ADD_MEETING, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
		variables: { title }
	});
	
	const [toggleEditMeeting] = useMutation(EDIT_MEETING, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
		variables: { meetingName: title, meetingID: editId }
	});

	const [toggleDelete] = useMutation(DELETE_MEETING, {
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
				data={toJS(store.todos)} 
				setId={setId}
				editId={editId}
				toggleEditMeeting={toggleEditMeeting}
				toggleDelete={toggleDelete}
				toggleAddMeeting={toggleAddMeeting}
				handleTitle={handleTitle}
				title={title}
			/>
		</div>
	);
})

export default Home;
