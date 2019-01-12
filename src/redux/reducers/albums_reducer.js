const FETCH_ALBUMS_START = 'FETCH_ALBUMS_START'
const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS'
const FETCH_ALBUMS_FAILED = 'FETCH_ALBUMS_FAILED'

const fetchStart = () => {
  return {
    type: FETCH_ALBUMS_START
  }
}

const fetchSuccess = (albums) => {
  return {
    type: FETCH_ALBUMS_SUCCESS,
    payload: albums
  }
}

const fetchFailed = (error) => {
  return {
    type: FETCH_ALBUMS_FAILED,
    error: error
  }
}

const fetchAlbums = (userId) => dispatch => {
  dispatch(fetchStart())
  fetch('https://jsonplaceholder.typicode.com/albums?userId=' + userId)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while fetching album of an user with id= ', userId);
      }
    })
    .then(json => {
      dispatch(fetchSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailed(error))
      console.error('Error while fetching album of an user with id= ' + userId + '. Error at ' + error)
    })
}


let initialState = {
  isFetching: false,
  isSucceed: false,
  isFailed: false,
  data: null,
  error: null
}

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALBUMS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSucceed: true,
        isFailed: false,
        data: action.payload
      };
    case FETCH_ALBUMS_FAILED:
      return {
        ...state,
        isFailed: true,
        isFetching: false,
        isSucceed: false
      };
    default:
      return state;
  }
};

export {
  albumsReducer,
  fetchAlbums
}
