import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { ResultTempTable } from './ResultTempTable'
import { QuestionContext } from '../../context/questionContext'
import axios from 'axios'


const QuestionRightSideBar = () => {

  // Flag which decide to call function or not
  const [flag, setFlag] = useState(true)

  // Store result of each step
  const [resultStore, setResultStore] = useState([]);

  // Use QuestionContext
  const { step, allQuestionsData, sourceAndTargetStep1 } = useContext(QuestionContext);  // Use useContext to get state and update function

  // Function to get the result of recommadation
  const calculResultEachStep = async () => {
    try {

      console.log("allquestiondata right now", allQuestionsData);
      // Step = 0, 1, 2 => 0 -> 1 => send step = 1 => 1 -> 2 => send step = 2 => manuel send step = 3
      const response = await axios.post(`http://localhost:3000/question/result/${step}`, {
        allQuestionsData,
        sourceAndTargetStep1,
      })

      console.log("response data", response.data)
      if (response.data) {

        setResultStore((prev) => [
          ...prev,
          {
            [step]: response.data,
          }
        ])
        setFlag(false)

      } else {
        console.log("response.data is null")
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // When go back to step = 0 actually step1 do not call function
    if (step != 0) {
      calculResultEachStep();
    }
  }, [step])

  // When we change the sourceAndTargetStep1, make sure that we can call function calculResultEachStep()
  // useEffect(() => {
  //   setFlag(true)
  // }, [sourceAndTargetStep1])



  return (
    <div className='mx-2'>
      <Card className='bg-white flex flex-col'>
        <Typography variant='h2' className='p-4'>
          Result Temp :
        </Typography>

        <div>
          <Typography variant='h4' className='px-4'>
            Ingestion :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore} step={1} />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Preparation :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore} step={2} />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Analysis :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore} step={3} />
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