import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

interface Props {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: "muted" | "error";
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  tone = "muted",
}: Props) {
  const isError = tone === "error";
  return (
    <View className="items-center justify-center py-14 px-8 gap-2">
      <View
        className={`size-14 rounded-full items-center justify-center mb-1 ${
          isError ? "bg-brand-error/10" : "bg-brand-surface"
        }`}
      >
        <Icon
          size={24}
          color={isError ? "#ef4444" : "#9ca3af"}
          strokeWidth={2}
        />
      </View>
      <Text className="font-header-bold text-brand-text text-base text-center">
        {title}
      </Text>
      {description && (
        <Text className="font-body text-brand-muted text-sm text-center max-w-[240px]">
          {description}
        </Text>
      )}
      {actionLabel && onAction && (
        <Button
          className="bg-brand-primary mt-3 rounded-xl active:bg-brand-primary-pressed min-h-11 px-5"
          onPress={onAction}
        >
          <Text className="text-white font-body-bold text-sm">
            {actionLabel}
          </Text>
        </Button>
      )}
    </View>
  );
}
