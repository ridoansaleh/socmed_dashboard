
import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { userReducer } from './user_reducer';
import { albumsReducer } from './albums_reducer';
import { photosReducer } from './photos_reducer';
import { postsReducer } from './posts_reducer';
import { commentsReducer } from './comments_reducer';

const reducers = combineReducers({
  users: usersReducer,
  user_profile: userReducer,
  albums: albumsReducer,
  photos: photosReducer,
  posts: postsReducer,
  comments: commentsReducer
});

export default reducers
