import { generateUtilityClass, generateUtilityClasses } from "@mui/base";

export function getButtonUtilityClass(slot) {
  return generateUtilityClass("MuiButton", slot);
}

const buttonClasses = generateUtilityClasses("MuiButton", [
  "root",
  "colorBrand",
  "variantText",
  "variantOutlined",
  "variantContained",
  "focusVisible",
  "disabled",
  "sizeMedium",
  "sizeSmall",
  "sizeLarge",
  "fullWidth",
]);

export default buttonClasses;
