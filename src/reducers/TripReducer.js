export const TRIP_ACTIONS = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const initialTripState = {
  trips: '',
  error: null,
};

export const tripDetailsReducer = (state, action) => {
  switch (action.type) {
    case TRIP_ACTIONS.SUCCESS:
      return {
        trips: action.payload,
      };

    case TRIP_ACTIONS.ERROR:
      return {
        error: action.error,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
