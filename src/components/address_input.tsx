import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useServerUrl } from "../hooks/useServerUrl";

export const AddressInput = () => {

  const serverUrlHook = useServerUrl();

  return (
    <Box>
      <Typography variant='h5'>Connect to Device Server</Typography>
      <Stack direction={'row'} spacing={2} alignItems={'center'} py={2}>

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
          size='large'
          disabled={!serverUrlHook.serverUrl.trim()}
          onClick={() => serverUrlHook.validateServerUrl()}
        >
          Check
        </Button>
      </Stack>
    </Box>
  )
}