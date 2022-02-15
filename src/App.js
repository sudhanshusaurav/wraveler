import { useEffect, useReducer, useState } from 'react';
import { getAllTrips } from './services/TripServices';
import {
  TRIP_ACTIONS,
  initialTripState,
  tripDetailsReducer,
} from './reducers/TripReducer';
import TripCard from './components/TripCard';
import { GrAscend, GrDescend } from 'react-icons/gr';

function App() {
  const [sortBy, setSortBy] = useState('');
  const [desc, setDesc] = useState(true);
  const [tripState, dispatch] = useReducer(
    tripDetailsReducer,
    initialTripState
  );

  useEffect(() => {
    getAllTrips().then((res) => {
      if (res.status === 200) {
        dispatch({ type: TRIP_ACTIONS.SUCCESS, payload: res.data });
        return;
      }
      console.log(res.error);
      dispatch({ type: TRIP_ACTIONS.ERROR, error: res.error });
    });
  }, []);

  useEffect(() => {
    if (tripState.trips && tripState.trips.data) {
      if (desc === true) {
        tripState.trips.data.sort((a, b) => a[sortBy] - b[sortBy]);
      } else {
        tripState.trips.data.sort((a, b) => b[sortBy] - a[sortBy]);
      }
    }
  }, [sortBy, desc]);

  const handleSortType = (value) => {
    if (sortBy !== '') {
      setDesc(!desc);
    }
    setSortBy(value);
  };

  return (
    <div className='App'>
      <div className='container mx-auto pt-8 flex gap-8 items-center'>
        <div className='flex items-center'>
          <select
            className='ml-2 border rounded-md'
            value={sortBy}
            onChange={(e) => handleSortType(e.target.value)}
          >
            <option>Sort By</option>
            <option value='price'>Price</option>
            <option value='numofdays'>Number Of Days</option>
          </select>
          <span
            onClick={() => setDesc(!desc)}
            className='border ml-2 p-1 cursor-pointer'
          >
            {desc ? <GrDescend /> : <GrAscend />}
          </span>
        </div>
      </div>
      <div className='container mx-auto flex gap-8 flex-wrap p-8 justify-between'>
        {tripState.trips &&
          tripState.trips.data &&
          tripState.trips.data.map((trip) => {
            return <TripCard key={trip.id} trip={trip} />;
          })}
      </div>
    </div>
  );
}

export default App;
