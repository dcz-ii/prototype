import React from 'react';
import moment from 'moment';
import _ from 'lodash';

function TodoList(props) {
  
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>ID</th>
            <th>Name</th>
            <th>completed</th>
            <th>EDIT</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {_.map(props.data.todos, (data, idx) => {
            return(
              <tr key={idx}>
                <td width="20%">{data.title}</td>
                <td width="20%">{data.id}</td>
                <td width="20%">{data.user.name}</td>
                <td width="20%">{moment(data.created_at).format('MMMM Do, h:mm')}</td>
                <td width="10%">
                  {data.user.name === 'danilo' && <button onClick={() => {
                    props.setId(data.id);
                    props.handleTitle(data.title)
                  }}>
                    EDIT
                  </button>}
                </td>
                <td width="10%">
                  {data.user.name === 'danilo' && <button onClick={() => {
                    props.toggleDelete({ variables: { id: data.id } });
                  }}>
                    DELETE
                  </button>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

        <div>
        <label>Title: </label>
        <input 
          value={props.todoTitle}
          onChange={e => props.handleTitle(e.target.value)}
        />  
        </div>
        {props.editId ? 
          <button onClick={() => {
            props.handleTitle('')
            props.setId(null)
            props.toggleEditTodo()
          }}>EDIT TODO - {props.editId}</button>
        :
          <button onClick={() => {
            props.handleTitle('')
            props.toggleAddToDo()
          }}>ADD TODO</button>
        }
        
    </div>
  );
}

export default TodoList;
