import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { ResultTempTable } from './ResultTempTable'
import { QuestionContext } from '../../context/questionContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'


const QuestionRightSideBar = () => {

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate()

  // Use QuestionContext
  const {
    step,
    allQuestionsData,
    sourceAndTargetStep1,
    forceUseFunction, setForceUseFunction,
    protentialRank,
    calculRealTimeStreaming,
    resultStore, setResultStore,
    setIsTimerRunning,
    timer } = useContext(QuestionContext);  // Use useContext to get state and update function

  useEffect(() => {
    // When go back to step = 0 actually step1 do not call function
    if (step != 0) {
      calculResultEachStep(step);
    }

    if (forceUseFunction) {
      calculResultEachStep(3);
      setForceUseFunction(false)
    }

    if (calculRealTimeStreaming) {
      calculResultEachStep(2)
    }
  }, [step, forceUseFunction, calculRealTimeStreaming])

  useEffect(() => {
    console.log("resultstore", resultStore)
  }, [resultStore])

  useEffect(() => {
    if (protentialRank.length > 0) {
      const filteredAndSortedTools = protentialRank
        .filter(tool => resultStore[step + 1].some(item => item.name_t === tool))
        .map(tool => resultStore[step + 1].find(item => item.name_t === tool));

      setResultStore(prevStore => ({
        ...prevStore,
        [step + 1]: filteredAndSortedTools
      }))
    }
  }, [protentialRank])

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

      const hasHybridAndRealTime =
        allQuestionsData.some(question =>
          question.questionId === 5 && Object.values(question.userSelections[0]).includes("Hybrid")) &&
        allQuestionsData.some(question =>
          question.questionId === 16 && Object.values(question.userSelections[0]).includes("Real-time analysis")) &&
        allQuestionsData.some(question =>
          question.questionId === 33);

      const hasCloudAndHybrid =
        allQuestionsData.some(question =>
          question.questionId === 1 && Object.values(question.userSelections[0]).includes("On cloud")) &&
        allQuestionsData.some(question =>
          question.questionId === 5 && Object.values(question.userSelections[0]).includes("Hybrid")) &&
        allQuestionsData.some(question =>
          question.questionId === 35);

      if (response.data) {
        if (hasStreamingAndRealTime) {
          setResultStore((prev) => ({
            ...prev,
            [step + 1]: response.data
          }));

        } else if (hasHybridAndRealTime) {

          const compareAndCombine = (waitToUpdateObj, originObj, step) => {

            const waitToUpdateList = waitToUpdateObj[step];
            const originList = originObj;


            const commonElements = originList.filter(originItem =>
              waitToUpdateList.some(updateItem => updateItem.name_t === originItem.name_t)
            );


            setResultStore(prevStore => ({
              ...prevStore,
              [step]: commonElements
            }));
          };

          compareAndCombine({ [step]: response.data }, resultStore[step], step);

        } else if (hasCloudAndHybrid) {
          setResultStore(() => ({
            [step]: response.data
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

  const handleFinalReport = async () => {

    setIsTimerRunning(false);
    // Step 1: save the data into db first
    // if (currentUser) {
    //   const response = await axios.post(`http://localhost:3000/question/save`, {
    //     allQuestionsData,
    //     sourceAndTargetStep1,
    //     currentQuestionId,
    //     resultStore,
    //     UserID: currentUser.UserID
    //   })

    //   console.log("save from button generate", response.data)
    // }
    // Step 2: go to page /finalRes with data

    const dataToPass = {
      allQuestionsData,
      sourceAndTargetStep1,
      resultStore,
      timer,
    }
    navigate("/finalres", { state: { dataToPass } })
  }


  return (
    <div className='mx-2 h-full'>
      <Card className='bg-white/50 flex flex-col h-full overflow-auto'>
        <Typography variant='h2' className='p-4' color='black'>
          Tempo Result :
        </Typography>

        <div>
          <Typography variant='h4' className='px-4' color='black'>
            Ingestion :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore[1]} step={1} />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4' color='black'>
            Preparation :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore[2]} step={2} />
          </div>
        </div>

        <div>
          <Typography variant='h4' className='px-4' color='black'>
            Analysis :
          </Typography>
          <div className='p-4'>
            <ResultTempTable resultStore={resultStore[3]} step={3} />
          </div>
        </div>

        <div className='flex items-center justify-center p-4'>
          <Button variant="gradient" size="lg" className='text-lg w-full' onClick={() => handleFinalReport()}>Generate Final Report</Button>
        </div>
      </Card>
    </div>
  )
}

export default QuestionRightSideBar