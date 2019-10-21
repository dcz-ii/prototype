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

function TodoList(props) {
  
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
				value={props.todoTitle}
				onChange={e => props.handleTitle(e.target.value)}
				style={{marginRight: 20}}
			/>
			{props.editId ? 
				<Button variant="contained" color="primary" onClick={() => {
					props.handleTitle('')
					props.setId(null)
					props.toggleEditTodo()
				}}>EDIT TODO - {props.editId}</Button>
				:
				<Button variant="contained" onClick={() => {
					props.handleTitle('')
					props.toggleAddToDo()
				}}>ADD TODO</Button>
			}
		</div>
			

		<Table>
			<TableHead>
				<TableRow>
					<TableCell>Name</TableCell>
					<TableCell>Title</TableCell>
					<TableCell>ID</TableCell>
					<TableCell>completed</TableCell>
					<TableCell>EDIT</TableCell>
					<TableCell>DELETE</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
			{_.map(props.data.todos, (data, idx) => {
				return(
				<TableRow key={idx}>
					<TableCell width="20%">{data.user.name}</TableCell>
					<TableCell width="20%">{data.title}</TableCell>
					<TableCell width="20%">{data.id}</TableCell>
					<TableCell width="20%">{moment(data.created_at).format('MMMM Do, h:mm')}</TableCell>
					<TableCell width="10%">
						{data.user.name === 'danilo' && <Button variant="contained" color="primary" onClick={() => {
							props.setId(data.id);
							props.handleTitle(data.title)
						}}>
							EDIT
						</Button>}
					</TableCell>
					<TableCell width="10%">
						{data.user.name === 'danilo' && <Button variant="contained" color="secondary" onClick={() => {
							props.toggleDelete({ variables: { id: data.id } });
						}}>
							DELETE
						</Button>}
					</TableCell>
				</TableRow>
				)
			})}
			</TableBody>
		</Table>
	</Paper>
  );
}

export default TodoList;
