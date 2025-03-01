import { Box, Typography } from '@mui/material'
import { AddressInput } from './components/address_input'
import { AnalysisView } from './components/AnalysisView'
import { SubmissionForm } from './components/SubmissionForm'

export const App: React.FC = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default' }}>

        <Box sx={{ maxWidth: 'md', px: 4, pt: 8 }}>

          {/* Main title */}
          <Typography variant="h3">Placeholder Title</Typography>

          <AddressInput />
          <SubmissionForm />
          <AnalysisView />


        </Box>
      </Box>
    </>
  )
}

export default App
