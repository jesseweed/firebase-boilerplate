// MODULES
import { inject, observer } from 'mobx-preact'
import PropTypes            from 'prop-types'
import { h, Component }     from 'preact'

// UTILITIES
import Util                 from '../../Util'

// COMPONENTS
import TodoList             from '../../Components/Todo/TodoList'

import './Home.styl'

@inject('store') @observer
class Home extends Component {

  constructor(props) {
    super(props)
    this.util   = new Util('Pages:Home')
    this.logger = this.util.logger
    this.state = {
      apiData: []
    }

    this.callApi('/api/foo/0')

  }

  callApi(which) {
    fetch(which).then((res) => {
      return res.json()
    }).then(() => {
      this.setState(prevState => ({
        apiData: [
          ...prevState.apiData,
          which
        ]
      }))
    })
  }

  render() {

    return (
      <div className='content'>
        <h1>{this.props.store.appName}</h1>
        <br />
        <h3>Todo List</h3>
        <TodoList />
        <br />
        <h3>API Call Log</h3>
        <button onClick={this.callApi.bind(this, `/api/foo/${this.state.apiData.length}`)} type="button">
          Make a new API request
        </button>
        <br /><br />
        {this.state.apiData.map((data) => {
          return <li>{data}</li>
        })}
      </div>
    )
  }
}

Home.propTypes = {
  store: PropTypes.object.isRequired
}

export default Home
