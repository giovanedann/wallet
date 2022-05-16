import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, updateValue, setEdit } from '../../actions';
import './ExpensesTable.css';

const tableHeaders = [
  'Descrição',
  'Tag',
  'Método de pagamento',
  'Valor',
  'Moeda',
  'Câmbio utilizado',
  'Valor convertido',
  'Moeda de conversão',
  'Editar/Excluir',
];

class ExpensesTable extends Component {
  constructor() {
    super();
    this.queryCurrency = this.queryCurrency.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  queryCurrency(array, currency, key) {
    return Object.entries(array).find((item) => item[0] === currency)[1][key];
  }

  handleDel({ id, description }) {
    const { handleDelete, update } = this.props;
    handleDelete(id, description);
    update();
  }

  handleEdit({ id, description }) {
    const { handleEdit, expenses } = this.props;
    const expense = expenses
      .find((task) => task.id === id && task.description === description);
    handleEdit(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <main>
        <table style={ { marginTop: '30px' } }>

          <thead>
            <tr>
              {tableHeaders.map((item) => (
                <th key={ item }>{item}</th>
              ))}
            </tr>
          </thead>
          
          <tbody>
          {expenses.map(
            ({
              tag,
              currency,
              exchangeRates,
              description,
              method,
              value,
              id,
            }) => (
                <tr key={ description + id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value)}</td>
                  <td>
                    {this.queryCurrency(exchangeRates, currency, 'name').split('/')[0]}
                  </td>
                  <td>
                    {Number(this.queryCurrency(exchangeRates, currency, 'ask')).toFixed(2)}
                  </td>
                  <td>
                    {
                      (Number(value)
                        * Number(this.queryCurrency(exchangeRates, currency, 'ask')))
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      onClick={ () => this.handleDel({ id, description }) }
                      data-testid="delete-btn"
                    >
                      Deletar
                    </button>
                    <button
                      type="button"
                      onClick={ () => this.handleEdit({ id, description }) }
                      data-testid="edit-btn"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
            ),
            )}
            </tbody>

        </table>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (id, description) => dispatch(deleteExpense({ id, description })),
  update: () => dispatch(updateValue()),
  handleEdit: (expense) => dispatch(setEdit(expense)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleDelete: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
