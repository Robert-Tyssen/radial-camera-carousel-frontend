import { createContext } from "react";
import { useServerUrl } from "../hooks/useServerUrl";

// Context for server address status
// eslint-disable-next-line react-refresh/only-export-components
export const ServerAddressContext = createContext<ReturnType<typeof useServerUrl> | undefined>(undefined);

// Provider to propogate context
export const ServerAddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useServerUrl();
  return <ServerAddressContext.Provider value={state}>{children}</ServerAddressContext.Provider>
};