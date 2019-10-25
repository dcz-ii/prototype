import gql from "graphql-tag";

export const GET_MEETINGS = gql`
    subscription {
        meetings {
            id
            name
            start_time
            has_finished
            created_at
            todos {
                id
                is_completed
                title
            }
        }
    }
`;

export const ADD_MEETING = gql`
    mutation addMeeting($title: String!, $id: String!) {
        insert_meetings(objects: {name: $title, id: $id}) {
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
    mutation removeMeeting ($id: String!) {
        delete_meetings(where: {id: {_eq: $id}}) {
            affected_rows
        }
    }
`;

export const START_MEETING = gql`
    mutation startMeeting ($meetingID: String!, $meetingTime: timestamptz!) {
        update_meetings(where: {id: {_eq: $meetingID}}, _set: {start_time: $meetingTime}) {
            affected_rows
        }
    }
`

export const END_MEETING = gql`
    mutation startMeeting ($meetingID: String!) {
        update_meetings(where: {id: {_eq: $meetingID}}, _set: {has_finished: true}) {
            affected_rows
        }
    }
`

