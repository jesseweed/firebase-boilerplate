// MODULES
import { inject, observer } from 'mobx-preact'
import PropTypes            from 'prop-types'
import { h, Component }     from 'preact'

// UTILITIES
import Util                 from '../../Util'

@inject('store') @observer
class Home extends Component {

  constructor(props) {
    super(props)
    this.util   = new Util('Pages:Home')
    this.logger = this.util.logger
    this.state = {
      apiData: 'loading...'
    }

    fetch('/api/test').then((res) => {
      return res.json()
    }).then((data) => {
      this.logger.log('API Response', data.params);
      this.setState({
        apiData: `called api/${data.params.method}`
      })
    })

  }

  render() {
    return (
      <div className='content'>
        <h1>{this.props.store.appName}</h1>
        <h4>{this.state.apiData}</h4>
      </div>
    )
  }
}

Home.propTypes = {
  store: PropTypes.object.isRequired
}

export default Home
