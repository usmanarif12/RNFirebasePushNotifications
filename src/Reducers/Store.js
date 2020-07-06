import reducers from './Reducers';
import { createStore } from 'redux';
import { stopSubmit } from 'redux-form';

const store = createStore(reducers);

export default store;