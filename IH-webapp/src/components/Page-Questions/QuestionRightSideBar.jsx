import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { ResultTempTable } from './ResultTempTable'
import { QuestionContext } from '../../context/questionContext'
import axios from 'axios'


const QuestionRightSideBar = () => {

  // Store result of each step
  const [resultStore, setResultStore] = useState([]);

  // Use QuestionContext
  const { step, allQuestionsData, sourceAndTargetStep1 } = useContext(QuestionContext);  // Use useContext to get state and update function

  // Function to get the result of recommadation
  const calculResultEachStep = async () => {
    try {

      console.log("allquestiondata right now", allQuestionsData);
      const response = await axios.post(`http://localhost:3000/question/result/${step}`,{
        allQuestionsData,
        sourceAndTargetStep1,
      })

      console.log(response.data)
      if (response.data){
        
        setResultStore(() => [
          {
            [step] : response.data,
          }
        ])
      } else {
        console.log("response.data is null")
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (step != 0){
      calculResultEachStep();
    }

  }, [step])



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
            <ResultTempTable resultStore={resultStore}/>
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Preparation :
          </Typography>
          <div className='p-4'>
            {/* <ResultTempTable /> */}
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Analysis :
          </Typography>
          <div className='p-4'>
            {/* <ResultTempTable /> */}
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