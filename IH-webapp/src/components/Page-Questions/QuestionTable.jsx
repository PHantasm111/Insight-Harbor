import { Button, Card, Typography, Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useContext, React, useState } from "react";
import { QuestionContext } from "../../context/questionContext";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";




export function QuestionTable() {

  // Header of the table
  const TABLE_HEAD = ["QuestionId", "Modif."];

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
      <Card className="w-full overflow-scroll border border-gray-300 px-6 h-96">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 pb-4 pt-10">
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
            {allQuestionsData.map(({ questionId }, index) => {
              const isLast = index === allQuestionsData.length - 1;
              const classes = isLast ? "py-4" : "py-4 border-b border-gray-300";

              return (
                <tr key={`${index}-${questionId}`} className="hover:bg-gray-50">
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold"
                    >
                      {questionId}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      className="font-normal text-gray-600"
                    >
                      <Button size="sm" variant="filled" onClick={handleOpen}>EDIT</Button>
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      {/* Dialog - Warning */}
      <>
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className="text-red-500">Warning !</DialogHeader>
          <DialogBody>
            If you modify the answer to the question, the follow-up questions you answered before will disappear!
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
            <Button variant="gradient" color="green" onClick={() => { handleOpen(); handleQuestionTableDetailOpen(); }}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>

      {/* Dialog - Answer List */}
      <>
        <Dialog open={questionTableDetailOpen} handler={handleQuestionTableDetailOpen}>
          <DialogHeader className="text-blue-gray-500">All Answers</DialogHeader>
          <DialogBody className="max-h-96 overflow-auto">
            {allQuestionsData.map((question,index) => (
              <Accordion open={openAnswerList === index} key={index}>
                <AccordionHeader onClick={() => handleOpenAnswerList(index)}>{question.questionId}. {question.questionContent}</AccordionHeader>
                <AccordionBody>
                  Your answer is :
                  {Object.entries(question.userSelections[0]).map(([key, value], index) => (
                    <p key={`answerList-${key}-${index}`}>
                      {index + 1}. {value}
                    </p>
                  ))}
                </AccordionBody>
              </Accordion>
            ))}
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleQuestionTableDetailOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleQuestionTableDetailOpen}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>

    </section>
  );
}