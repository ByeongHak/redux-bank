import { createStore, applyMiddleware } from 'redux'
import bankReducer from './bankReducer';

const logger = (store) => (next) => (action) => {
  console.log('dispatching: ', action);
  return next(action);
}

// 리듀서 함수를 전달함으로써 저장소를 만들 수 있다.
const bankStore = createStore(bankReducer, applyMiddleware(logger));

export default bankStore;