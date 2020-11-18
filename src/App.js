import Home from './pages/Home'
import CountDownPage from './pages/CountDown'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/countdown-page'>
          <CountDownPage />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
