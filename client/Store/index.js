import { observable }     from 'mobx'
import { enableLogging }  from 'mobx-logger'

// CONFIG
import Config  from '../../config/global'

// UTILITIES
import Util                 from '../Util'
import { Collection, firebase }                 from '../Util/Firebase'

class Store {

  @observable appName = Config.appName

  @observable loggedIn = false

  todo = new Collection('todo')

  @observable userData = {
    displayName: null,
    email: null,
    uid: null
  }

  constructor() {
    this.initialize()

    this.firebase = firebase

    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.logger.log('LOGGED IN', user)
        this.loggedIn = true
        this.userData = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        }
      } else {
        this.logger.log('NOT LOGGED IN')
      }
    })
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
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
    }

    this.logger.log('set environment:', this.environment)
    this.logger.log('set domain:', this.domain)

  }

}

export default Store
