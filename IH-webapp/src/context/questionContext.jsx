import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
    //Store current question id
    const [currentQuestionId, setCurrentQuestionId] = useState(1); // first question = 1

    // Define states to store current problem data
    const [questionData, setQuestionData] = useState({
        id: 1,
        content: "Where do you want to deploy your data lake ?",
        type: "single_choice",
        choices: { "c1": "On-premises", "c2": "On cloud" },
        is_required: 1,
        help_text: null
    });


    // A state to force call function calculResultEachStep(step)
    const [forceUseFunction, setForceUseFunction] = useState(false)

    // A state to force call function calculResultEachStep(step) => real-time -> Streaming (final call)
    const [calculRealTimeStreaming, setCalculRealTimeStreaming] = useState(false)

    // Store the Source and Target in Step 1
    const [sourceAndTargetStep1, setSourceAndTargetStep1] = useState([])

    // Store the Step 
    const [step, setStep] = useState(0);

    // Store the current selections
    const [userSelections, setUserSelections] = useState([]);

    // Store all user answers into a list
    const [allQuestionsData, setAllQuestionsData] = useState([]);

    // Store result of each step
    const [resultStore, setResultStore] = useState([]);

    const [protentialRank, setProtentialRank] = useState([])

    const [computeSourceAndTarget, setComputeSourceAndTarget] = useState(0);

    const [reComputeSourceAndTarget, setReComputeSourceAndTarget] = useState(0);

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
                targetListHasValue: targetListHasValue,
            }
        ]);
    };



    return (
        <QuestionContext.Provider value={{
            currentQuestionId, setCurrentQuestionId,
            questionData, setQuestionData,
            userSelections, setUserSelections,
            allQuestionsData, addQuestionData, setAllQuestionsData,
            step, setStep,
            sourceAndTargetStep1, setSourceAndTargetStep1,
            forceUseFunction, setForceUseFunction,
            protentialRank, setProtentialRank,
            computeSourceAndTarget, setComputeSourceAndTarget,
            reComputeSourceAndTarget, setReComputeSourceAndTarget,
            calculRealTimeStreaming, setCalculRealTimeStreaming,
            resultStore, setResultStore
        }}>
            {children}
        </QuestionContext.Provider>
    );
};
