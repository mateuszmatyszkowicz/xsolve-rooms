import { Events, errorHelper } from '../helpers';

const EVENTS = 'EVENTS';

const initialState = {
  data: {},
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${EVENTS}_PENDING`:
      return { ...state, loading: true };

    case `${EVENTS}_FULFILLED`:
      return {
        ...state,
        data: { ...state.data, [action.payload.id]: action.payload.events },
        loading: false,
        error: {},
      };

    case `${EVENTS}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const getRoomEventsById = roomId => dispatch => dispatch({
  type: EVENTS,
  async payload() {
    const events = await Events.getEventsByRoomId(roomId);
    return { id: roomId, events };
  },
}).catch(errorHelper);

export const getMyEvents = id => (dispatch, getState) => dispatch({
  type: EVENTS,
  async payload() {
    let { rooms } = getState();
    rooms = rooms.data.map(room => room.resourceEmail);
    const events = await Events.getEventsByRoomId(id);

    const myEvents = events.filter(event =>
      event.attendees.find(attendee =>
        attendee.resource && rooms.includes(attendee.email)));

    return { id, events: myEvents };
  },
}).catch(errorHelper);
