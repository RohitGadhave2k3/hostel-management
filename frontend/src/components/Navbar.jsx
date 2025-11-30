import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div style={{ width: "100%", maxWidth: "1100px", padding: "0 20px" }}>
        <Link className="nav-link" to="/">Dashboard</Link>
        <Link className="nav-link" to="/add">Add Student</Link>
      </div>
    </nav>
  );
}
