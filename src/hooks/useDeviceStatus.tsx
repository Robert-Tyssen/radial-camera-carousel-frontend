import { useCallback, useEffect, useState } from "react";

type DeviceStatus = {
  analysisInProgress: boolean;
}

// Time interval between automatic polls for status updates
const API_POLL_INTERVAL = 1000; // 1 second

// Fetches the current status of the photo carousel by
// calling the '/api/analysis-state' endpoint on the server
const fetchDeviceStatus = async () => {
  console.log('Fetch initiated')
}

export const useDeviceStatus = () => {

  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  // Callback to update the status of the 
  const updateStatus = useCallback(async () => {
    console.log('Fetch callback...')
  }, []);

  // Automatically refresh the status by calling updateStatus periodically
  useEffect(() => {
    // Stop effect if polling is disabled
    if (!isPolling) return;

    // Perform fetch and set timer for next callback
    updateStatus()
    const interval = setInterval(updateStatus, API_POLL_INTERVAL);

    // Cleanup after dismount of component
    return () => clearInterval(interval);

  }, [updateStatus, isPolling])

  // Expose state objects
  return { deviceStatus, loading, error, updateStatus }

}