/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, updateValue, doneEditing, resetEditStat } from '../../actions';
import './AddExpenseForm.css';

const INITIAL_EXPENSE_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Cash',
  tag: 'Food',
};

class AddExpenseForm extends Component {
  constructor() {
    super();
    this.state = INITIAL_EXPENSE_STATE;
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditingStat = this.handleEditingStat.bind(this);
    this.isUserEditing = this.isUserEditing.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleAddClick() {
    const { add, update, expenses } = this.props;
    const rates = await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json());
    add({
      id: !expenses.length ? 0 : expenses.length,
      ...this.state,
      exchangeRates: rates,
    });
    update();
    this.setState(INITIAL_EXPENSE_STATE);
  }

  handleEditClick() {
    const { editingExpense, expenses, done, update } = this.props;
    const indexOfEditingTask = expenses
      .findIndex((expense) => expense === editingExpense);
    const editedTask = this.state;
    done(editedTask, indexOfEditingTask);
    update();
    this.setState(INITIAL_EXPENSE_STATE);
  }

  handleEditingStat() {
    const { editingExpense, resetEdit } = this.props;
    const editingCopy = { ...editingExpense };
    this.setState(editingCopy);
    resetEdit();
  }

  isUserEditing() {
    const { editingExpense } = this.props;
    return Boolean(Object.keys(editingExpense).length);
  }

  render() {
    const { currencies, editing } = this.props;
    if (editing) this.handleEditingStat();
    const { value, description, tag, method, currency } = this.state;
    return (
      <div className="wallet__form-container">
        <form>

          <label htmlFor="expense-value">
            Value
            <input
              onChange={ this.handleChange }
              type="number"
              value={ value }
              name="value"
              id="expense-value"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="expense-description">
            Description
            <input
              onChange={ this.handleChange }
              type="text"
              value={ description }
              name="description"
              id="expense-description"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="expense-currency">
            Currency
            <select
              onChange={ this.handleChange }
              value={ currency }
              name="currency"
              id="expense-currency"
              data-testid="currency-input"
            >
              {currencies.map((item) => (
                <option key={ item } value={ item }>{item}</option>
              ))}
            </select>
          </label>

          <label htmlFor="expense-pay-method">
            Pay method
            <select
              onChange={ this.handleChange }
              value={ method }
              name="method"
              id="expense-pay-method"
              data-testid="method-input"
            >
              { ['Cash', 'Credit card', 'Debit card'].map(
                (item) => (
                  <option key={ item } value={ item }>{ item }</option>
                ),
              ) }
            </select>
          </label>

          <label htmlFor="expense-category">
            Category
            <select
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
              id="expense-category"
              data-testid="tag-input"
            >
              {['Food', 'Health', 'Work', 'Transport', 'Others'].map(
                (item) => (
                  <option key={ item } value={ item }>{ item }</option>
                ),
              )}
            </select>
          </label>

          <button
            type="reset"
            onClick={
              this.isUserEditing() ? this.handleEditClick : this.handleAddClick
            }
          >
            { this.isUserEditing() ? 'Edit' : 'Add' }
          </button>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editing: state.wallet.isEditing,
  editingExpense: state.wallet.editingExpense,
});

const mapDispatchToProps = (dispatch) => ({
  add: (expense) => dispatch(addExpense(expense)),
  update: () => dispatch(updateValue()),
  done: (expense, index) => dispatch(doneEditing(expense, index)),
  resetEdit: () => dispatch(resetEditStat()),
});

AddExpenseForm.propTypes = {
  add: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  resetEdit: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editing: PropTypes.bool,
  editingExpense: PropTypes.shape({
    tag: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    method: PropTypes.string,
    value: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }),
};

AddExpenseForm.defaultProps = {
  editingExpense: {
    tag: '',
    description: '',
    currency: '',
    method: '',
    value: '',
    exchangeRates: {},
  },
  editing: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
