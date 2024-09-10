import { Card, Typography } from '@material-tailwind/react'
import React from 'react'

const SourceZone = () => {
    return (
        <div className='h-full w-full p-2'>
            <Card className='h-full w-full bg-red-50'>
                <div className='flex justify-center'>
                    <Typography variant='h5' color='black' className='p-2'>
                        Source
                    </Typography>
                </div>

                <div className='h-full w-full flex flex-col justify-between'>
                    <Card className='m-2 h-1/2'>
                        <Typography className='p-2'>
                            Streaming data source
                        </Typography>
                    </Card>

                    <Card className='m-2 h-1/2'>
                        <Typography className='p-2'>
                            Batch data source
                        </Typography>
                    </Card>
                </div>



            </Card>
        </div>
    )
}

export default SourceZone