// COMPONENTS
import Error        from '@Containers/Error/Error'
import Home         from '@Containers/Home/Home'

// UTIL
import Authenticate from '@Util/Authenticate'

const routes = [
  {
    path: '/',
    exact: true,
    component: Authenticate(Home),
    name: 'Home'
  },
  {
    path: '*',
    component: Error,
    name: 'Error'
  }
]

export default routes;
