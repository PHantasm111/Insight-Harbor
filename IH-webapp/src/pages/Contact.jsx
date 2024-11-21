import React, { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser';


const Contact = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        tel: "",
        message: ""
    })

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        emailjs.send(
            'service_0rcsnet',
            'template_j7asqpc',
            {
                from_name: form.name,
                to_name: "Han",
                from_email: form.email,
                to_email: "panghanfr@gmail",
                tel: form.tel,
                message: form.message
            },
            'RKBGekSCnwAfbeFfY'
        )
            .then((result) => {
                console.log(result.text);
                setForm({
                    name: "",
                    email: "",
                    tel: "",
                    message: ""
                });


            }, (error) => {
                console.log(error.text);
            });
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className='bg-gray-100' id='contact'>
            <div className='min-h-screen w-full'>
                <h1 className='text-center text-4xl font-bold py-12'>Contact Us</h1>
                <div className="flex max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
                    <div className="md:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold mb-4 italic">Have a question?</h1>
                            <p className='text-3xl font-bold text-center'>&</p>
                            <h1 className="text-3xl font-bold mb-4 text-end pr-4 italic">Find a bug? </h1>
                            <p class="text-gray-600 my-6 text-lg">
                                We're here to help! Fill out the form or reach us via email.
                                I am always available to help you.
                                Everyone gets a personalized response, so please allow 24 hours during business hours for a reply.
                            </p>
                        </div>

                        <ul class="text-gray-600 space-y-2 text-lg">
                            <li>📧 panghanfr@gmail.com</li>
                            <li>📞 +33 7 65 51 81 76</li>
                        </ul>
                    </div>

                    <div class="md:w-1/2 p-6">
                        <form id="contact-form" class="space-y-4">
                            <div class="flex space-x-4">
                                <input type="text" name="name" value={form.name} placeholder="*Name" required
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                            </div>

                            <input type="email" name="email" value={form.email} placeholder="*Email" required
                                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                            />

                            <input type="number" name="tel" value={form.tel} placeholder="Phone Number (optional)"
                                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                            />

                            <textarea name="message" value={form.message} placeholder="*Message" rows="5" required
                                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}></textarea>
                            <button class="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800" onClick={handleSubmit}>SUBMIT</button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Contact