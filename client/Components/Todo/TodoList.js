// MODULES
import { inject, observer } from 'mobx-preact'
import PropTypes            from 'prop-types'
import { h, Component }     from 'preact'

// UTILITIES
import Util                 from '@Util'
import TodoItem             from '@Components/Todo/TodoItem'

@inject('store') @observer
class TodoList extends Component {

  constructor(props) {
    super(props)
    this.util   = new Util('Components:TodoList')
    this.logger = this.util.logger
  }

  render() {

    const { todo } = this.props.store

    const list = todo.docs.map((doc) => {
      return <TodoItem name={doc.data.name} done={doc.data.done} item={doc} />
    })

    return (
      <div>
        {list}
      </div>
    )
  }
}

TodoList.propTypes = {
  store: PropTypes.object.isRequired
}

export default TodoList
