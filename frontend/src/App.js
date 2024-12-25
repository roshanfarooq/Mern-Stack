import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'

import Navbar from './components/Navbar'
import LoginSignup from './pages/Loginsignup'

function App() {
    const {user}=useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ?<Home /> : <Navigate to="/LoginorSignup"/>}
            />
            <Route 
              path="/LoginorSignup" 
              element={!user ?<LoginSignup/> : <Navigate to="/"/>}
            />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
