import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';

class Events {
  static async getEventsByRoomId(roomId) {
    try {
      const timeMin = new Date();
      timeMin.setHours(0, 0, 0, 0);
      const timeMax = new Date();
      timeMax.setHours(23, 59, 59, 0);

      const eventsURL = `https://www.googleapis.com/calendar/v3/calendars/${roomId}/events`;
      const response = await axios.get(eventsURL, {
        params: {
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          orderBy: 'startTime',
          singleEvents: 'true',
        },
      });

      const events = _.reduce(response.data.items, (result, item) => {
        const { start, end, summary } = item;
        if (start) {
          const priorEvent = result.slice(-1)[0];
          const event = { start: start.dateTime, end: end.dateTime, summary };
          if (priorEvent) {
            event.diff = moment(event.start).diff(priorEvent.end, 'minutes');
          }
          result.push(event);
        }
        return result;
      }, []);

      return events;
    } catch (error) {
      throw error;
    }
  }
}

export default Events;
