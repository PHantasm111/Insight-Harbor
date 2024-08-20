import React from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";


export function QuestionStepper() {
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
                <Step onClick={() => setActiveStep(0)}>
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

                <Step onClick={() => setActiveStep(1)}>
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
                <Step onClick={() => setActiveStep(2)}>
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