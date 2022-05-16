import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../../actions';
import { FaWallet } from 'react-icons/fa'
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      logged: false,
    };
    this.isMailValid = this.isMailValid.bind(this);
    this.isPassLengthInvalid = this.isPassLengthInvalid.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.areInputsInvalid = this.areInputsInvalid.bind(this);
  }

  isMailValid() {
    const { email } = this.state;
    const validation = email.toString().toLowerCase().match(/\S+@\S+com/);
    if (validation) {
      return validation[0] === email;
    }
  }

  isPassLengthInvalid() {
    const { password } = this.state;
    const minLength = 6;
    return password.length < minLength;
  }

  handleLogIn() {
    this.setState({ logged: true });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  areInputsInvalid() {
    return !this.isMailValid() || this.isPassLengthInvalid();
  }

  render() {
    const { logged, email } = this.state;
    const { add } = this.props;
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="title-container">
            <FaWallet size={ 100 } color="white"/>
            <p>my<span>wallet</span></p>
            <div className="title-container__small-texts">
              <p>Control your finances with the My Wallet App!</p>
              <p>Sign in to continue.</p>
            </div>
          </div>
          <div className="inputs-container">
            <input
              type="text"
              onChange={ this.handleChange }
              name="email"
              id="user-email"
              data-testid="email-input"
              placeholder="Enter your e-mail"
            />
            <input
              type="password"
              name="password"
              onChange={ this.handleChange }
              id="user-password"
              data-testid="password-input"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={ () => add(email) && this.handleLogIn() }
              disabled={ this.areInputsInvalid() }
            >
              Sign in
            </button>
          </div>
        </div>
        { logged && <Redirect to="/wallet" />}
      </div>
    );
  }
}

Login.propTypes = {
  add: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  add: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
