import React, { useState } from 'react';
import { observer, useObservable } from 'mobx-react-lite';
import { useMutation, useSubscription } from "react-apollo-hooks";
import { toJS } from 'mobx'
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';

import MeetingList from '../../components/Meeting/MeetingList';
import TodoList from '../../components/ToDo/TodoList';
import { GET_MEETINGS, ADD_MEETING, EDIT_MEETING, DELETE_MEETING } from '../../constants/meetingGql';
import { ADD_TODO, EDIT_TODO, DELETE_TODO } from '../../constants/todoGql';
import meetingsModel from '../../models/meetingsModel';

const Home = observer((props) => {
	const store = useObservable(meetingsModel);

	const [title, handleTitle] = useState('');
	const [view, setView] = useState('meeting');
	const [loadingVal, setloadingVal] = useState(false);
	const [editId, setId] = useState(null);

	let { error, loading } = useSubscription(GET_MEETINGS, {
		onSubscriptionData: ({ client, subscriptionData }) => {
			store.meetings = toJS(subscriptionData.data.meetings);
			setloadingVal(false);
		}
	});

	const [toggleAddMeeting] = useMutation(ADD_MEETING, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
		variables: { title, id: _.toString(toJS(store.meetings).length + 1) }
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

	const [toggleAddTodo] = useMutation(ADD_TODO, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
	});

	const [toggleEditTodo] = useMutation(EDIT_TODO, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
	});
	
	const [toggleDeleteTodo] = useMutation(DELETE_TODO, {
		update: (proxy, mutationResult) => {
			setloadingVal(true)
		},
	});

	function setMeetingID (data) {
		store.selectedMeetingID = data;
	}

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
			{view === 'meeting' ?
				<MeetingList 
					data={toJS(store.meetings)} 
					setId={setId}
					editId={editId}
					toggleEditMeeting={toggleEditMeeting}
					toggleDelete={toggleDelete}
					toggleAddMeeting={toggleAddMeeting}
					handleTitle={handleTitle}
					title={title}
					setView={setView}
					setMeetingID={setMeetingID}
				/>
			: <TodoList 
				data={_.find(toJS(store.meetings), {"id": toJS(store.selectedMeetingID)})}
				toggleAddTodo={toggleAddTodo}
				toggleDeleteTodo={toggleDeleteTodo}
				setView={setView}
				toggleEditTodo={toggleEditTodo}
				/>
			}
		</div>
	);
})

export default Home;
