import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    //Store current question id
    const [currentQuestionId, setCurrentQuestionId] = useState(1); // first question = 1

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

    const [protentialRank, setProtentialRank] = useState([])

    // Update allQuestionsData
    const addQuestionData = (questionData, selections, targetListHasValue) => {
        setAllQuestionsData(prevData => [
            ...prevData,
            {
                questionId: questionData.id,
                questionContent: questionData.content,
                questionType: questionData.type,
                choices: questionData.choices,
                userSelections: selections,
                targetListHasValue:targetListHasValue,
            }
        ]);
    };



    return (
        <QuestionContext.Provider value={{
            currentQuestionId, setCurrentQuestionId,
            userSelections, setUserSelections,
            allQuestionsData, addQuestionData, setAllQuestionsData,
            step, setStep,
            sourceAndTargetStep1, setSourceAndTargetStep1,
            forceUseFunction, setForceUseFunction,
            protentialRank, setProtentialRank,
        }}>
            {children}
        </QuestionContext.Provider>
    );
};
