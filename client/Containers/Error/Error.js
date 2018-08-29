// MODULES
import { inject, observer } from 'mobx-preact'
import { h, Component }     from 'preact'

import './Error.styl'

@inject('store') @observer
class Error extends Component {

  render() {

    return (
      <section className='content error-container'>
        <h1>Oh noes!</h1>
        <h4>Looks like that page has gone missing!</h4>
      </section>
    )
  }
}

export default Error
