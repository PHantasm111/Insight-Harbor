import { Button, Card, Typography } from "@material-tailwind/react"
import { QuestionStepper } from "./Stepper"
import { QuestionTable } from "./QuestionTable"
import { useContext } from "react";
import { QuestionContext } from "../../context/questionContext";

const QuestionLeftSideBar = () => {

  return (
    <div className="mx-2">
      <Card className="flex flex-col w-full bg-white mb-4" >
        <Typography
          variant="h2"
          color="blue-gray"
          className="p-4"
        >
          Step
        </Typography>

        {/* Stepper for the question */}
        <div className="px-4 pb-2">
          <QuestionStepper />
        </div>

        <div className="px-4 pb-8 w-full">
          <QuestionTable />
        </div>
      </Card>
    </div>
  )
}

export default QuestionLeftSideBar 