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
const apiUrl = import.meta.env.VITE_API_URL;

const Tools = () => {

    const [initializtionData, SetInitializtionData] = useState();
    const [selectedTool, setSelectedTool] = useState(null);
    const scrollContainerRefs = useRef([]);

    useEffect(() => {
        // Scroll functionality for multiple divs
        scrollContainerRefs.current.forEach((scrollContainer) => {
            if (scrollContainer) {
                const onWheel = (event) => {
                    event.preventDefault();
                    scrollContainer.scrollLeft += event.deltaY;
                };
                scrollContainer.addEventListener('wheel', onWheel);

                // Clean up the event listener on unmount
                return () => scrollContainer.removeEventListener('wheel', onWheel);
            }
        });
    }, []);

    // Initialize this page 
    useEffect(() => {

        const initializtion = async () => {
            const res = await axios.get(`${apiUrl}/tool/initializtion`);

            SetInitializtionData(res.data)
        }

        initializtion();
    }, [])

    useEffect(() => {
        //console.log(initializtionData)
    }, [initializtionData])

    // Change Content
    const toolContentHandler = async (idt) => {
        const response = await axios.get(`${apiUrl}/tool/${idt}`)

        setSelectedTool(response.data[0])
    }

    // Return the page
    return (
        <div className="flex bg-gray-100 pt-6 px-2 w-full min-h-screen">
            <div className='w-1/6 max-h-screen overflow-auto scrollbar-hide rounded-2xl shadow-md'>
                <ToolsSideBar setSelectedTool={setSelectedTool} toolContentHandler={toolContentHandler} />
            </div>

            <Card className="min-h-screen w-5/6 p-4 border-1 mx-2 mb-2">
                {!selectedTool
                    ? (<div className=''>
                        <Typography variant='h1' color='black' className=' mb-4'>
                            DATA LAKE TOOLS
                        </Typography>
                        {/* Ingestion tools */}
                        <div className=''>
                            <Typography variant='h2' color='black' className='text-xl my-4'>
                                Ingestion tools
                            </Typography>
                        </div>
                        <div className='overflow-scroll scrollbar-hide' ref={(el) => (scrollContainerRefs.current[0] = el)}>
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
                            <Typography variant='h2' color='black' className='text-xl my-4'>
                                Preparation tools
                            </Typography>
                        </div>
                        <div className='overflow-scroll scrollbar-hide' ref={(el) => (scrollContainerRefs.current[1] = el)}>
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
                        {/* Analysis tools */}
                        <div className=''>
                            <Typography variant='h2' color='black' className='text-xl my-4'>
                                Analysis tools
                            </Typography>
                        </div>
                        <div className='overflow-scroll scrollbar-hide' ref={(el) => (scrollContainerRefs.current[2] = el)}>
                            <div className='flex gap-4 w-max my-4'>
                                {initializtionData?.Analysis.map((item, index) => {
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


                    </div>)
                    : (<div className='h-full w-full'>
                        <div><Button onClick={() => { setSelectedTool(null) }} variant="outlined" size="md" className='mb-2'>Return</Button></div>
                        <div className='min-h-1/5 w-full flex'>
                            <div className='flex items-center gap-4 w-3/5'>
                                <img src={selectedTool.logo ? selectedTool.logo : "/logo.png"} alt='logo' width={100} height={150} />
                                <div>
                                    <Typography variant="h1" color='black'>{selectedTool.name_t}</Typography>
                                    <Typography variant="lead" color='black'>Serving at {selectedTool.category_t} phrase in the Data Lake</Typography>
                                </div>
                            </div>
                            <div className='w-2/5'>
                                <Typography variant='h4' color='black' className='px-4 pt-4'>Tool Features</Typography>
                                <div className='p-4 flex gap-2 flex-wrap'>
                                    {selectedTool.category_t && <span className='bg-light-blue-200/30 text-mg font-serif rounded-md p-2 italic'>{selectedTool.category_t}</span>}
                                    {selectedTool.procs_mode && <span className='bg-light-green-200/30 text-mg font-serif rounded-md p-2 italic'>{selectedTool.procs_mode === 'B/S' ? "Batch & Streaming" : selectedTool.procs_mode === 'B' ? "Batch" : "Streaming"}</span>}
                                    {selectedTool.dplymt_mode_t && <span className='bg-yellow-900/20 text-mg font-serif rounded-md p-2 italic'>{selectedTool.dplymt_mode_t === 'On-p' ? "On-premises" : "On cloud"}</span>}
                                    {selectedTool.isPay !== null && selectedTool.isPay !== undefined && <span className='bg-red-400/30 text-mg font-serif rounded-md p-2 italic'>{selectedTool.isPay === 1 ? "Commercial tool" : "Open source"}</span>}
                                    {selectedTool.complex_data_processing === 1 && <span className='bg-cyan-700/20 text-mg font-serif rounded-md p-2 italic'>{"Complex processing"}</span>}
                                    {selectedTool.event_driven === 1 && <span className='bg-deep-purple-600/20 text-mg font-serif rounded-md p-2 italic'>{"Event driven"}</span>}
                                </div>
                            </div>
                        </div>
                        <hr className="border-t-2 border-gray-400 w-full m-auto my-4" />
                        <div className='min-h-3/5'>
                            <Typography variant='h2' color='black' className='font-bold p-4'>Description:</Typography>
                            <Typography
                                variant="paragraph"
                                color='black'
                                className="text-xl max-w-[1200px] mx-auto pb-4 text-justify"
                                dangerouslySetInnerHTML={{ __html: selectedTool.description_t }}>
                            </Typography>
                        </div>
                        <hr className="border-t-2 border-gray-400 w-full m-auto my-4" />
                        <div className='min-h-1/5'>
                            <Typography variant='h2' color='black' className='p-4'>Official Website</Typography>
                            <Typography
                                as="a"
                                href={selectedTool.url}
                                target="_blank"
                                variant="paragraph"
                                color='black'
                                className='p-4 text-2xl underline hover:text-blue-400/50'>
                                {selectedTool.url ? selectedTool.url : "no info for now!"}
                            </Typography>
                        </div>
                    </div>)}
            </Card>
        </div>
    );
}

export default Tools