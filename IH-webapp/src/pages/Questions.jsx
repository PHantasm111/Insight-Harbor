import React, { useEffect, useState } from 'react'
import QuestionLeftSideBar from '../components/Page-Questions/QuestionLeftSideBar'
import QuestionRightSideBar from '../components/Page-Questions/QuestionRightSideBar'
import QuestionMiddleUpContent from '../components/Page-Questions/QuestionMiddleUpContent'
import QuestionMiddleDownContent from '../components/Page-Questions/QuestionMiddleDownContent'
import { QuestionProvider } from '../context/questionContext'
import { QuestionStepper } from '../components/Page-Questions/Stepper'

const Questions = () => {
  const [deployType, setDeployType] = useState([]);

  const handleDeployModeChange = (newDeployMode) => {
    setDeployType(newDeployMode[0]);
  }

  useEffect(() => {
    console.log("deployType:", deployType);

  }, [deployType]);

  return (
    <QuestionProvider>
      <div className='min-h-screen bg-gray-200'>
        <div className='flex flex-col justify-center h-screen'>
          <div className='w-full h-full px-8 flex flex-col'>

            <div className='w-full pb-6 pt-9 px-96 h-1/12'>
              <QuestionStepper />
            </div>

            {deployType === "On cloud"
              ? (
                <div className="w-full flex justify-center h-5/6">
                  <div className='w-[20%] h-5/6'>
                    <QuestionLeftSideBar />
                  </div>

                  <div className='w-[70%] h-full'>
                    <div className='w-full h-5/6'>
                      <QuestionMiddleUpContent onDeployModeChange={handleDeployModeChange} />
                    </div>


                  </div>
                </div>
              )
              : (
                <div className="w-full flex justify-center h-5/6">
                  <div className='w-[25%] h-full'>
                    <QuestionLeftSideBar />
                  </div>

                  <div className='w-[50%] h-full'>
                    <div className='w-full h-3/5'>
                      <QuestionMiddleUpContent onDeployModeChange={handleDeployModeChange} />
                    </div>

                    <div className='w-full h-2/5'>
                      <QuestionMiddleDownContent />
                    </div>
                  </div>
                  <div className='w-[25%] mb-4 h-full'>
                    <QuestionRightSideBar />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className='px-8 h-4'></div>
      </div >
    </QuestionProvider >
  )
}

export default Questions