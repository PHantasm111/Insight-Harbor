import { Card, Checkbox, Typography, Radio, Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import leftArrow from "/leftArrow.svg"
import rightArrow from "/rightArrow.svg"
import { QuestionContext } from '../../context/questionContext'

const QuestionMiddleUpContent = () => {

  // Define states to store current problem data
  const [questionData, setQuestionData] = useState({
    id: 1,
    content: "Where do you want to deploy your data lake ?",
    type: "single_choice",
    choices: { "c1": "On-premises", "c2": "On cloud", "c3": "Hybrid" },
    is_required: 1,
    help_text: null
  });
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // first question = 1
  const [loading, setLoading] = useState(false);
  const { userSelections, setUserSelections, addQuestionData } = useContext(QuestionContext);  // Use useContext to get state and update function


  // Test handleSelectionChange()
  useEffect(() => {
    console.log("userSelections", userSelections)
  }, [userSelections])

  const handleSelectionChange = (key, isChecked) => {

    const selectedValue = questionData.choices[key];

    if (questionData.type === "multiple_choice") {
      setUserSelections(prevSelections => {
        const newSelections = { ...prevSelections };
        if (isChecked) {
          newSelections[key] = selectedValue;
        } else {
          delete newSelections[key];
        }
        return newSelections;
      });

    } else {
      setUserSelections({
        [key]: isChecked,
      });
    }
  };

  const handleNextQuestion = async () => {
    setLoading(true);
    try {
      
      // At first, store all questiondata and selections into context using addQuestionData()
      addQuestionData(questionData, userSelections);

      // Send request to get next question data
      const response = await axios.post(`http://localhost:3000/question/${currentQuestionId}`, {
        selections: userSelections,
      });

      console.log("responsedata", response.data)

      setQuestionData(response.data);
      setCurrentQuestionId(response.data.id)
      setUserSelections({});
    } catch (error) {
      console.error("Error fetching question data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questionData) {
    return <div>No question data available.</div>;
  }


  return (
    <div className='mb-2 w-full'>
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
                  {questionData.type === "multiple_choice"
                    ? (<Checkbox id={`choice-${key}`}
                      onClick={(e) => handleSelectionChange(key, e.target.checked)}
                    />)
                    : (<Radio name={`choice-${questionData.id}`} id={`choice-${key}`}
                      onClick={(e) => handleSelectionChange(key, value)}
                    />)
                  }
                  <label htmlFor={`choice-${key}`} className='ml-2'>{value}</label>
                </div>
              ))}
            </div>
          </Typography>

          <div className='flex justify-between m-8 gap-8'>
            <Button variant="gradient" size='lg' color="blue-gray" className='flex items-center gap-4 text-black'>
              <img src={leftArrow} width={40} height={40}></img>
              Last Question
            </Button>
            <div className="flex gap-4">
              <Button variant="text" size='lg' className='bg-gray-300/50'>Skip</Button>
              <Button variant="gradient" size='lg' color="blue-gray" className='flex items-center gap-4 text-black' onClick={handleNextQuestion}>
                Next Question
                <img src={rightArrow} width={40} height={40}></img>
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default QuestionMiddleUpContent