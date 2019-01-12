const FETCH_PHOTOS_START = 'FETCH_PHOTOS_START'
const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS'
const FETCH_PHOTOS_FAILED = 'FETCH_PHOTOS_FAILED'

const fetchStart = () => {
  return {
    type: FETCH_PHOTOS_START
  }
}

const fetchSuccess = (photos) => {
  return {
    type: FETCH_PHOTOS_SUCCESS,
    payload: photos
  }
}

const fetchFailed = (error) => {
  return {
    type: FETCH_PHOTOS_FAILED,
    error: error
  }
}

const fetchPhotos = (albumId) => dispatch => {
  dispatch(fetchStart())
  fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumId)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while fetching photos of an album with id= ', albumId);
      }
    })
    .then(json => {
      dispatch(fetchSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailed(error))
      console.error('Error while fetching photos of an album with id= ' + albumId + '. Error at ' + error)
    })
}


let initialState = {
  isFetching: false,
  isSucceed: false,
  isFailed: false,
  data: null,
  error: null
}

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSucceed: true,
        isFailed: false,
        data: action.payload
      };
    case FETCH_PHOTOS_FAILED:
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
  photosReducer,
  fetchPhotos
}
