import { Button, Card, Typography } from '@material-tailwind/react'
import React from 'react'

const TopBar = ({totalQ, timer}) => {

    console.log("topbar timer", timer)
    return (
        <div className='flex items-center gap-2 h-full w-full'>
            <div className='flex items-center justify-between bg-blue-gray-50 h-full w-[85%]'>
                <div className='ml-16'>
                    <Typography variant='h1' color='black'>Data Lake</Typography>
                </div>
                <div className='flex gap-8 mr-8'>
                    <div className='flex flex-col gap-2 items-center justify-center bg-blue-50 p-4'>
                        <div><Typography variant='h4'>Total Questions Answered</Typography></div>
                        <div><Typography variant='h4'>{totalQ}</Typography></div>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center bg-blue-50 p-4'>
                        <div><Typography variant='h4'>Total Time Spent</Typography></div>
                        <div><Typography variant='h4'>{Math.floor(timer / 60)} min {timer % 60} sec</Typography></div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-[15%]'>
                <form className='p-8'>
                    <Button size="lg">Save the Report</Button>
                </form>
            </div>
        </div>
    )
}

export default TopBar