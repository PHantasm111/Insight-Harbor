import React from 'react'
import QuestionLeftSideBar from '../components/Page-Questions/QuestionLeftSideBar'
import QuestionRightSideBar from '../components/Page-Questions/QuestionRightSideBar'
import QuestionMiddleUpContent from '../components/Page-Questions/QuestionMiddleUpContent'
import QuestionMiddleDownContent from '../components/Page-Questions/QuestionMiddleDownContent'
import { QuestionProvider } from '../context/questionContext'
import { QuestionStepper } from '../components/Page-Questions/Stepper'

const Questions = () => {
  return (
    <QuestionProvider>
      <div className='flex justify-center bg-gray-200 h-screen'>
        <div className='w-full h-full px-8 flex flex-col'>
          <div className='w-full pb-8 pt-9 px-96 h-1/12'>
            <QuestionStepper />
          </div>
          <div className="w-full flex justify-center h-5/6">
            <div className='w-[25%] h-full'>
              <QuestionLeftSideBar />
            </div>
            <div className='w-[50%] h-full'>
              <div className='w-full max-h-2/3'>
                <QuestionMiddleUpContent />
              </div>
              <div className='w-full h-1/3'>
                <QuestionMiddleDownContent />
              </div>
            </div>
            <div className='w-[25%] mb-4 h-full'>
              <QuestionRightSideBar />
            </div>
          </div>
        </div>
      </div>
    </QuestionProvider>
  )
}

export default Questions