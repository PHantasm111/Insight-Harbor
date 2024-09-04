import React, { useContext, useEffect } from "react";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { QuestionContext } from "../../context/questionContext";


export function QuestionStepper() {

    const { step } = useContext(QuestionContext);  // get all question daa

    return (
        <div className="w-full px-4 pb-8">
            <Stepper
                activeStep={step}
            >
                <Step>
                    1
                    <div className="absolute -bottom-[40px] w-max text-center">
                        <Typography
                            variant="h6"
                            color={step === 0 ? "blue-gray" : "gray"}
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
                            color={step === 1 ? "blue-gray" : "gray"}
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
                            color={step === 2 ? "blue-gray" : "gray"}
                        >
                            Analysis
                        </Typography>
                    </div>
                </Step>
            </Stepper>
        </div>
    );
}