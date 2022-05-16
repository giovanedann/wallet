import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { FaUserCircle } from 'react-icons/fa';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header className="header-container">
        <div data-testid="email-field" className="email-field">
          <FaUserCircle color="white" size={ 25 }/>
          <p>{ email }</p>
        </div>
        <div className="expenses-value-info">
          <p data-testid="total-field" className="total-field">
            { `Total: $${!totalValue ? 0 : Number(totalValue).toFixed(2)}`}
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number,
};

Header.defaultProps = {
  totalValue: 0,
};
