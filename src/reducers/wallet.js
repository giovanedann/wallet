// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
  isEditing: false,
  editingExpense: {},
};

export const EXPENSES_ADD = 'EXPENSES_ADD';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const UPDATE_VALUE = 'UPDATE_VALUE';
export const TOTAL_VALUE = 'TOTAL_VALUE';
export const EXPENSES_DEL = 'EXPENSES_DEL';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';
export const SET_EDIT = 'SET_EDIT';
export const RESET_EDIT_STAT = 'RESET_EDIT_STAT';
export const EXPENSE_EDIT_DONE = 'EDIT_DONE';

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case EXPENSES_ADD:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case SAVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies.filter((item) => item !== 'USDT'),
    };
  case UPDATE_VALUE:
    return {
      ...state,
      totalValue: state.expenses.reduce(
        (acc, { value, currency, exchangeRates }) => (
          acc + Number(value) * exchangeRates[currency].ask
        ),
        0,
      ),
    };
  case EXPENSES_DEL:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => (
        expense.id !== action.id && expense.description !== action.description
      )),
    };
  case SET_EDIT:
    return {
      ...state,
      isEditing: true,
      editingExpense: action.expense,
    };
  case EXPENSE_EDIT_DONE:
    return {
      ...state,
      isEditing: false,
      editingExpense: {},
      expenses: state.expenses.map((item, index) => (
        index !== action.index ? item : { ...item, ...action.expense }
      )),
    };
  case RESET_EDIT_STAT:
    return {
      ...state,
      isEditing: false,
    };
  default:
    return state;
  }
};

export default wallet;
