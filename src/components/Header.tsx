import { useNavigate } from 'react-router-dom';
import logo from '../assets/Gsynergy Logo V2 Long Description.svg'

function Header() {
  const navigate = useNavigate();

    return (
      <div className="flex justify-between px-[40px] py-[10px] shadow-md sticky top-0 z-10 bg-white">
    <img src={logo} className='h-[40px]' alt="logo"/>
    <h1 className="text-[30px]">Data Viewer App</h1>
    <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => {
            const token = localStorage.getItem('token');
            if (token) {
                // Logout
                localStorage.removeItem('token');
                alert('Logged out successfully!');
                window.location.reload(); // Refresh the page after logout
                navigate("/login")
            } else {
                // Redirect to login
                window.location.href = '/login';
            }
        }}
    >
        {localStorage.getItem('token') ? 'Logout' : 'Login'}
    </button>
</div>

    )
  }
  
  export default Header