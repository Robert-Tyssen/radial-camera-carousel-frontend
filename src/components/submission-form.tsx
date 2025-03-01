import { Box, Chip, Grid2, Paper, Stack, TextField, Typography } from "@mui/material";


interface CameraItem {
  id: number,
  label: string,
}

const cameras: CameraItem[] = [
  { id: 0, label: 'Red', }, { id: 1, label: 'Orange', },
  { id: 2, label: 'Yellow', }, { id: 3, label: 'Green', },
  { id: 4, label: 'Blue', }, { id: 5, label: 'Indigo', },
  { id: 6, label: 'Violet', }, { id: 7, label: 'Ultraviolet', },
]

// Simple list of photo slots and their id's (which match the array index)
const photoSlots = Array.from({ length: 16 }, (_, i) => i);

export const SubmissionForm: React.FC = () => {

  return (
    <Box>
      <Typography variant='h5' pb={2}>Edit Photos and Camera Selection</Typography>
      <Grid2 container spacing={2}>
        {photoSlots.map((slot) => (
          <Grid2 size={6}>
            <Paper variant='outlined' sx={{ p: 2, borderRadius: 8 }} >
              <Stack>
                <Typography variant='overline'>{'Photo Slot # ' + (slot + 1)}</Typography>
                <TextField size='small' variant ='standard' placeholder='Add photo title' margin='dense' sx={{pb: 2}}/>
              </Stack>
              <Grid2 container spacing={3}>
                {cameras.map((camera) => (
                  <Grid2>
                    <Chip
                      label={camera.label}
                      color="primary"
                      variant="filled"
                      onClick={() => { }}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  )
}