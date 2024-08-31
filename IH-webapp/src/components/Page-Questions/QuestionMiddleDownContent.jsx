import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { QuestionContext } from '../../context/questionContext';

const QuestionMiddleDownContent = () => {

  const { allQuestionsData, step, setSourceAndTargetStep1, setSourceAndTargetStep2, setSourceAndTargetStep3 } = useContext(QuestionContext);

  const [searchIndex, setSearchIndex] = useState(0);

  // Store all the source and target that user choose from question
  const [matchedPairs, setMatchedPairs] = useState([]);

  const TABLE_HEAD = ["Step", "Source", "Target", ""];

  const computeMatchedPairs = () => {

    const newPairs = [];

    if (allQuestionsData && allQuestionsData.length > searchIndex) {

      allQuestionsData.slice(searchIndex).forEach((question, index) => {

        if (question.questionId === 6) {

          const nextQuestion = allQuestionsData[index + 1];

          if (nextQuestion && nextQuestion.questionId === 7) {

            // get the selection from id=6
            const sourceValue = question.userSelections.secondSelectValue || question.userSelections.firstSelectValue;

            // get the selection from id=7
            const targetValue = nextQuestion.userSelections.fourthSelectValue ||
              nextQuestion.userSelections.thirdSelectValue ||
              nextQuestion.userSelections.secondSelectValue ||
              nextQuestion.userSelections.firstSelectValue;


            newPairs.push({
              step: step + 1,
              source: sourceValue,
              target: targetValue,
            });
          }
        }
      })

       // Update matchedPairs
       setMatchedPairs(() => [
        ...newPairs,
      ]);
    }
  };


  // Using useEffect to listen the change of allQuestionsData 
  useEffect(() => {

    computeMatchedPairs();
    //console.log("pairs ", matchedPairs)
  }, [allQuestionsData]);

  useEffect(() => {
    
    const filteredStep1 = matchedPairs.filter(pair => pair.step === 1);

    setSourceAndTargetStep1(() => [
      ...filteredStep1,
    ]);

    // step 2
    const filteredStep2 = matchedPairs.filter(pair => pair.step === 2);

    setSourceAndTargetStep2(() => [
      ...filteredStep2,
    ]);

    // step 3
    const filteredStep3 = matchedPairs.filter(pair => pair.step === 3);

    setSourceAndTargetStep3(() => [
      ...filteredStep3,
    ]);

  }, [step])


  return (
    <div className='mb-4'>
      <Card className='bg-white'>
        <Typography variant='h2' className='p-4'>
          Choices :
        </Typography>
        <div className='p-4'>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(matchedPairs || []).map((pair, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {pair.step}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {pair.source}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {pair.target}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        Edit
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Card>
    </div>
  )
}

export default QuestionMiddleDownContent