import { observable }     from 'mobx'
import { enableLogging }  from 'mobx-logger'
import Config  from '../../config/global'

// UTILITIES
import Util                 from '../Util'

class Store {

  @observable appName = Config.appName

  constructor() {
    this.initialize()
  }

  initialize() {

    const { hostname, protocol, port } = window.location

    this.util        = new Util('Store')
    this.logger      = this.util.logger

    this.environment = process.env.NODE_ENV
    this.domain      = `${protocol}//${hostname}${port ? `:${port}` : ''}`

    if (this.environment !== 'production') {
      enableLogging({ action: true })
    } else {
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
    }

    this.logger.log('set environment:', this.environment)
    this.logger.log('set domain:', this.domain)

  }

}

export default Store
