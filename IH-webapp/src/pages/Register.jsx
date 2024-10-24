import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Radio,
    CardHeader,
} from "@material-tailwind/react";
import { useState } from 'react';
import axios from 'axios';

const Register = () => {

    // Navigate to sign in page
    const navigate = useNavigate();

    // Save err
    const [err, setError] = useState(null);

    // Save data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        identity: ''
    });

    // When input changed, we save the data 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Email validation regex
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Password validation (8 characters, 1 uppercase, 1 lowercase, 1 number)
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    // Check if form is valid and set error messages
    const validateForm = () => {
        if (!formData.username) {
            return "Username is required.";
        }

        if (!isValidEmail(formData.email)) {
            return "Please enter a valid email address.";
        }

        if (!isValidPassword(formData.password)) {
            return "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, and one number.";
        }

        if (!formData.identity) {
            return "Please select whether you are a data lake practitioner.";
        }

        return null;
    };


    // Where to submit (use axios)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form and set error if any
        const errorMessage = validateForm();
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        try {
            // Transfer data to api
            await axios.post('http://localhost:3000/auth/register', formData, {
                withCredentials: true,
            })
            // if sucess -> To page login
            navigate("/login");
        } catch (err) {
            setError(err.response.data)
        }
    };



    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100 bg-custom-bg bg-cover'>
            <Card color="white" shadow={true} className="h-auto w-96 my-16">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign Up
                    </Typography>
                </CardHeader>

                <div className="flex flex-col items-center justify-center">
                    <Typography color="gray" className="mt-1 font-medium text-xl">
                        Nice to meet you! <br></br>
                        Please enter your details to register.
                    </Typography>

                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-80" method='post' onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6 w-full">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name@mail.com"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                placeholder="********"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Are you a data lake practitioner?
                            </Typography>
                            <div className="flex gap-20 pl-20">
                                <Radio name="identity" label="Yes" value="Pro" checked={formData.identity === 'Pro'} onChange={handleChange} />
                                <Radio name="identity" label="No" value="No" checked={formData.identity === 'No'} onChange={handleChange} />
                            </div>
                        </div>
                        <Checkbox required
                            label={
                                <Typography
                                    variant="small"
                                    color="gray"
                                    className="flex items-center font-normal"
                                >
                                    I agree the
                                    <a
                                        href="#"
                                        className="font-medium transition-colors hover:text-gray-900"
                                    >
                                        &nbsp;Terms and Condition *
                                    </a>
                                </Typography>
                            }
                            containerProps={{ className: "-ml-2.5" }}
                        />

                        {/* if there is an err -> show message */}
                        {err && <Typography
                            variant="small"
                            color="red"
                        >
                            {err}
                        </Typography>}

                        <Button type="submit" className="mt-4" fullWidth>
                            sign up
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-gray-900 hover:text-blue-600">
                                <strong>Sign In</strong>
                            </Link>
                        </Typography>
                    </form>
                </div>
            </Card>
        </div>
    )
}

export default Register