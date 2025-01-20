import React, { useEffect, useState } from 'react';
import { quizEndpoints } from '../../../services/APIs';
import { apiConnector } from '../../../services/apiConnector';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import * as XLSX from 'xlsx'; // Import xlsx for spreadsheet generation

const Score = ({ quiz }) => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await apiConnector("GET", `${quizEndpoints.GET_SCORES}/${quiz._id}`, null, {
                    Authorization: `Bearer ${token}`,
                });
                setScores(response?.data?.data);
            } catch (error) {
                console.log("error : ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [quiz._id, token]);

    // Function to generate and download the spreadsheet
    const generateSpreadsheet = () => {
        // Prepare data for the spreadsheet
        const data = scores.map((score, index) => ({
            Username: score?.userId?.username || 'Unknown',
            Score: score?.score || 0,
            Total_Questions: score?.answers?.length || 0,
            Percentage: ((score?.score / score.answers.length) * 100).toFixed(2) + '%',
            Date: new Date(score?.createdAt).toLocaleString(),
        }));

        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

        // Write the workbook and trigger download
        XLSX.writeFile(workbook, `QuizResults_${quiz.title}.xlsx`);
    };

    return (
        <div className='bg-slate-900 z-[2] w-full rounded-lg py-5 flex flex-col gap-1 text-xl'>
            {
                loading ? (
                    <div className='text-center'>Loading...</div>
                ) : !loading && scores.length > 0 ? (
                    <div className=' border rounded-lg border-slate-600 overflow-hidden'>
                        <h3 className='px-3 text-2xl bg-slate-600 py-2 text-center'>Results</h3>
                        <div className='flex justify-between px-5 py-3'>
                            <p className='text-blue-600'>Username</p>
                            <p className='text-blue-600'>Score</p>
                        </div>
                        {
                            [...scores].reverse().map((score, index) => (
                                <div className='flex justify-between items-center py-3 border-t border-slate-600 px-5' key={index}>
                                    <span className='flex flex-col md:flex-row gap-1 items-center'>
                                        <p className='text-sm md:text-lg'>{score?.userId?.username}</p>
                                        <p className='text-xs md:text-sm text-slate-300'>
                                            - {formatDistanceToNow(new Date(score.createdAt), { addSuffix: true })}
                                        </p>
                                    </span>
                                    <p>
                                        <span className={`${score?.score / score.answers.length >= 0.4 ? "text-green-500" : "text-red-700"}`}>
                                            {score?.score}
                                        </span> / {score.answers.length}
                                    </p>
                                </div>
                            ))
                        }
                        {/* Button to generate the spreadsheet */}
                        <div className="flex justify-center mt-4">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                onClick={generateSpreadsheet}
                            >
                                Download Results as Spreadsheet
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className='text-center'>No scores found</p>
                )
            }
        </div>
    );
};

export default Score;
