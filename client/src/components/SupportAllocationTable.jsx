import React, { useState } from "react";
import supportAllocationData from "./data/supportallocationtable.json";
import "../styles/SupportAllocationTable.css";

function SupportAllocationTable() {
  const { supportAllocationTable } = supportAllocationData;
  const [isTableOpen, setIsTableOpen] = useState(true);

  return (
    <div className="support-allocation-container">
      <button
        className="allocation-toggle-btn"
        onClick={() => setIsTableOpen(!isTableOpen)}
      >
        {isTableOpen ? "Hide Support Allocation" : "Show Support Allocation"}
        <span className={`toggle-chevron ${isTableOpen ? "is-open" : ""}`}>
          ▼
        </span>
      </button>

      {isTableOpen && (
        <div className="allocation-table-wrapper">
          <table className="support-allocation-grid">
            <thead>
              <tr className="grid-header-row">
                <th colSpan="2" className="grid-header-cell">
                  Total Score Range
                </th>
                <th colSpan="2" className="grid-header-cell">
                  Support Category
                </th>
                <th colSpan="2" className="grid-header-cell">
                  Support Allocation
                </th>
              </tr>
            </thead>
            <tbody>
              {supportAllocationTable.map((data, index) => (
                <tr key={index} className="grid-data-row">
                  <td colSpan="2" className="grid-data-cell">
                    {data.totalScoreRange}
                  </td>
                  <td colSpan="2" className="grid-data-cell highlight-cell">
                    {data.supportCategory}
                  </td>
                  <td colSpan="2" className="grid-data-cell">
                    <span className="allocation-value">
                      {data.supportAllocation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SupportAllocationTable;
