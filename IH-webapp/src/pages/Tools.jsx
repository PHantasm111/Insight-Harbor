import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import ToolsSideBar from "../components/Page-Tools/ToolsSideBar"
import axios from 'axios';

const Tools = () => {

    const [initializtionData, SetInitializtionData] = useState();

    // Initialize this page 
    useEffect(() => {

        const initializtion = async () => {
            const res = await axios.get(`http://localhost:3000/tool/initializtion`);

        }

        initializtion();


    }, [])

    // Return the page
    return (
        <div className="flex bg-gray-100 pt-8 w-full min-h-screen">
            <div className='w-1/6'>
                <ToolsSideBar />
            </div>

            <Card className="min-h-screen w-5/6 p-4 border-1 mx-2 mb-2">
                <div className=''>
                    <Typography variant='h1' color='blue-gray' className='text-2xl mb-4'>
                        DATA LAKE TOOLS
                    </Typography>
                    {/* Ingestion tools */}
                    <div className=''>
                        <Typography variant='h2' color='blue-gray' className='text-xl my-4'>
                            Ingestion tools
                        </Typography>
                    </div>
                    <div className='overflow-scroll scrollbar-hide'>
                        <div className='flex gap-4 w-max my-4'>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    {/* Preparation tools */}
                    <div className=''>
                        <Typography variant='h2' color='blue-gray' className='text-xl my-4'>
                            Preparation tools
                        </Typography>
                    </div>
                    <div className='overflow-scroll scrollbar-hide'>
                        <div className='flex gap-4 w-max my-4'>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    {/* Analysis tools */}
                    <div className=''>
                        <Typography variant='h2' color='blue-gray' className='text-xl my-4'>
                            Analysis tools
                        </Typography>
                    </div>
                    <div className='overflow-scroll scrollbar-hide'>
                        <div className='flex gap-4 w-max my-4'>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                            <Card className="h-full w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        UI/UX Review Check
                                    </Typography>
                                    <Typography>
                                        The place is close to Barceloneta Beach and bus stop just 2 min by
                                        walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                        night life in Barcelona.
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button>Read More</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>


                </div>
            </Card>
        </div>
    );
}

export default Tools