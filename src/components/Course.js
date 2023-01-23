import React from "react";

const Course = ({ course, refreshCourses, setLoading }) => {
  const tagArr = course.fields.Tags.split(",");
  console.log(tagArr);
  const markCoursePurchased = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:4000/update", {
        method: "PATCH",
        body: JSON.stringify({ ...course, purchased: true }),
        headers: {
          "Content-type": `application/json`,
        },
      });
      refreshCourses();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:4000/delete/${course.id}`, {
        method: "DELETE",
      });
      refreshCourses();
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="list-group-item">
      <a href={course.fields.Link}>
        <h4 className="list-group-item-heading">{course.fields.Name}</h4>
      </a>
      <p>
        Tags:{" "}
        {course.fields.Tags &&
          tagArr.map((tag, index) => (
            <span className="badge badge-primary mr-2" key={index}>
              {tag}
            </span>
          ))}
      </p>
      {!course.purchased && (
        <button
          className="btn btn-sm btn-primary"
          onClick={markCoursePurchased}
        >
          Purchased
        </button>
      )}
      <button className="btn btn-sm btn-danger ml-2" onClick={deleteCourse}>
        Delete
      </button>
    </div>
  );
};
export default Course;
