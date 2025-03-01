import { createContext } from "react";
import { useAnalysisStatus } from "../hooks/useAnalysisStatus";

// Context for device status
const DeviceStatusContext = createContext<ReturnType<typeof useAnalysisStatus> | null>(null);

// Provider to propogate context
export const DeviceStatusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useAnalysisStatus();
  return <DeviceStatusContext.Provider value={state}>{children}</DeviceStatusContext.Provider>
};