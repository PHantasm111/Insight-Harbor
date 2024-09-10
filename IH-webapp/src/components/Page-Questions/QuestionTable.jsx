import { Button, Card, Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useContext, React, useState } from "react";
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




export function QuestionTable() {

  // Header of the table


  const { allQuestionsData } = useContext(QuestionContext);

  // Control Dialog - Warning => Open & Close
  const [open, setOpen] = useState(false);
  const [questionTableDetailOpen, setQuestionTableDetailOpen] = useState(false);

  // Control Dialog - All Answers => Open & Close
  const handleOpen = () => setOpen(!open);
  const handleQuestionTableDetailOpen = () => setQuestionTableDetailOpen(!questionTableDetailOpen);

  // Control Open & Close of the Answer list when change the answer
  const [openAnswerList, setOpenAnswerList] = useState(0);
  const handleOpenAnswerList = (value) => setOpenAnswerList(openAnswerList === value ? -999 : value);

  const TABLE_HEAD = ["QId", "Answer"];
  const TABLE_HEAD1 = ["id", "QId", "Content", "Answer"];


  // Exemple allQuestionData
  // {
  //   "questionId": 1,
  //   "questionContent": "Where do you want to deploy your data lake ?",
  //   "questionType": "single_choice",
  //   "choices": {
  //       "c1": "On-premises",
  //       "c2": "On cloud",
  //       "c3": "Hybrid"
  //   },
  //   "userSelections": {
  //       "c1": "On-premises"
  //   }
  // }


  return (
    <section className="w-full bg-white">
      <div className="flex items-center justify-between">
        <Typography
          variant="h2"
          color="blue-gray"
          className="pt-2 pb-4"
        >
          Answer list
        </Typography>
        <div className="">
          <Button onClick={handleOpen} size="md" variant="gradient">Modify</Button>
        </div>
      </div>
      <Card className="w-full overflow-scroll border border-gray-300 px-4 h-96">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-5 px-1">
                  <Typography
                    variant="lead"
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
                        <Typography variant="small" color="blue-gray" className="font-bold">
                          {questionId}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal text-gray-600">
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

      {/* Dialog - Answer List */}
      <>
        <Dialog open={open} handler={handleOpen} className="max-h-2/3">
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
                    {allQuestionsData.map(({ questionId, questionContent, userSelections }, index) => {
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
                      //  6.7
                      // 10.12
                      // others


                      return (
                        <tr key={index} className="hover:bg-gray-50">
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
                    })}
                  </tbody>
                </table>
              </Card>
            </section>

          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>

    </section>
  );
}