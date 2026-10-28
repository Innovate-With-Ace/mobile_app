import { Image } from "expo-image";
import React, { useState } from "react";
import type { StyleProp, ImageStyle } from "react-native";

const FALLBACK = require("../../assets/dish/sample_dish.jpg");

type Props = {
  uri?: string | null;
  style?: StyleProp<ImageStyle>;
};

// Wikimedia (and some CDNs) reject requests with a generic/empty User-Agent,
// so we send a descriptive one. Harmless for other hosts.
const HEADERS = { "User-Agent": "BeboysEatery/1.0 (mobile app)" };

export default function DishImage({ uri, style }: Props) {
  const [failed, setFailed] = useState(false);
  const hasUri = !!uri && uri.trim().length > 0 && !failed;

  return (
    <Image
      source={hasUri ? { uri: uri!, headers: HEADERS } : FALLBACK}
      style={[{ width: "100%", height: "100%" }, style]}
      contentFit="cover"
      transition={200}
      cachePolicy="disk"
      onError={(e) => {
        if (__DEV__) console.warn("DishImage failed:", uri, e?.error);
        setFailed(true);
      }}
    />
  );
}