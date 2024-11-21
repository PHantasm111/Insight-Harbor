import React from 'react'

import { Typography } from "@material-tailwind/react";
import logo from '/logo.png'
import { useNavigate } from 'react-router-dom';
 
export function FooterWithLogo() {

  const navigate = useNavigate();

  return (
    <footer className="w-full bg-white py-2 px-16">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <img src={logo} alt="logo-ct" className="w-16 h-16" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About Us
            </Typography>
          </li>
          {/* <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 cursor-pointer"
            >
              Contribute
            </Typography>
          </li> */}
          <li>
            <Typography
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-800 cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>

      <hr className="my-2 border-blue-gray-50" />

      <Typography variant="small" color="black" className="text-center italic">
        &copy; 2024 Made by PH
      </Typography>
    </footer>
  );
}

export default FooterWithLogo