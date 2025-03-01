import { Box, Typography } from "@mui/material";
import { useAnalysisStatus } from "../hooks/useAnalysisStatus";
import { useEffect } from "react";


export const AnalysisView: React.FC = () => {

  // TODO - pass actual URL as input
  const { analysisStatus, updateStatus } = useAnalysisStatus('http://127.0.0.1:8000/', false);
  //updateStatus();

  useEffect(() => {
    updateStatus();

  }, [updateStatus]);

  return (
    <Box>
      <Typography variant='h5'>Analysis Status</Typography>

      {analysisStatus.analysisTasks.map((task) =>
        (<Typography>{task.status}</Typography>)
      )}
    </Box>
  )
}