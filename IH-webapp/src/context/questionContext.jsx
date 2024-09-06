import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    // A state to force call function calculResultEachStep(step)
    const [forceUseFunction, setForceUseFunction] = useState(false)

    // Store the Source and Target in Step 1
    const [sourceAndTargetStep1, setSourceAndTargetStep1] = useState([])

    // Store the Step 
    const [step, setStep] = useState(0);

    // Store the current selections
    const [userSelections, setUserSelections] = useState([]);

    // Store all user answers into a list
    const [allQuestionsData, setAllQuestionsData] = useState([]);

    // Update allQuestionsData
    const addQuestionData = (questionData, selections) => {
        setAllQuestionsData(prevData => [
            ...prevData,
            {
                questionId: questionData.id,
                questionContent: questionData.content,
                questionType: questionData.type,
                choices: questionData.choices,
                userSelections: selections,
            }
        ]);
    };



    return (
        <QuestionContext.Provider value={{
            userSelections, setUserSelections,
            allQuestionsData, addQuestionData, setAllQuestionsData,
            step, setStep,
            sourceAndTargetStep1, setSourceAndTargetStep1,
            forceUseFunction, setForceUseFunction
        }}>
            {children}
        </QuestionContext.Provider>
    );
};
