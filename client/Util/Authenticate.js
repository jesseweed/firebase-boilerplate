import { h, Component }     from 'preact'
import PropTypes            from 'prop-types'
import { inject, observer } from 'mobx-preact'

import Login                from '@Components/Login/Login'
import Loading              from '@Components/Loading/Loading'

const Protect = (WrappedComponent) => {

  @inject('store') @observer
  class Authenticate extends Component {

    constructor(props) {
      super(props);
      this.authorized = false
      this.waitTime = 20
      this.elapsed = 0
      this.bail = false
      this.state = {
        timeout: false
      }
    }

    checkTimeout() {

      this.elapsed += 1;

      if (this.elapsed >= this.waitTime) {
        this.setState({ timeout: true })
      } else if (!this.props.store.haveCheckedUser && this.elapsed <= this.waitTime) {
        setTimeout(this.checkTimeout.bind(this), 1000)
      }

    }

    render() {

      if (!this.state.timeout) this.checkTimeout()

      if (this.props.store.haveCheckedUser && this.props.store.userData.loggedIn) {
        console.log('Show Component');
        return <WrappedComponent />
      }
      if (!this.props.store.haveCheckedUser && !this.state.timeout) {
        console.log('Show Loading');
        return <Loading />
      }
      console.log('Show Login');
      return <Login />

    }
  }

  Authenticate.propTypes = {
    store: PropTypes.object.isRequired
  }

  return Authenticate

}

export default Protect
