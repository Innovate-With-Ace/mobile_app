import { Text } from "@/components/ui/text";
import { CheckCircle2, XCircle } from "lucide-react-native";
import React, { createContext, useCallback, useContext, useRef, useState } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ToastKind = "success" | "error";
type ToastState = { id: number; message: string; kind: ToastKind } | null;

const ToastContext = createContext<{
  show: (message: string, kind?: ToastKind) => void;
} | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastState>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (message: string, kind: ToastKind = "success") => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ id: Date.now(), message, kind });
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();

      timerRef.current = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 180,
          useNativeDriver: true,
        }).start(() => setToast(null));
      }, 2200);
    },
    [opacity]
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <Animated.View
          style={{ opacity, bottom: insets.bottom + 80 }}
          className="absolute left-4 right-4 items-center"
          pointerEvents="none"
        >
          <View
            className={`flex-row items-center gap-2 px-4 py-3 rounded-2xl shadow-lg ${
              toast.kind === "success" ? "bg-brand-text" : "bg-brand-error"
            }`}
          >
            {toast.kind === "success" ? (
              <CheckCircle2 color="#84cc16" size={16} strokeWidth={2.5} />
            ) : (
              <XCircle color="#ffffff" size={16} strokeWidth={2.5} />
            )}
            <Text className="text-white font-body-medium text-sm">
              {toast.message}
            </Text>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
