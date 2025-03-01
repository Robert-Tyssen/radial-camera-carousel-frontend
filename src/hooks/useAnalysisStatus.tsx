import { useCallback, useEffect, useState } from "react";
import { AnalysisResponseSchema, AnalysisStatus } from "../models/AnalysisModels";

// Time interval (milliseconds) between automatic polls for status updates
const API_POLL_INTERVAL = 1000;

// Endpoint to use on the server to get the analysis status
const ANALYSIS_STATE_ENDPOINT = '/api/analysis-state'

// Default analysis status when a fetch has not been performed yet
const defaultAnalysisStatus: AnalysisStatus = {
  inProgress: false,
  analysisTasks: [],
}

// Fetches the current status of the photo carousel by
// calling the '/api/analysis-state' endpoint on the server
const getAnalysisStatus = async (serverBaseUrl: string): Promise<AnalysisStatus | null> => {
  try {
    // Call API and ensure OK HTTP response status
    const response = await fetch(`${serverBaseUrl}${ANALYSIS_STATE_ENDPOINT}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Validate the response is the correct schema 
    const json = await response.json();
    const result = AnalysisResponseSchema.safeParse(json);
    if (!result.success) {
      console.error("❌ Invalid response format:", result.error);
      return null;
    }

    console.log('Analysis status success!');
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    return null;
  }
}

export const useAnalysisStatus = (serverBaseUrl: string, isPollingInit = false) => {

  const [analysisStatus, setAnalysisStatus] = useState<AnalysisStatus>(defaultAnalysisStatus);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, ] = useState(isPollingInit);

  // Callback to update the status of the 
  const updateStatus = useCallback(async () => {

    setError(null);
    setLoading(true);
    const analysisStatus = await getAnalysisStatus(serverBaseUrl);
    setLoading(false);

    if (analysisStatus) {
      setAnalysisStatus(analysisStatus);
      return;
    }

    setError('Failed to fetch analysis status');
  }, [serverBaseUrl]);

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
  return { deviceStatus: analysisStatus, loading, error, updateStatus }

}