import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// PAGES
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Box className="App" mx={'auto'} minH={'100vh'} padding={'2'}>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <ToastContainer />
      </Box>
    </Router>
  );
}

export default App;
