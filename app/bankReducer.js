import constants from './constants';

const initialState = {
  balance: 0
}
const bankReducer = (state, action) => {
  console.log(action); //일시적으로 사용, 모든 액션에 대한 로그
  switch (action.type) {
    case constants.CREATE_ACCOUNT: // 기본 초기 상태를 반환
      return initialState;
    case constants.DEPOSIT_INTO_ACCOUNT:
      return {balance: state.balance + parseFloat(action.amount)}; // 전달된 금액을 더하거나
    case constants.WITHDRAW_FROM_ACCOUNT:
      return {balance: state.balance - parseFloat(action.amount)}; // 전달된 금액을 뺍니다.
    default:
      return state;
  }
}
export default bankReducer;