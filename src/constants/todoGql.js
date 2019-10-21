import gql from "graphql-tag";

export const GET_MY_TODOS = gql`
    subscription {
        todos(limit: 10, order_by: {created_at: desc}) {
                id
                is_completed
                created_at
                title
                user {
                    id
                    name
                }
        }
}`;

export const ADD_TODO = gql`
    mutation AddTodo($todoTitle: String!) {
        insert_todos(objects: {is_public: true, title: $todoTitle }) {
            returning {
                id
                is_completed
                is_public
            }
        }
    }
`;

export const EDIT_TODO = gql`mutation toggleTodo ($title: String!, $id: Int!){
        update_todos(where: {id: {_eq: $id}}, _set: {title: $title}) {
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

