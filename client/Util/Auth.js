import { h, Component }     from 'preact'
import PropTypes            from 'prop-types'
import { inject, observer } from 'mobx-preact'

import Login                from '@Containers/Login/Login'
import Loading              from '@Components/Loading/Loading'

export const Protect = (WrappedComponent) => {

  @inject('store') @observer
  class Auth extends Component {
    constructor(props) {
      super(props);
      this.authorized = false
      this.waitTime = 10
      this.elapsed = 0;
      this.state = {
        timeout: false
      }
    }

    checkTimeout() {
      if (!this.props.store.haveCheckedUser && this.elapsed >= this.waitTime) {
        this.setState({
          timeout: true
        })
      } else if (this.elapsed < this.waitTime) {
        this.elapsed += this.elapsed;
        console.log('Elapsed', this.elapsed);
        this.checkTimeout();
      }
    }

    render() {

      this.checkTimeout()

      if (this.props.store.haveCheckedUser && this.props.store.userData.loggedIn) {
        return <WrappedComponent />
      }
      if (!this.props.store.haveCheckedUser && !this.state.timeout) {
        return <Loading />
      }
      return <Login />

    }
  }

  Auth.propTypes = {
    store:   PropTypes.object.isRequired
  }

  return Auth

}

export const Allow = () => {}
