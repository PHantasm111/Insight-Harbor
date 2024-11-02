import React, { useState, useEffect, useRef } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import ToolsSideBar from "../components/Page-Tools/ToolsSideBar"
import axios from 'axios';
import API_BASE_URL from '../config.js'

const Tools = () => {

    const [initializtionData, SetInitializtionData] = useState();
    const [selectedTool, setSelectedTool] = useState(null);
    const scrollContainerRef = useRef(null);


    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (scrollContainer) {
            const onWheel = (event) => {
                event.preventDefault();
                scrollContainer.scrollLeft += event.deltaY;
            };
            scrollContainer.addEventListener('wheel', onWheel);

            return () => scrollContainer.removeEventListener('wheel', onWheel);
        }
    }, []);

    // Initialize this page 
    useEffect(() => {

        const initializtion = async () => {
            const res = await axios.get(`${API_BASE_URL}/tool/initializtion`);

            SetInitializtionData(res.data)
        }

        initializtion();
    }, [])

    useEffect(() => {
        //console.log(initializtionData)
    }, [initializtionData])

    // Change Content
    const toolContentHandler = async (idt) => {
        const response = await axios.get(`${API_BASE_URL}/tool/${idt}`)

        setSelectedTool(response.data[0])
    }



    // Return the page
    return (
        <div className="flex bg-gray-100 pt-6 px-2 w-full min-h-screen">
            <div className='w-1/6'>
                <ToolsSideBar />
            </div>

            <Card className="min-h-screen w-5/6 p-4 border-1 mx-2 mb-2">
                {!selectedTool
                    ? (<div className=''>
                        <Typography variant='h1' color='blue-gray' className='text-2xl mb-4'>
                            DATA LAKE TOOLS
                        </Typography>
                        {/* Ingestion tools */}
                        <div className=''>
                            <Typography variant='h2' color='blue-gray' className='text-xl my-4'>
                                Ingestion tools
                            </Typography>
                        </div>
                        <div className='overflow-scroll scrollbar-hide' ref={scrollContainerRef}>
                            <div className='flex gap-4 w-max mb-4'>
                                {initializtionData?.Ingestion.map((item, index) => {
                                    return (
                                        <Card className="h-72 w-96 relative" key={item.Id_t}>
                                            <CardBody>
                                                <Typography variant="h5" color="black" className="mb-2">
                                                    {item.name_t}
                                                </Typography>
                                                <Typography>
                                                    {item.short_description_t}
                                                </Typography>
                                                <img src={item.logo ? item.logo : "/logo.png"} width={60} height={60} className='absolute left-4 bottom-4 z-10' />
                                            </CardBody>
                                            <CardFooter className="absolute right-0 bottom-0 z-10">
                                                <Button onClick={() => { toolContentHandler(item.Id_t) }}>Read More</Button>
                                            </CardFooter>
                                        </Card>
                                    )
                                })}
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
                                {initializtionData?.Preparation.map((item, index) => {
                                    return (
                                        <Card className="h-72 w-96 relative" key={item.Id_t}>
                                            <CardBody>
                                                <Typography variant="h5" color="black" className="mb-2">
                                                    {item.name_t}
                                                </Typography>
                                                <Typography>
                                                    {item.short_description_t}
                                                </Typography>
                                            </CardBody>
                                            <CardFooter className="absolute right-0 bottom-0 z-10">
                                                <Button>Read More</Button>
                                            </CardFooter>
                                        </Card>
                                    )
                                })}
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
                                {initializtionData?.Analysis.map((item, index) => {
                                    return (
                                        <Card className="h-72 w-96 relative" key={item.Id_t}>
                                            <CardBody>
                                                <Typography variant="h5" color="black" className="mb-2">
                                                    {item.name_t}
                                                </Typography>
                                                <Typography>
                                                    The place is close to Barceloneta Beach and bus stop just 2 min by
                                                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                                    night life in Barcelona.
                                                </Typography>
                                            </CardBody>
                                            <CardFooter className="absolute right-0 bottom-0 z-10">
                                                <Button>Read More</Button>
                                            </CardFooter>
                                        </Card>
                                    )
                                })}
                            </div>
                        </div>


                    </div>)
                    : (<div className='h-full w-full'>
                        <div><Button onClick={() => { setSelectedTool(null) }} variant="outlined" size="md" className='mb-2'>Return</Button></div>
                        <div className='bg-yellow-400 h-1/5 w-full flex'>
                            <div className='flex items-center gap-4 w-3/5'>
                                <img src={selectedTool.logo ? selectedTool.logo : "/logo.png"} alt='logo' width={150} height={150} />
                                <div>
                                    <Typography variant="h1" color='black'>{selectedTool.name_t}</Typography>
                                    <Typography variant="lead" color='black'>Serving at {selectedTool.category_t} phrase in the Data Lake</Typography>
                                </div>
                            </div>
                            <div className='bg-green-500 w-2/5 border-l-2 border-black'>
                                <Typography variant='h3' color='black' className='p-4'>Tags</Typography>
                                <div className='px-4'>123</div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='bg-blue-200 h-3/5'>
                            <Typography variant='h2' color='black' className='font-bold p-4'>Description:</Typography>
                            <Typography variant="paragraph" color='black' className="text-xl max-w-[1200px] mx-auto">{selectedTool.description_t}</Typography>
                        </div>
                        <div className='bg-red-200 h-1/5'>
                            <Typography variant='h2' color='black' className='p-4 '>URL:</Typography>
                        </div>
                    </div>)}
            </Card>
        </div>
    );
}

export default Tools