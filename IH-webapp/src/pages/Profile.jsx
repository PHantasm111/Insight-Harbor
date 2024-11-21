import { Card } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Profile = () => {

  const [nameInput, setNameInput] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [identityInput, setIdentityInput] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const [updateData, setUpdateData] = useState();

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user'))

  const [userData, setUserData] = useState({
    name_U: currentUser.name_U,
    email_U: currentUser.email_U,
    identity_U: currentUser.identity_U,
    registrationTime: currentUser.registration_time
  });

  const [selectedValue, setselectedValue] = useState(currentUser.identity_U);
  // Calculate the number of days of registration users
  const now = moment();
  const dayDiff = now.diff(moment(userData.registrationTime), 'days');

  // Get userId
  const userId = currentUser.UserID;

  // Get user statistic data
  const getUserStatisticData = async () => {
    try {
      const result = await axios.get(`${apiUrl}/user/statistics/${userId}`);
      console.log("profile data", result.data);
      setUserData((prev) => ({
        ...prev,
        totalBuilds: result.data.totalBuilds,
        validBuilds: result.data.validBuilds
      }))

    } catch (error) {
      console.error(error);
    }
  }

  // Update user data
  const updateUserData = async () => {
    try {
      const result = await axios.patch(`${apiUrl}/user/${userId}`, updateData);
      console.log(result.data);

      if (result.data.message === "success") {
        const key = Object.keys(updateData)[0];
        let value = Object.values(updateData)[0];

        if (key === "Pwd_U") {
          value = result.data[key];
        } else {
          setUserData((prev) => ({
            ...prev,
            [key]: value
          }));
        }

        setUpdateData({});
        localStorage.setItem('user', JSON.stringify({ ...currentUser, [key]: value }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // get the ussr statistics data
  useEffect(() => {

    getUserStatisticData();

  }, []);

  // Update user data
  useEffect(() => {
    if (updateData) {
      console.log("data to update", updateData);
      updateUserData();
    }
  }, [updateData]);


  return (
    <div className="bg-gray-200 w-full min-h-screen flex justify-center">
      <Card className='md:w-5/6 lg:w-1/2 h-full mx-2 sm:mx-4 md:mx-8 lg:mx-32 my-4 lg:my-16 rounded-lg'>
        <div className='relative'>
          <div className='m-8 border-1 border-gray-800 rounded-lg'>
            <img src="/lake.jpg" alt="lake" className='w-full h-full object-cover rounded-lg' />
          </div>

          <div className='absolute z-10 bottom-2 lg:bottom-0 left-1/2 -translate-x-1/2 bg-white/70 rounded-full'>
            <img src='/boat.svg' alt='profile' className='w-16 h-16 lg:w-24 lg:h-24 object-cover rounded-full' />
          </div>
        </div>

        <div className='flex flex-col gap-1 items-center mt-2'>
          <p className='text-4xl font-bold text-black'>{userData.name_U}</p>
          <p className='text-2xl text-gray-500/90'>{userData.identity_U === "Pro" ? "Professional Member" : "Member"}</p>
        </div>

        {/* Statistics block */}
        <div className='flex gap-4 justify-between mx-8 my-4'>
          {/* first block */}
          <div className='bg-white rounded-md h-36 w-full 
                border-2 border-opacity-35 border-slate-300
                shadow-md transition-shadow hover:shadow-lg
                flex flex-col justify-between items-center'>
            <p className='text-lg lg:text-2xl text-gray-800/90'>Joined</p>
            <p className='text-4xl font-bold text-black'>{dayDiff}</p>

            <p className='text-lg lg:text-2xl text-gray-800/90'>Days</p>
          </div>

          {/* second block */}
          <div className='bg-white rounded-md h-36 w-full 
                border-2 border-opacity-35 border-slate-300
                shadow-md transition-shadow hover:shadow-lg
                flex flex-col justify-between items-center'>
            <p className='text-lg lg:text-2xl text-gray-800/90'>Created</p>
            <p className='text-4xl font-bold text-black'>{userData.totalBuilds ? userData.totalBuilds : 0}</p>

            <p className='text-lg lg:text-2xl text-gray-800/90'>Architectures</p>
          </div>

          {/* third block */}
          <div className='bg-white rounded-md h-36 w-full 
                border-2 border-opacity-35 border-slate-300
                shadow-md transition-shadow hover:shadow-lg
                flex flex-col justify-between items-center'>
            <p className='text-lg lg:text-2xl text-gray-800/90'>Valide</p>
            <p className='text-4xl font-bold text-black'>{userData.validBuilds ? userData.validBuilds : 0}</p>

            <p className='text-lg lg:text-2xl text-gray-800/90'>Results</p>
          </div>
        </div>

        <div className='mx-8 my-2 flex flex-col gap-3'>
          {/* Name block */}
          <div>
            <p className='text-2xl font-semibold text-black'>Name:</p>
            <div>
              {nameInput
                ? (
                  <div class="relative w-1/3">
                    <input type="text" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userData.username} />
                    <button
                      className="absolute right-1 top-1 rounded bg-black py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={(e) => {
                        setUpdateData({ name_U: e.target.previousSibling.value });
                        setNameInput(false)
                      }}
                    >
                      Save
                    </button>
                  </div>
                )
                : (
                  <div className='flex items-center gap-8'>
                    <p className='text-lg text-gray-500/90'>{userData.name_U}</p>
                    <button
                      className="flex items-center rounded-md 
                                  border border-slate-300 py-1 px-2 text-center 
                                  text-sm transition-all shadow-sm hover:shadow-lg 
                                text-black hover:text-white hover:bg-blue-gray-100 active:bg-blue-gray-400
                                  hover:border-slate-800"
                      type="button"
                      onClick={() => setNameInput(true)}
                    >
                      Modify
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Email block */}
          <div>
            <p className='text-2xl font-semibold text-black'>Email:</p>
            <div>
              {emailInput
                ? (
                  <div class="relative w-1/3">
                    <input type="email" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userData.username} />
                    <button
                      className="absolute right-1 top-1 rounded bg-black py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={(e) => {
                        setUpdateData({ email_U: e.target.previousSibling.value });
                        setEmailInput(false)
                      }}
                    >
                      Save
                    </button>
                  </div>
                )
                : (
                  <div className='flex items-center gap-8'>
                    <p className='text-lg text-gray-500/90'>{userData.email_U}</p>
                    <button
                      className="flex items-center rounded-md 
                        border border-slate-300 py-1 px-2 text-center 
                        text-sm transition-all shadow-sm hover:shadow-lg 
                      text-black hover:text-white hover:bg-blue-gray-100 active:bg-blue-gray-400
                        hover:border-slate-800"
                      type="button"
                      onClick={() => setEmailInput(true)}
                    >
                      Modify
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Password block */}
          <div>
            <p className='text-2xl font-semibold text-black'>Password</p>
            <div>
              {passwordInput
                ? (
                  <div class="relative w-1/3">
                    <input type="password" class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={userData.username} />
                    <button
                      className="absolute right-1 top-1 rounded bg-black py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={(e) => {
                        setUpdateData({ Pwd_U: e.target.previousSibling.value });
                        setPasswordInput(false)
                      }}
                    >
                      Save
                    </button>
                  </div>
                )
                : (
                  <div className='flex items-center gap-8'>
                    <p className='text-lg text-gray-500/90'>************</p>
                    <button
                      className="flex items-center rounded-md 
                        border border-slate-300 py-1 px-2 text-center 
                        text-sm transition-all shadow-sm hover:shadow-lg 
                      text-black hover:text-white hover:bg-blue-gray-100 active:bg-blue-gray-400
                        hover:border-slate-800"
                      type="button"
                      onClick={() => setPasswordInput(true)}
                    >
                      Modify
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Identity block */}
          <div>
            <p className='text-2xl font-semibold text-black'>Identity</p>
            <div>
              {identityInput
                ? (
                  <div class="relative w-1/3">
                    <select
                      className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                      value={selectedValue}
                      onChange={(e) => setselectedValue(e.target.value)}
                    >
                      <option value="Pro">Professional Member</option>
                      <option value="No">Member</option>
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-16 text-slate-700">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                    </svg>
                    <button
                      className="absolute right-1 top-1 rounded bg-black py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={() => {
                        setUpdateData({ identity_U: selectedValue });
                        setIdentityInput(false)
                      }}
                    >
                      Save
                    </button>
                  </div>
                )
                : (
                  <div className='flex items-center gap-8'>
                    <p className='text-lg text-gray-500/90'>{userData.identity_U === "Pro" ? "Professional Member" : "Member"}</p>
                    <button
                      className="flex items-center rounded-md 
                        border border-slate-300 py-1 px-2 text-center 
                        text-sm transition-all shadow-sm hover:shadow-lg 
                      text-black hover:text-white hover:bg-blue-gray-100 active:bg-blue-gray-400
                        hover:border-slate-800"
                      type="button"
                      onClick={() => setIdentityInput(true)}
                    >
                      Modify
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className='mx-8 my-4 flex self-end'>
          <button
            className="flex items-center rounded-md 
                  border border-slate-300 py-2 px-4 text-center 
                  text-3xl transition-all shadow-sm hover:shadow-lg 
                text-black hover:text-white hover:bg-blue-gray-100 active:bg-blue-gray-400
                  hover:border-slate-800"
            type="button"
            onClick={() => {
              navigate("/")
              window.scrollTo(0, 0);
            }}
          >
            Homepage

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1.5">
              <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </Card >
    </div >
  )
}

export default Profile