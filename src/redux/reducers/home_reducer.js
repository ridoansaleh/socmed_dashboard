let initialState = {
    isFetching: false,
    isSucceed: false,
    isFailed: false,
    data: null,
    error: null
}
  
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
};

export {
    homeReducer
}