import { useEffect, useState } from "react";
import { getStudents, deleteStudent, markPaid } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [keyword, setKeyword] = useState("");

  const loadData = async () => {
    const data = await getStudents(keyword);
    setStudents(data.students);
  };

  useEffect(() => {
    loadData();
  }, []);

  const search = (e) => {
    e.preventDefault();
    loadData();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="toolbar">
          <div className="search">
            <form onSubmit={search} style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                placeholder="Search by ID, name, room or phone..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="btn">Search</button>
              <button className="btn alt" onClick={() => { setKeyword(""); loadData(); }}>
                Reset
              </button>
            </form>
          </div>

          <Link className="btn" to="/add">+ Add Student</Link>
        </div>

        <table>
          <thead>
            <tr>
              <th style={{ width: "90px" }}>ID</th>
              <th>Name</th>
              <th>Room</th>
              <th>Contact</th>
              <th style={{ width: "140px" }}>Fees</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.id}</strong></td>
                <td>{s.name}</td>
                <td className="muted">{s.room}</td>

                <td>
                  <div className="muted">{s.phone || "—"}</div>
                  <div className="muted" style={{ fontSize: "13px" }}>{s.email}</div>
                </td>

                <td>
                  {s.fees_paid ? (
                    <span className="badge paid">Paid</span>
                  ) : (
                    <span className="badge pending">Pending</span>
                  )}
                </td>

                <td>
                  <div className="actions">
                    {!s.fees_paid && (
                      <button className="btn" onClick={() => markPaid(s.id).then(loadData)}>
                        Mark Paid
                      </button>
                    )}
                    <Link className="btn alt" to={`/edit/${s.id}`}>Edit</Link>
                    <Link className="btn danger" to={`/delete/${s.id}`}>Delete</Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p style={{ marginTop: 16, color: "#7b8794" }}>No students found.</p>
        )}
      </div>
    </div>
  );
}
