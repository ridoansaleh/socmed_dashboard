const FETCH_USERS_START = 'FETCH_USERS_START'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'

export function fetchStart() {
  return {
    type: FETCH_USERS_START
  }
}

export function fetchSuccess(user, cookies) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: user,
    cookie: cookies
  }
}

export function fetchFailed(status) {
  return {
    type: FETCH_USERS_FAILED,
    respStatus: status
  }
}

const fetchUsers = () => dispatch => {
  dispatch(fetchStart())
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while fetching users');
      }
    })
    .then(json => {
      dispatch(fetchSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailed(error))
      console.log('Error while fetching users at : ', error)
    })
}


let initialState = {
  isFetching: false,
  isSucceed: false,
  isFailed: false,
  data: null,
  error: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSucceed: true,
        isFailed: false,
        data: action.payload
      };
    case FETCH_USERS_FAILED:
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
  usersReducer,
  fetchUsers
}
