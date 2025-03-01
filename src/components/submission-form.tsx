import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Grid2, Typography } from "@mui/material";


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
      {photoSlots.map((slot) => (
        <Accordion>
          <AccordionSummary>
            <Typography>{'Photo Slot # ' + (slot + 1)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid2 container spacing={2}>
              {cameras.map((camera) => (
                <Grid2 size={3}>
                  <FormControlLabel key={camera.id} control={<Checkbox />} label={camera.label} />
                </Grid2>
              ))}
            </Grid2>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}