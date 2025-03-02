import { CheckRounded } from "@mui/icons-material";
import { Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { ServerAddressContext } from "../contexts/ServerAddressProvider";



export const AddressInput = () => {

  const serverContext = useContext(ServerAddressContext);
  if (!serverContext) {
    throw new Error('ServerAddressContext must be used within ServerAddressProvider')
  }

  const message = serverContext.serverUrlValid
    ? 'Server URL is valid!'
    : (serverContext.error ? serverContext.error : 'Server URL has not been validated')

  let messageStatus = 'info'
  if (serverContext.serverUrlValid) messageStatus = 'success';
  if (serverContext.error) messageStatus = 'error';

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
            value={serverContext.serverUrl}
            onChange={(e) => serverContext.updateServerUrl(e.target.value)}
            margin='dense'
          />

          {/* Button to validate the URL */}
          <Button
            variant='contained'
            loading={serverContext.loading}
            loadingPosition='start'
            startIcon={<CheckRounded />}
            disabled={!serverContext.serverUrl.trim()}
            onClick={() => serverContext.validateServerUrl()}
          >
            Check
          </Button>
        </Stack>
        {/* Status message to indicate if the server is valid */}
        <Paper sx={{ p: 1, borderRadius: 2 }} variant='outlined'>
          <Typography variant='body2' color={messageStatus}>{message}</Typography>
        </Paper>

      </Stack>
    </Box>
  )
}