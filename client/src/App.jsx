import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import { Box } from '@chakra-ui/react';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Box className="App" mx={'auto'} minH={'100vh'} padding={'2'}>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
