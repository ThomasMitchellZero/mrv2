import "./AppEntry.css";

import CWEX_Icon from "../../../../assets/lowes-icons/App_Icons/CWEX_Icon.png";
import XDTX_Icon from "../../../../assets/lowes-icons/App_Icons/XDTX_Icon.png";

import { TitleBarSTRX } from "../../_resources/components/CompConfigsSTRX";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";
import { XDTX } from "../../../XDTX/XDTX";

function AppEntry() {
  const nodeNav = useNodeNav();

  const oExchTypes = {
    delx: {
      icon: XDTX_Icon,
      title: "Delivery Exchange",
      desc: "Return or replacement items that require delivery.",
      navKey: "testScenarios",
    },
    strx: {
      icon: CWEX_Icon,
      title: "Carry With Exchange",
      desc: "All return and replacement items present in store.",
      navKey: "replacementCheck",
    },
  };

  const uiExchType = (sKey) => {
    return (
      <div
        onClick={() => nodeNav(oExchTypes[sKey].navKey)}
        className={`vBox cardStyle hasHover appTile`}
      >
        <img src={oExchTypes[sKey].icon} alt={sKey} />
        <div className={`heading__medium bold color__primary__text`}>
          {oExchTypes[sKey].title}
        </div>
        <div className={`body__small color__tertiary__text`}>
          {oExchTypes[sKey].desc}
        </div>
      </div>
    );
  };

  return (
    <section className={`mrvPage`}>
      <section className={`mrvPanel__main appEntry`}>
        <TitleBarSTRX
          showNavNodeBar={true}
          headerTitle={"Choose Exchange Type"}
        ></TitleBarSTRX>
        <div className={`main_content gap2rem padding__vertical`}>
          <div className={`hBox maxFlex maxWidth centerAll`}>
            {uiExchType("delx")}
            {uiExchType("strx")}
          </div>
        </div>
      </section>
    </section>
  );
}

export { AppEntry };
