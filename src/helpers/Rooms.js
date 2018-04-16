import axios from 'axios';

const roomsURL = 'https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars?fields=items(resourceId,resourceEmail,resourceName,buildingId)';

class Rooms {
  static async getRooms() {
    try {
      const response = await axios.get(roomsURL);
      return response.data.items;
    } catch (error) {
      throw error;
    }
  }
}

export default Rooms;
