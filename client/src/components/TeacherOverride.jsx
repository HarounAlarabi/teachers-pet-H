import "../styles/TeacherOverride.css";
import { useEffect, useState } from "react";
import "../styles/print.css";
import SupportAllocationTable from "./SupportAllocationTable";

function TeacherOverride({
  totalScore,
  setTotalScore,
  overrideScore,
  setOverrideScore,
  overrideComment,
  setOverrideComment,
}) {
  const [supportAllocation, setSupportAllocation] = useState("");
  const [supportCategory, setSupportCategory] = useState("");

  useEffect(() => {
    let supportTotal = 0;
    let outputSupportCategory = "";
    let outputSupportAllocation = "";

    if (!overrideScore) {
      supportTotal = totalScore;
    } else {
      supportTotal = overrideScore;
    }

    if (supportTotal < 5) {
      outputSupportCategory = "NFA";
      outputSupportAllocation = "Off caseload";
    } else if (supportTotal >= 5 && supportTotal <= 14) {
      outputSupportCategory = "C3";
      outputSupportAllocation = "Annual check or visit";
    } else if (supportTotal >= 15 && supportTotal <= 19) {
      outputSupportCategory = "C2";
      outputSupportAllocation = "Twice yearly visit";
    } else if (supportTotal >= 20 && supportTotal <= 24) {
      outputSupportCategory = "C1";
      outputSupportAllocation = "Termly (3 term year)";
    } else if (supportTotal >= 25 && supportTotal <= 29) {
      outputSupportCategory = "B2";
      outputSupportAllocation = "Twice termly (3 term year)";
    } else if (supportTotal >= 30 && supportTotal <= 39) {
      outputSupportCategory = "B1";
      outputSupportAllocation = "Monthly";
    } else if (supportTotal >= 40 && supportTotal <= 49) {
      outputSupportCategory = "A3";
      outputSupportAllocation = "Fortnightly";
    } else if (supportTotal >= 50 && supportTotal <= 69) {
      outputSupportCategory = "A2";
      outputSupportAllocation = "Weekly";
    } else if (supportTotal >= 70) {
      outputSupportCategory = "A1";
      outputSupportAllocation = "2 or more visits per week";
    }
    setSupportCategory(outputSupportCategory);
    setSupportAllocation(outputSupportAllocation);
  }, [totalScore, overrideScore, supportCategory]);

  return (
    <div className="assessment-summary-container">
      <table className="assessment-summary">
        <thead>
          <tr className="summary-header-row">
            <td colSpan="9">
              <h3 className="summary-main-title">Summary</h3>
            </td>
          </tr>
        </thead>
        <tbody>
          {/* Score Calculation Row */}
          <tr className="score-calculation-row">
            <td colSpan="6" className="calculation-label-cell">
              <h3 className="calculation-label">CYP calculated score</h3>
            </td>
            <td colSpan="4" className="calculation-value-cell">
              <span className="calculated-value">{totalScore}</span>
            </td>
          </tr>

          {/* Teacher Adjustment Section */}
          <tr className="adjustment-section">
            <td colSpan="9">
              <div className="adjustment-content-wrapper">
                <div className="adjustment-header">
                  <h2 className="section-main-heading">Teacher Adjustment</h2>
                  <SupportAllocationTable className="support-reference-table" />
                </div>

                <div className="adjustment-input-group">
                  <div className="comment-input-section">
                    <h4 className="input-section-title">
                      Teacher Adjustment Comment
                    </h4>
                    <p className="input-description">
                      Evidence underpinning any professional adjustment made to
                      the CYP’s matrix support allocation
                    </p>
                    <textarea
                      className="form-text-area"
                      maxLength="255"
                      value={overrideComment}
                      onChange={(e) => setOverrideComment(e.target.value)}
                    />
                  </div>

                  <div className="score-adjustment-control">
                    <h4 className="adjustment-input-label">
                      Teacher adjusted CYP total
                    </h4>
                    <input
                      className="score-input-field"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      placeholder="0-100"
                      value={overrideScore}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue <= 100 || inputValue === "") {
                          setOverrideScore(inputValue);
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          setOverrideScore(0);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </td>
          </tr>

          {/* Support Allocation Section */}
          <tr className="support-section">
            <td colSpan="9">
              <h2 className="section-main-heading">Support Allocation</h2>
              <div className="allocation-details-grid">
                <div className="allocation-category-card">
                  <span className="allocation-type-label">
                    Support Category
                  </span>
                  <span className="allocation-type-value">
                    {supportCategory}
                  </span>
                </div>
                <div className="allocation-detail-card">
                  <h3 className="allocation-type-label">Support</h3>
                  <span className="allocation-type-value">
                    {supportAllocation}
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default TeacherOverride;
