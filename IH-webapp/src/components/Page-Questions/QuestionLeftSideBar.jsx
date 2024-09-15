import { Button, Card, Typography } from "@material-tailwind/react"
import { QuestionStepper } from "./Stepper"
import { QuestionTable } from "./QuestionTable"
import { useContext } from "react";
import { QuestionContext } from "../../context/questionContext";

const QuestionLeftSideBar = () => {

  return (

    <Card className="flex flex-col mx-2 px-4 pb-8 pt-4 h-full bg-white/50" >
      <QuestionTable />
    </Card>

  )
}

export default QuestionLeftSideBar 