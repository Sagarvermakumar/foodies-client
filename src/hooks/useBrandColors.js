



import { useColorModeValue } from "@chakra-ui/react";
import * as config from "../brand.config.js";

export function useBrandColors() {
  return {
    ...config,

    // Dynamic values
    bg: useColorModeValue(config.brandLightBg, config.brandDarkBg),
    color: useColorModeValue(config.brandLightColor, config.brandDarkColor),
    borderColor: useColorModeValue(
      config.brandLightBorderColor,
      config.brandDarkBorderColor
    ),
    cardBg: useColorModeValue(config.brandCardLightBg, config.brandCardDarkBg),
  };
}
