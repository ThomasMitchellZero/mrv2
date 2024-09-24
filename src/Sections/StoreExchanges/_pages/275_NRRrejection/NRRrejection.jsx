import { ContinueBtnMRV } from "../../../../mrv/mrv-components/inputs/ContinueBtnMRV";

import {
  TitleBarSTRX,
  CashTotalSTRX,
} from "../../_resources/components/CompConfigsSTRX";
import { RejectionCard } from "../../../../mrv/mrv-components/DisplayOutputs/Rejection/RejectionCard";
import { ColumnLabelMRV } from "../../../../mrv/mrv-components/DisplayOutputs/ColumnLabelMRV/ColumnLabelMRV";

import { RejectionObj } from "../../../../globalFunctions/globalJS_classes";

import { useOutletContext } from "react-router";

import { useNodeNav } from "../../../../mrv/MRVhooks/MRVhooks";

function NRRrejection() {
  const mrvCtx = useOutletContext();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSessionMRV = mrvCtx.setSessionMRV;
  const nodeNav = useNodeNav();

  const aNRRitems = sessionMRV.atomizedReturnItems.filter(
    (atom) => !Boolean(atom.atomInvoNum)
  );

  const oNRRrejections = new RejectionObj({
    rejectsArr: aNRRitems,
    strLabel: "These items cannot be returned without receipts.",
  });

  // fill with all rejection types.  Might have more in the future.
  const aAllRejections = [oNRRrejections];


  const uiRejectionCards = aAllRejections.map((rej, i) => {
    return <RejectionCard key={i} rejectionObj={rej} />;
  });

  return (
    <section className={`newItems mrvPage color__surface__subdued`}>
      <main className={`mrvPanel__main`}>
        <TitleBarSTRX
          showProductName={true}
          headerTitle={`No Receipts Found For items`}
          showNavNodeBar={true}
        />
        <div className={`main_content`}>
          <ColumnLabelMRV
            iconStr={`alert`}
            bigLabel={`No Receipts Found`}
            smallLabel={`These items cannot be returned without receipts.`}
          />
          {uiRejectionCards}
        </div>
        <div className={`footer_content`}>
          <CashTotalSTRX />
          <ContinueBtnMRV handleClick={(e) => handleContinue(e)} />
        </div>
      </main>
    </section>
  );
}

export { NRRrejection };
