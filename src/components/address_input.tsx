import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const AddressInput = () => {

  const [url, setUrl] = useState('http://localhost/0000');

  const checkUrl = async () => {
    const resp = await fetch(`${url}/api/heartbeat-check`, { method: 'GET' });
    console.log(resp);
  }

  return (
    <Box>
      <Typography variant='h5'>Connect to Device Server</Typography>
      <Stack direction={'row'} spacing={2} alignItems={'center'} py={2}>
        {/* Endpoint text input */}
        <TextField
          fullWidth
          variant='filled'
          label='Server IP Address'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          margin='dense'
        />
        <Button variant='contained' size='large' disabled={!url.trim()} onClick={() => checkUrl()}>
          Check
        </Button>
      </Stack>
    </Box>
  )
}