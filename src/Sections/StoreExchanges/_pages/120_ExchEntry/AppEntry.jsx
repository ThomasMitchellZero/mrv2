import "./AppEntry.css";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

function AppEntry() {
  const nodeNav = useNodeNav();

  return (
    <div className="mrvPage color__surface__subdued AppEntry">
      <h1>AppEntry</h1>
    </div>
  );
}

export { AppEntry };
