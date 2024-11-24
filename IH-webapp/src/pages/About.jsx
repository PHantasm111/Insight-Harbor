import React, { useEffect } from 'react'

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='bg-gray-100' id='about'>
            <div className='min-h-screen w-full flex flex-col justify-center items-center'>
                <h1 className='text-6xl font-bold mt-6 text-gray-700/80 italic'>About us:</h1>
                <div className='flex justify-center'>
                    <div class="flex flex-col bg-white shadow-sm border mt-6 border-slate-200 rounded-lg w-96 h-full">

                        <div class="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                            <img class="w-full h-full object-cover" src="ph.webp" alt="profile-picture" />
                        </div>

                        <div class="px-6 text-center">
                            <h4 class="mb-1 text-2xl font-bold text-black">
                                Han Pang
                            </h4>
                            <p class="text-md font-serif text-gray-600/90 uppercase">
                                Full-stack Developer
                            </p>
                            <p class="text-base text-black mt-4 font-body text-justify">

                            </p>
                        </div>

                        <div class="flex justify-center p-6 pt-2 gap-7">
                            <a
                                href="https://www.panghan.site"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg group"
                            >
                                <span class="group-hover:hidden">Go to my site</span>
                                <span class="hidden group-hover:inline">www.panghan.site 👉</span>
                            </a>
                        </div>

                    </div>
                </div>

                <div className='flex justify-center gap-6'>
                    <div class="flex flex-col bg-white shadow-sm border my-6 border-slate-200 rounded-lg w-96 h-full">

                        <div class="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                            <img class="w-full h-full object-contain" src="franck_ravat.jpg" alt="profile" />
                        </div>

                        <div class="px-6 text-center">
                            <h4 class="mb-1 text-xl font-semibold text-slate-800">
                                Franck Ravat
                            </h4>
                            <p class="text-md font-serif text-gray-600/90 uppercase">
                                Professor
                            </p>
                            <p class="text-base text-slate-600 mt-4 font-light ">
                            </p>
                        </div>

                        <div class="flex justify-center p-6 pt-2 gap-7">
                            <a
                                href="https://www.linkedin.com/in/ravat/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg group"
                            >
                                <span class="group-hover:hidden">Go LinkedIn</span>
                                <span class="hidden group-hover:inline">https://www.linkedin.com/in/ravat/</span>
                            </a>
                        </div>

                    </div>
                    <div class="flex flex-col bg-white shadow-sm border my-6 border-slate-200 rounded-lg w-96 h-full">

                        <div class="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
                            <img class="w-full h-full object-contain" src="nathalie_valles.jpg" alt="profile-picture" />
                        </div>

                        <div class="px-6 text-center">
                            <h4 class="mb-1 text-xl font-semibold text-slate-800">
                                Nathalie Vallès-Parlangeau
                            </h4>
                            <p class="text-md font-serif text-gray-600/90 uppercase">
                                Professor
                            </p>
                            <p class="text-base text-slate-600 mt-4 font-light ">
                            </p>
                        </div>

                        <div class="flex justify-center p-6 pt-2 gap-7">
                            <a
                                href="https://www.linkedin.com/in/nathalievalles/"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="w-full rounded-md bg-black py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg group"
                            >
                                <span class="group-hover:hidden">Go LinkedIn</span>
                                <span class="hidden group-hover:inline">https://www.linkedin.com/in/nathalievalles/</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default About