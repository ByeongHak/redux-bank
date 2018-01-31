import { createStore } from 'redux'
import bankReducer from './bankReducer';
// 리듀서 함수를 전달함으로써 저장소를 만들 수 있다.
const bankStore = createStore(bankReducer);

export default bankStore;