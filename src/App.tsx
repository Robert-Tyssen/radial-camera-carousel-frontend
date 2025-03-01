import { Box, Typography } from '@mui/material'
import { AddressInput } from './components/address_input'
import { SubmissionForm } from './components/submission_form'

export const App: React.FC = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default' }}>

        <Box sx={{ maxWidth: 'md', px: 4, pt: 8 }}>

          {/* Main title */}
          <Typography variant="h3">Placeholder Title</Typography>

          <AddressInput />
          <SubmissionForm />

        </Box>
      </Box>
    </>
  )
}

export default App
