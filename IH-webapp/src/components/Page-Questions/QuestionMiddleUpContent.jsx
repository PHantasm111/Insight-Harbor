import {
  Card,
  Checkbox,
  Typography,
  Radio,
  Button,
  Select,
  Option,
  List,
  ListItem,
  ListItemPrefix,
  Alert,
} from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import axios, { all } from 'axios'
import leftArrow from "/leftArrow.svg"
import rightArrow from "/rightArrow.svg"
import { QuestionContext } from '../../context/questionContext'
import { AuthContext } from '../../context/authContext'
import _, { set } from "lodash"
import { useNavigate } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_API_URL;

const QuestionMiddleUpContent = ({ onDeployModeChange }) => {

  // Use QuestionContext
  const {
    userSelections, setUserSelections,
    questionData, setQuestionData,
    addQuestionData, allQuestionsData, setAllQuestionsData,
    step, setStep,
    sourceAndTargetStep1, setSourceAndTargetStep1,
    setForceUseFunction,
    currentQuestionId, setCurrentQuestionId,
    setProtentialRank,
    setComputeSourceAndTarget,
    setReComputeSourceAndTarget,
    setCalculRealTimeStreaming,
    resultStore, setResultStore,
    globalMsg, setGlobalMsg,
    setIsTimerRunning, timer
  } = useContext(QuestionContext);  // Use useContext to get state and update function

  // Navigate function
  const navigate = useNavigate()

  // NoSelectAlert
  const [noSelectAlert, setNoSelectAlert] = useState(false);

  // Store 
  const [targetList, setTargetList] = useState([])

  const [nextQuestionButtonState, setNextQuestionButtonState] = useState(true)

  // If loading
  const [loading, setLoading] = useState(false);

  // Store state  => show the question content or not
  const [questionFinish, setQuestionFinish] = useState(false)

  // disableWhenStreaming block some source option when user choose Streaming branch
  const [disableWhenStreaming, setDisableWhenStreaming] = useState(false)

  const { currentUser } = useContext(AuthContext);

  const [alert, setAlert] = useState(false)

  const [errSave, SetErrSave] = useState(null)

  const [sucessSave, setSucessSave] = useState(null)

  // state to shwo globalMsg
  const [showGlobalMsg, setShowGlobalMsg] = useState(false)

  // For id = 7 => Handle second/third/fourth select to show the content
  const [showSecond, setShowSecond] = React.useState();
  const [showThird, setShowThird] = React.useState();
  const [showFourth, setShowFourth] = React.useState();

  // Define state variables to store select values
  const [firstSelectValue, setFirstSelectValue] = useState("");
  const [secondSelectValue, setSecondSelectValue] = useState("");
  const [thirdSelectValue, setThirdSelectValue] = useState("");
  const [fourthSelectValue, setFourthSelectValue] = useState("");

  const handleFirstSelectChange = (val) => {
    setSecondSelectValue("");
    setThirdSelectValue("");
    setFourthSelectValue("");
    setFirstSelectValue(val);
    setUserSelections([{ firstSelectValue: val, }]);

    const valList = ["Database", "Filesystem", "NoSQL Database"]

    if (valList.includes(val)) {
      setShowSecond(val);
    } else {
      setShowSecond(null);
    }
  }

  const handleSecondSelectChange = (val) => {
    setThirdSelectValue("");
    setFourthSelectValue("");
    setSecondSelectValue(val);
    setUserSelections([{
      firstSelectValue: firstSelectValue,
      secondSelectValue: val,
    }])

    const valList = ["Centralized_db", "Distributed_db", "Centralized_fs", "Distributed_fs"]
    if (valList.includes(val)) {
      setShowThird(val);
    }
  }

  const handleThirdSelectChange = (val) => {
    setThirdSelectValue(val);
    setFourthSelectValue("");
    setUserSelections([{
      firstSelectValue: firstSelectValue,
      secondSelectValue: secondSelectValue,
      thirdSelectValue: val,
    }])

    const valList = ["Relational", "Nosql", "Dis_Relational", "Dis_Nosql"]
    if (valList.includes(val)) {
      setShowFourth(val);
    }
  }

  const handleFourthSelectChange = (val) => {
    setFourthSelectValue(val);
    setUserSelections([{
      firstSelectValue: firstSelectValue,
      secondSelectValue: secondSelectValue,
      thirdSelectValue: thirdSelectValue,
      fourthSelectValue: val,
    }])
  }

  useEffect(() => {
    console.log("allquestion", allQuestionsData)
    //console.log("sourceAndTargetStep1 change :  ", sourceAndTargetStep1)
  }, [sourceAndTargetStep1])

  let searchQ2 = true;

  useEffect(() => {
    // If userSelections are added to allQuestionsData, and now allQuestionsData is updated, send the request
    if (userSelections.length > 0 && allQuestionsData.length > 0) {
      const sendRequest = async () => {
        try {
          const targetListHasValue = allQuestionsData[allQuestionsData.length - 1].targetListHasValue
          const response = await axios.post(
            `${apiUrl}/question/${currentQuestionId}`,
            {
              allQuestionsData,
              step,
              targetListHasValue,
              sourceAndTargetStep1,
            }
          );

          // If no next question(finished)
          if (response.data === "Finished") {
            return setQuestionFinish(true)
          }

          // Update content with response
          setQuestionData(response.data);
          setCurrentQuestionId(response.data.id);
          if (response.data.protentialRank.length != 0) {
            setProtentialRank(response.data.protentialRank);
          }
          setUserSelections([]);
        } catch (error) {
          console.error("Error fetching question data:", error);
        } finally {
          setLoading(false);
        }
      };

      if (allQuestionsData.some(question => question.questionId === 1)) {
        onDeployModeChange(allQuestionsData.filter(question => question.questionId === 1).map(question => Object.values(question.userSelections[0])[0]));
      }

      sendRequest();
      setComputeSourceAndTarget((prev) => prev + 1)
    }

    if (searchQ2 && allQuestionsData.some(question => question.questionId === 2)) {
      // [{"c3": "ELK"},{"c2": "Spark ecosystem"}]
      const answerListQ2 = allQuestionsData
        .filter(question => question.questionId === 2)
        .flatMap(question =>
          question.userSelections.map(selection => Object.values(selection)[0])
        )
        .map(answer => answer.split(' ')[0]); //Output: ["ELK", "Spark"]

      console.log(answerListQ2)

      // For each ecosystem, search all the softwares of this ecosystems, and put them in array
      // send a request to backend and it will return the array
      const res = axios.post(`${apiUrl}/question/getArrayPreference`, answerListQ2, { withCredentials: true })
      searchQ2 = false;
    }


    if (allQuestionsData.some(question => question.questionId === 5)) {
      const ingestType = allQuestionsData.filter(question => question.questionId === 5).map(question => Object.values(question.userSelections[0])[0])

      if (ingestType[0] === "Streaming") {
        setDisableWhenStreaming(true)
      } else {
        setDisableWhenStreaming(false)
      }
    }

  }, [allQuestionsData]); // This will trigger when allQuestionsData is updated

  // Test handleSelectionChange()
  useEffect(() => {
    console.log("userSelections", userSelections)

    if (userSelections.length > 0) {
      setNoSelectAlert(false)
    }

    if (currentQuestionId === 2 || currentQuestionId === 30) {
      Q2Check()
    }

  }, [userSelections])

  // Supervise the currentQuestionId and when it change, handle the active step and make true that Q10 and Q12 will have the question content
  useEffect(() => {
    const has33 = allQuestionsData.some(question => question.questionId === 33);
    const depoly_mode_q = allQuestionsData.find(question => question.questionId === 1);
    const depoly_mode = depoly_mode_q ? Object.values(depoly_mode_q.userSelections[0])[0] : null;

    if (currentQuestionId === 10) {
      // Update Step -> step = 0 => step = 1
      setStep(1);
      setGlobalMsg("You are in step 2 now !")
      d
      // Update TargetList -> give the source and target in step 1 Exemple: [{target: source},{"HDFS:Files"},{"HDFS":"IoT"}]
      if (allQuestionsData.every(q => q.questionId != 10)) {
        const step1Targets = sourceAndTargetStep1
          .filter(pair => pair.step === 1)
          .map(pair => ({ [pair.target]: pair.source }));

        setTargetList(step1Targets);
      }

    } else if (currentQuestionId === 12) {
      setStep(2);
      setGlobalMsg("You are in step 3 now !")

      if (allQuestionsData.every(q => q.questionId != 12)) {
        const step2Targets = sourceAndTargetStep1
          .filter(pair => pair.step === 2)
          .map(pair => ({ [pair.target]: pair.source }));

        setTargetList(step2Targets);
      }

    } else if (currentQuestionId === 20) {

      if (!has33) {
        setStep(1);
      }

    } else {

      // Update step
      const has10 = allQuestionsData.some(question => question.questionId === 10);
      const has12 = allQuestionsData.some(question => question.questionId === 12);
      const has20 = allQuestionsData.some(question => question.questionId === 20);
      const has38 = allQuestionsData.some(question => question.questionId === 38);

      if (has12) {
        setStep(2);

        const keyToDelete = [3]
        //updateResultStore(keyToDelete, resultStore)
      } else if (has10 || has20) {
        setStep(1);

        const keyToDelete = [2, 3]
        //updateResultStore(keyToDelete, resultStore)
      } else {
        setStep(0);

        const keyToDelete = [1, 2, 3]
        //updateResultStore(keyToDelete, resultStore)
      }
    }

    if (currentQuestionId === 19) {
      if (allQuestionsData.every(q => q.questionId != 19)) {
        const step1Targets = sourceAndTargetStep1.reduce((acc, curr) => {
          // current object
          const { source, target } = curr;

          if (!acc[target]) {
            acc[target] = new Set();
          }

          if (Array.isArray(source)) {
            source.forEach(src => acc[target].add(src));
          } else {
            acc[target].add(source);
          }

          return acc;
        }, {})

        // Convert sets to arrays and log final result
        const result = Object.keys(step1Targets).reduce((acc, key) => {
          acc[key] = Array.from(step1Targets[key]); // Convert set to array
          return acc;
        }, {});

        const convertRes = Object.entries(result)
          .map(([key, value]) => ({
            [key]: value
          }))
          .filter(obj => Object.values(obj)[0].length >= 2); // Filter based on value array length

        setTargetList(convertRes)
      }
    }

    if (currentQuestionId === 13) {
      setForceUseFunction(true)
    }

    if (currentQuestionId === 20 && allQuestionsData[allQuestionsData.length - 1].questionId != 19) {
      if (!has33) {
        setSourceAndTargetStep1((prevState) => {
          // Update all step = 1 elements to step = 2
          const updatedState = prevState.map(item => {
            if (item.step === 1) {
              return { ...item, step: 2 };
            }
            return item;
          });

          return [...updatedState,]
        })
      }
    }

    if (currentQuestionId === 20 || currentQuestionId === 28) {
      setCalculRealTimeStreaming((prev) => !prev)
    }

    if (currentQuestionId === 33) {
      setDisableWhenStreaming(true)
    } else {
      setDisableWhenStreaming(false)
    }

  }, [currentQuestionId])

  useEffect(() => {
    console.log("changing targetList", targetList)
  }, [targetList])

  // Automatic Timer to close alert
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  // Automatic Timer to close globalMsg
  useEffect(() => {

    if (globalMsg) {
      setShowGlobalMsg(true)

      const timer = setTimeout(() => {
        setShowGlobalMsg(false);
        setGlobalMsg("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [globalMsg]);

  // Combine the same target to one line data
  const processQuestion19 = (currentQuestionId, userSelections, sourceAndTargetStep1, setSourceAndTargetStep1) => {
    // Check if the last question has questionId = 19
    if (currentQuestionId === 19) {
      if (allQuestionsData.some(q => q.questionId === 16)) {
        const answer16 = Object.values(allQuestionsData.find(q => q.questionId === 16)?.userSelections[0])[0]

        // Find the index of the question with questionId = 19
        const questionIndex = allQuestionsData.length;

        const answer19 = userSelections;

        let matchedPairs = [];

        answer19.forEach(answer => {
          Object.keys(answer).forEach(targetKey => {
            const values = answer[targetKey];  // Get the array of values, like ["Logs", "Http API"]

            // Map each value to the desired object structure
            const sourceAndTargetPairs = values.map(value => ({ [targetKey]: value }));

            sourceAndTargetStep1.forEach(record => {
              sourceAndTargetPairs.forEach(pair => {
                const targetMatched = record.target === Object.keys(pair)[0];
                const sourceMatched = record.source === Object.values(pair)[0];

                if (targetMatched && sourceMatched) {
                  matchedPairs.push(record);
                }
              });
            });
          });
        });

        if (answer16 === "Offline analysis" || answer16 === "Real-time analysis") {
          setSourceAndTargetStep1(prevState => {
            // Filter out elements from previous state that are not in matchedPairs
            const unmatchedPairs = prevState.filter(record =>
              !matchedPairs.some(matched =>
                matched.target === record.target && matched.source === record.source
              )
            );

            // Create new elements from answer19
            const newElements = answer19.map(answer => {
              const newTarget = Object.keys(answer)[0];
              const newSource = Object.values(answer);
              return { step: 1, source: newSource, sourceIndex: questionIndex, target: newTarget, targetIndex: questionIndex };
            });

            // Return the final state update: updated existing state + new elements
            return [...unmatchedPairs, ...newElements];
          });

        } else {
          setSourceAndTargetStep1(prevState => {
            // Filter out elements from previous state that are not in matchedPairs
            const unmatchedPairs = prevState.filter(record =>
              !matchedPairs.some(matched =>
                matched.target === record.target && matched.source === record.source
              )
            );

            // Update all step = 1 elements to step = 2
            const updatedState = unmatchedPairs.map(item => {
              if (item.step === 1) {
                return { ...item, step: 2 };
              }
              return item;
            });

            // Create new elements from answer19
            const newElements = answer19.map(answer => {
              const newTarget = Object.keys(answer)[0];
              const newSource = Object.values(answer);
              return { step: 2, source: newSource, sourceIndex: questionIndex, target: newTarget, targetIndex: questionIndex };
            });

            // Return the final state update: updated existing state + new elements
            return [...updatedState, ...newElements];
          });
        }
      } else {
        // Find the index of the question with questionId = 19
        const questionIndex = allQuestionsData.length;

        const answer19 = userSelections;

        let matchedPairs = [];

        answer19.forEach(answer => {
          Object.keys(answer).forEach(targetKey => {
            const values = answer[targetKey];  // Get the array of values, like ["Logs", "Http API"]

            // Map each value to the desired object structure
            const sourceAndTargetPairs = values.map(value => ({ [targetKey]: value }));

            sourceAndTargetStep1.forEach(record => {
              sourceAndTargetPairs.forEach(pair => {
                const targetMatched = record.target === Object.keys(pair)[0];
                const sourceMatched = record.source === Object.values(pair)[0];

                if (targetMatched && sourceMatched) {
                  matchedPairs.push(record);
                }
              });
            });
          });
        });

        //console.log("Matchedl", matchedPairs)

        setSourceAndTargetStep1(prevState => {
          // Filter out elements from previous state that are not in matchedPairs
          const unmatchedPairs = prevState.filter(record =>
            !matchedPairs.some(matched =>
              matched.target === record.target && matched.source === record.source
            )
          );

          // Create new elements from answer19
          const newElements = answer19.map(answer => {
            const newTarget = Object.keys(answer)[0];
            const newSource = Object.values(answer);
            return { step: 1, source: newSource, sourceIndex: questionIndex, target: newTarget, targetIndex: questionIndex };
          });

          // Return the final state update: updated existing state + new elements
          return [...unmatchedPairs, ...newElements];
        });
      }
    }
  };

  // when user click the option, store it
  const handleSelectionChange = (key, isChecked) => {

    if (typeof key === "object" && key !== null) { // Q10
      setUserSelections(prevSelections => {
        let newSelections = [...prevSelections];

        const objKey = Object.keys(key)[0];
        const objValue = Object.values(key)[0];

        if (isChecked) {
          newSelections.push({ [objKey]: objValue });
        } else {
          newSelections = newSelections.filter(selection => !(selection[objKey] === objValue));
        }
        return newSelections;
      });

    } else {
      const selectedValue = questionData.choices[key];

      if (questionData.type === "multiple_choice") {
        setUserSelections(prevSelections => {
          let newSelections = [...prevSelections];
          if (isChecked) {
            newSelections.push({ [key]: selectedValue });
          } else {
            newSelections = newSelections.filter(selection => !(selection[key] === selectedValue));
          }
          return newSelections;
        });

      } else if (questionData.type === "single_choice") {
        setUserSelections([{
          [key]: isChecked,
        }]);
      }
    }
  };

  // Check if the user select the wrong option
  const Q2Check = () => {

    if ((userSelections.length === 1 && Object.keys(userSelections[0]).includes("c4"))
      || (userSelections.every(selection => !Object.keys(selection).includes("c4")))) {

      setNextQuestionButtonState(true)
    } else {
      setNextQuestionButtonState(false)
    }
  }

  // Check : double element in sourceAndTargetStep1
  const doubleEleCheck = (userSelections) => {

    // Current Question id = 7 normally
    const question7selected = userSelections[0].fourthSelectValue ||
      userSelections[0].thirdSelectValue ||
      userSelections[0].secondSelectValue ||
      userSelections[0].firstSelectValue;

    const previousQuestion = allQuestionsData[allQuestionsData.length - 1];

    if (question7selected) {
      let newPair;

      if (previousQuestion && previousQuestion.questionId === 12) {
        // get the selection from id=12
        const sourceValue = previousQuestion.userSelections.map(s => Object.keys(s))

        // get the selection from id=7
        const targetValue = question7selected

        newPair = {
          step: 3,
          source: sourceValue,
          target: targetValue,
        }

      } else if (previousQuestion && previousQuestion.questionId === 10) {
        // get the selection from id=10
        const sourceValue = previousQuestion.userSelections.map(selection => {
          return Object.keys(selection)[0]
        })

        // get the selection from id=7
        const targetValue = question7selected

        newPair = {
          step: 2,
          source: sourceValue,
          target: targetValue,
        }
      } else if (previousQuestion && previousQuestion.questionId === 6) {
        // get the selection from id=6
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7selected

        newPair = {
          step: 1,
          source: sourceValue,
          target: targetValue,
        }

      } else if (previousQuestion && previousQuestion.questionId === 32) {
        // get the selection from id=32
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7selected

        newPair = {
          step: 1,
          source: sourceValue,
          target: targetValue,
          ingestType: "Batch",
        }

      } else if (previousQuestion && previousQuestion.questionId === 33) {
        // get the selection from id=33
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=7
        const targetValue = question7selected

        newPair = {
          step: 1,
          source: sourceValue,
          target: targetValue,
          ingestType: "Streaming",
        }

      } else if (previousQuestion && previousQuestion.questionId === 26) {

        // get the selection from id = 34
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=26
        const targetValue = question7selected


        newPair = {
          step: 1,
          source: sourceValue,
          target: targetValue,
          ingestType: "Batch",
        }
      } else if (previousQuestion && previousQuestion.questionId === 27) {
        // get the selection from id = 34
        const sourceValue = previousQuestion.userSelections[0].secondSelectValue || previousQuestion.userSelections[0].firstSelectValue;

        // get the selection from id=27
        const targetValue = question7selected

        newPair = {
          step: 1,
          source: sourceValue,
          target: targetValue,
          ingestType: "Streaming",
        }
      }


      if (newPair) {

        // verify if there is same pair in sourceAndTargetStep1
        const hasDouble = sourceAndTargetStep1.some(pair => {
          const hasDouble = pair.source === newPair.source && pair.target === newPair.target && pair.step === newPair.step
          return hasDouble
        })

        if (hasDouble) {
          setGlobalMsg("You cannot select duplicate combinations")
          return true;
        } else {
          return false;
        }
      }
    }
  }

  // Give the currentQuestionId and answer to get the next question
  const handleNextQuestion = async () => {

    setLoading(true);

    // Prevent users from clicking the next question button without selecting an answer
    if (userSelections.length <= 0) {
      setNoSelectAlert(true)
      setLoading(false);  // Stop loading if there are no selections
      return;
    }

    // Check if there are same pair in the sourceAndTargetStep1
    const hasDouble = doubleEleCheck(userSelections);
    if (hasDouble) {
      setLoading(false)
      return;
    }

    // loop for Q10 and Q12 (if we need to have loop for Q10) -> if all target has been selected then no, else yes
    let targetListHasValue = true

    if (currentQuestionId === 7 && step === 1) {

      // Filter all questions with questionId = 10
      const selectedQuestions = allQuestionsData.filter(q => q.questionId === 10);

      if (selectedQuestions.length > 0) {

        // Create an empty Set to store the matched pairs
        let matchedPairs = [];

        // Put all userSelection in to a array
        const userAnwerList = selectedQuestions.map(q => q.userSelections)

        const sourceTargetStep1 = sourceAndTargetStep1.filter(p => p.step === 1)

        userAnwerList.forEach(userSelection => {
          userSelection.forEach(selectedPair => {
            sourceTargetStep1.forEach(pair => {
              const targetMatched = Object.keys(selectedPair)[0] === pair.target
              const sourceMatched = Object.values(selectedPair)[0] === pair.source

              if (targetMatched && sourceMatched) {
                matchedPairs.push(pair)
              }
            })
          })
        })

        // Filter out elements in sourceAndTargetStep1 that do not match matchedPairs
        const filteredTargetList = sourceTargetStep1.filter(pair => {
          // Check if the pair is NOT in matchedPairs
          return !matchedPairs.some(matched =>
            matched.target === pair.target && matched.source === pair.source
          );
        }).map(pair => ({ [pair.target]: pair.source }));


        if (filteredTargetList.length === 0) {
          console.log("filteredTargetList is empty");
          targetListHasValue = false
        } else {
          console.log("filteredTargetList", filteredTargetList);
        }
        // Update targetList
        setTargetList(filteredTargetList);
      }
    } else if (currentQuestionId === 7 && step === 2) {
      // Filter all questions with questionId = 12
      const selectedQuestions = allQuestionsData.filter(q => q.questionId === 12);

      if (selectedQuestions.length > 0) {

        // Create an empty Set to store the matched pairs
        let matchedPairs = [];

        // Helper function to compare two arrays (deep comparison)
        const arraysEqual = (arr1, arr2) => {
          if (arr1.length !== arr2.length) return false;
          return arr1.every((value, index) => value === arr2[index]);
        };

        // Put all userSelection in to a array
        const userAnwerList = selectedQuestions.map(q => q.userSelections)

        const sourceTargetStep2 = sourceAndTargetStep1.filter(p => p.step === 2)

        userAnwerList.forEach(userSelection => {
          userSelection.forEach(selectedPair => {
            sourceTargetStep2.forEach(pair => {
              const targetMatched = Object.keys(selectedPair)[0] === pair.target

              // Compare arrays for source match, handle array in selectedPair
              const selectedSource = Object.values(selectedPair)[0];
              const sourceMatched =
                Array.isArray(selectedSource) && Array.isArray(pair.source)
                  ? arraysEqual(selectedSource, pair.source)  // Compare arrays deeply
                  : selectedSource === pair.source;           // Compare directly if not arrays

              if (targetMatched && sourceMatched) {
                matchedPairs.push(pair)
              }
            })
          })
        })

        // Filter out elements in sourceAndTargetStep1 that do not match matchedPairs
        const filteredTargetList = sourceTargetStep2.filter(pair => {
          // Check if the pair is NOT in matchedPairs
          return !matchedPairs.some(matched =>
            matched.target === pair.target &&
              Array.isArray(matched.source) && Array.isArray(pair.source)
              ? arraysEqual(matched.source, pair.source)  // Compare arrays deeply
              : matched.source === pair.source            // Compare directly if not arrays
          );
        }).map(pair => ({ [pair.target]: pair.source }));


        if (filteredTargetList.length === 0) {
          console.log("filteredTargetList is empty");
          targetListHasValue = false
        } else {
          console.log("filteredTargetList", filteredTargetList);
        }
        // Update targetList
        setTargetList(filteredTargetList);
      }
    }

    processQuestion19(currentQuestionId, userSelections, sourceAndTargetStep1, setSourceAndTargetStep1);

    //store all questiondata and selections into context using addQuestionData() => cause useEffect
    addQuestionData(questionData, userSelections, targetListHasValue);

    // Clear the value of the select table 
    setFirstSelectValue("")
    setSecondSelectValue("")
    setThirdSelectValue("")
    setFourthSelectValue("")
    setShowSecond("")
    setShowThird("")
    setShowFourth("")
  };


  const handleLastQuestion = async () => {

    // getLastQuestionIndex in allQuestionData
    const index = allQuestionsData.length - 1;

    if (index < 0) {
      setQuestionData({
        id: 1,
        content: "Where do you want to deploy your data lake ?",
        type: "single_choice",
        choices: { "c1": "On-premises" },
        is_required: 1,
        help_text: null
      });
      setCurrentQuestionId(1);
      setUserSelections([]);

      // Delete last question in allQuestionData
      setAllQuestionsData([]);

    } else {

      // get last questionId with index
      const searchId = allQuestionsData[index].questionId;

      // Delete last question in allQuestionData
      setAllQuestionsData(prev => prev.slice(0, -1));

      setLoading(true);

      try {
        // Send request to get last question data
        const response = await axios.get(`${apiUrl}/question/${searchId}`);

        setQuestionData(response.data);
        setCurrentQuestionId(response.data.id)
        setUserSelections([]);
      } catch (error) {
        console.error("Error fetching question data:", error);
      } finally {
        setLoading(false);
      }

      setReComputeSourceAndTarget((prev) => prev + 1)
    }
  }

  const handleSkipQuestion = async () => {

    try {

      setLoading(true);
      // Send req 
      const response = await axios.get(`${apiUrl}/question/skip/${currentQuestionId}`);

      setQuestionData(response.data);
      setCurrentQuestionId(response.data.id)
      setUserSelections([]);
    } catch (error) {
      console.error("Error fetching question data:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = _.throttle(async () => {
    // Check if Login
    if (!currentUser) {
      setAlert(true);
      SetErrSave("You need to Login to use Save function !")
    } else {

      try {
        const response = await axios.post(`${apiUrl}/question/save`, {
          allQuestionsData,
          sourceAndTargetStep1,
          currentQuestionId,
          resultStore,
          UserID: currentUser.UserID
        })

        setGlobalMsg(response.data)
        if (response.data) {
          setSucessSave(response.data)
          setAlert(true)
        }
      } catch (err) {
        SetErrSave(err.response.data)
        setAlert(true);
      }
    }
  }, 2000)

  const handleOverWrite = _.throttle(async () => {
    // Check if Login
    if (!currentUser) {
      setAlert(true);
      SetErrSave("You need to Login to use Save function !")
    } else {
      try {
        const userId = currentUser.UserID;

        const response = await axios.get(`${apiUrl}/question/overwrite`, { params: { userId } });

        //console.log("back data", response.data)
        // Overwrite page by these return data

        const { AllQuestionsData, CurrentId, SourceAndTargetList, ResultStore } = response.data;

        overwritePage(AllQuestionsData, CurrentId, SourceAndTargetList, ResultStore);

      } catch (error) {
        SetErrSave(error.response?.data?.message || "Failed to overwrite data");
        setAlert(true)
      }
    }
  }, 2000)

  const overwritePage = async (AllQuestionsData, CurrentId, SourceAndTargetList, ResultStore) => {
    if (AllQuestionsData.length > 0) {
      setAllQuestionsData(AllQuestionsData);
    }

    if (CurrentId) {
      setCurrentQuestionId(CurrentId);
      try {
        const response = await axios.get(`${apiUrl}/question/${CurrentId}`)

        setQuestionData(response.data);
        setUserSelections([]);
      } catch (error) {
        console.log(error)
      }
    }

    if (SourceAndTargetList.length > 0) {
      setSourceAndTargetStep1(SourceAndTargetList);
    }

    if (Object.keys(ResultStore).length > 0) {
      setResultStore(ResultStore);
    }

    setGlobalMsg("Restore sucessfully !")
  }

  const handleFinalReport = async () => {

    setIsTimerRunning(false);
    // Step 1: API to calculate data for final report
    try {
      const resp = await axios.post(`${apiUrl}/question/calculCloudData`, {
        allQuestionsData
      });

      console.log(resp.data)

      // Step 2: go to page /finalRes with data

      const dataToPass = {
        allQuestionsData,
        sourceAndTargetStep1,
        resultStore,
        timer,
        deployMode: "Cloud",
        platform: resp.data.platform,
        architectureCloud: resp.data.recommendation
      }
      navigate("/finalres", { state: { dataToPass } })

    } catch (error) {
      console.log(error);
    }

  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questionData) {
    return <div>No question data available.</div>;
  }

  return (
    <div className='mb-2 w-full h-full'>
      <Card className='bg-white/50 shadow-md h-full'>
        <div className='flex items-center justify-between'>
          <Typography variant='h2' className='p-4' color='black'>
            Question :
          </Typography>
          {showGlobalMsg && <div className="bg-gray-400/30 rounded-lg p-2">
            <span className='text-red-400'>{globalMsg}</span>
          </div>}
          <div className='flex gap-2 pr-8'>
            <div className="">
              <Button className="bg-blue-gray-200 text-gray-800 h-10 w-10 flex items-center justify-center" onClick={() => { handleOverWrite() }}>
                <i className="fa-solid fa-arrows-rotate"></i>
              </Button>
            </div>
            <div className="relative">
              <Button className="bg-blue-gray-200 text-gray-800 h-10 w-10 flex items-center justify-center" onClick={() => { handleSave() }}>
                <i className="fa-solid fa-floppy-disk"></i>
              </Button>
              {alert && (
                <div className='absolute -top-16 -right-10 z-50'>
                  <Alert onClose={() => setAlert(false)} variant="ghost" className='w-96'
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 100 },
                    }} >
                    <span>{sucessSave ? sucessSave : errSave}</span>
                  </Alert>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* if question finish -> show other content */}
        {
          questionFinish &&
          <div className='p-4'>
            <Typography variant='h3' color='blue-gray'>
              <span className='text-light-blue-600'>Congratulations!</span> <br />You have completed all the questions and now you can:
            </Typography>
            <form className='flex items-center justify-center mt-16'>
              <Button variant="gradient" value="123" className='text-lg' size='lg' onClick={() => handleFinalReport()}>Generate Final Report</Button>
            </form>
          </div>
        }

        {/* if still has question */}
        {!questionFinish &&
          <form className='flex flex-col justify-between h-full relative'>
            <div className=''>
              <Typography key={questionData.id} variant='h5' className='px-4 ml-4' color='black'>
                <div>
                  {questionData.content}{questionData.is_required ? " *" : ""}
                </div>
                <div className='flex flex-col justify-center gap-2 mt-4'>
                  {questionData.id === 7 // special content for the question 7
                    ? (
                      <div className='flex gap-4 p-4'>
                        <div className="w-48">
                          <Select
                            label="Storage Type"
                            value={firstSelectValue}
                            onChange={(val) => handleFirstSelectChange(val)}
                          >
                            <Option value="Database">Database</Option>
                            <Option value="Filesystem">Filesystem</Option>
                          </Select>
                        </div>
                        {/* level 2 */}
                        {showSecond === "Database" &&
                          <div className="w-48">
                            <Select
                              label="Architecture"
                              value={secondSelectValue}
                              onChange={(val) => handleSecondSelectChange(val)}
                            >
                              <Option value="Centralized_db">Centralized Database</Option>
                              <Option value="Distributed_db">Distributed Database</Option>
                            </Select>
                          </div>}

                        {showSecond === "Filesystem" &&
                          <div className="w-48">
                            <Select
                              label="Architecture"
                              value={secondSelectValue}
                              onChange={(val) => handleSecondSelectChange(val)}
                            >
                              <Option value="Centralized_fs">Centralized File System</Option>
                              <Option value="Distributed_fs">Distributed File System</Option>
                            </Select>
                          </div>}

                        {/* level 3 */}
                        {showThird === "Centralized_db" &&
                          <div className="w-48">
                            <Select
                              label="Database Type"
                              value={thirdSelectValue}
                              onChange={(val) => handleThirdSelectChange(val)}
                            >
                              <Option value="Relational">Relational</Option>
                              <Option value="Nosql" disabled={step === 2}>NoSQL</Option>
                            </Select>
                          </div>}

                        {showThird === "Distributed_db" &&
                          <div className="w-48">
                            <Select
                              label="Database Type"
                              value={thirdSelectValue}
                              onChange={(val) => handleThirdSelectChange(val)}
                            >
                              <Option value="Dis_Relational">Relational</Option>
                              <Option value="Dis_Nosql" disabled={step === 2}>NoSQL</Option>
                            </Select>
                          </div>}

                        {showThird === "Centralized_fs" &&
                          <div className="w-48">
                            <Select
                              label="Centralized File System"
                              value={thirdSelectValue}
                              onChange={(val) => handleThirdSelectChange(val)}
                            >
                              <Option value="Network Attached Storage(NAS)">NAS</Option>
                              <Option value="Storage Area Network(SAN)">SAN</Option>
                              <Option value="New Technology File System(NTFS)">NTFS</Option>
                              <Option value="Fourth Extended Filesystem(EXT4)">EXT4</Option>
                            </Select>
                          </div>}

                        {showThird === "Distributed_fs" &&
                          <div className="w-48">
                            <Select
                              label="Distributed File System"
                              value={thirdSelectValue}
                              onChange={(val) => handleThirdSelectChange(val)}
                            >
                              <Option value="HDFS">HDFS</Option>
                            </Select>
                          </div>}

                        {/* level 4 */}
                        {showFourth === "Relational" && showThird === "Centralized_db" &&
                          <div className="w-48">
                            <Select
                              label="Relational Database"
                              value={fourthSelectValue}
                              onChange={(val) => handleFourthSelectChange(val)}
                            >
                              <Option value="MySQL">MySQL</Option>
                              <Option value="PostgreSQL">PostgreSQL</Option>
                              <Option value="MariaDB">MariaDB</Option>
                              <Option value="Oracle Database">Oracle Database</Option>
                              <Option value="Microsoft SQL Server">Microsoft SQL Server</Option>
                            </Select>
                          </div>}

                        {showFourth === "Nosql" && showThird === "Centralized_db" && <div className="w-48">
                          <Select
                            label="NoSQL Database"
                            value={fourthSelectValue}
                            onChange={(val) => handleFourthSelectChange(val)}
                          >
                            <Option value="Redis">Redis</Option>
                            <Option value="MongoDB">MongoDB</Option>
                            <Option value="InfluxDB">InfluxDB</Option>
                            <Option value="Neo4j">Neo4j</Option>
                          </Select>
                        </div>}

                        {showFourth === "Dis_Relational" && showThird === "Distributed_db" && <div className="w-48">
                          <Select
                            label="Relational Database"
                            value={fourthSelectValue}
                            onChange={(val) => handleFourthSelectChange(val)}
                          >
                            <Option value="PostgreSQL with Citus">PostgreSQL with Citus</Option>
                            <Option value="VoltDB">VoltDB</Option>
                            <Option value="MySQL Cluster (NDB Cluster)">MySQL Cluster (NDB Cluster)</Option>
                          </Select>
                        </div>}

                        {showFourth === "Dis_Nosql" && showThird === "Distributed_db" && <div className="w-48">
                          <Select
                            label="NoSQL Database"
                            value={fourthSelectValue}
                            onChange={(val) => handleFourthSelectChange(val)}
                          >
                            <Option value="Apache HBase">Apache HBase</Option>
                            <Option value="Cassandra">Cassandra</Option>
                            <Option value="Dis_MongoDB">MongoDB</Option>
                            <Option value="Dis_Neo4j">Neo4j</Option>
                            <Option value="Dis_InfluxDB">InfluxDB</Option>
                          </Select>
                        </div>}
                      </div>
                    ) : questionData.id === 6 || questionData.id === 26 || questionData.id === 27 || questionData.id === 32 || questionData.id === 33
                      ? (
                        <div className='flex gap-4 p-4'>
                          <div className="w-48">
                            <Select
                              label="Source Type"
                              value={firstSelectValue}
                              onChange={(val) => handleFirstSelectChange(val)}
                            >
                              <Option value="Http API">Http API</Option>
                              <Option disabled={disableWhenStreaming} value="Database">Database</Option>
                              <Option disabled={disableWhenStreaming} value="DataSet(Demi-structured)">DataSet(Demi-structured)</Option>
                              <Option disabled={disableWhenStreaming} value="Files(Unstructured)">Files(Unstructured)</Option>
                              <Option value="Logs">Logs</Option>
                              <Option value="IoT">IoT</Option>
                            </Select>
                          </div>

                          {/* level 2 */}
                          {showSecond === "Database" && <div className="w-48">
                            <Select
                              label="Database Type"
                              value={secondSelectValue}
                              onChange={(val) => handleSecondSelectChange(val)}
                            >
                              <Option value="Relational Database">Relational Database</Option>
                              <Option value="NoSQL Database">NoSQL Database</Option>
                            </Select>
                          </div>}
                        </div>
                      )
                      : questionData.id === 10 || questionData.id === 12 || questionData.id === 19
                        ? (
                          <Card className="w-full max-w-[50rem] bg-transparent shadow-transparent">
                            <List className="flex-row justify-between flex-wrap">
                              {targetList.map((t, index) => (
                                <ListItem className="p-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" key={`target-${index}`}>
                                  <label
                                    htmlFor={`horizontal-list-${index}`}
                                    className="flex w-full cursor-pointer items-center px-3 py-2"
                                  >
                                    <ListItemPrefix className="mr-3">
                                      <Checkbox
                                        id={`horizontal-list-${index}`}
                                        ripple={false}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                          className: "p-0",
                                        }}
                                        onClick={(e) => handleSelectionChange(t, e.target.checked)}
                                      />
                                    </ListItemPrefix>
                                    <Typography color="blue-gray" className="font-medium">
                                      {Object.keys(t)[0]}
                                    </Typography>
                                  </label>
                                </ListItem>
                              ))}
                            </List>
                          </Card>
                        )
                        : questionData.id === 34
                          ? (
                            <div className='flex gap-4 p-4'>
                              <div className="w-48">
                                <Select
                                  label="Storage Type"
                                  value={firstSelectValue}
                                  onChange={(val) => handleFirstSelectChange(val)}
                                >
                                  <Option value="Relational Database">Relational Database</Option>
                                  <Option value="NoSQL Database">NoSQL Database</Option>
                                  <Option value="Document Storage">Document Storage</Option>
                                  <Option value="Object Store">Object Store</Option>
                                </Select>
                              </div>

                              {/* level 2 */}
                              {showSecond === "NoSQL Database" &&
                                <div className="w-48">
                                  <Select
                                    label="NoSQL Type"
                                    value={secondSelectValue}
                                    onChange={(val) => handleSecondSelectChange(val)}
                                  >
                                    <Option value="Relational Database">Key-value Database</Option>
                                    <Option value="Document Store">Document Store</Option>
                                    <Option value="Column Family Store">Column Family Store</Option>
                                    <Option value="Graph Store">Graph Store</Option>
                                  </Select>
                                </div>}
                            </div>
                          )
                          : (
                            Object.entries(questionData.choices).map(([key, value]) => (
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
                            ))
                          )
                  }
                </div>
              </Typography>
            </div>

            {noSelectAlert && <span className='absolute top-64 right-0 pr-10 py-1 text-red-500 text-lg'>You need to choose an option*</span>}
            {!nextQuestionButtonState && <span className='absolute top-64 right-0 pr-10 py-1 text-red-500 text-lg'>Please check your selections*</span>}
            <div className='flex justify-between mx-8 mb-4 mt-2 gap-8'>
              <Button variant="gradient" size='lg' color="blue-gray" className='flex items-center gap-4 text-black' disabled={currentQuestionId === 1} onClick={handleLastQuestion}>
                <img src={leftArrow} width={40} height={40}></img>
                Last Question
              </Button>
              <div className="flex gap-4">
                <Button variant="text" size='lg' className='bg-gray-300/50' disabled={questionData.is_required} onClick={handleSkipQuestion}>Skip</Button>
                <Button variant="gradient" size='lg' color="blue-gray" className='flex items-center gap-4 text-black' disabled={!nextQuestionButtonState} onClick={handleNextQuestion}>
                  Next Question
                  <img src={rightArrow} width={40} height={40}></img>
                </Button>
              </div>
            </div>
          </form>
        }
      </Card >
    </div >
  )
}

export default QuestionMiddleUpContent