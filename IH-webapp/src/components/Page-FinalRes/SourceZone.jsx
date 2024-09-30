import { Card, Typography } from '@material-tailwind/react'
import React from 'react'

const SourceZone = ({ sourceBatch, model }) => {


    // List for Batch source
    const renderSourceBatch = () => {
        return sourceBatch.map((ele, index) => (
            <span key={index}>{ele}</span>
        ));
    };


    return (
        <div className='h-full w-full p-2'>
            <Card className='h-full w-full bg-red-50'>
                <div className='flex justify-center'>
                    <Typography variant='h5' color='black' className='p-2'>
                        Source
                    </Typography>
                </div>

                <div className='h-full w-full flex flex-col justify-between'>

                    {model === "Batch and Streaming" && <>
                        <Card className='m-2 h-1/2'>
                            <Typography className='p-2'>
                                Streaming data source
                            </Typography>
                        </Card>

                        <Card className='m-2 h-1/2'>
                            <Typography className='p-2'>
                                Batch data source
                                {renderSourceBatch()}
                            </Typography>
                        </Card>
                    </>}

                    {model === "Streaming" && <Card className='m-2 h-full'>
                        <Typography className='p-2'>
                            {renderSourceBatch()}
                        </Typography>
                    </Card>}

                    {model === "Batch" && <Card className='m-2 h-full'>
                        <Typography className='p-2'>
                            Batch data source
                            {renderSourceBatch()}
                        </Typography>
                    </Card>}
                </div>
            </Card>
        </div>
    )
}

export default SourceZone