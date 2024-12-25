import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const {logout}=useLogout();
  const {user}=useAuthContext()

  const handleClick=()=>{
        logout()
  }

  return (
    <header>
      <div className="containers">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div className="nav-div">
            <span>{user.email}</span>
            <button className='' onClick={handleClick}>Log out</button>
          </div>
          )}
          
          
        </nav>
      </div>
    </header>
  )
}

export default Navbar