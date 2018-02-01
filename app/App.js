import React, { Component } from 'react';
import { render } from 'react-dom';
import bankStore from './bankStore';
import constants from './constants';
import PropTypes from 'proptypes';
import bankActionCreators from './bankActionCreators';
import {connect, Provider } from "react-redux";

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
        <header><img src="//www.pro-react.com/logos/redux-bank.svg" width="150" height="150" /><br/>Redux Bank</header>
        <br />
        <h1>Your balance is ${(this.props.balance).toFixed(2)}</h1>
        <div className="atm">
          <input type="text" placeholder="Enter Ammount" ref="amount" />
          <br />
          <button onClick={this.handleWithdraw.bind(this)}>Withdraw</button>
          <button onClick={this.handleDeposit.bind(this)}>Deposit</button>
        </div>

        <div className="info" onClick={this.props.onToggle}>
          <strong>Additional Info:</strong>
          <div className={this.props.showExchange? 'info--visible' : 'info--closed'}>
            <p><strong>Your account Manager:</strong> C. F. Frost </p>
            <p><strong>Pre approved credit limit:</strong> $500,000.00 </p>
          </div>
        </div>

      </div>
    );
  }
}
BankApp.propTypes = { // 부모컨테이너로 부터 3개의 속성을 전달 받음
  balance: PropTypes.number, // 저장소의 잔액
  onDeposit: PropTypes.func, // 입금(콜백)
  onWithdraw: PropTypes.func, // 출금(콜백)
  onToggle: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    balance : state.balance,
    showExchange: state.ui.showExchange
  }
};

const mapDispatchProps = (dispatch) => {
  return {
    onDeposit : (amount) => dispatch(bankActionCreators.depositIntoAccount(amount)),
    onWithdraw : (amount) => dispatch(bankActionCreators.withdrawFromAccount(amount)),
    onToggle : ()=> dispatch(bankActionCreators.toggleExchange())
  }
};

const BankAppContainer = connect(mapStateToProps, mapDispatchProps)(BankApp);
render(
  <Provider store={bankStore}>
    <BankAppContainer/>
  </Provider>,
  document.getElementById('root'));