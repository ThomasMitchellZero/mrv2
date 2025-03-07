import { cloneDeep } from "lodash";
import {
  returnAtom,
  baseLocState,
  locStFields,
  clearedErrors,
  clearedInputs,
} from "../../../../globalFunctions/globalJS_classes";

import { useCompHooks_MRV } from "../../../../mrv/mrv-components/CompHooksMRV";

import {
  useResetLocStFields,
  useSetLocStFields,
  useFindAtom,
  useNodeNav,
  useSetSessionItems,
  returnAutoDeriver,
} from "../../../../mrv/MRVhooks/MRVhooks";

import { useOutletContext } from "react-router";

function useLocStMethods_STRX() {
  const mrvCtx = useOutletContext();
  const nodeNav = useNodeNav();
  const sessionMRV = mrvCtx.sessionMRV;
  const setSession = mrvCtx.setSessionMRV;
  const locStRt = sessionMRV.locSt;
  const pageLocSt = locStRt.page;

  //setSessionItems
  const setReturnItems = useSetSessionItems({
    targetStateArrKey: "returnItems",
  });
  const setNewItems = useSetSessionItems({ targetStateArrKey: "newItems" });

  const findAtom = useFindAtom();
  const outMethods = {};

  const resetPageLS = useResetLocStFields("page");
  const setPageLS = useSetLocStFields("page");

  // Shared Methods -------------------------------------

  const AddItemsAndInvos = () => {
    const resetAllEntry30LS = useResetLocStFields("AllEntry30");
    const resetReasonPickerLS = useResetLocStFields("ReasonPickerSC");
    const setReasonPickerLS = useSetLocStFields("ReasonPickerSC");
    const setAllEntry30LS = useSetLocStFields("AllEntry30");

    const mrvMethods = useCompHooks_MRV().oReasonPicker_SC();

    const populateNewItems = () => {
      // add LW OoS items to newItems.  This is crap code but I need it done.  Sorry future me.

      const refAtom = new returnAtom({});
      const outSessionState = cloneDeep(sessionMRV);
      // locate all items that are LW OoS
      const aLW_OoS = outSessionState.returnItems.filter((thisItem) => {
        return thisItem.bifrostKey === "00100";
      });

      for (const rtrnAtom of aLW_OoS) {
        const pairedItemNum = rtrnAtom.bifrostEquivalent;
        let newAtomIndex = outSessionState.newItems.findIndex((newItem) => {
          return newItem.atomItemNum === pairedItemNum;
        });

        if (newAtomIndex === -1) {
          newAtomIndex = outSessionState.newItems.length;
          outSessionState.newItems.push(
            new returnAtom({
              atomItemNum: pairedItemNum,
              atomItemQty: 0,
            })
          );
        }
        outSessionState.newItems[newAtomIndex].atomItemQty =
          rtrnAtom.atomItemQty;
      }

      return returnAutoDeriver(outSessionState);

      /*
            for (const rtrnAtom of aLW_OoS) {
        const pairedItemNum = rtrnAtom.bifrostEquivalent;
        let refIndex = locateAtom({
          itemNum: pairedItemNum,
          arrToSearch: outSessionState.newItems,
          asIndex: true,
        });
        // if the item is not already in the newItems, add it.
        if (refIndex === -1) {
          refIndex = outSessionState.newItems.length;
          outSessionState.newItems.push(
            new returnAtom({
              atomItemNum: pairedItemNum,
              atomItemQty: 0,
            })
          );
        }
        outSessionState.newItems[refIndex].atomItemQty = rtrnAtom.atomItemQty;
      }
      */
    };

    //////////////////////////////////////////////////////////////

    const lsMethods = {
      basicClear: () => {
        console.log("Ya Basic");
        resetPageLS({ activeErrorALL: true });
        resetAllEntry30LS({ activeErrorALL: true });
      },

      continue: () => {
        const refAtom = new returnAtom({});

        const aNRRitems = sessionMRV.atomizedReturnItems.filter(
          // filter for any NRR items in Returns cart.
          (atom) => !Boolean(atom?.atomInvoNum)
        );

        // checks to see if all items are valid and receipted.
        const hasNRR = aNRRitems.length;
        const allValid = Object.values(sessionMRV.returnItems).every(
          (itemAtom) => {
            return mrvMethods.isReasonQtyValid({
              itemAtom: itemAtom,
              validCondition: "notOver",
            });
          }
        );

        if (locStRt.page.activeMode1 === "receipt") {
          lsMethods.modeSwitch({ keyStr: "item" });
        } else if (sessionMRV.returnItems.length === 0) {
          setPageLS({ activeError1: pageLocSt.oErrorObjects["noItems"] });
        } else if (!allValid) {
          setPageLS({
            activeError1: pageLocSt.oErrorObjects["invalidReturnReasons"],
          });
        } else if (hasNRR) {
          setSession(populateNewItems());
          resetPageLS({ EVERYONE: true });
          nodeNav("returnRejection");
        } else {
          setSession(populateNewItems());
          resetPageLS({ activeErrorALL: true });
          resetAllEntry30LS({ activeErrorALL: true });
          resetReasonPickerLS({ activeErrorALL: true });
          nodeNav("newitems");
        }
      },

      resetForm: () => {
        resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
        resetPageLS({ activeErrorALL: true });
        resetReasonPickerLS({ activeErrorALL: true });
      },

      resetKeysToo: () => {
        resetAllEntry30LS({ activeErrorALL: true });
        console.log("Ya Clear Keys Too");
        resetPageLS({ activeErrorALL: true, activeKey1: true });
        resetReasonPickerLS({ activeErrorALL: true, activeKey1: true });
      },

      modeSwitch: ({ keyStr = "receipt" }) => {
        setPageLS({ activeMode1: keyStr });
        resetAllEntry30LS({ activeErrorALL: true, inputALL: true });
        resetPageLS({ activeErrorALL: true });
      },

      setPageOverlay: ({ overlayKeyStr = "LwRtrnEntry" }) => {
        console.log("Set Page Overlay Truggered");
        setPageLS({ activeOverlay1: overlayKeyStr });
      },

      setPageError: ({ errorKeyStr = "" }) => {
        setPageLS({ activeError1: pageLocSt.oErrorObjects[errorKeyStr] });
      },
    };

    return lsMethods;
  };

  outMethods.AddItemsAndInvos = AddItemsAndInvos;

  const NewItems = () => {
    const resetNewItemEntryLS = useResetLocStFields("NewItemEntrySTRX");

    const mNewItemsHooks = {
      basicClear: () => {
        console.log("Set New Items");
        resetPageLS({
          activeErrorALL: true,
          activeUI3: true,
          activeKey1: true,
          activeData1: true,
        });
        resetNewItemEntryLS({ activeErrorALL: true });
      },

      handleItemQtyChange: (e, itemAtom) => {
        const newQty = e.target.value;

        setNewItems({
          itemAtom: itemAtom,
          newQty: newQty,
          actionType: "edit",
        });
      },

      itemReturnPeerQty: (newItemAtom) => {
        const aReturnPeers = sessionMRV.returnItems.filter((rtrnAtom) => {
          return (
            rtrnAtom.atomItemNum === newItemAtom.atomItemNum ||
            rtrnAtom.bifrostEquivalent === newItemAtom.atomItemNum
          );
        });

        const iReturnItemQty = aReturnPeers.reduce((acc, atom) => {
          return acc + atom.atomItemQty;
        }, 0);

        return iReturnItemQty;
      },

      itemExchStatus: (newItemAtom) => {
        // eventually this will use the atomizedNewItems array.
        const outObj = {};

        const aReturnPeers = sessionMRV.returnItems.filter((rtrnAtom) => {
          return (
            rtrnAtom.atomItemNum === newItemAtom.atomItemNum ||
            rtrnAtom.bifrostEquivalent === newItemAtom.atomItemNum
          );
        });

        const iReturnItemQty = aReturnPeers.reduce((acc, rtrnAtom) => {
          return acc + rtrnAtom.atomItemQty;
        }, 0);

        outObj.returnItemQty = iReturnItemQty;
        /*
                const returnItemQty =
          findAtom({
            itemNum: itemAtom.peerItem,
            itemsArr: sessionMRV.returnItems,
            asIndex: false,
          }).atomItemQty || 0;
        outObj.returnItemQty = returnItemQty;
        */

        const tileQty = newItemAtom.atomItemQty;

        outObj.qtyStatus =
          iReturnItemQty === tileQty
            ? "valid"
            : !iReturnItemQty
            ? "noReturn"
            : "mismatchQty";

        return outObj;
      },

      continue: () => {
        console.log("No Continue Set");
      },
    };

    return mNewItemsHooks;
  };
  outMethods.NewItems = NewItems;

  //-------------------------------------

  return outMethods;
}

export { useLocStMethods_STRX };

/*
  
  
  
  */
