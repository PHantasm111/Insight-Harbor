import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className="bg-gray-300 w-full min-h-screen flex items-center justify-center">
        <Card className="w-1/2">

        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Profile
          </Typography>
        </CardHeader>
        
        <CardBody className="flex flex-col gap-4">
            <span>PH</span>
            <span>@gmail.com</span>
            <span>student</span>
            <span>1024-07-14</span>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" className="" >
            Go back to home page
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Profile