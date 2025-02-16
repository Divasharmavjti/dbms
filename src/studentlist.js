import React, { useEffect, useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
      <h2>Enrolled Students</h2>
      <ul>
        {students.map((student) => (
          <li key={student.student_id}>{student.full_name} - {student.email_id}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
