import { Box, Button } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { darkBrown } from '../../util/colors';

const Prev_nxtBtn = ({onNext, onPrev}) => {
  return (
    <Box className="flex w-full justify-between mt-6 px-1 lg:px-4">
      <Button variant="outlined" sx={{color: darkBrown, borderColor: darkBrown}} onClick={onPrev} startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{backgroundColor: darkBrown}}
        type="submit"
        onClick={onNext}
        endIcon={<ArrowForwardIcon />}
      >
        Next
      </Button>
    </Box>
  )
}

export default Prev_nxtBtn
