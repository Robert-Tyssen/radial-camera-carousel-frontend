import { DeleteRounded, SendRounded } from "@mui/icons-material";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Chip, FormControlLabel, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { ServerAddressContext } from "../contexts/ServerAddressProvider";
import { useAnalysisSubmission } from "../hooks/useAnalysisSubmission";
import { cameraSet } from "../models/PhotoCameraModels";
import { ANALYSIS_IN_PROGRESS_ERROR } from "../models/AnalysisModels";
import { useNavigate } from "react-router-dom";

export const SubmissionForm: React.FC = () => {

  const submissionHook = useAnalysisSubmission();
  const navigate = useNavigate();

  const serverContext = useContext(ServerAddressContext);
  if (!serverContext) {
    throw new Error('ServerAddressContext must be used within ServerAddressProvider')
  }

  // Set the description of a photo
  const setPhotoDescription = (photoId: number, description: string) => {
    submissionHook.setPhotoDescription(photoId, description);
  }

  // Toggles a camera assignment for a given photo id
  const setPhotoCamera = (photoId: number, cameraId: number, value: boolean) => {
    submissionHook.setPhotoCamera(photoId, cameraId, value);
  }

  // Clears all the user-selected settings from a photo slot
  const clearPhoto = (photoId: number) => {
    submissionHook.clearPhoto(photoId);
  }

  // Submit the analysis based on the selected photos and cameras
  const submitForm = () => {
    submissionHook.submitAnalysis(serverContext.serverUrl);
  }

  const photos = submissionHook.photos;

  return (
    <Box py={2}>
      <Typography variant='h5' pb={2}>Edit Photos and Camera Selection</Typography>

      {Object.entries(photos).map(([photoId, { name, description, cameras }]) => {

        // Convert key back to number for type-compatibility
        const id = Number(photoId);

        // Check if the photo has user-assigned details
        const hasDetails = description || cameras.length > 0

        return (
          <Accordion>
            <AccordionSummary>
              <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <Typography variant='overline'>{name}</Typography>
                <Chip
                  size='small'
                  variant='filled'
                  label={`${cameras.length == 0 ? 'No' : cameras.length} Camera(s) Selected`}
                  color={cameras.length > 0 ? 'secondary' : 'default'}
                />
                <Typography variant='caption'
                  sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {description}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                fullWidth
                sx={{ pb: 2 }}
                variant='filled'
                label='(Optional) Photo Description'
                value={description}
                onChange={(e) => setPhotoDescription(id, e.target.value)}
              />
              <Typography pb={2}>Select Cameras to Analyze Photo:</Typography>
              <Stack direction='row' flexWrap='wrap' sx={{ gap: 2 }}>
                {Object.entries(cameraSet).map(([cameraId, cameraLabel]) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={cameras.includes(Number(cameraId))}
                        onChange={(_evt, val) => setPhotoCamera(id, Number(cameraId), val)}
                      />
                    }
                    label={cameraLabel}
                  />

                ))}
              </Stack>
            </AccordionDetails>
            <AccordionActions>
              {hasDetails &&
                <Button
                  onClick={() => clearPhoto(id)}
                  aria-label="clear"
                  size='small' color='error'
                  startIcon={<DeleteRounded />}
                >
                  Delete
                </Button>
              }
            </AccordionActions>
          </Accordion>
        )
      })}

      {/* Submit button */}
      <Stack direction='row' justifyContent='flex-end' alignItems='center' py={2} spacing={2}>
        {!serverContext.serverUrlValid &&
          <Typography variant='body2' color='info'>
            First validate server URL in order to submit
          </Typography>
        }
        {serverContext.serverUrlValid &&
          submissionHook.error &&
          submissionHook.error !== ANALYSIS_IN_PROGRESS_ERROR &&
          <Typography variant='body2' color='error' fontWeight='bold'>
            {submissionHook.error}
          </Typography>
        }
        {serverContext.serverUrlValid &&
          submissionHook.error &&
          submissionHook.error === ANALYSIS_IN_PROGRESS_ERROR &&
          <Button variant='text' color='info' onClick={() => navigate('/analyze')}>
            Analysis In Progress - Click to View
          </Button>
        }
        <Button
          variant='contained'
          startIcon={<SendRounded />}
          onClick={() => submitForm()}
          disabled={!serverContext.serverUrlValid}
          loading={submissionHook.isSubmitting}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  )
}