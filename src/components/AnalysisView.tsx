import { ExpandMoreRounded, RefreshRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, FormControlLabel, Stack, Switch, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { ServerAddressContext } from "../contexts/ServerAddressProvider";
import { useAnalysisStatus } from "../hooks/useAnalysisStatus";
import { AnalysisTaskStatus } from "../models/AnalysisModels";
import { cameraSet } from "../models/PhotoCameraModels";

type GroupedPhotoTasks = Record<number, AnalysisTaskStatus[]>;

const groupPhotoTasks = (analysisTasks: AnalysisTaskStatus[]): GroupedPhotoTasks => {
  return analysisTasks.reduce((acc, item) => {
    if (!acc[item.photoId]) {
      acc[item.photoId] = [];
    }
    acc[item.photoId].push(item);
    return acc
  }, {} as GroupedPhotoTasks);
}

export const AnalysisView: React.FC = () => {

  const serverContext = useContext(ServerAddressContext);
  if (!serverContext) {
    throw new Error('ServerAddressContext must be used within ServerAddressProvider')
  }

  // TODO - pass actual URL as input
  const { analysisStatus, loading, updateStatus, isPolling, setIsPolling } = useAnalysisStatus(serverContext.serverUrl, true);


  // Perform an update request on initial load, 
  // and set automatic polling until analysis is complete
  useEffect(() => {
    updateStatus();
    setIsPolling(true)

    if (!analysisStatus.inProgress) setIsPolling(false)

  }, [updateStatus, analysisStatus.inProgress, setIsPolling]);


  const groupedTasks = groupPhotoTasks(analysisStatus.analysisTasks);
  const completedTasks = analysisStatus.analysisTasks.filter((task) => task.status == 'COMPLETE').length
  const completedTaskText = `${completedTasks} out of ${analysisStatus.analysisTasks.length} analysis tasks complete`

  return (
    <Box>
      {/* Section header */}
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} pb={2}>
        <Typography variant='h5'>Analysis Status</Typography>

        <Stack direction='row' spacing={2}>
          <Button loading={loading} onClick={updateStatus} loadingPosition='start' startIcon={<RefreshRounded />}>
            Refresh Status
          </Button>
          <FormControlLabel
            control={
              <Switch checked={isPolling} onChange={(_evt, val) => setIsPolling(val)} />
            }
            label="Automatic Updates"
          />
        </Stack>
      </Stack>

      <Typography variant='h6' pb={2}>{completedTaskText}</Typography>

      {/* List of photos being analyzed */}
      <div>
        {Object.entries(groupedTasks).map((gr) =>
          <GroupedPhotoTaskView id={Number(gr[0])} tasks={gr[1]} />
        )}
      </div>
    </Box>
  )
}

const GroupedPhotoTaskView: React.FC<{ id: number, tasks: AnalysisTaskStatus[] }> = ({ id, tasks }) => {

  const description = 'Photo Slot #' + (id + 1)
  const complete = tasks.filter((e) => e.status == "COMPLETE").length
  const allComplete = complete == tasks.length

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>
          <Typography>{description}</Typography>
          <Chip
            label={`${complete} / ${tasks.length} complete`}
            color={allComplete ? 'success' : 'warning'}
            variant={allComplete ? 'filled' : 'outlined'}
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction='row' flexWrap='wrap' sx={{ gap: 2 }}>
          {tasks.map((task) => {

            const cameraText = cameraSet[task.cameraId] + ' Camera: ';
            const status = task.status == "IN PROGRESS"
              ? `${task.timeRemaining} SECS REMAINING`
              : task.status
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
            return (
              <Stack direction='row' spacing={2}>
                <Typography fontWeight='bold'>{cameraText}</Typography>
                <Typography color={statusColor}>{status}</Typography>
              </Stack>
            )
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}