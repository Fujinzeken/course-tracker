import React, { useState } from "react";
import Tags from "./Tags";
export default function CourseForm({ courseAdded, setLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [count, setCount] = useState(0);

  const newTags = tags.toString();
  console.log(newTags);

  const resetForm = () => {
    setName("");
    setLink("");
    setCount(count + 1);
  };

  const submitCourse = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await fetch("https://course_submit.fujinzeken.workers.dev/api/submit", {
        method: "POST",
        body: JSON.stringify({ name, link, newTags }),
      });
      setLoading(false);
      resetForm();
      courseAdded();
    } catch (err) {
      console.error(err);
    }
    console.log(name, link);
  };

  return (
    <div className="card">
      <div className="card-header">Add a New Course</div>
      <div className="card-body">
        <form className="" onSubmit={submitCourse}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">Link</label>
            <input
              type="url"
              name="link"
              value={link}
              className="form-control"
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <p>Tags</p>
            <Tags tagsUpdated={setTags} key={count} />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
