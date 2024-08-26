import { Card, Checkbox, Typography, Radio, Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

const QuestionMiddleUpContent = () => {

  // Define states to store current problem data
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // first question = 1
  const [loading, setLoading] = useState(true);

  // Use useEffect to get the first question when loading le page & when the QuestionID change
  useEffect(() => {

    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/question/${currentQuestionId}`);
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion(); // Call function

  }, [currentQuestionId]); // depend on QuestionID, when it's change, fetch new Question with ID

  const handleNextQuestion = () => {
    // questionData has a attribute -> nextQuestionId to know which question is the next question
    if (questionData && questionData.nextQuestionId) {
      setCurrentQuestionId(questionData.nextQuestionId); // => When Id change => call useEffect() => get next questionData
    } else {
      console.log("No more questions available.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questionData) {
    return <div>No question data available.</div>;
  }

  console.log(questionData.choices)

  return (
    <div className='mb-2'>
      <Card className='bg-white shadow-md'>
        <Typography variant='h2' className='p-4'>
          Question :
        </Typography>

        <form className='flex flex-col'>
          <Typography key={questionData.id} variant='h5' className='p-4 ml-4'>
            <div>
              {questionData.id}{". "}{questionData.content}
            </div>
            <div className='flex flex-col justify-center gap-2 mt-4'>
              {Object.entries(questionData.choices).map(([key, value]) => (
                <div key={key}>
                  
                  {questionData.answerType === "multiple"
                    ? (<Checkbox id={`choice-${key}`} />)
                    : (<Radio name={`choice-${questionData.id}`} id={`choice-${key}`} />)
                  }
                  <label htmlFor={`choice-${key}`} className='ml-2'>{value}</label>

                </div>
              ))}
            </div>
          </Typography>

          <div className='flex flex-row-reverse m-8 gap-8'>
            <Button variant="gradient" size='lg' className=''>Next Question</Button>
            <Button variant="text" size='lg' className='bg-gray-300/50'>Skip</Button>
          </div>

        </form>
      </Card>
    </div>
  )
}

export default QuestionMiddleUpContent