import { Button } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { darkBrown } from '../../util/colors';

const Prev_nxtBtn = ({onNext, onPrev}) => {
  return (
    <div className="w-full flex flex-row justify-between p-2 px-6">
        <Button type="submit" variant="outlined" color="primary" className={`px-6 py-2 bg-[${darkBrown}] text-white rounded`} onClick={onPrev}>
            <ArrowBackIcon />
        </Button>
        <Button type="submit" variant="outlined" color="primary" className={`px-6 py-2 bg-[${darkBrown}] text-white rounded`} onClick={onNext}>
            <ArrowForwardIcon />
        </Button>
    </div>
  )
}

export default Prev_nxtBtn
