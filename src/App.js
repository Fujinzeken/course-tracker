import CourseForm from "./components/CourseForm";
import CourseList from "./components/CourseList";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCourses = async () => {
    try {
      const res = await fetch(
        "https://course_submit.fujinzeken.workers.dev/api/"
      );
      const courses = await res.json();
      console.log(courses);
      setCourses(courses.info.records);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <div className="container mt-5">
      {loading && (
        <div className="loading">
          <div className="loading__page">
            <h2>Loading....</h2>
          </div>
        </div>
      )}
      <h1 className="mb-5 text-center">Course Tracker</h1>
      <CourseForm courseAdded={loadCourses} setLoading={setLoading} />
      <CourseList
        courses={courses}
        refreshCourses={loadCourses}
        setLoading={setLoading}
      />
    </div>
  );
}

export default App;
