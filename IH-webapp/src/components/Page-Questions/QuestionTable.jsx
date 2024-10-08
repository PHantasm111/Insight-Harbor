import { Button, Card, Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useContext, React, useState, useEffect } from "react";
import { QuestionContext } from "../../context/questionContext";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import axios from "axios";




export function QuestionTable() {

  const { allQuestionsData, setQuestionData, setCurrentQuestionId, setUserSelections, setReComputeSourceAndTarget } = useContext(QuestionContext);

  // Control Dialog - Warning => Open & Close
  const [open, setOpen] = useState(false);

  // Control Dialog - All Answers => Open & Close
  const handleOpen = () => setOpen(!open);

  // Controls the opening and closing of the confirmation modification dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Used to store the currently selected question
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [dismissConfig, setDismissConfig] = useState({ outsidePress: true, escapeKey: true });

  // Header of the table
  const TABLE_HEAD = ["QId", "Answer"];
  const TABLE_HEAD1 = ["Id", "QId", "Question", "Answer"];

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(!confirmDialogOpen);
  };

  const handleSelectedQuestion = (questionElement, index) => {
    // Store selected question (index & question content)
    setSelectedQuestion([
      index,
      questionElement
    ]);

    // Open the confirmDialog
    setConfirmDialogOpen(true);
  };

  const handleModifyQuestion = async () => {

    console.log(selectedQuestion)

    allQuestionsData.splice(selectedQuestion[0]);

    try {
      // get the selected question and set to MiddleUpContent
      const searchId = selectedQuestion[1].questionId;
      const response = await axios.get(`http://localhost:3000/question/${searchId}`)

      setQuestionData(response.data);
      setCurrentQuestionId(response.data.id)
      setUserSelections([]);
      setReComputeSourceAndTarget((prev) => prev + 1)
    } catch (error) {
      console.error("Error fetching question data:", error);
    } 
  }

  useEffect(() => {
    if (confirmDialogOpen === true) {
      setDismissConfig({ outsidePress: false, escapeKey: false });
    } else {
      setDismissConfig({ outsidePress: true, escapeKey: true });
    }
  }, [confirmDialogOpen])


  return (
    <section className="w-full h-full">
      <div className="flex items-center justify-between">
        <Typography
          variant="h2"
          color="black"
          className="pt-2 pb-4"
        >
          Answer list
        </Typography>
      </div>
      <Card className="w-full overflow-scroll border border-gray-300 px-4 h-2/3 bg-white/50 scrollbar-hide">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => {

                const isFirstCol = index;
                const classes = isFirstCol === 0 ? "border-b border-gray-300 pb-4 pt-5 px-1 w-1/6" : "border-b border-gray-300 pb-4 pt-5 px-1";

                return (
                  <th key={head} className={classes}>
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {allQuestionsData.map(({ questionId, userSelections, questionContent }, index) => {
              const isLast = index === allQuestionsData.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              const questionObj = userSelections[0];

              const questionAnswer = () => {
                switch (questionId) {
                  case 6:
                  case 7:
                    const { firstSelectValue, secondSelectValue, thirdSelectValue, fourthSelectValue } = questionObj;

                    if (fourthSelectValue) {
                      return fourthSelectValue;
                    } else if (thirdSelectValue) {
                      return thirdSelectValue;
                    } else if (secondSelectValue) {
                      return secondSelectValue;
                    } else if (firstSelectValue) {
                      return firstSelectValue;
                    } else {
                      return "No selection found";
                    }
                  case 10:
                  case 12:
                    // Collect all keys from userSelections
                    const selectionKeys = userSelections.flatMap(selection => Object.keys(selection));

                    // Return the keys as a comma-separated string or empty message
                    return selectionKeys.length > 0 ? selectionKeys.join(', ') : 'No selection found';

                  case 19:
                    const formatUserSelections = (userSelections) => {
                      return userSelections.map((selection) => {
                        const [key, values] = Object.entries(selection)[0];

                        return `${values.join(' & ')} => ${key}`;
                      });
                    };

                    const formattedSelections = formatUserSelections(userSelections);
                    return formattedSelections;

                  default:
                    // Check if userSelections exists and has at least one item
                    if (userSelections && userSelections.length > 0) {
                      // Use Object.values to get the first value from the first selection object
                      return Object.values(userSelections[0])[0] || "No selection found";
                    } else {
                      return "No selection found"; // Handle the case where userSelections is empty
                    }
                }
              }

              return (
                <Popover key={index} placement="top">
                  <PopoverHandler>
                    <tr className="hover:bg-gray-50 cursor-pointer">
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray-600" className="font-bold">
                          {questionId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray-600" className="font-normal">
                          {questionAnswer()}
                        </Typography>
                      </td>
                    </tr>
                  </PopoverHandler>
                  <PopoverContent className="w-64">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {questionContent}
                    </Typography>
                  </PopoverContent>
                </Popover>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="py-4">
        <Button onClick={handleOpen} size="lg" variant="gradient" className="text-lg w-full">Modify</Button>
      </div>

      {/* Dialog - Answer List */}
      <>
        <Dialog open={open} handler={handleOpen} className="max-h-2/3" aria-hidden={open ? "false" : "true"} dismiss={dismissConfig}>
          <DialogHeader className="text-blue-gray-500">All Answers List</DialogHeader>

          <DialogBody className="max-h-[60vh]">
            <section className="w-full h-full bg-white">
              <div className="px-6 pb-4">
                <Typography variant="lead" color="red" className="font-bold">
                  Warning !
                </Typography>
                <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
                  If you modify the answer to the question, the follow-up questions you answered before will disappear!
                </Typography>
              </div>
              <Card className="w-full max-h-80 overflow-y-auto border border-gray-300 px-6">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD1.map((head) => (
                        <th key={head} className="border-b border-gray-300 pb-4 pt-6">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allQuestionsData.length > 0
                      ? (allQuestionsData.map(({ questionId, questionContent, userSelections }, index) => {
                        const isLast = index === allQuestionsData.length - 1;
                        const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

                        const questionObj = userSelections[0];

                        const questionAnswer = () => {
                          switch (questionId) {
                            case 6:
                            case 7:
                              const { firstSelectValue, secondSelectValue, thirdSelectValue, fourthSelectValue } = questionObj;

                              if (fourthSelectValue) {
                                return fourthSelectValue;
                              } else if (thirdSelectValue) {
                                return thirdSelectValue;
                              } else if (secondSelectValue) {
                                return secondSelectValue;
                              } else if (firstSelectValue) {
                                return firstSelectValue;
                              } else {
                                return "No selection found";
                              }
                            case 10:
                            case 12:
                              // Collect all keys from userSelections
                              const selectionKeys = userSelections.flatMap(selection => Object.keys(selection));

                              // Return the keys as a comma-separated string or empty message
                              return selectionKeys.length > 0 ? selectionKeys.join(', ') : 'No selection found';

                            case 19:
                              const formatUserSelections = (userSelections) => {
                                return userSelections.map((selection) => {
                                  const [key, values] = Object.entries(selection)[0];

                                  return `${values.join(' & ')} => ${key}`;
                                });
                              };

                              const formattedSelections = formatUserSelections(userSelections);
                              return formattedSelections;

                            default:
                              // Check if userSelections exists and has at least one item
                              if (userSelections && userSelections.length > 0) {
                                // Use Object.values to get the first value from the first selection object
                                return Object.values(userSelections[0])[0] || "No selection found";
                              } else {
                                return "No selection found"; // Handle the case where userSelections is empty
                              }
                          }
                        }

                        return (
                          <tr key={index} className="hover:bg-gray-50" onClick={() => handleSelectedQuestion(allQuestionsData[index], index)}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold mr-8"
                              >
                                {index + 1}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600 mr-4"
                              >
                                {questionId}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600 break-words w-72 mr-4"
                              >
                                {questionContent}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal text-gray-600"
                              >
                                {questionAnswer()}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              No available result
                            </Typography>
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </Card>
            </section>

          </DialogBody>
          <DialogFooter>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Close</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
      <>
        <Dialog open={confirmDialogOpen} handler={handleConfirmDialogOpen} className="max-h-2/3">
          <DialogHeader className="text-blue-gray-500">Confirm changes</DialogHeader>
          <DialogBody className="max-h-[60vh]">
            <Typography variant="lead" color="red" className="font-bold">
              Are you sure you want to edit this question?
            </Typography>
            {selectedQuestion && (
              <Typography className="mb-4 w-80 font-normal text-gray-600 md:w-full">
                The ID of the currently selected question: {selectedQuestion[1].questionId}
              </Typography>
            )}
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={() => { handleConfirmDialogOpen(); }} className="mr-1">
              Cancel
            </Button>
            <Button variant="gradient" color="green" onClick={() => {
              console.log("change question: ", selectedQuestion);
              handleConfirmDialogOpen();
              setOpen(false);
              handleModifyQuestion();
            }}>
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    </section>
  );
}