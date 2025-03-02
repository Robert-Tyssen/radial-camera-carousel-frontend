import { Box, Typography } from '@mui/material'
import { AddressInput } from './components/AddressInput'
import { AnalysisView } from './components/AnalysisView'
import { SubmissionForm } from './components/SubmissionForm'

export const App: React.FC = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default' }}>

        <Box sx={{ maxWidth: 'md', px: 4, pt: 8 }}>

          {/* Main title */}
          <Typography variant="h2" pb={4}>Photo Carousel Application</Typography>

          <Typography variant='h6'>How to use:</Typography>
          <Typography>
            Enter the target IP address of the device's web server, and click 'Check' to ensure it is valid
          </Typography>
          <Typography>
            Then, select the desired cameras to analyze each photo, and enter an optional photo description.
            Click 'Submit' to start the analysis. Only one batch of photos can be analyzed at a time.
          </Typography>

          <AddressInput/>
          <SubmissionForm />
          <AnalysisView />


        </Box>
      </Box>
    </>
  )
}

export default App
