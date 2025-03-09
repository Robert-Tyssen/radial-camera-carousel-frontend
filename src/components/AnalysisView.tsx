import { ExpandMoreRounded, RefreshRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { ServerAddressContext } from "../contexts/ServerAddressProvider";
import { useAnalysisStatus } from "../hooks/useAnalysisStatus";
import { AnalysisTaskStatus } from "../models/AnalysisModels";
import { cameraSet } from "../models/PhotoCameraModels";

// Type to show analysis task status grouped by photo id
type GroupedPhotoTasks = Record<number, AnalysisTaskStatus[]>;

// Helper function to take the flat list of analysis task statuses,
// and group them by similar photo id
const groupPhotoTasks = (analysisTasks: AnalysisTaskStatus[]): GroupedPhotoTasks => {
  return analysisTasks.reduce((acc, item) => {
    // If grouping does not already exist for this photo id, create new empty list
    if (!acc[item.photoId]) acc[item.photoId] = [];

    // Insert item to end of grouped list for the photo id, and return the updated set
    acc[item.photoId].push(item);
    return acc;
  }, {} as GroupedPhotoTasks);
}

// Component to provide an overall view of the analysis status, which consists of the list
// of photos which have analyses requests, and the status of each analysis per photo.
export const AnalysisView: React.FC = () => {
  // Get the server address context so it can be passed to the relevant services
  const serverContext = useContext(ServerAddressContext);
  if (!serverContext) {
    throw new Error('ServerAddressContext must be used within ServerAddressProvider')
  }

  // Create a hook for accessing analysis status state and actions,
  // using the server URL context to determine correct API endpoints
  const {
    analysisStatus,
    loading,
    updateStatus,
    isPolling,
    setIsPolling
  } = useAnalysisStatus(serverContext.serverUrl, true);

  // Side-effect to start polling for analysis status updates
  useEffect(() => {
    // Perform initial update and begin polling for updates
    updateStatus();
    setIsPolling(true)
    // Stop automatic polling if analysis is complete to avoid unecessary API calls
    if (!analysisStatus.inProgress) setIsPolling(false)

  }, [updateStatus, setIsPolling, analysisStatus.inProgress]);

  // Group the analysis tasks by photo for easier handling later
  const groupedTasks = groupPhotoTasks(analysisStatus.analysisTasks);

  // Get the number of completed tasks, and create a label for displaying
  const completedTasks = analysisStatus.analysisTasks.filter((task) => task.status == 'COMPLETE').length
  const completedTaskText = `${completedTasks} out of ${analysisStatus.analysisTasks.length} analysis tasks complete`

  return (
    <Box>
      {/* Section header */}
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} pb={2}>
        {/* Title text */}
        <Typography variant='h5'>Analysis Status</Typography>

        {/* Row with controls for refreshing the status */}
        <Stack direction='row' spacing={2}>
          {/* Button to perform a single status update request */}
          <Button loading={loading} onClick={updateStatus} loadingPosition='start' startIcon={<RefreshRounded />}>
            Refresh Status
          </Button>
          {/* Switch allowing user to enable/disable automatic updates */}
          <FormControlLabel
            control={<Switch checked={isPolling} onChange={(_evt, val) => setIsPolling(val)} />}
            label="Automatic Updates"
          />
        </Stack>
      </Stack>

      {/* Label to display number of completed tasks overall */}
      <Typography variant='h6' pb={2}>{completedTaskText}</Typography>

      {/* Create view to show grouped statuses for each individual photo id */}
      <Box>
        {Object.entries(groupedTasks).map((gr) =>
          <GroupedPhotoTaskView id={Number(gr[0])} tasks={gr[1]} />
        )}
      </Box>
    </Box>
  )
}

// Component which shows an overall grouping of analysis task statuses for a single photo id.
// Each group is displayed as an accordion which can be expanded to show detailed information.
const GroupedPhotoTaskView: React.FC<{ id: number, tasks: AnalysisTaskStatus[] }> = ({ id, tasks }) => {
  // Label for the group of tasks for the photo
  const description = 'Photo Slot #' + (id + 1)

  // Count the number of completed tasks based on status = 'COMPLETE'
  const complete = tasks.filter((e) => e.status == "COMPLETE").length
  const allComplete = complete == tasks.length

  // Display each grouping as an 'accordion' which shows high-level details when collapsed,
  // and additional details when fully expanded.
  return (
    <Accordion>
      {/* Header - visible when collapsed or expanded */}
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        {/* Row displaying a description of the photo slot, with a chip showing no. of complete tasks */}
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography>{description}</Typography>
          <Chip
            label={`${complete} / ${tasks.length} complete`}
            color={allComplete ? 'success' : 'warning'}
            variant={allComplete ? 'filled' : 'outlined'}
          />
        </Stack>
      </AccordionSummary>
      {/* Contents - only visible when accordion is expanded */}
      <AccordionDetails>
        {/* Show a status indicator for each analysis task within the grouping */}
        <Stack direction='row' flexWrap='wrap' sx={{ gap: 2 }}>
          {tasks.map((task) => <SingleTaskStatusView taskStatus={task} />)}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}


// Shows the status for a single analysis task, i.e. the status of a single camera's operation for a given photo slot.
// Will display the time remaining for tasks which are in progress, or simply a 'Complete' or 'Not Started' label.
// Color of the label is dynamic depending on the status.
const SingleTaskStatusView: React.FC<{ taskStatus: AnalysisTaskStatus }> = ({ taskStatus: task }) => {
  // Fetch the description of the camera based on its id
  const cameraText = cameraSet[task.cameraId] + ' Camera: ';

  // If status is 'IN PROGRESS' show the time remaining as the label,
  // otherwise just show the status as-is
  const statusLabel = task.status == "IN PROGRESS"
    ? `${task.timeRemaining} SECS REMAINING`
    : task.status

  // Determine the color to be used for the status indicator
  let statusColor: 'default' | 'warning' | 'success' | 'error' = 'default'
  switch (task.status) {
    case 'IN PROGRESS':
      statusColor = 'warning'; break;
    case 'COMPLETE':
      statusColor = 'success'; break;
    case 'NOT COMPLETE':
      statusColor = 'error'; break;
    default:
  }

  // Display the status as a row containing the label and status
  // E.g. "Blue Camera: 10 SECS REMAINING" or "Red Camera: NOT COMPLETE"
  return (
    <Stack direction='row' spacing={2}>
      <Typography fontWeight='bold'>{cameraText}</Typography>
      <Typography color={statusColor}>{statusLabel}</Typography>
    </Stack>
  )
}