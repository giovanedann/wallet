import { LOGIN } from '../reducers/user';
import {
  SAVE_CURRENCIES,
  EXPENSES_ADD,
  UPDATE_VALUE,
  EXPENSES_DEL,
  EXPENSE_EDIT_DONE,
  SET_EDIT,
  RESET_EDIT_STAT,
} from '../reducers/wallet';

export const addEmail = (email) => ({ type: LOGIN, email });

export const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies: Object.keys(currencies),
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(saveCurrencies(data)))
    .catch((error) => console.log(error));
};

export const deleteExpense = ({ id, description }) => ({
  type: EXPENSES_DEL,
  id,
  description,
});

export const resetEditStat = () => ({ type: RESET_EDIT_STAT });

export const updateValue = () => ({ type: UPDATE_VALUE });

export const addExpense = (expense) => ({ type: EXPENSES_ADD, expense });

export const setEdit = (expense) => ({
  type: SET_EDIT,
  expense,
});

export const doneEditing = (expense, index) => ({
  type: EXPENSE_EDIT_DONE,
  expense,
  index,
});
