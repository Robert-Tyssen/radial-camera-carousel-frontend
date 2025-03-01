import { createContext } from "react";
import { useDeviceStatus } from "../hooks/useDeviceStatus";

// Context for device status
const DeviceStatusContext = createContext<ReturnType<typeof useDeviceStatus> | null>(null);

// Provider to propogate context
export const DeviceStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useDeviceStatus();
  return <DeviceStatusContext.Provider value={state}>{children}</DeviceStatusContext.Provider>
};