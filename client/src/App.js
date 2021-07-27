import './Reset.css';
import './App.css';
import NavBar from './componentes/NavBar/NavBar'
import LandingPage from './componentes/LandingPage/LandingPage';
import Recipe from './componentes/Recipe/Recipe';
import CreateRecipe from './componentes/CreateRecipe/CreateRecipe';
import { Route } from "react-router-dom";
import Pagination from './componentes/Pagination/Pagination';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/recipes' component={Pagination} />
      <Route exact path='/recipes/:id' component={Recipe} />
      <Route exact path='/form' component={CreateRecipe} />
    </div>
  );
}

export default App;
