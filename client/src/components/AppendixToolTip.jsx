// import React from "react";
// import { Tooltip } from "react-tooltip";
// const AppendixTooltip = ({ content }) => (
//   <div className="appendix-tooltip">
//     <button
//       className="tooltip-trigger"
//       data-tooltip-id="appendix-tooltip"
//       data-tooltip-content={content}
//       aria-label="Additional information"
//     >
//       ℹ️
//     </button>
//     <Tooltip id="appendix-tooltip" />
//   </div>
// );
// export default AppendixTooltip;

// 1. Create a Tooltip Component (AppendixTooltip.jsx)
import React from "react";

import { Tooltip } from "react-tooltip";
const AppendixTooltip = ({ appendixId, content }) => {
  return (
    <>
      <span className="appendix-icon" data-tooltip-id={appendixId}>
        ℹ️
      </span>
      <Tooltip id={appendixId} className="appendix-tooltip">
        <div className="appendix-content">
          <p>{content.type}</p>
          {content.details.map((detail, index) => (
            <div key={index} className="appendix-detail">
              {/* Render different detail types */}
              {detail.description && (
                <>
                  <p>{detail.description}</p>
                  <p>{detail.measurement}</p>
                </>
              )}

              {detail.subsection && (
                <>
                  <p>{detail.subsection}</p>
                  <p>{detail.title}</p>
                  <ul>
                    {detail.considerations?.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </Tooltip>
    </>
  );
};
export default AppendixTooltip;
