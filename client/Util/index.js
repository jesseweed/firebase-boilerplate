import logdown from 'logdown'

class Util {

  constructor(name) {
    // if (process.env.NODE_ENV !== 'production')
    this.logger = logdown(name);
    this.logger.state.isEnabled = true;
  }

}

export default Util
