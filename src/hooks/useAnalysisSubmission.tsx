import { useState } from "react";
import { AnalysisRequest } from "../models/AnalysisModels";

// Endpoint to use on the server to submit the analysis
const ANALYSIS_SUBMIT_ENDPOINT = '/api/submit-analysis'

const _testAnalysis: AnalysisRequest = {
  0: [0, 5],
  2: [1, 3]
}

// Performs a POST request on the submit analysis endpoint
// Returns null if successful, or an error message if request failed.
const submitAnalysisRequest = async (baseUrl: string, req: AnalysisRequest): Promise<string | null> => {
  try {
    // Trigger the submit request
    const response = await fetch(`${baseUrl}${ANALYSIS_SUBMIT_ENDPOINT}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    // Validate that an OK status response was received
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Null indicates no error was received
    return null;
  } catch (error) {
    // Error occurred, log the message and return a message
    console.error("❌ Submission failed:", error);
    return 'Submission failed'
  }
}


// Custom hook to manage submission of an analysis
export const useAnalysisSubmission = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Submit the active submission at the specifed server URL
  const submitAnalysis = async (serverBaseUrl: string) => {

    setError(null);
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Minor delay for feedback
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Trigger service to submit request
    const error = await submitAnalysisRequest(serverBaseUrl, _testAnalysis);
    setIsSubmitting(false);

    // If error was received, update state and exit
    if (error) {
      setError(error)
      return;
    }

    // No error, submission was successful
    setSubmitSuccess(true);

  }

  // Expose details and actions for consumption
  return {isSubmitting, submitSuccess, error, submitAnalysis}
}