import logo from '../assets/Gsynergy Logo V2 Long Description.svg'

function Header() {
    return (
      <div className="flex justify-between px-[40px] py-[10px] shadow-md sticky top-0 z-10 bg-white">
          <img src={logo} className='h-[40px]' alt="logo"/>
          <h1 className="text-[30px]">Data Viewer App</h1>
          <p>Profile</p>
      </div>
    )
  }
  
  export default Header