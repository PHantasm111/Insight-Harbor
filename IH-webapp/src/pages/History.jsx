import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  Typography,
} from '@material-tailwind/react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import _, { set } from "lodash"
import { useNavigate } from 'react-router-dom';

const History = () => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const TABLE_HEAD = ["ID", "Name", "Zones", "Created at", "Status", "Operation"];

  const formatDate = (dateString) => {
    const date = moment(dateString);

    if (moment().diff(date, 'days') > 7) {
      return date.format('MMMM D, YYYY');
    }
    return date.fromNow();
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/history/${id}`, {
        withCredentials: true,
      });

      setHistory((prevHistory) => prevHistory.filter((item) => item.Id_R !== id));
      console.log(res.data.message)
    } catch (err) {
      console.error("Error deleting history:", err);
    }
  };

  const handleRestore = async (id) => {

    const res = await axios.get(`http://localhost:3000/history/record/${id}`)

    const dataToPass = res.data;

    console.log("datatopass",dataToPass);
    
    navigate('/finalres',{ state: { dataToPass } })

    console.log(`Restore action triggered for ID: ${id}`);

  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userId = currentUser.UserID;
        const response = await axios.get(`http://localhost:3000/history/${userId}`, {
          withCredentials: true,
        });

        setHistory(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Failed to load history.');
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentUser]);

  useEffect(() => {
    if (history.length > 0) {
      console.log("Fetched history:", history);
    }
  }, [history]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="flex items-center justify-center bg-gray-100 py-4 w-full">
      <Card className="min-h-screen w-3/5 p-4 border-1 mx-2 mb-2">
        <div className='flex justify-center'>
          <Typography variant="h2" color="black" className="mb-4">
            User History
          </Typography>
        </div>

        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history && history.length > 0 ? (
              history.map((h, index) => {

                const isLast = index === history.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={h.Date_created}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {h.Id_R}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {h.name_dl}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {h.total_zones}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatDate(h.Date_created)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {h.Status.toUpperCase()}
                      </Typography>
                    </td>
                    <td className={classes}>

                      <button onClick={() => handleRestore(h.Id_R)} className="ml-2 mr-4">
                        <FontAwesomeIcon icon={faUndo} className="text-blue-500" />
                      </button>

                      <button onClick={() => handleDelete(h.Id_R)}>
                        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    No available result
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default History;
