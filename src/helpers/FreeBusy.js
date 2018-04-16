import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

const URL = 'https://www.googleapis.com/calendar/v3/freeBusy';

const prepareRequest = (roomIds) => {
  const timeMin = new Date();
  const timeMax = new Date();
  timeMax.setHours(23, 59, 59, 0);

  return {
    timeMin: timeMin.toISOString(),
    timeMax: timeMax.toISOString(),
    items: roomIds,
  };
};

const roomHasNoMeetings = busy => busy.length === 0;
const roomHasMeetingInTheFuture = busy => Date.now() < Date.parse(busy[0].start);

class FreeBusy {
  static async getFreeBusy(rooms) {
    try {
      const roomIds = _.map(rooms, item => ({ id: item.resourceEmail }));
      const request = prepareRequest(roomIds);

      const freeBusy = await axios.post(URL, request);
      return freeBusy.data.calendars;
    } catch (error) {
      throw error;
    }
  }

  static async processFreeBusy(rooms, freeBusy) {
    return _.reduce(rooms, (result, value) => {
      const { resourceEmail } = value;
      const freeBusyValue = freeBusy[resourceEmail];

      if (!freeBusyValue) {
        return result;
      }

      const { busy } = freeBusyValue;

      if (roomHasNoMeetings(busy)) {
        result.push({ ...value, resourceIsFree: true });
      } else if (roomHasMeetingInTheFuture(busy)) {
        result.push({ ...value, resourceIsFree: true, resourceMeeting: moment(busy[0].start).format('HH:mm') });
      } else {
        const lastMeeting = busy.slice(-1)[0];
        result.push({ ...value, resourceBusyTo: moment(lastMeeting.end).format('HH:mm') });
      }

      return result;
    }, []);
  }
}

export default FreeBusy;
