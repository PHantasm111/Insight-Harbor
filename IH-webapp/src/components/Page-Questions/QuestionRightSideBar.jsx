import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { ResultTempTable } from './ResultTempTable'
import { QuestionContext } from '../../context/questionContext'
import axios from 'axios'


const QuestionRightSideBar = () => {

  // Store result of each step
  const [resultStore, setResultStore] = useState([]);

  // Use QuestionContext
  const { step, allQuestionsData, sourceAndTargetStep1, forceUseFunction, setForceUseFunction, protentialRank } = useContext(QuestionContext);  // Use useContext to get state and update function

  // Function to get the result of recommadation
  const calculResultEachStep = async (step) => {
    try {

      // Step = 0, 1, 2 => 0 -> 1 => send step = 1 => 1 -> 2 => send step = 2 => manuel send step = 3
      const response = await axios.post(`http://localhost:3000/question/result/${step}`, {
        allQuestionsData,
        sourceAndTargetStep1,
      })

      console.log("response data", response.data)

      const hasStreamingAndRealTime =
        allQuestionsData.some(question =>
          question.questionId === 5 && Object.values(question.userSelections[0]).includes("Streaming")) &&
        allQuestionsData.some(question =>
          question.questionId === 16 && Object.values(question.userSelections[0]).includes("Real-time analysis"));

      if (response.data) {
        if (hasStreamingAndRealTime) {
          setResultStore((prev) => ({
            ...prev,
            [step + 1]: response.data
          }));

        } else {
          setResultStore((prev) => ({
            ...prev,
            [step]: response.data
          }));
        }

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
      calculResultEachStep(step);
    }

    if (forceUseFunction) {
      calculResultEachStep(3);
      setForceUseFunction(false)
    }
  }, [step, forceUseFunction])

  useEffect(() => {
    console.log("resultstore", resultStore)
  }, [resultStore])

  useEffect(() => {
    //console.log(protentialRank)
    //console.log(resultStore)

    const filteredAndSortedTools = protentialRank
      .filter(tool => resultStore[step + 1].some(item => item.name_t === tool))  // 过滤出 resultStore 中存在的工具
      .map(tool => resultStore[step + 1].find(item => item.name_t === tool));   // 保留顺序并获取完整对象

    //console.log(filteredAndSortedTools);

    setResultStore(prevStore => ({
      ...prevStore,
      [step + 1]: filteredAndSortedTools // 更新 step=2 的数据
    }));

    //console.log(resultStore);
  }, [protentialRank])


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
            <ResultTempTable resultStore={resultStore[1]} step={1} />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Preparation :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore[2]} step={2} />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4'>
            Analysis :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore[3]} step={3} />
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