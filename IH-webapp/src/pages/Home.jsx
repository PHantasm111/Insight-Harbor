import React from 'react';
import { useState, useEffect } from 'react';
import imgLake from '/lake.jpg';
import archiLake from "/Archi lake.svg";
import {
  Card,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  // Status of accordion
  const [openAcc1, setOpenAcc1] = React.useState(true);
  const [openAcc2, setOpenAcc2] = React.useState(true);
  const [openAcc3, setOpenAcc3] = React.useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  const handleOpenAcc2 = () => setOpenAcc2((cur) => !cur);
  const handleOpenAcc3 = () => setOpenAcc3((cur) => !cur);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set the text to be visible after the component mounts
    setTimeout(() => {
      setVisible(true);
    }, 100); // Optional delay before starting the transition
  }, []);

  // Navigate to questions page
  const navigate = useNavigate();

  const goToQuestions = () => {
    navigate("/questions");
  }

  return (
    <div className='bg-gray-100'>
      <div className='relative min-h-screen'>
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transitionDuration: '2000ms' // 2 seconds
          }}
        >

          <img
            className="h-screen w-full object-cover object-center"
            src={imgLake}
            alt="nature image"
          />
          <Card className="absolute bg-white/40 w-3/5 h-48">
            <Typography variant="h1" color="blue-gray" className="px-10 pt-5">
              Insight Harbor
            </Typography>
            <Typography variant="h3" color="blue-gray" className="px-20">
              Build your Data Lake and simplify data management.
            </Typography>

            <div className="flex flex-row-reverse pr-10">
              <button
                className="flex items-center gap-2 mt-3 px-6 py-3 font-sans text-lg font-bold text-center text-blue-700 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-700/20 hover:text-blue-900"
                type="button" onClick={goToQuestions}>
                Check it
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
                  className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                </svg>
              </button>
            </div>
          </Card>
        </div>
      </div>


      <div className="relative min-h-screen mx-3">
        <Card className="bg-white mx-auto absoulte insert-x-0 -top-10">
          <Typography variant="h1" color="blue-gray" className="text-center py-10">
            What is Data Lake ?
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="px-10 text-lg pb-10">
            A data lake is a repository for storing large amounts of structured, semi-structured, and unstructured data.
            Unlike traditional data warehouses, data lakes can store raw data without preprocessing, transforming, or defining structures for it.
            This flexibility allows data lakes to be used for a variety of different data analysis, machine learning, and big data processing tasks.
          </Typography>

          <hr></hr>

          <Typography variant="h2" color="blue-gray" className="text-center pt-10">
            Data Lake functional architecture
          </Typography>

          <div className="flex items-center justify-center">
            <img 
            className="h-auto w-4/5"
            src={archiLake}
            />
          </div>
        </Card>
      </div>

      <div className="mx-10">
        <Accordion open={openAcc1}>
          <AccordionHeader onClick={handleOpenAcc1}><span className="text-3xl">What is Insight Harbor?</span></AccordionHeader>
          <AccordionBody>
            <Typography variant="paragraph">
              Welcome to Insight Harbor, your premier destination for all things related to data lakes! <br />
              Whether you're just beginning your journey or looking to enhance your existing data lake setup,
              our platform is designed to guide you through every step of the process.
            </Typography>

          </AccordionBody>
        </Accordion>
        <Accordion open={openAcc2}>
          <AccordionHeader onClick={handleOpenAcc2}><span className="text-3xl">What can I do with Insight Harbor?</span></AccordionHeader>
          <AccordionBody>
            <Typography variant="paragraph">
              <span className="text-lg">Our Core Features: </span><br />
              1. <span className="font-bold">Personalized Guidance:</span> &nbsp;&nbsp;Unsure which tools to use for building your data lake? <br /> By answering a series of targeted questions on our platform, you'll receive tailored recommendations to help you choose the best tools for your specific needs. <br />
              2. <span className="font-bold">Comprehensive Tool Manual:</span> &nbsp;&nbsp;Insight Harbor serves as an extensive manual for data lake tools. <br /> Dive into our vast library of resources, where you can search and discover a wide array of tools suitable for your data lake ecosystem. Each tool is accompanied by detailed descriptions, features, and usage guidelines to ensure you make well-informed decisions. <br />
              3. <span className="font-bold">Search and Discovery:</span> Our &nbsp;&nbsp;intuitive search function makes it easy to find the tools and resources you need. <br /> Whether you're looking for data ingestion tools, storage solutions, processing frameworks, or analytics platforms, our comprehensive database has got you covered.
            </Typography>

          </AccordionBody>
        </Accordion>
        <Accordion open={openAcc3}>
          <AccordionHeader onClick={handleOpenAcc3}>
          <span className="text-3xl">How to use Insight Harbor?</span>
          </AccordionHeader>
          <AccordionBody>
            <Typography>
              Just <a href="/register" className="underline font-bold">Sign up</a> !
            </Typography>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  )
}

export default Home