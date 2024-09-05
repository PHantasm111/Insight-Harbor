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
} from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import axios, { all } from 'axios'
import leftArrow from "/leftArrow.svg"
import rightArrow from "/rightArrow.svg"
import { QuestionContext } from '../../context/questionContext'

const QuestionMiddleUpContent = () => {

  // Define states to store current problem data
  const [questionData, setQuestionData] = useState({
    id: 1,
    content: "Where do you want to deploy your data lake ?",
    type: "single_choice",
    choices: { "c1": "On-premises", "c2": "On cloud", "c3": "Hybrid" },
    is_required: 1,
    help_text: null
  });

  // Current question ID
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // first question = 1

  // If loading
  const [loading, setLoading] = useState(false);

  // Use QuestionContext
  const {
    userSelections, setUserSelections,
    addQuestionData, allQuestionsData, setAllQuestionsData,
    step, setStep,
    sourceAndTargetStep1, setSourceAndTargetStep1,
    sourceAndTargetStep2, setSourceAndTargetStep2,
  } = useContext(QuestionContext);  // Use useContext to get state and update function

  // For id = 7 => Handle second/third/fourth select to show the content
  const [showSecond, setShowSecond] = React.useState("");
  const [showThird, setShowThird] = React.useState("");
  const [showFourth, setShowFourth] = React.useState("");

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
    setShowSecond(val);
  }

  const handleSecondSelectChange = (val) => {
    setThirdSelectValue("");
    setFourthSelectValue("");
    setSecondSelectValue(val);
    setUserSelections([{
      firstSelectValue: firstSelectValue,
      secondSelectValue: val,
    }])
    setShowThird(val);
  }

  const handleThirdSelectChange = (val) => {
    setThirdSelectValue(val);
    setFourthSelectValue("");
    setUserSelections([{
      firstSelectValue: firstSelectValue,
      secondSelectValue: secondSelectValue,
      thirdSelectValue: val,
    }])
    setShowFourth(val);
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

  // Store 
  const [targetList, setTargetList] = useState([])
  const [giveTargetListValue, setGiveTargetListValue] = useState(true)

  // Test handleSelectionChange()
  useEffect(() => {
    //console.log("userSelections", userSelections)
    console.log("allquestionData: ", allQuestionsData)
    console.log("sourceAndTargetStep1", sourceAndTargetStep1)
  }, [allQuestionsData, userSelections])

  useEffect(() => {

    if (currentQuestionId === 10) {
      // Update Step -> step = 0 => step = 1
      setStep(1);

      // Update TargetList -> give the source and target in step 1 Exemple: [{target: source},{"HDFS:Files"},{"HDFS":"IoT"}]
      if (allQuestionsData.every(q => q.questionId != 10)) {
        const step1Targets = sourceAndTargetStep1
          .filter(pair => pair.step === 1)
          .map(pair => ({ [pair.target]: pair.source }));

        setTargetList(step1Targets);
      }

    } else if (currentQuestionId === 12) {
      setStep(2);

      if (allQuestionsData.every(q => q.questionId != 12)) {
        const step2Targets = sourceAndTargetStep1
          .filter(pair => pair.step === 2)
          .map(pair => ({ [pair.target]: pair.source }));

        setTargetList(step2Targets);
      }

    } else {

      // Update step
      const has10 = allQuestionsData.some(question => question.questionId === 10);
      const has12 = allQuestionsData.some(question => question.questionId === 12);

      if (has12) {
        setStep(2);
      } else if (has10) {
        setStep(1);
      } else {
        setStep(0);
      }
    }
  }, [currentQuestionId])


  useEffect(() => {
    console.log("changing targetList", targetList)
  }, [targetList])


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

  const handleNextQuestion = async () => {
    setLoading(true);
    try {

      // At first, store all questiondata and selections into context using addQuestionData()
      if (userSelections.length > 0) {
        addQuestionData(questionData, userSelections);
        // Clear the value of the select table
        setFirstSelectValue("")
        setSecondSelectValue("")
        setThirdSelectValue("")
        setFourthSelectValue("")
        setShowSecond("")
        setShowThird("")
        setShowFourth("")
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
        console.log("here i am in step 2")
        // Filter all questions with questionId = 12
        const selectedQuestions = allQuestionsData.filter(q => q.questionId === 12);

        console.log("selectedQuestions in step 2", selectedQuestions)

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
          console.log("userAnwerList in step 2", userAnwerList)

          const sourceTargetStep2 = sourceAndTargetStep1.filter(p => p.step === 2)
          console.log("sourceTargetStep1 in step 2", sourceTargetStep2)

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

          console.log("matchedPairs in step 2", matchedPairs)

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


      // Send request to get next question data
      const response = await axios.post(`http://localhost:3000/question/${currentQuestionId}`, {
        selections: userSelections,
        step: step,
        targetListHasValue: targetListHasValue,
      });

      //console.log("responsedata", response.data)

      // Update content
      setQuestionData(response.data);
      setCurrentQuestionId(response.data.id)
      setUserSelections([]);
    } catch (error) {
      console.error("Error fetching question data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLastQuestion = async () => {

    // getLastQuestionIndex in allQuestionData
    const index = allQuestionsData.length - 1;

    if (index < 0) {
      setQuestionData({
        id: 1,
        content: "Where do you want to deploy your data lake ?",
        type: "single_choice",
        choices: { "c1": "On-premises", "c2": "On cloud", "c3": "Hybrid" },
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
        const response = await axios.get(`http://localhost:3000/question/${searchId}`);

        setQuestionData(response.data);
        setCurrentQuestionId(response.data.id)
        setUserSelections([]);
      } catch (error) {
        console.error("Error fetching question data:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  const handleSkipQuestion = async () => {

    try {

      // Send req 
      const response = await axios.get(`http://localhost:3000/questions/skip/${currentQuestionId}`);

    } catch (error) {
      console.error("Error fetching question data:", error);
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!questionData) {
    return <div>No question data available.</div>;
  }

  return (
    <div className='mb-2 w-full'>
      <Card className='bg-white shadow-md'>
        <Typography variant='h2' className='p-4'>
          Question :
        </Typography>

        <form className='flex flex-col'>
          <Typography key={questionData.id} variant='h5' className='p-4 ml-4'>
            <div>
              {questionData.id}{". "}{questionData.content}{questionData.is_required ? " *" : ""}
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
                    {showSecond === "Database" && <div className="w-48">
                      <Select
                        label="Architecture"
                        value={secondSelectValue}
                        onChange={(val) => handleSecondSelectChange(val)}
                      >
                        <Option value="Centralized_db">Centralized Database</Option>
                        <Option value="Distributed_db">Distributed Database</Option>
                      </Select>
                    </div>}

                    {showSecond === "Filesystem" && <div className="w-48">
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
                    {showThird === "Centralized_db" && <div className="w-48">
                      <Select
                        label="Database Type"
                        value={thirdSelectValue}
                        onChange={(val) => handleThirdSelectChange(val)}
                      >
                        <Option value="Relational">Relational</Option>
                        <Option value="Nosql">NoSQL</Option>
                      </Select>
                    </div>}

                    {showThird === "Distributed_db" && <div className="w-48">
                      <Select
                        label="Database Type"
                        value={thirdSelectValue}
                        onChange={(val) => handleThirdSelectChange(val)}
                      >
                        <Option value="Dis_Relational">Relational</Option>
                        <Option value="Dis_Nosql">NoSQL</Option>
                      </Select>
                    </div>}

                    {showThird === "Centralized_fs" && <div className="w-48">
                      <Select
                        label="Centralized File System"
                        value={thirdSelectValue}
                        onChange={(val) => handleThirdSelectChange(val)}
                      >
                        <Option value="NAS">NAS</Option>
                        <Option value="SAN">SAN</Option>
                        <Option value="NTFS">NTFS</Option>
                        <Option value="EXT4">EXT4</Option>
                      </Select>
                    </div>}

                    {showThird === "Distributed_fs" && <div className="w-48">
                      <Select
                        label="Distributed File System"
                        value={thirdSelectValue}
                        onChange={(val) => handleThirdSelectChange(val)}
                      >
                        <Option value="HDFS">HDFS</Option>
                      </Select>
                    </div>}

                    {/* level 4 */}
                    {showFourth === "Relational" && showThird === "Centralized_db" && <div className="w-48">
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
                ) : questionData.id === 6 || questionData.id === 26 || questionData.id === 27
                  ? (
                    <div className='flex gap-4 p-4'>
                      <div className="w-48">
                        <Select
                          label="Source Type"
                          value={firstSelectValue}
                          onChange={(val) => handleFirstSelectChange(val)}
                        >
                          <Option value="Http API">Http API</Option>
                          <Option value="Database">Database</Option>
                          <Option value="DataSet(Demi-structured)">DataSet(Demi-structured)</Option>
                          <Option value="Files(Unstructured)">Files(Unstructured)</Option>
                          <Option value="Logs">Logs</Option>
                          <Option value="IoT">IoT</Option>
                          <Option value="ALL types">ALL types</Option>
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
                  : questionData.id === 10 || questionData.id === 12
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
                    ) : (
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

          <div className='flex justify-between m-8 gap-8'>
            <Button variant="gradient" size='lg' color="blue-gray" className='flex items-center gap-4 text-black' disabled={currentQuestionId === 1} onClick={handleLastQuestion}>
              <img src={leftArrow} width={40} height={40}></img>
              Last Question
            </Button>
            <div className="flex gap-4">
              <Button variant="text" size='lg' className='bg-gray-300/50' disabled={questionData.is_required} onClick={handleSkipQuestion}>Skip</Button>
              <Button variant="gradient" size='lg' color="blue-gray" className='flex items-center gap-4 text-black' onClick={handleNextQuestion}>
                Next Question
                <img src={rightArrow} width={40} height={40}></img>
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default QuestionMiddleUpContent