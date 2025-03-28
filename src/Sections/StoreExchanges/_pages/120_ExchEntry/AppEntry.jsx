import "./AppEntry.css";

import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

function AppEntry() {
  const nodeNav = useNodeNav();

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Choose Scenario"}
        ></TitleBarSTRX>
        <div className={`main_content gap2rem alignLeft padding__vertical`}>
          <button
            type="button"
            onClick={() => {
              nodeNav("appEntry");
            }}
            className={`mrvBtn primary`}
          >
            Test Scenario 1
          </button>
        </div>
      </section>
    </section>
  );
}

export { AppEntry };
