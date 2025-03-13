import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/LandingPage.css";
import PupilRow from "./PupilRow";
import TableHeaderRow from "./TeacherHeaderRow";
import { BASE_API_URL } from "../api/config";

function LandingPage() {
  const location = useLocation();
  const teacherID = location.state.teacherID;
  const teacherUsername = location.state.teacherUsername;
  const [pupils, setPupils] = useState([]);

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/fetch-pupil-data`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherID }),
          signal,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch pupil data");
        }

        const data = await response.json();
        setPupils(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Fetch error:", error);
          // Add error state handling:
          setError(error.message);
        }
      }
    };

    if (teacherID) {
      fetchData();
    }

    return () => controller.abort();
  }, [teacherID, setError]);

  const deletePupil = (pupilId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pupil Record?"
    );
    if (confirmDelete) {
      fetch(`${BASE_API_URL}/delete-pupil`, {
        method: "DELETE",
        body: JSON.stringify({ pupilID: pupilId }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setPupils((prevPupils) =>
            prevPupils.filter((pupil) => pupil.pupil_id !== pupilId)
          );
        })
        .catch((error) => {
          console.error("Error deleting pupil:", error);
        });
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedPupils = [...pupils].sort((a, b) => {
    if (sortColumn === "pupil_name") {
      return sortOrder === "asc"
        ? a.pupil_nickname.localeCompare(b.pupil_nickname)
        : b.pupil_nickname.localeCompare(a.pupil_nickname);
    } else if (sortColumn === "last_update") {
      return sortOrder === "asc"
        ? a.last_update_date.localeCompare(b.last_update_date)
        : b.last_update_date.localeCompare(a.last_update_date);
    } else if (sortColumn === "support_code") {
      return sortOrder === "asc"
        ? a.final_support_category.localeCompare(b.final_support_category)
        : b.final_support_category.localeCompare(a.final_support_category);
    }
    return 0;
  });

  return (
    <div className="container">
      <h1 className="caseloadHeader">{teacherUsername}&apos;s Caseload</h1>

      <Link
        to="/form"
        state={{ teacherUsername, teacherID }}
        className="new-form-link"
      >
        Create New Support Allocation
      </Link>

      {pupils.length === 0 ? (
        <div className="empty-state">No pupil records to display</div>
      ) : (
        <table className="pupil-table">
          <thead>
            <TableHeaderRow
              onSort={handleSort}
              sortColumn={sortColumn}
              sortOrder={sortOrder}
            />
          </thead>
          <tbody>
            {sortedPupils.map((pupil) => (
              <PupilRow
                key={pupil.pupil_id}
                pupil={pupil}
                onDelete={deletePupil}
                teacherUsername={teacherUsername}
                teacherID={teacherID}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default LandingPage;
