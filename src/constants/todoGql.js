import gql from "graphql-tag";

export const ADD_TODO = gql`
    mutation addTodo($title: String!, $meetingID: String!) {
        insert_todos(objects: {title: $title, meeting_id: $meetingID}) {
            affected_rows
          }
    }
`;

export const EDIT_TODO = gql`
    mutation toggleTodo ($title: String!, $todoID: Int!){
        update_todos(where: {id: {_eq: $todoID}}, _set: {title: $title}) {
            affected_rows
          }
    }
  `  

export const DELETE_TODO = gql`
    mutation removeTodo ($id: Int!) {
        delete_todos(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

