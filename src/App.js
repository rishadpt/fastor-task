import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Verify from './components/Verify/Verify';
import Home from './components/Home/Home';
import Productinfo from './components/ProductInfo/Productinfo';


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otp" element={<Verify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products/:id" element={<Productinfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
