import { Search } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Input } from "../ui/input";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void; // 👈 Fixed: Typed as a function signature
  disabled?: boolean;
}

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
  disabled = false,
}: Props) {
  return (
    <View className="bg-white flex-row items-center justify-between rounded-xl px-3 border border-neutral-100 shadow-2xs gap-2">
      <Search color="#6b7280" size={20} />

      <Input
        editable={!disabled}
        value={value}
        onChangeText={onChangeText}
        className="bg-transparent border-0 flex-1 p-0 font-body-medium"
        placeholder={placeholder}
      />
    </View>
  );
}
