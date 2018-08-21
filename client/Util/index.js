import logdown from 'logdown'

class Util {

  constructor(name) {
    this.logger = logdown(name)
    if (process.env.NODE_ENV !== 'production') {
      this.logger.state.isEnabled = true
    }
  }

}

export default Util
