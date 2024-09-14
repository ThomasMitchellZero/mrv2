import "./DescriptorIcon.css";
import { FaBoxOpen } from "react-icons/fa6";
import {
  MdReceipt,
  MdReceiptLong,
  MdShoppingCart,
  MdOutlineShoppingCart,
  MdOutlineWarningAmber,
  MdCircle,
} from "react-icons/md";

function DescriptorIcon({
  iconStr = "circle",
  ctnrSize = "2.5rem",
  fontSize = "2rem",
  backgroundColor = "color__surface__default",
  color = "color__primary__text",
  radius = "100%",
  REF_iconStr____circle__box__receipt__receiptLong__cart__alert = "",
}) {
  const styleObj = {
    fontSize: fontSize,
    color: color,
  };

  const iconsObj = {
    circle: <MdCircle {...styleObj} />,
    box: <FaBoxOpen {...styleObj} />,
    receipt: <MdReceipt {...styleObj} />,
    receiptLong: <MdReceiptLong {...styleObj} />,
    cart: <MdOutlineShoppingCart {...styleObj} />,
    alert: <MdOutlineWarningAmber {...styleObj} />,
  };

  const outIcon = iconsObj[iconStr] || iconsObj.sick;

  return (
    <div
      height={ctnrSize}
      style={{
        height: ctnrSize,
        width: ctnrSize,
        borderRadius: radius,
        color: color,
      }}
      className={`descriptorIcon ${color} ${backgroundColor}`}
    >
      {outIcon}
    </div>
  );
}

export { DescriptorIcon };
