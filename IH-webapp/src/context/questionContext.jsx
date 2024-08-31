import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {

    // Store the Source and Target in Step 1
    const [sourceAndTargetStep1, setSourceAndTargetStep1] = useState([])
    // Store the Source and Target in Step 2
    const [sourceAndTargetStep2, setSourceAndTargetStep2] = useState([])
    // Store the Source and Target in Step 3
    const [sourceAndTargetStep3, setSourceAndTargetStep3] = useState([])

    // Store the Step 
    const [step, setStep] = useState(0);

    const [userSelections, setUserSelections] = useState({});

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

    // Store the source and storage that user choice
    const [sourceAndStorage, setSourceAndStorage] = useState({});



    return (
        <QuestionContext.Provider value={{
            userSelections, setUserSelections,
            allQuestionsData, addQuestionData,
            step, setStep,
            sourceAndTargetStep1, setSourceAndTargetStep1,
            sourceAndTargetStep2, setSourceAndTargetStep2,
            sourceAndTargetStep3, setSourceAndTargetStep3,
        }}>
            {children}
        </QuestionContext.Provider>
    );
};
