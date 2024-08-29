import React, { useContext, useEffect } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { QuestionContext } from "../../context/questionContext";


export function QuestionStepper() {
    const { allQuestionsData, setStep } = useContext(QuestionContext);  // get all question daa

    useEffect(() => {
        const has10 = allQuestionsData.some(question => question.questionId === 10);
        const has12 = allQuestionsData.some(question => question.questionId === 12);

        if (has10) {
            setActiveStep(1);
            setStep(1);
        } else if (has12) {
            setActiveStep(2);
            setStep(2);
        }

    }, [allQuestionsData])

    const [activeStep, setActiveStep] = React.useState(0);
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    return (
        <div className="w-full px-4 pb-8">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
            >
                <Step>
                    1
                    <div className="absolute -bottom-[40px] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                        >
                            Ingestion
                        </Typography>
                    </div>
                </Step>

                <Step>
                    2
                    <div className="absolute -bottom-[40px] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                        >
                            Preparation
                        </Typography>
                    </div>
                </Step>
                <Step>
                    3
                    <div className="absolute -bottom-[40px] w-max text-center">
                        <Typography
                            variant="h6"
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                        >
                            Analysis
                        </Typography>
                    </div>
                </Step>
            </Stepper>
        </div>
    );
}