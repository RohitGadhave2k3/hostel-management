import { useEffect, useState } from "react";
import { addStudent, updateStudent, getStudents } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function AddEditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    id: "",
    name: "",
    room: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (isEdit) {
      getStudents("").then((res) => {
        const student = res.students.find((s) => s.id == id);
        if (student) setForm(student);
      });
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateStudent(id, form);
    } else {
      await addStudent(form);
    }

    navigate("/");
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "750px" }}>
        <h3>{isEdit ? "Edit" : "Add"} Student</h3>

        <form
          onSubmit={submit}
          style={{ display: "grid", gap: "12px", gridTemplateColumns: "1fr 1fr" }}
        >
          <div>
            <label>ID</label><br />
            <input
              type="number"
              value={form.id}
              readOnly={isEdit}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              style={isEdit ? { background: "#f7fafc" } : {}}
              required
            />
          </div>

          <div>
            <label>Name</label><br />
            <input
              type="text"
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label>Room</label><br />
            <input
              type="text"
              value={form.room}
              required
              onChange={(e) => setForm({ ...form, room: e.target.value })}
            />
          </div>

          <div>
            <label>Phone</label><br />
            <input
              type="text"
              value={form.phone || ""}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>Email</label><br />
            <input
              type="email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px" }}>
            <button className="btn" type="submit">
              {isEdit ? "Update" : "Add"}
            </button>
            <button
              className="btn alt"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
