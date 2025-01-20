import { useEffect, useState, useRef } from "react";
import React from "react";
import { apiConnector } from "../services/apiConnector";
import { useParams } from "react-router-dom";
import { questionEndpoints, quizEndpoints } from "../services/APIs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import QuizQuestions from "../components/core/attemptQuiz/QuizQuestions";

const AttemptQuiz = () => {
  const [quizDetails, setQuizDetails] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [warnings, setWarnings] = useState(0); // Track warnings
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the quiz is submitted
  const [userAnswers, setUserAnswers] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { id: quizId } = useParams();
  const quizContainerRef = useRef(null); // Reference to quiz container
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [quizStarted, setQuizStarted] = useState(false);


  
  const fetchQuizQuestions = async () => {
    setQuestionsLoading(true);
    try {
      const response = await apiConnector(
        "GET",
        `${questionEndpoints.GET_QUIZ_QUESTIONS}/${quizId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setQuizQuestions(response?.data?.data);
    } catch (error) {
      console.log("Error fetching quiz questions:", error);
    } finally {
      setQuestionsLoading(false);
    }
  };

  const fetchQuizDetails = async () => {
    try {
      setDetailsLoading(true);
      const response = await apiConnector(
        "GET",
        `${quizEndpoints.GET_QUIZ_DETAILS}/${quizId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setQuizDetails(response?.data?.data);
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const submitQuiz = async (quizId, answers) => {
    if (!quizId) {
      console.error("Quiz ID is undefined");
      alert("Error: Quiz ID is missing.");
      return;
    }
  
    try {
      const response = await apiConnector(
        "POST",
        `${quizEndpoints.ATTEMMP_QUIZ}/${quizId}/attempt`,
        {
          quizId: quizId,
          answers: answers,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
  
      if (response.data.success) {
        alert("Quiz submitted successfully!");
        navigate("/quiz-results", {
          state: { score: response.data.score, total: quizQuestions?.length },
        });
      } else {
        alert(response.data.message || "An error occurred while submitting the quiz.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };
  

  const markQuizAsCompleted = async () => {
    try {
      const response = await apiConnector(
        "POST",
        `${quizEndpoints.MARK_QUIZ_COMPLETED}/${quizId}`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(response?.data?.message || "Quiz marked as completed.");
    } catch (error) {
      console.error("Error marking quiz as completed:", error);
    }
  };

  const handleWarning = () => {
    setWarnings((prev) => prev + 1);
  };

  const enableFullscreen = () => {
    if (quizContainerRef.current.requestFullscreen) {
      quizContainerRef.current.requestFullscreen();
    }
    setQuizStarted(true);
  };

  const handleFullscreenExit = () => {
    if (!document.fullscreenElement) {
      handleWarning();
    }
    setQuizStarted(true);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      handleWarning();
    }
    setQuizStarted(true);
  };

  useEffect(() => {
    fetchQuizDetails();
    fetchQuizQuestions();
    if(warnings>0){
        setQuizStarted(true);
    }
  }, [quizId]);

  useEffect(() => {
  // Auto-submit if warnings exceed the threshold
  if (warnings >= 2 && !isSubmitted) {
    setIsSubmitted(true); // Ensure the quiz is only submitted once

    if (quizStarted) {
      // Submit with user answers if quiz was started
      submitQuiz(quizId, userAnswers);
    } else {
      // Submit with score 0 if quiz was not started
      submitQuiz(quizId, []);
    }

    // Mark the quiz as completed
    markQuizAsCompleted();
  }
}, [warnings, isSubmitted, quizId, userAnswers, quizStarted]);

  useEffect(() => {
    if (!detailsLoading && !questionsLoading && !quizDetails?.attempted) {
      enableFullscreen();
      document.addEventListener("fullscreenchange", handleFullscreenExit);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenExit);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [detailsLoading, questionsLoading, quizDetails]);

  return (
    <section
      ref={quizContainerRef}
      className="min-h-screen bg-slate-800 text-white flex items-center justify-center py-10 px-5"
    >
      {detailsLoading || questionsLoading ? (
        <h1 className="text-2xl font-bold">Loading...</h1>
      ) : quizDetails?.attempted || isSubmitted ? (
        <div className="text-center py-10">
          <h1 className="text-xl font-bold text-red-500">
            {isSubmitted
              ? "Quiz Submitted!"
              : "You have already attempted this quiz!"}
          </h1>
        </div>
      ) : (
        <div className="w-full max-w-4xl border py-3 px-5 rounded-lg bg-slate-900 border-slate-600">
          <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-slate-300">
              Warnings: {warnings}
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-2xl font-semibold">{quizDetails?.title}</h3>
              <p className="text-slate-300">Time: {quizDetails?.timer} minutes</p>
            </div>
            <p className="text-slate-400">{quizDetails?.description}</p>
          </div>
          <div className="mt-5">
            <QuizQuestions
              quizDetails={quizDetails}
              quizQuestions={quizQuestions}
              autoSubmit={isSubmitted}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default AttemptQuiz;
