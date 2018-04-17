import { Rooms, FreeBusy, errorHelper } from '../helpers';

const ROOMS = 'ROOMS';

const initialState = {
  data: [],
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${ROOMS}_PENDING`:
      return { ...state, loading: true };

    case `${ROOMS}_FULFILLED`:
      return {
        ...state, data: action.payload, error: {}, loading: false,
      };

    case `${ROOMS}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

export const getFreeRooms = () => dispatch => dispatch({
  type: ROOMS,
  async payload() {
    const allRooms = await Rooms.getRooms();
    const freeBusy = await FreeBusy.getFreeBusy(allRooms);

    const freeRooms = await FreeBusy.processFreeBusy(allRooms, freeBusy);
    return freeRooms;
  },
}).catch(error => errorHelper(error));
