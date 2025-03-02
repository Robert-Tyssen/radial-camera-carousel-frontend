import { z } from "zod"

// Analysis in progress error
export const ANALYSIS_IN_PROGRESS_ERROR = 'analysis-in-progress';

// Model for an analysis request in format { photoId: [camera_id_1, ..., camera_id_n]}
export type AnalysisRequest = Record<number, number[]>;

// Overall analysis status data model
export type AnalysisStatus = {
  inProgress: boolean,
  analysisTasks: AnalysisTaskStatus[],
}

// Analysis task data model 
export type AnalysisTaskStatus = {
  photoId: number,
  cameraId: number,
  status: string,
  timeRemaining: number,
}


// Schema for analysis tasks returned from the server,
// with transformation to the associated data model
export const AnalysisTaskResponseSchema = z.object({
  photo_id: z.number(),
  camera_id: z.number(),
  status: z.string(),
  time_remaining: z.number(),
}).transform((data): AnalysisTaskStatus => ({
  photoId: data.photo_id,
  cameraId: data.camera_id,
  status: data.status,
  timeRemaining: data.time_remaining
}));

// Schema for the overall analysis status returned from the server,
// with transformations to the associated data model
export const AnalysisResponseSchema = z.object({
  analysis_in_progress: z.boolean(),
  analysis_tasks: z.array(AnalysisTaskResponseSchema)
}).transform((data): AnalysisStatus => ({
  inProgress: data.analysis_in_progress,
  analysisTasks: data.analysis_tasks
}));