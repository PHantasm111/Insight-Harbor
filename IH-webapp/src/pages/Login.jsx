import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/authContext"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

const Login = () => {

  const [visible, setVisible] = useState(false);

  // Scroll to top on mount when we come to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Set the text to be visible after the component mounts
    setTimeout(() => {
      setVisible(true);
    }, 50); // Optional delay before starting the transition
  }, []);

  // Navigate to sign in page
  const navigate = useNavigate();

  // Recognize current user
  const { login } = useContext(AuthContext);

  // Save err
  const [err, setError] = useState(null);

  // Save data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  // When input changed, we save the data 
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Where to submit (use axios)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData)
      // if sucess -> To page login
      navigate("/");

    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data || 'An unexpected error occurred');
    }

  };


  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 bg-custom-bg bg-cover ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        transitionDuration: '1000ms' // 1 seconds
      }}
    >
      <Card className="w-1/4 bg-white">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-28 place-items-center bg-black"
        >
          <Typography variant="h3" color="white">
            Welcome aboard !
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" name='email' onChange={handleChange} />
          <Input label="Password" type="Password" size="lg" name='password' onChange={handleChange} />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          {/* if there is an err -> show message */}
          {err &&
            <Typography
              variant="small"
              color="red">
              {err}
            </Typography>
          }
          <Button variant="outlined" fullWidth onClick={handleSubmit} className="text-lg hover:bg-light-blue-400 hover:bg-opacity-30 hover:text-blue-800" >
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account? <span className='font-bold pl-1 underline text-light-blue-600'><Link to="/register">Sign up</Link></span>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login