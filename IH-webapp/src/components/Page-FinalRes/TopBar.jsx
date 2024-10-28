import {
    Alert,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios"
// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import _, { set } from "lodash"
import { useNavigate } from "react-router-dom";

const TopBar = ({ totalQ, timer, dataToSave, fromH }) => {

    const [alert, setAlert] = useState(false)
    const [msg, setMsg] = useState("Data saved !")

    const [isEditing, setIsEditing] = useState(false);  // Track if editing mode
    const [title, setTitle] = useState("Data Lake");    // Store the title value

    const navigate = useNavigate();

    const handleSaveFinalReport = _.throttle(async () => {

        // Add title to dataToSave object
        const updatedDataToSave = {
            ...dataToSave,  // Keep the existing data
            title           // Add title to the data
        };

        // API transfer the data to backend
        await axios.post(`http://localhost:3000/history/save`,
            updatedDataToSave,
            { withCredentials: true }
        )
            .then(response => {
                setMsg(response.data);
            })
            .catch(error => {
                console.error('Error saving final result:', error);
            });

        setAlert(true)
    }, 6000)

    const handleReturnToHistory = () => {
        navigate("/history")
    }

    // Automatic Timer to close alert
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert]);

    // Handle when clicking outside the input field
    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div className='flex items-center gap-2 h-full w-full'>
            <div className='flex items-center justify-between h-full w-[85%]'>
                {/* Conditionally render input or title */}
                <div className='ml-16'>
                    {isEditing ? (
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // Update title state with input value
                            onBlur={handleBlur} // When focus is lost, save and switch back to text
                            autoFocus
                            placeholder="Data Lake"
                            className="border-1 border-gray-300 p-2 rounded-md text-4xl font-bold w-64"
                        />
                    ) : (
                        <div className="flex items-center">
                            <Typography
                                variant='h1'
                                color='black'
                                onClick={() => setIsEditing(true)} // Enable editing mode when clicked
                            >
                                {title}
                            </Typography>
                            {/* Edit Icon */}
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="ml-2 text-gray-500 cursor-pointer"
                                onClick={() => setIsEditing(true)} // Clicking the edit icon also triggers editing
                            />
                        </div>
                    )}
                </div>


                <div className='flex gap-8 mr-8'>
                    <div className='flex flex-col gap-2 items-center justify-center  p-4'>
                        <div><Typography variant='h4'>Total Questions Answered</Typography></div>
                        <div><Typography variant='h4'>{totalQ}</Typography></div>
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center p-4'>
                        <div><Typography variant='h4'>Total Time Spent</Typography></div>
                        <div><Typography variant='h4'>{Math.floor(timer / 60)} min {timer % 60} sec</Typography></div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-[15%]'>
                <form className='p-8'>
                    { !fromH ? (<Button size="lg" className="h-18 text-lg uppercase" onClick={() => { handleSaveFinalReport() }}>Save final report</Button>)
                        : (<Button size="lg" className="h-18 text-lg uppercase" onClick={() => { handleReturnToHistory() }}>Return to history</Button>)
                    }
                </form>
                {alert && (
                    <div className='absolute top-16 right-16 z-50'>
                        <Alert onClose={() => setAlert(false)} variant="ghost" className='w-96 bg-gray-400/30'
                            animate={{
                                mount: { y: 0 },
                                unmount: { y: 100 },
                            }} >
                            <span className="text-lg text-red-500">{msg}</span>
                        </Alert>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopBar