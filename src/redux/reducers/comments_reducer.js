const FETCH_COMMENTS_START = 'FETCH_COMMENTS_START'
const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
const FETCH_COMMENTS_FAILED = 'FETCH_COMMENTS_FAILED'

const fetchStart = () => {
  return {
    type: FETCH_COMMENTS_START
  }
}

const fetchSuccess = (comments) => {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload: comments
  }
}

const fetchFailed = (error) => {
  return {
    type: FETCH_COMMENTS_FAILED,
    error: error
  }
}

const fetchComments = (postId) => dispatch => {
  dispatch(fetchStart())
  fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postId)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error while fetching comments of an post with id= ', postId);
      }
    })
    .then(json => {
      dispatch(fetchSuccess(json))
    })
    .catch(error => {
      dispatch(fetchFailed(error))
      console.error('Error while fetching comments of an post with id= ' + postId + '. Error at ' + error)
    })
}


let initialState = {
  isFetching: false,
  isSucceed: false,
  isFailed: false,
  data: null,
  error: null
}

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_START:
      return {
        isFetching: true,
        isSucceed: false,
        isFailed: false,
        data: null,
        error: null
      };
    case FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSucceed: true,
        isFailed: false,
        data: action.payload
      };
    case FETCH_COMMENTS_FAILED:
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
  commentsReducer,
  fetchComments
}
