import React from 'react'
import { Link } from 'react-router-dom';
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
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        type: 'No'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/register', formData)
            .then(response => {
                console.log(response.data);
                alert('User registered successfully');
            })
            .catch(error => {
                console.error('There was an error!', error);
                alert('Error registering user');
            });
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
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
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! <br></br>
                        Please enter your details to register.
                    </Typography>

                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-80" method='post' onSubmit={handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <Typography variant="h6" color="blue-gray" className="-mb-3">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="name"
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                name="name"
                                value={formData.name}
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
                                <Radio name="type" label="Yes" value="Yes" checked={formData.type === 'Yes'} onChange={handleChange}/>
                                <Radio name="type" label="No" value="No" checked={formData.type === 'No'} onChange={handleChange}/>
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
                        <Button type="submit" className="mt-6" fullWidth>
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