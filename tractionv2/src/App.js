import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import _ from 'lodash';

import './App.css';
import Home from './pages/Home';
import { getData } from './redux/action'

function App(props) {
  useEffect(() => {
    props.getData();
  }, [])

  const GET_MY_TODOS = gql`
    query getTodos {
      todos {
        id
        is_completed
        created_at
        title
        user {
          name
        }
      }
    }
    `;

  const { data, error, loading } = useQuery(GET_MY_TODOS);


  console.log(loading)

  if (loading) return 'Loading...';
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
            <tr>
              <td width="25%">{data.title}</td>
              <td width="25%">{data.user.name}</td>
              <td width="25%">{data.is_completed}</td>
              <td width="25%">{data.created_at}</td>
            </tr>
          )
        })}

      </table>
    </div>
  );
}

const mapStateToProps = store => {
	return {
		globalReducer: store.globalReducer,
	};
};

const mapActionToProps = {
  getData,
};

export default connect(mapStateToProps,mapActionToProps)(App);
