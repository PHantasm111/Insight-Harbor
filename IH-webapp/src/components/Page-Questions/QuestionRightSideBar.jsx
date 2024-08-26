import { Button, Card, Typography } from '@material-tailwind/react'
import React from 'react'
import { ResultTempTable } from './ResultTempTable'

const QuestionRightSideBar = () => {
  return (
    <div className='mx-2'>
      <Card className='bg-lime-400 flex flex-col'>
        <Typography variant='h2' className='p-4'>
          Result Temp :
        </Typography>

        <div>
          <Typography variant='h4' className='px-4'>
            Ingestion :
          </Typography>
          <div className='p-4'>
            <ResultTempTable />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Preparation :
          </Typography>
          <div className='p-4'>
            <ResultTempTable />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Analysis :
          </Typography>
          <div className='p-4'>
            <ResultTempTable />
          </div>
        </div>

        <div className='flex items-center justify-center p-4'>
          <Button variant="gradient" value="123" className='text-lg '>Generate Final Report</Button>
        </div>
      </Card>
    </div>
  )
}

export default QuestionRightSideBar