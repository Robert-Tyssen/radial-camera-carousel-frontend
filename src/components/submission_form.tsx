import { DeleteRounded } from "@mui/icons-material";
import { Box, Button, Chip, Grid2, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";


interface CameraItem {
  id: number,
  label: string,
}

// Type to store the state for a given photo slot
interface PhotoSlotState {
  // Name of the slot (i.e. "Photo Slot #1")
  name: string,
  // Optional description of the photo
  description: string,
  // List of camera ids selected (e.g. 0, ..., 7)
  cameras: number[],
}

// Set of states for each individual photo slot
type PhotoSetState = Record<number, PhotoSlotState>;

// Initial empty state where no photos have descriptions or cameras assigned
const initialPhotoState: PhotoSetState = Object.fromEntries(
  Array.from({ length: 16 }, (_, i) => [i, { name: 'Photo Slot #' + (i + 1), description: '', cameras: [] }])
)

const cameraOptions: CameraItem[] = [
  { id: 0, label: 'Red', }, { id: 1, label: 'Orange', },
  { id: 2, label: 'Yellow', }, { id: 3, label: 'Green', },
  { id: 4, label: 'Blue', }, { id: 5, label: 'Indigo', },
  { id: 6, label: 'Violet', }, { id: 7, label: 'Ultraviolet', },
]

export const SubmissionForm: React.FC = () => {

  const [photos, setPhotos] = useState(initialPhotoState);

  const setPhotoDescription = (photoId: number, description: string) => {
    setPhotos((prevState) => ({
      ...prevState,
      [photoId]: { ...prevState[photoId], description }
    }));
  }

  // Toggles a camera assignment for a given photo id
  const toggleCamera = (photoId: number, cameraId: number) => {
    setPhotos((prevState) => {
      // Get the cameras currently assigned to the photo id
      const { cameras } = prevState[photoId]
      // Remove camera if currently assigned, otherwise add it
      const updatedCameras = cameras.includes(cameraId)
        ? cameras.filter((i) => i !== cameraId)
        : [...cameras, cameraId]

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

  return (
    <Box>
      <Typography variant='h5' pb={2}>Edit Photos and Camera Selection</Typography>
      <Grid2 container spacing={2}>
        {Object.entries(photos).map(([photoId, { name, description, cameras }]) => {

          // Convert key back to number for type-compatibility
          const id = Number(photoId);

          // Check if the photo has user-assigned details
          const hasDetails = description || cameras.length > 0

          return (
            <Grid2 size={6}>
              <Paper variant='outlined' sx={{ p: 2, borderRadius: 4 }} >
                <Stack>
                  <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Typography variant='overline'>{name}</Typography>

                    <Chip
                      size='small'
                      variant='filled'
                      label={`${cameras.length == 0 ? 'No' : cameras.length} Camera(s) Selected`}
                      color={cameras.length > 0 ? 'secondary' : 'default'}
                    />

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
                  </Stack>
                  <TextField
                    sx={{ pb: 2 }}
                    size='small'
                    variant='standard'
                    placeholder='Add photo title'
                    margin='dense'
                    value={description}
                    onChange={(e) => setPhotoDescription(id, e.target.value)}
                  />

                  <Grid2 container spacing={2}>
                    {cameraOptions.map((opt) => (
                      <Grid2>
                        <Chip
                          label={opt.label}
                          color="primary"
                          variant={cameras.includes(opt.id) ? "filled" : "outlined"}
                          onClick={() => toggleCamera(id, opt.id)}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                </Stack>
              </Paper>
            </Grid2>
          )
        })}
      </Grid2>
    </Box>
  )
}