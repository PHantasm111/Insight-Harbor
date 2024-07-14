import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
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

  // Scroll to top on mount when we come to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Navigate to sign in page
  const navigate = useNavigate();

  // Save err
  const [err, setError] = useState(null);

  // Save data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  // When input changed, we save the data 
  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name] : e.target.value }));
  };

  // Where to submit (use axios)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Transfer data to api
      const response = await axios.post('http://localhost:3000/auth/login', formData, {
        withCredentials: true,
      });
      // if sucess -> To page login
      console.log('Login successful:', response);
      navigate("/");
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data || 'An unexpected error occurred');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" name='email' onChange={handleChange}/>
          <Input label="Password" size="lg" name='password' onChange={handleChange} />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          {/* if there is an err -> show message */}
          {err && <Typography
            variant="small"
            color="red"
          >
            {err}
          </Typography>}
          <Button variant="gradient" fullWidth onClick={handleSubmit}>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to="/register">Sign up</Link>
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login