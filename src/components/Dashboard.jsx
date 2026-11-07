import { Link } from 'react-router-dom'


function Dashboard() {
  return (
    <header className="nav_header">
      <h1 className="banner">Taskboard</h1>
      <nav aria-label="Main navigation">
        <ul className="nav_ul">
          <li><Link to="/" className="nav_li">Task</Link></li>
          <li><Link to="/stats" className="nav_li">Stats</Link></li>
          <li><Link to="/about" className="nav_li">About</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Dashboard