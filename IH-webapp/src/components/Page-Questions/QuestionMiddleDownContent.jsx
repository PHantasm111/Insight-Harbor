import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { QuestionContext } from '../../context/questionContext';

const QuestionMiddleDownContent = () => {

  const { allQuestionsData, step } = useContext(QuestionContext);

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

       // 更新 matchedPairs 并增加 searchIndex
       setMatchedPairs(() => [
        ...newPairs,
      ]);
    }
  };


  // 使用 useEffect 监听 allQuestionsData 的变化
  useEffect(() => {

    computeMatchedPairs();
    console.log("pairs ", matchedPairs)
  }, [allQuestionsData]);


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