import { Card, Typography } from "@material-tailwind/react"
import { QuestionTable } from "./QuestionTable"
import { useContext, useEffect } from "react";
import { QuestionContext } from "../../context/questionContext";

const QuestionLeftSideBar = () => {

  const { step, timer, setTimer, isTimerRunning, setIsTimerRunning } = useContext(QuestionContext); // 从上下文获取状态

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1); // update every second
      }, 1000);
    }
    return () => clearInterval(interval); // clear timer
  }, [isTimerRunning, setTimer]);

  // when user at step 1, start timer
  useEffect(() => {
    if (step === 0 && !isTimerRunning) {
      setIsTimerRunning(true);
    }
  }, [step, isTimerRunning, setIsTimerRunning]);


  return (

    <Card className="flex flex-col mx-2 px-4 pb-8 pt-4 h-full bg-white/50"  >
      {/* Show Timer */}
      <div className="flex flex-col justify-between gap-4">
        <Typography variant="h2" color="black">
          Time spent
        </Typography>
        <Typography variant="h4" color="black">
          {Math.floor(timer / 60)} min {timer % 60} s
        </Typography>
      </div>
      <div className="h-full">
        <QuestionTable />
      </div>
    </Card>

  )
}

export default QuestionLeftSideBar 