import Home from './pages/Home'
import CountDownPage from './pages/CountDown'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <Router>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route exact path='/countdown-page'>
          <CountDownPage />
        </Route>
        <Route exact path='/countdown-page/prev'>
          <div>hello word</div>
        </Route>
    </Router>
    
  );
}

export default App;
