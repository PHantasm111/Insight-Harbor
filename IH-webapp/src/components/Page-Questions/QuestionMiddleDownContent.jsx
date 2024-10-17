import { Button, Card, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { QuestionContext } from '../../context/questionContext';

const QuestionMiddleDownContent = () => {

  const { allQuestionsData, step, sourceAndTargetStep1, setSourceAndTargetStep1, computeSourceAndTarget, reComputeSourceAndTarget, setGlobalMsg } = useContext(QuestionContext);

  const TABLE_HEAD = ["Step", "Source", "Target"];


  // Create a function to get the seletion from allQuestionData
  const getAnswerById = (qId) => {
    const question = allQuestionsData.find(q => q.questionId === qId);
    return question ? Object.values(question.userSelections[0])[0] : null;
  }

  const computeAddMatchedPairs = () => {

    const newPairs = [];

    // Q5 and Q16 decide the direction of the following question
    // Q5: batch, streaming , hybrid
    // Q16 : offline, online
    const AnswerQ5 = getAnswerById(5);
    const AnswerQ16 = getAnswerById(16);

    // ID for source to show this source is in Straming data zone at the final report
    const sourceStreaming = ((AnswerQ5 === "Streaming" || AnswerQ5 === "Hybrid") && AnswerQ16 === "Real-time analysis") ? 1 : 0

    const question7 = allQuestionsData[allQuestionsData.length - 1];

    const previousQuestion = allQuestionsData[allQuestionsData.length - 2];

    if (question7) {
      let newPair;

      if (previousQuestion && previousQuestion.questionId === 12) {
        // get the selection from id=12
        const sourceValue = previousQuestion.userSelections.map(s => Object.keys(s))

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPair = {
          step: 3,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
        }

      } else if (previousQuestion && previousQuestion.questionId === 10) {
        // get the selection from id=10
        const sourceValue = previousQuestion.userSelections.map(selection => {
          return Object.keys(selection)[0]
        })

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPair = {
          step: 2,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
        }

      } else if (previousQuestion && previousQuestion.questionId === 6) {
        // get the selection from id=6
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        let targetValue;
        if (question7.questionId === 7) {
          targetValue = question7.userSelections[0].fourthSelectValue ||
            question7.userSelections[0].thirdSelectValue ||
            question7.userSelections[0].secondSelectValue ||
            question7.userSelections[0].firstSelectValue;
        } else if (question7.questionId === 34) {
          targetValue = Object.values(question7.userSelections[0])[0]
        }


        newPair = {
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          sourceStreaming: sourceStreaming
        }

      } else if (previousQuestion && previousQuestion.questionId === 32) {
        // get the selection from id=32
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPair = {
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          ingestType: "Batch",
        }
      } else if (previousQuestion && previousQuestion.questionId === 33) {
        // get the selection from id=33
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPair = {
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          ingestType: "Streaming",
          sourceStreaming: sourceStreaming
        }
      } else if (question7.questionId === 34 && previousQuestion && previousQuestion.questionId === 26) {

        // get the selection from id = 34
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=26
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;


        newPair = {
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          ingestType: "Batch",
        }
      } else if (question7.questionId === 34 && previousQuestion && previousQuestion.questionId === 27) {
        // get the selection from id = 34
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=27
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPair = {
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          ingestType: "Streaming",
        }
      }


      if (newPair) {
        newPairs.push(newPair);
      }
    }

    // Update matchedPairs
    setSourceAndTargetStep1((prev) => [
      ...prev,
      ...newPairs,
    ]);

  };

  const computeDeleteMatchedPairs = () => {
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

  const reComputeAddMatchedPairs = () => {

    //console.log("recomputing....")
    const newPairs = [];

    // Q5 and Q16 decide the direction of the following question
    // Q5: batch, streaming , hybrid
    // Q16 : offline, online
    const AnswerQ5 = getAnswerById(5);
    const AnswerQ16 = getAnswerById(16);

    // ID for source to show this source is in Straming data zone at the final report
    const sourceStreaming = ((AnswerQ5 === "Streaming" || AnswerQ5 === "Hybrid") && AnswerQ16 === "Real-time analysis") ? 1 : 0

    for (let i = allQuestionsData.length - 1; i >= 0; i--) {
      const question7 = allQuestionsData[i];

      const previousQuestion = allQuestionsData[i - 1];

      if (previousQuestion && previousQuestion.questionId === 12) {
        // get the selection from id=12
        const sourceValue = previousQuestion.userSelections.map(s => Object.keys(s))

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPairs.push({
          step: 3,
          source: sourceValue,
          sourceIndex: i - 1,
          target: targetValue,
          targetIndex: i,
        })
      } else if (previousQuestion && previousQuestion.questionId === 10) {
        // get the selection from id=10
        const sourceValue = previousQuestion.userSelections.map(selection => {
          return Object.keys(selection)[0]
        })

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPairs.push({
          step: 2,
          source: sourceValue,
          sourceIndex: i - 1,
          target: targetValue,
          targetIndex: i,
        })
      } else if (previousQuestion && previousQuestion.questionId === 6) {
        // get the selection from id=6
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        let targetValue;
        if (question7.questionId === 7) {
          targetValue = question7.userSelections[0].fourthSelectValue ||
            question7.userSelections[0].thirdSelectValue ||
            question7.userSelections[0].secondSelectValue ||
            question7.userSelections[0].firstSelectValue;
        } else if (question7.questionId === 34) {
          targetValue = Object.values(question7.userSelections[0])[0]
        }

        newPairs.push({
          step: 1,
          source: sourceValue,
          sourceIndex: i - 1,
          target: targetValue,
          targetIndex: i,
          sourceStreaming : sourceStreaming
        })
      } else if (previousQuestion && previousQuestion.questionId === 32) {
        // get the selection from id=32
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPairs.push({
          step: 1,
          source: sourceValue,
          sourceIndex: i - 1,
          target: targetValue,
          targetIndex: i,
          ingestType: "Batch",
        })

      } else if (previousQuestion && previousQuestion.questionId === 33) {
        // get the selection from id=33
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPairs.push({
          step: 1,
          source: sourceValue,
          sourceIndex: i - 1,
          target: targetValue,
          targetIndex: i,
          ingestType: "Streaming",
          sourceStreaming : sourceStreaming
        })
      } else if (question7.questionId === 34 && previousQuestion && previousQuestion.questionId === 26) {

        // get the selection from id = 34
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=26
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;


        newPairs.push({
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          ingestType: "Batch",
        })

      } else if (question7.questionId === 34 && previousQuestion && previousQuestion.questionId === 27) {
        // get the selection from id = 34
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=27
        const targetValue = question7.userSelections[0].fourthSelectValue ||
          question7.userSelections[0].thirdSelectValue ||
          question7.userSelections[0].secondSelectValue ||
          question7.userSelections[0].firstSelectValue;

        newPairs.push({
          step: 1,
          source: sourceValue,
          sourceIndex: allQuestionsData.length - 2,
          target: targetValue,
          targetIndex: allQuestionsData.length - 1,
          ingestType: "Streaming",
        })
      }

      const revNewPairs = newPairs.reverse()

      // Update matchedPairs
      setSourceAndTargetStep1(() => [
        ...revNewPairs
      ]);
    }
  }


  // Using useEffect to listen the change of allQuestionsData 
  // useEffect(() => {

  // }, [allQuestionsData]);

  useEffect(() => {
    computeAddMatchedPairs();

  }, [computeSourceAndTarget]);


  useEffect(() => {
    reComputeAddMatchedPairs();
    //computeDeleteMatchedPairs();
  }, [reComputeSourceAndTarget]);



  return (
    <div className='mb-4 h-full pt-2'>
      <Card className='bg-white/50 h-full overflow-auto'>
        <Typography variant='h2' className='pt-4 px-4' color='black'>
          Sources & Targets :
        </Typography>
        <div className='p-4 h-full'>
          <Card className="w-full overflow-auto max-h-72 min-h-32 shadow-md h-full bg-white/50">
            <table className="w-full min-w-max table-auto text-left overflow-auto">
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
                {sourceAndTargetStep1.length > 0 ? (sourceAndTargetStep1.map((pair, index) => (
                  <tr key={index} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {pair.step}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {Array.isArray(pair.source) ? pair.source.join(", ") : pair.source}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {pair.target}
                      </Typography>
                    </td>
                    {/* <td className="p-4">
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        Edit
                      </Typography>
                    </td> */}
                  </tr>
                ))) : (
                  <tr className="even:bg-blue-gray-50/50">
                    <td colSpan={4} className="p-4 text-center">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        No available data
                      </Typography>
                    </td>
                  </tr>
                )
                }
              </tbody>
            </table>
          </Card>
        </div>
      </Card>
    </div>
  )
}

export default QuestionMiddleDownContent