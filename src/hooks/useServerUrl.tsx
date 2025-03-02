import { useState } from "react";
import { z } from "zod";

// Default server URL to use (default for local Django app)
const DEFAULT_SERVER_URL = 'http://127.0.0.1:8000'

// Endpoint to perform the heartbeat check
const HEARTBEAT_ENDPOINT = '/api/heartbeat-check'

// Expected response from the server to validate heartbeat
const HEARTBEAT_MESSAGE = 'Connection successful!'

// Expected schema of the heartbeat response
const HeartbeatResponseSchema = z.object({
  message: z.string(),
})

// Performs a GET request on the heartbeat endpoint and returns the message
// or null if an error / schema failure occurs
const getServerHeartbeatResponse = async (url: string): Promise<{ message: string } | null> => {
  try {
    // Call endpoint and ensure an OK response status is returned
    const response = await fetch(`${url}${HEARTBEAT_ENDPOINT}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Validate the response is the correct schema 
    const json = await response.json();
    const result = HeartbeatResponseSchema.safeParse(json);
    if (!result.success) {
      console.error("❌ Invalid response format:", result.error);
      return null;
    }

    // Return the response if everything is okay
    console.log('Heartbeat success!');
    console.log(result.data);
    return result.data;
  } catch (error) {
    // Error occured, so log an error and return null
    console.error("❌ Fetch failed:", error);
    return null;
  }
}

// Custom hook for allowing the user to enter a server URL,
// and actions to validate that it returns the expected response
export const useServerUrl = () => {
  // User-entered server URL
  const [serverUrl, setServerUrl] = useState<string>(DEFAULT_SERVER_URL);
  const [serverUrlValid, setServerUrlValid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Update the server URL from the provided value
  // Automatically invalidates the URL until validation is re-executed
  const updateServerUrl = (url: string) => {
    setServerUrl(url);
    setServerUrlValid(false);
  }

  // Validates that a successful connection to the server is established,
  // and that the expected heartbeat message is returned
  const validateServerUrl = async () => {

    // TODO - add check on URL formatting before remote call
    
    setLoading(true);
    setError(null);
    setServerUrlValid(false);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { message } = (await getServerHeartbeatResponse(serverUrl)) || { message: 'ERROR' };
    setLoading(false);

    // Check that the expected message was returned
    if (message == HEARTBEAT_MESSAGE) {
      setError(null);
      setServerUrlValid(true);
      return;
    }

    // Expected response was not returned, so set the error message
    setError('The server URL is not valid');

  }

  // Expose state and actions
  return {serverUrl, serverUrlValid, error, loading, updateServerUrl, validateServerUrl }

}