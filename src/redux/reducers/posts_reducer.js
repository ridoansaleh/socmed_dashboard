const FETCH_POSTS_START = 'FETCH_POSTS_START'
const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED'

const fetchStart = () => {
  return {
    type: FETCH_POSTS_START
  }
}

const fetchSuccess = (posts) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: posts
  }
}

const fetchFailed = (error) => {
  return {
    type: FETCH_POSTS_FAILED,
    error: error
  }
}

const fetchPosts = (userId) => dispatch => {
  dispatch(fetchStart())
  fetch('https://jsonplaceholder.typicode.com/posts?userId=' + userId)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while fetching posts of an user with id= ', userId);
      }
    })
    .then(json => {
      dispatch(fetchSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailed(error))
      console.error('Error while fetching posts of an user with id= ' + userId + '. Error at ' + error)
    })
}


let initialState = {
  isFetching: false,
  isSucceed: false,
  isFailed: false,
  data: null,
  error: null
}

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSucceed: true,
        isFailed: false,
        data: action.payload
      };
    case FETCH_POSTS_FAILED:
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
  postsReducer,
  fetchPosts
}
