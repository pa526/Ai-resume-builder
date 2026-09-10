import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const user = { name: "John Doe" }
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate("/")
  }

  return (
    <div className="bg-white shadow">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        
        <Link to="/">
          <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
        </Link>

        {/* Moves this section to the right */}
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {user.name}</p>

          <button
            type="button"
            onClick={handleLogout}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>

      </nav>
    </div>
  )
}

export default Navbar