// MODULES
import { inject, observer } from 'mobx-preact'
import PropTypes            from 'prop-types'
import { h, Component }     from 'preact'

// UTILITIES
import Util                 from '../../Util'

@inject('store') @observer
class TodoItem extends Component {

  constructor(props) {
    super(props)
    this.util   = new Util('Components:TodoItem')
    this.logger = this.util.logger
  }

  updateTodo(item) {
    this.logger.log('Update todo item', item.data.name)
    item.update({
      done: !item.data.done
    }).then(() => {
      this.logger.log('updated!', item.data.name)
    }).catch((err) => {
      this.logger.erro('Error updating', err)
    })
  }

  render() {

    const { item } = this.props

    return (
      <button type='button' className='todo-item' onClick={this.updateTodo.bind(this, item)}>
        <input type="checkbox" checked={item.data.done} />
        <span>{item.data.name}</span>
      </button>
    )
  }
}

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default TodoItem
