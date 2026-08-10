import { Search } from "lucide-react-native";
import React from "react";
import { View } from "react-native";
import { Input } from "../ui/input";

interface Props {
  placeholder?: string;
}

export default function SearchBar({ placeholder }: Props) {
  return (
    <View className="bg-white flex-row items-center justify-between rounded-md px-2 shadow gap-2">
      <Search className="" color={"#6b7280"} size={20} />

      <Input
        className="bg-transparent border-0 flex-1 p-0 font-body-medium"
        placeholder={placeholder}
      />
    </View>
  );
}
