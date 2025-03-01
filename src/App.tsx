import { Box, Button, TextField, Typography } from '@mui/material'

export const App: React.FC = () => {

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default' }}>

        <Box sx={{ maxWidth: 'md', px: 4, pt: 8 }}>

          {/* Main title */}
          <Typography variant="h3">Placeholder Title</Typography>

          {/* Endpoint text input */}
          <TextField variant='outlined' label='Web Server Address' defaultValue={'http://localhost:0000/'}/>
          <Button variant='contained' size='large'>Check</Button>


        </Box>


      </Box>
    </>
  )
}

export default App
