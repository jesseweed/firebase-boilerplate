// MODULES
import { inject, observer } from 'mobx-preact'
import { h, Component }     from 'preact'

import './Loading.styl';

@inject('store') @observer
class Loading extends Component {

  render() {

    return (
      <loading-component>
        Loading...
      </loading-component>
    )
  }
}

export default Loading
