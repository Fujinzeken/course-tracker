import React, { useState } from "react";
import Course from "./Course";
import ReactPaginate from "react-paginate";
import "../courseList.css";
const CourseList = ({ courses, refreshCourses, setLoading }) => {
  const [pageNum, setPageNum] = useState(0);

  const coursePerPage = 5;
  const visitedPage = pageNum * coursePerPage;

  const displayPage = courses.slice(visitedPage, visitedPage + coursePerPage);
  const pageCount = Math.ceil(courses.length / coursePerPage);

  const changePage = ({ selected }) => {
    setPageNum(selected);
  };
  return (
    <div>
      <h2 className="mt-5 mb-3">To Learn</h2>
      <div className="list-group">
        {displayPage
          .filter((course) => !course.purchased)
          .map((course) => (
            <Course
              course={course}
              key={course.id}
              refreshCourses={refreshCourses}
              setLoading={setLoading}
            />
          ))}
        {courses ? (
          <div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={changePage}
              previousLabel="Prev"
              nextLabel="Next"
              containerClassName="paginationBtns"
            />
          </div>
        ) : null}
      </div>
      <h2 className="mt-5 mb-3">Already Purchased</h2>
      {courses
        .filter((course) => course.fields.Purchased)
        .map((course) => (
          <Course
            course={course}
            key={course.id}
            refreshCourses={refreshCourses}
            setLoading={setLoading}
          />
        ))}
    </div>
  );
};

export default CourseList;
