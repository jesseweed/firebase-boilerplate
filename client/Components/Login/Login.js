// MODULES
import { inject, observer } from 'mobx-preact'
import PropTypes            from 'prop-types'
import { h, Component }     from 'preact'
import { route }            from 'preact-router'

// UTILITIES
import Util                 from '@Util'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

@inject('store') @observer
class Home extends Component {

  constructor(props) {
    super(props)
    this.util   = new Util('Pages:Login')
    this.logger = this.util.logger

    this.user = this.props.store.userData

    this.state = {
      // username: null,
      email: 'jesse@jesseweed.com',
      passwordOne: null,
      // passwordTwo: null,
      error: null
    }

  }

  validateForm() {
    const {
      passwordOne,
      email
    } = this.state;

    console.log('email', email);

    return email !== '' || passwordOne !== ''
  }

  handleLogin(e) {

    e.preventDefault()

    const {
      passwordOne,
      email
    } = this.state;

    if (this.validateForm()) {
      this.props.store.login(email, passwordOne)
        .then((res) => {
          console.log('authUser', res)
          console.log('redirect to', this.props.matches.redirect);
          setTimeout(() => route(this.props.matches.redirect), 1);
        })
        .catch((error) => {
          console.log('error', error);
          this.setState(byPropKey('error', error))
        });
    } else {
      this.setState(byPropKey('error', 'Invalid or missing fields'));
    }

  }

  handleSignup(e) {

    e.preventDefault()

    const {
      passwordOne,
      email
    } = this.state;

    if (this.validateForm()) {
      this.props.store.signup(email, passwordOne)
        .then(() => {
          console.log('authUser')
        })
        .catch((error) => {
          console.log('error', error);
          this.setState(byPropKey('error', error))
        });
    } else {
      this.setState(byPropKey('error', 'Invalid or missing fields'));
    }

  }

  // shouldDisplay() {
  //
  //   if (!this.state.shouldRender) {
  //     if (this.props.store.haveCheckedUser && !this.props.store.userData.loggedIn) {
  //       this.logger.log('SHOW LOGIN FORM')
  //       this.setState({
  //         shouldRender: true
  //       })
  //     } else if (this.props.store.haveCheckedUser && this.props.store.userData.loggedIn) {
  //       this.logger.log('REDIRECT TO LOGGED IN PAGE', this.props.store.userData.email)
  //       setTimeout(() => route(this.props.matches.redirect || '/'), 1);
  //     } else {
  //       this.logger.log('TBD')
  //     }
  //   }
  //
  // }

  render() {

    const {
      email,
      passwordOne,
      // passwordTwo,
      error,
    } = this.state;

    // this.shouldDisplay()

    this.logger.log('haveCheckedUser', this.props.store.haveCheckedUser)

    return (
      <section>
        <input
          className='block'
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="email"
          placeholder="Email address"
        />

        {/* <input
          className='block'
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Username"
        /> */}

        <input
          className='block'
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />

        {/* <input
          className='block'
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm password"
        /> */}

        <button type="button" onClick={this.handleLogin.bind(this)}>Login</button>
        <button type="button" onClick={this.handleSignup.bind(this)}>Signup</button>

        { error && <p>{error.message}</p> }

      </section>
    )

  }
}

Home.propTypes = {
  store:   PropTypes.object.isRequired,
  matches: PropTypes.object.isRequired
}

export default Home
