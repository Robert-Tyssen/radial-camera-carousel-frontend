import { ArrowBackRounded } from "@mui/icons-material"
import { Box, Button } from "@mui/material"
import { AnalysisView } from "../components/AnalysisView"
import { useNavigate } from "react-router-dom"

export const AnalysisPage: React.FC = () => {

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'background.default' }}>
      <Box sx={{ maxWidth: 'md', px: 4, pt: 8, width: '100%' }}>
        <Button variant='text' startIcon={<ArrowBackRounded />} onClick={() => navigate('/')}>
          Back to Photo Selection
        </Button>
        <AnalysisView />
      </Box>
    </Box>
  )
}