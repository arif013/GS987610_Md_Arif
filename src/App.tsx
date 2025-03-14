import './App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Store from './pages/Store';
import Sku from './pages/Sku';
import PlanningGrid from './pages/Planning';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoutes';
import Chart from './pages/Chart';
// import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <Header />
        <SideNav />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <Store />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/sku' 
            element={
              <ProtectedRoute>
                <Sku />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/planning' 
            element={
              <ProtectedRoute>
                <PlanningGrid />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/chart'
            element={<><Chart/></>}
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;
