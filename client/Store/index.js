// DEPENDENCIES
import { observable }                 from 'mobx'
import { enableLogging }              from 'mobx-logger'

// CONFIG
import Config                         from '@Config/Global'

// UTILITIES
import Util                           from '@Util'
import { Collection, firebase, auth } from '@Store/firebase'

class Store {

  @observable appName = Config.appName

  @observable loggedIn = false

  todo = new Collection('todo')

  @observable userData = {
    displayName: null,
    email: null,
    uid: null,
    loggedIn: false
  }

  @observable haveCheckedUser = false

  constructor() {
    this.initialize()
    this.firebase = firebase
    // this.getUser()
    this.getUser = this.getUser.bind(this)
    this.watchUser()
  }

  async watchUser() {

    auth.onAuthStateChanged((user) => {

      if (user && typeof user.isAnonymous !== 'undefined') {
        const data = {
          displayName: user.displayName || null,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid,
          loggedIn: !user.isAnonymous,
          email: user.email
        }
        this.userData = data
        console.log('SET USER!!', data)
      }

      setTimeout(() => {
        this.haveCheckedUser = true;
      }, 400);

      return user
    })

  }

  getUser() {
    const user = auth.currentUser

    if (user && typeof user.isAnonymous !== 'undefined' && !user.isAnonymous) {
      this.userData = {
        displayName: user.displayName,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
        loggedIn: !user.isAnonymous,
        email: user.email
      }
    }

    setTimeout(() => {
      this.haveCheckedUser = true;
    }, 400);

    return this.user
  }

  signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  login(email, password) {
    this.logger.log('LOGIN', email, password)
    return auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    return auth.signOut()
  }

  passwordReset(email) {
    return auth.sendPasswordResetEmail(email)
  }

  passwordUpdate(password) {
    return auth.currentUser.updatePassword(password)
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
