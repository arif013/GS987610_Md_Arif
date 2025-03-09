import './App.css'
import Header from './components/Header'
import SideNav from './components/SideNav'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Store from './pages/Store';

// import 'ag-grid-community/styles/ag-grid.css';         // AG-Grid basic styles
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // AG-Grid Alpine theme
import Sku from './pages/Sku';
import PlanningGrid from './pages/Planning';


function App() {


  return (
    <>
    <Router>
      <Header/>
      <SideNav/>
      <Routes>
        <Route path='/' element={<Store/>}/>
        <Route path='/sku' element={<Sku/>}/>
        <Route path='/planning' element={<PlanningGrid/>}/>
      </Routes>

    </Router>
    </>
  )
}

export default App
