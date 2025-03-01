import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useServerUrl } from "../hooks/useServerUrl";
import { CheckRounded } from "@mui/icons-material";



export const AddressInput = () => {

  const serverUrlHook = useServerUrl();

  const message = serverUrlHook.serverUrlValid
    ? 'Server URL is valid!'
    : (serverUrlHook.error ? serverUrlHook.error : 'Server URL has not been validated')

  let messageStatus = 'info'
  if (serverUrlHook.serverUrlValid) messageStatus = 'success';
  if (serverUrlHook.error) messageStatus = 'error';

  return (
    <Box>
      <Stack spacing={2} pb={4}>
        <Typography variant='h5'>Connect to Device Server</Typography>
        <Stack direction={'row'} spacing={2} alignItems={'center'}>

          {/* Server URL input field */}
          <TextField
            fullWidth
            variant='filled'
            label='Server IP Address'
            value={serverUrlHook.serverUrl}
            onChange={(e) => serverUrlHook.updateServerUrl(e.target.value)}
            margin='dense'
          />

          {/* Button to validate the URL */}
          <Button
            variant='contained'
            loading={serverUrlHook.loading}
            loadingPosition='start'
            startIcon={<CheckRounded />}
            disabled={!serverUrlHook.serverUrl.trim()}
            onClick={() => serverUrlHook.validateServerUrl()}
          >
            Check
          </Button>
        </Stack>
        {/* Status message to indicate if the server is valid */}
        <Paper sx={{p: 1, borderRadius: 2}} variant='outlined'>
          <Typography variant='body2' color={messageStatus}>{message}</Typography>
        </Paper>
        
      </Stack>
    </Box>
  )
}