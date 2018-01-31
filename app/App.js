import React, { Component } from 'react';
import { render } from 'react-dom';
import bankStore from './bankStore';
import constants from './constants';
import PropTypes from 'proptypes';
import bankActionCreators from './bankActionCreators';

// 순스 컴포넌트
class BankApp extends Component {
  handleDeposit() {
    this.props.onDeposit(this.refs.amount.value);
    this.refs.amount.value = '';
  }

  handleWithdraw() {
    this.props.onWithdraw(this.refs.amount.value);
    this.refs.amount.value = '';
  }

  render() {
    return (
      <div>
        <header>
         <img src="//www.pro-react.com/logos/redux-bank.svg" width="150" />Redux Bank
        </header>
          <h1>Your balance is ${(this.props.balance).toFixed(2)}</h1>
        <div className="atm">
          <input type="text" placeholder="Enter Ammount" ref="amount" />
          <button onClick={this.handleWithdraw.bind(this)}>Withdraw</button>
          <button onClick={this.handleDeposit.bind(this)}>Deposit</button>
        </div>
      </div>
    );
  }
}
BankApp.propTypes = { // 부모컨테이너로 부터 3개의 속성을 전달 받음
  balance: PropTypes.number, // 저장소의 잔액
  onDeposit: PropTypes.func, // 입금(콜백)
  onWithdraw: PropTypes.func // 출금(콜백)
};


/**
 * 1) 상태를 속성으로 매핑 : 컨테이너 컴포넌트는 저장소에서 상태 값을 가져옵니다.
 * 2) 속성으로 발송 
 */
class BankAppContainer extends Component {
  componentDidMount() {
    this.unsubscribe = bankStore.subscribe(() => this.setState({balance: bankStore.getState().balance}));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render(){
   return(
    <BankApp
      balance={ bankStore.getState().balance }
      onDeposit={ (amount)=>bankStore.dispatch(bankActionCreators.depositIntoAccount(amount))}
      onWithdraw={ (amount)=>bankStore.dispatch(bankActionCreators.withdrawFromAccount(amount))}
    />
    )
  }
}
render(<BankAppContainer />, document.getElementById('root'));

