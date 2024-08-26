import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {

    const [userSelections, setUserSelections] = useState({});

    // Store all user answers in to a list
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
        <QuestionContext.Provider value={{ userSelections, setUserSelections, allQuestionsData, addQuestionData }}>
            {children}
        </QuestionContext.Provider>
    );
};
