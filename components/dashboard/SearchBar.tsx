import { Search, X } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { Input } from "../ui/input";

interface Props {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({ placeholder, value, onChangeText }: Props) {
  return (
    <View className="bg-white flex-row items-center justify-between rounded-xl px-3 h-11 shadow gap-2">
      <Search color={"#6b7280"} size={20} />

      <Input
        className="bg-transparent border-0 flex-1 p-0 font-body-medium"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />

      {!!value && (
        <Pressable
          onPress={() => onChangeText?.("")}
          hitSlop={8}
          className="p-1.5 rounded-full active:bg-brand-surface"
        >
          <X color="#9ca3af" size={16} />
        </Pressable>
      )}
    </View>
  );
}
