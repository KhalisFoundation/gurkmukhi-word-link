import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import theGameReducer from './reducers';

const rootReducer = combineReducers({
  theGameReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
