// MODULES
import { Router, Route, Switch } from 'react-router'
import { h, render }                         from 'preact'
import { Provider }                          from 'mobx-preact'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory                  from 'history/createBrowserHistory';

// UTILITIES
// import Util           from '@Util'
// import Authenticator                         from '@Util/Authenticator';
import Store                                 from '@Store'
import Routes                                from '@App/Routes'

// STYLES
import '@Style/Base.styl'

console.log('App.js OK');

const appStore = new Store();
const routingStore = new RouterStore();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
  routing: Store,
  store: appStore
};

document.addEventListener('DOMContentLoaded', () => {

  render(
    <Provider {...stores}>
      <Router history={history}>
        <Switch>
          {Routes.map(route => <Route {...route} key={route.name} />)}
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('app')
  )

})
