import { ExpandMoreRounded, RefreshRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAnalysisStatus } from "../hooks/useAnalysisStatus";
import { AnalysisTaskStatus } from "../models/AnalysisModels";

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

  // TODO - pass actual URL as input
  const { analysisStatus, loading, updateStatus } = useAnalysisStatus('http://127.0.0.1:8000/', false);

  useEffect(() => {
    updateStatus();

  }, [updateStatus]);

  const groupedTasks = groupPhotoTasks(analysisStatus.analysisTasks);
  console.log(groupedTasks);

  return (
    <Box>
      {/* Section header */}
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} pb={2}>
        <Typography variant='h5'>Analysis Status</Typography>
        <IconButton loading={loading} onClick={updateStatus}>
          <RefreshRounded />
        </IconButton>
      </Stack>

      {/* List of photos being analyzed */}
      {Object.entries(groupedTasks).map((gr) =>
        <GroupedPhotoTaskView id={Number(gr[0])} tasks={gr[1]} />
      )}

    </Box>
  )
}

const GroupedPhotoTaskView: React.FC<{ id: number, tasks: AnalysisTaskStatus[] }> = ({ id, tasks }) => {

  const description = 'Photo Slot #' + (id + 1)
  const complete = tasks.filter((e) => e.status == "COMPLETE").length
  const allComplete = complete == tasks.length

  return (
    <Accordion >
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
        <Stack direction='row' spacing={2} flexWrap='wrap'>
          {tasks.map((task) => {

            const cameraText = 'Camera # ' + task.cameraId +':';
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
              <Stack direction='row' spacing={1}>
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