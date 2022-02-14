import axios from 'axios';

export async function getAllTrips() {
  try {
    const res = await axios.get(
      'https://cors-anywhere.herokuapp.com/https://catfact.ninja/facthttps://www.justwravel.com/otherPages/month_trip_api/February/all'
    );
    return res;
  } catch (error) {
    return { error };
  }
}
