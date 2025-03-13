import React from "react";
import "../styles/TableHeaderRow.css";

function TableHeaderRow({ onSort, sortColumn, sortOrder }) {
  const isSortable = (column) => {
    return (
      column === "pupil_name" ||
      column === "last_update" ||
      column === "support_code"
    );
  };

  const getSortIndicator = (column) => {
    if (column === sortColumn) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };
  return (
    <tr className="data-grid-header">
      <th
        onClick={() => isSortable("pupil_name") && onSort("pupil_name")}
        className={`grid-column-header ${
          isSortable("pupil_name") ? "sortable-column interactive" : ""
        }`}
      >
        <div className="column-header-content">
          Pupil Name
          {isSortable("pupil_name") && (
            <span className="sort-direction-indicator">
              {getSortIndicator("pupil_name")}
            </span>
          )}
        </div>
      </th>

      <th
        onClick={() => isSortable("last_update") && onSort("last_update")}
        className={`grid-column-header ${
          isSortable("last_update") ? "sortable-column interactive" : ""
        }`}
      >
        <div className="column-header-content">
          Last Update
          {isSortable("last_update") && (
            <span className="sort-direction-indicator">
              {getSortIndicator("last_update")}
            </span>
          )}
        </div>
      </th>

      <th className="grid-column-header">Total Score</th>
      <th className="grid-column-header">Override Score</th>

      <th
        onClick={() => isSortable("support_code") && onSort("support_code")}
        className={`grid-column-header ${
          isSortable("support_code") ? "sortable-column interactive" : ""
        }`}
      >
        <div className="column-header-content">
          Support Code
          {isSortable("support_code") && (
            <span className="sort-direction-indicator">
              {getSortIndicator("support_code")}
            </span>
          )}
        </div>
      </th>

      <th className="grid-column-header">Support Allocation</th>
    </tr>
  );
}

export default TableHeaderRow;
