// const API_URL = "http://localhost:5000/api";

// export async function getStudents(keyword = "") {
//   const res = await fetch(`${API_URL}/students?keyword=${keyword}`);
//   return res.json();
// }

// export async function addStudent(data) {
//   return fetch(`${API_URL}/students`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
// }

// export async function updateStudent(id, data) {
//   return fetch(`${API_URL}/students/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
// }

// export async function deleteStudent(id) {
//   return fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
// }

// export async function markPaid(id) {
//   return fetch(`${API_URL}/students/${id}/pay`, { method: "PUT" });
// }


// const API_URL =
//   import.meta.env.VITE_API_URL || "http://backend:5000/api";

// const API_URL = "http://localhost:5000/api";
const API_URL = "http://127.0.0.1:5000/api";

export async function getStudents(keyword = "") {
  const res = await fetch(`${API_URL}/students?keyword=${keyword}`);
  return res.json();
}

export async function addStudent(data) {
  return fetch(`${API_URL}/students`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateStudent(id, data) {
  return fetch(`${API_URL}/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteStudent(id) {
  return fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
}

export async function markPaid(id) {
  return fetch(`${API_URL}/students/${id}/pay`, { method: "PUT" });
}


