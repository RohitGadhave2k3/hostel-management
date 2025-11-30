import { useEffect, useState } from "react";
import { deleteStudent, getStudents } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ConfirmDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    getStudents("").then((res) => {
      const found = res.students.find((s) => s.id == id);
      setStudent(found);
    });
  }, []);

  if (!student) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "600px" }}>
        <h3>Confirm Delete</h3>
        <p>
          Are you sure you want to permanently delete student{" "}
          <strong>{student.name}</strong> (ID: {student.id})?
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn danger"
            onClick={() => deleteStudent(id).then(() => navigate("/"))}
          >
            Yes, Delete
          </button>

          <button className="btn alt" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
