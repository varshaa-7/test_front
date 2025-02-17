import { useEffect, useState } from "react";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const QuizCard = ({ quiz }) => {
  const [attempted, setAttempted] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setAttempted(user?.attemptedQuizzes?.includes(quiz._id) || false);
  }, [user, quiz._id]);

  return (
    <Link
      to={`/quiz/${quiz._id}`}
      className="border border-slate-700 bg-slate-900 p-5 rounded-lg relative overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Badge for Completed Status */}
      {attempted && (
        <span className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 text-xs font-semibold rounded-full">
          Completed
        </span>
      )}

      {/* Title */}
      <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-2 mb-3 line-clamp-2">
        {quiz.title}
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{quiz.description}</p>

      {/* Creator & Time Info */}
      <div className="flex items-center text-gray-400 text-xs gap-2">
        <p className="font-medium">{quiz.createdBy.username}</p>
        <span className="text-gray-600">|</span>
        <p>{formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}</p>
      </div>
    </Link>
  );
};

export default QuizCard;
