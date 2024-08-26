import React from 'react'
import QuestionLeftSideBar from '../components/Page-Questions/QuestionLeftSideBar'
import QuestionRightSideBar from '../components/Page-Questions/QuestionRightSideBar'
import QuestionMiddleUpContent from '../components/Page-Questions/QuestionMiddleUpContent'
import QuestionMiddleDownContent from '../components/Page-Questions/QuestionMiddleDownContent'
import { QuestionProvider } from '../context/questionContext'

const Questions = () => {
  return (
    <QuestionProvider>
      <div className='flex justify-center bg-gray-100 min-h-screen pt-8'>
        <div className='w-[25%]'>
          <QuestionLeftSideBar />
        </div>
        <div className='w-[50%]'>
          <div>
            <QuestionMiddleUpContent />
          </div>
          <div>
            <QuestionMiddleDownContent />
          </div>
        </div>
        <div className='w-[25%]'>
          <QuestionRightSideBar />
        </div>
      </div>
    </QuestionProvider>
  )
}

export default Questions