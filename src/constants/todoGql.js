import gql from "graphql-tag";

export const GET_MEETINGS = gql`
    subscription {
        meetings {
            id
            name
            has_started
            has_finished
            created_at
        }
    }
`;

export const ADD_MEETING = gql`
    mutation addMeeting($title: String!) {
        insert_meetings(objects: {name: $title}) {
            affected_rows
        }
    }
`;

export const EDIT_MEETING = gql`
    mutation toggleTodo ($meetingName: String!, $meetingID: Int!){
        update_meetings(where: {id: {_eq: $meetingID}}, _set: {name: $meetingName}) {
            affected_rows
        }
    }
  `  

export const DELETE_MEETING = gql`
    mutation removeMeeting ($id: Int!) {
        delete_meetings(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

