import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { !totalValue ? 0 : Number(totalValue).toFixed(2) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
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
