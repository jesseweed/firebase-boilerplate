// MODULES
import firebase             from 'firebase'
import * as firebaseui      from 'firebaseui'
import { inject, observer } from 'mobx-preact'
import PropTypes            from 'prop-types'
import { h, Component }     from 'preact'

// UTILITIES
import Util                 from '../../Util'

@inject('store') @observer
class Home extends Component {

  constructor(props) {
    super(props)
    this.util   = new Util('Pages:Login')
    this.logger = this.util.logger

    this.user = this.props.store.userData

    this.logger.log('AUTH', {
      user: {
        displayName: this.props.store.userData.displayName,
        email: this.props.store.userData.email,
        uid: this.props.store.userData.uid
      },
      loggedIn: this.props.store.loggedIn
    })

    this.ui = new firebaseui.auth.AuthUI(firebase.auth())

    this.uiConfig = {
      signInSuccessUrl: 'https://localhost:3000/',
      signInOptions: {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true
      }
    }

    // this.ui.start('#firebaseui-auth-container', uiConfig)

  }

  showLogin() {
  }

  render() {

    if (!this.props.store.loggedIn) {
      this.logger.log('not logged in')
      if (this.ui.isPendingRedirect()) {
        this.logger.log('logging in')
        this.ui.start('#firebaseui-auth-container', this.uiConfig)
      }
    }

    return (
      <div className='content'>
        <button type="button" onClick={this.showLogin.bind(this)}>Login</button>
      </div>
    )
  }
}

Home.propTypes = {
  store: PropTypes.object.isRequired
}

export default Home
