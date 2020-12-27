import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import WebFont from 'webfontloader'
import Home from './pages/Home'
import Preview from './pages/Preview'
import CountDownPage from './pages/CountDown'
import AuthPage from './pages/AuthPage'
import FlashCard from './components/FlashCard'

import * as ROUTES from './constants/routes'

function App() {
  useEffect(() => {
    WebFont.load({
        google: {
          families: ['Droid Sans', 'Racing Sans One']
        }
    })
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME}>
          <Home />
        </Route>
        <Route  path={`/${ROUTES.COUNTDOWN_PREVIEW}/:page/:countdownId`}>
          <Preview />
        </Route>
        <Route path={`/${ROUTES.COUNTDOWN_PAGE}/:countdownId`}>
          <CountDownPage />
        </Route>
        <Route path={`/auth/:type`}>
          <AuthPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
