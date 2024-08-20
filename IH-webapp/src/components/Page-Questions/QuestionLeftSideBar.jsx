import { Card, Typography } from "@material-tailwind/react"
import { QuestionStepper } from "./Stepper"
import { QuestionTable } from "./QuestionTable"

const QuestionLeftSideBar = () => {
  return (
    <div className="mt-4 mx-2">
      <Card className="flex flex-col w-full bg-blue-500">
        <Typography
          variant="h2"
          color="blue-gray"
          className="p-4"
        >
          Step
        </Typography>
        {/* Stepper for the question */}
        <div className="p-4">
          <QuestionStepper />
        </div>

        <Typography
          variant="h2"
          color="blue-gray"
          className="p-4"
        >
          Answer list
        </Typography>
        <div className="px-4 pb-8">
          <QuestionTable />
        </div>
      </Card>
    </div>
  )
}

export default QuestionLeftSideBar 