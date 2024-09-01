import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { QuestionContext } from '../../context/questionContext';

const QuestionMiddleDownContent = () => {

  const { allQuestionsData, step, sourceAndTargetStep1, setSourceAndTargetStep1, setSourceAndTargetStep2, setSourceAndTargetStep3 } = useContext(QuestionContext);

  const [searchIndex, setSearchIndex] = useState(0);

  // Store all the source and target that user choose from question
  const [matchedPairs, setMatchedPairs] = useState([]);

  const TABLE_HEAD = ["Step", "Source", "Target", ""];

  const computeAddMatchedPairs = () => {

    const newPairs = [];

    for (let index = allQuestionsData.length - 1; index >= 0; index--) {
      const question7 = allQuestionsData[index];

      const previousQuestion = allQuestionsData[index - 1];

      if (previousQuestion && previousQuestion.questionId === 6) {
        // get the selection from id=6
        const sourceValue = previousQuestion.userSelections.secondSelectValue || previousQuestion.userSelections.firstSelectValue;

        // get the selection from id=7
        const targetValue = question7.userSelections.fourthSelectValue ||
          question7.userSelections.thirdSelectValue ||
          question7.userSelections.secondSelectValue ||
          question7.userSelections.firstSelectValue;

        newPairs.push({
          step: 1,
          source: sourceValue,
          sourceIndex: index - 1,
          target: targetValue,
          targetIndex: index,
        })

      } else if (previousQuestion && previousQuestion.questionId === 10) {

        // get the selection from id=10
        const sourceValue = Object.values(previousQuestion.userSelections)

        // get the selection from id=7
        const targetValue = question7.userSelections.fourthSelectValue ||
          question7.userSelections.thirdSelectValue ||
          question7.userSelections.secondSelectValue ||
          question7.userSelections.firstSelectValue;

        newPairs.push({
          step: 2,
          source: sourceValue,
          sourceIndex: index - 1,
          target: targetValue,
          targetIndex: index,
        })
      } else if (previousQuestion && previousQuestion.questionId === 12) {
        // get the selection from id=12
        const sourceValue = Object.values(previousQuestion.userSelections)

        // get the selection from id=7
        const targetValue = question7.userSelections.fourthSelectValue ||
          question7.userSelections.thirdSelectValue ||
          question7.userSelections.secondSelectValue ||
          question7.userSelections.firstSelectValue;

        newPairs.push({
          step: 3,
          source: sourceValue,
          sourceIndex: index - 1,
          target: targetValue,
          targetIndex: index,
        })
      }

    }

    // Update matchedPairs
    setSourceAndTargetStep1(() => [
      ...newPairs,
    ]);
  };

  const computeDeleteMatchedPairs = () => {
    console.log("run delete")

    if (sourceAndTargetStep1.length > 0) {
      const { sourceIndex, targetIndex } = sourceAndTargetStep1[sourceAndTargetStep1.length - 1];

      if (sourceIndex !== undefined && targetIndex !== undefined) {
        const isSourceIndexValid = sourceIndex >= 0 && sourceIndex < allQuestionsData.length;
        const isTargetIndexValid = targetIndex >= 0 && targetIndex < allQuestionsData.length;

        if (isSourceIndexValid && isTargetIndexValid) {
          console.log("Both sourceIndex and targetIndex are valid and exist in allQuestionsData.");

        } else {
          console.log("One or both of the indices are invalid or out of bounds. Removing the last element from sourceAndTargetStep1.");

          setSourceAndTargetStep1(prev => prev.slice(0, -1));
        }
      }
    }
  }


  // Using useEffect to listen the change of allQuestionsData 
  useEffect(() => {

    computeAddMatchedPairs();
    computeDeleteMatchedPairs();

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
                {sourceAndTargetStep1.slice().reverse().map((pair, index) => (
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