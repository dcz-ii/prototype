const store = {
    meetings: [],
    selectedMeetingID: null,
    addMeetings(data) {
        store.meetings = data;
    },
};

export default store;