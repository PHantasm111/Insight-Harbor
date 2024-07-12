import React from 'react'
import { useState, useEffect } from 'react';
import imgLake from '/lake.jpg'
import { Card, Typography } from '@material-tailwind/react';

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Set the text to be visible after the component mounts
    setTimeout(() => {
      setVisible(true);
    }, 100); // Optional delay before starting the transition
  }, []);

  return (
    <div className='relative min-h-screen bg-gray-100'>
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
        <Card className="absolute bg-white/40 w-2/3 h-1/4">
          <Typography variant="h1" color="blue-gray" className="px-20">
            Insight Harbor
          </Typography>
          <Typography variant="h3" color="blue-gray" className="pl-20">
            Build your Data Lake and simplify data management.
          </Typography>
          
          <div class="flex flex-row-reverse pr-10">
            <button
            class="flex items-center gap-2 mt-3 px-6 py-3 font-sans text-lg font-bold text-center text-blue-700 uppercase align-middle transition-all rounded-lg select-none hover:bg-blue-700/20 hover:text-blue-900"
            type="button">
              Check it
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
              </svg>
            </button> 
          </div>

          
        </Card>

      </div>
    </div>
  )
}

export default Home