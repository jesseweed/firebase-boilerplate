// MODULES
import Router         from 'preact-router'
import { h, render }  from 'preact'
import { Provider }   from 'mobx-preact'
import Store          from './Store'

// UTILITIES
import Util                 from './Util'

// COMPONENTS
import Home                 from './Pages/Home/Home'

// STYLES
import './App.styl'

const util   = new Util('App')
const { logger } = util

document.addEventListener('DOMContentLoaded', () => {

  logger.info('ready')

  render(
    <Provider store={new Store()}>
      <Router>
        <Home path='/' />
      </Router>
    </Provider>,
    document.body
  )

})
