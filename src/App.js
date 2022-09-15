import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core'
import Header from './components/Header';

const useStyles = makeStyles({
  App: {
    backgroundColor: "black",
    color: "white",
    height:"100vh"
  },
});
function App() {
  const classes = useStyles()
  console.log(classes);
  return (
    <div className={classes.App}>
      <Router>
        <Header />
        <Routes>
              <Route path="/" element={<HomePage />} exact/>
              <Route path="/coins/:id" element={<CoinPage />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
