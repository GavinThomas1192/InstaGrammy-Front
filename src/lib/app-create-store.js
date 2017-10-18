import reducer from '../reducer';
import thunk from './redux-thunk';
import reporter from './redux-reporter';
import {createStore, applyMiddleware, compose} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';

let appStoreCreate = () => 
  createStore(reducer, compose(applyMiddleware(thunk, reporter), autoRehydrate()));


export default appStoreCreate;



