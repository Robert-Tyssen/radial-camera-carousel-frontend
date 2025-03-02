import { useState } from "react";
import { AnalysisRequest } from "../models/AnalysisModels";
import { numberOfCameras, PhotoSetState } from "../models/PhotoCameraModels";
import { useNavigate } from "react-router-dom";

// Endpoint to use on the server to submit the analysis
const ANALYSIS_SUBMIT_ENDPOINT = '/api/submit-analysis'

// Initial empty state where no photos have descriptions or cameras assigned
const initialPhotoState: PhotoSetState = Object.fromEntries(
  Array.from({ length: numberOfCameras }, (_, i) => [i, { name: 'Photo Slot #' + (i + 1), description: '', cameras: [] }])
)


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

  const [photos, setPhotos] = useState(initialPhotoState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Set the description of the phot
  const setPhotoDescription = (photoId: number, description: string) => {
    setPhotos((prevState) => ({
      ...prevState,
      [photoId]: { ...prevState[photoId], description }
    }));
  }

  // Assign or remove a given cameraId for a photoId
  const setPhotoCamera = (photoId: number, cameraId: number, value: boolean) => {
    setPhotos((prevState) => {
      // Get the cameras currently assigned to the photo id
      const { cameras } = prevState[photoId]
      // Remove camera if currently assigned, otherwise add it
      let updatedCameras = [...cameras]
      if (!value) updatedCameras = cameras.filter((i) => i !== cameraId)
      if (value && !cameras.includes(cameraId))
        updatedCameras = [...cameras, cameraId];

      // Return updated state with updated cameras for the photo id
      return {
        ...prevState,
        [photoId]: { ...prevState[photoId], cameras: updatedCameras }
      }
    });
  }

  // Clears all the user-selected settings from a photo slot
  const clearPhoto = (photoId: number) => {
    setPhotos((prevState) => ({
      ...prevState,
      [photoId]: { ...prevState[photoId], cameras: [], description: '' }
    }));
  }

  // Submit the active submission at the specifed server URL
  const submitAnalysis = async (serverBaseUrl: string) => {

    setError(null);
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Minor delay for feedback
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Construct request from only photos which have at least one camera selected
    const request: AnalysisRequest = Object.fromEntries(
      Object.entries(photos)
        .filter(([, photoState]) => photoState.cameras.length > 0)
        .map(([photoId, photoState]) => [Number(photoId), photoState.cameras])
    );


    // Trigger service to submit request
    const error = await submitAnalysisRequest(serverBaseUrl, request);
    setIsSubmitting(false);

    // If error was received, update state and exit
    if (error) {
      setError(error)
      return;
    }

    // No error, submission was successful
    setSubmitSuccess(true);
    navigate('/analyze');
  }

  // Expose details and actions for consumption
  return {
    photos,
    isSubmitting,
    submitSuccess,
    error,
    setPhotoDescription,
    setPhotoCamera,
    clearPhoto,
    submitAnalysis
  }
}