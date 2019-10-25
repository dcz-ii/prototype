import React from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

function MeetingList(props) {
  
  return (
	<Paper style={{maxWidth: '80%', margin: '0px auto', paddingTop: 20}}>
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		}}>
			<TextField 
				label='Title'
				value={props.title}
				onChange={e => props.handleTitle(e.target.value)}
				style={{marginRight: 20}}
			/>
			{props.editId ? 
				<Button variant="contained" color="primary" onClick={() => {
					props.handleTitle('')
					props.setId(null)
					props.toggleEditMeeting()
				}}>EDIT TODO</Button>
				:
				<Button variant="contained" onClick={() => {
					props.toggleAddMeeting()
					props.handleTitle('')
				}}>ADD TODO</Button>
			}
		</div>
			

		<Table>
			<TableHead>
				<TableRow>
					<TableCell>ID</TableCell>
					<TableCell>Name</TableCell>
					<TableCell>Created</TableCell>
					<TableCell>Finished</TableCell>
					<TableCell>EDIT</TableCell>
					<TableCell>DELETE</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
			{_.map(_.sortBy(props.data,['id'],['asc']), (data, idx) => {
				return(
				<TableRow key={idx} hover onClick={() => {
					if(!data.has_finished) {
						props.setView('todo')
						props.setMeetingID(data.id)
					}
				}}
				>
					<TableCell width="20%">{data.id}</TableCell>
					<TableCell width="20%">{data.name}</TableCell>
					<TableCell width="20%">{moment(data.created_at).format('MMMM Do, h:mm')}</TableCell>
					<TableCell width="20%">{_.toString(data.has_finished)}</TableCell>
					<TableCell width="10%">
						<Button variant="contained" color="primary" onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							props.setId(data.id);
							props.handleTitle(data.name)
						}}>
							EDIT
						</Button>
					</TableCell>
					<TableCell width="10%">
						<Button variant="contained" color="secondary" onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							props.toggleDelete({ variables: { id: data.id } });
						}}>
							DELETE
						</Button>
					</TableCell>
				</TableRow>
				)
			})}
			</TableBody>
		</Table>
	</Paper>
  );
}

export default MeetingList;
