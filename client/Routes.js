// COMPONENTS
import Home        from '@Containers/Home/Home'

import Authenticate from '@Util/Authenticate'

const routes = [
  {
    path: '/',
    exact: true,
    component: Authenticate(Home),
    name: 'Home',
    init: (store, params, dispatch) => Home.init(store, params, dispatch)
  }
  // {
  //   path: '*',
  //   component: ErrorContainer,
  //   name: 'error',
  //   init: (store, params, dispatch) => ErrorContainer.init(store, params, dispatch)
  // }
]

export default routes;
