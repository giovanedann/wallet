import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../../actions';
import AddExpenseForm from '../../components/AddExpenseForm/AddExpenseForm';
import Header from '../../components/Header/Header';
import ExpensesTable from '../../components/ExpensesTable/ExpensesTable';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchCurr } = this.props;
    fetchCurr();
  }

  render() {
    const { email, currencies, totalValue } = this.props;
    return (
      <>
        <Header email={ email } totalValue={ totalValue } />
        <AddExpenseForm currencies={ currencies } />
        <ExpensesTable />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalValue: PropTypes.number,
  fetchCurr: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  totalValue: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  totalValue: state.wallet.totalValue,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurr: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
