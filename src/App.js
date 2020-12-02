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
        <Route  path={`/:countdownId/${ROUTES.COUNTDOWN_PREVIEW}`}>
          <Preview />
        </Route>
        <Route path={`/:countdownId/${ROUTES.COUNTDOWN_PAGE}`}>
          <CountDownPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
