import React from 'react'
import QuestionLeftSideBar from '../components/Page-Questions/QuestionLeftSideBar'
import QuestionRightSideBar from '../components/Page-Questions/QuestionRightSideBar'
import QuestionMiddleUpContent from '../components/Page-Questions/QuestionMiddleUpContent'
import QuestionMiddleDownContent from '../components/Page-Questions/QuestionMiddleDownContent'

const Questions = () => {
  return (
    <div className='flex justify-center bg-gray-100 min-h-screen'>
      <div className='w-[25%] h-full'>
        <QuestionLeftSideBar />
      </div>
      <div className='w-[50%] h-full'>
        <div>
          <QuestionMiddleUpContent />
        </div>
        <div>
          <QuestionMiddleDownContent />
        </div>
      </div>
      <div className='w-[25%] h-full'>
        <QuestionRightSideBar />
      </div>
    </div>
  )
}

export default Questions