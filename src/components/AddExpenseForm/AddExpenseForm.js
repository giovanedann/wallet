/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, updateValue, doneEditing, resetEditStat } from '../../actions';

const INITIAL_EXPENSE_STATE = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
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
            Valor
            <input
              onChange={ this.handleChange }
              type="text"
              value={ value }
              name="value"
              id="expense-value"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="expense-description">
            Descrição
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
            Moeda
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
            Método de pagamento
            <select
              onChange={ this.handleChange }
              value={ method }
              name="method"
              id="expense-pay-method"
              data-testid="method-input"
            >
              { ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'].map(
                (item) => (
                  <option key={ item } value={ item }>{ item }</option>
                ),
              ) }
            </select>
          </label>

          <label htmlFor="expense-category">
            Tag
            <select
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
              id="expense-category"
              data-testid="tag-input"
            >
              {['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'].map(
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
            { this.isUserEditing() ? 'Editar despesa' : 'Adicionar despesa' }
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
