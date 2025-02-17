import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import Button from '../components/Button';
import { FaHome } from 'react-icons/fa';

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  return (
    <section className="py-5 px-3 md:p-10 min-h-[calc(100vh-10rem)] bg-slate-900 border-slate-600 border rounded-lg flex flex-col gap-y-5 items-start justify-start animate-fade-in">
      <h1 className="text-2xl md:text-4xl text-white font-semibold animate-slide-down">
        Profile
      </h1>

      <div className="w-full bg-slate-800 py-5 px-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-base md:text-xl rounded-lg shadow-md transition-all duration-500 hover:shadow-lg">
        <h2>
          Username:{' '}
          <span className="font-thin text-gray-300">{user.username}</span>
        </h2>
        <p>
          Email: <span className="font-thin text-gray-300">{user.email}</span>
        </p>
        <p>
          Joined:{' '}
          <span className="font-thin text-gray-300">
            {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
          </span>
        </p>
        <p>
          Role: <span className="font-thin text-gray-300">{user.role}</span>
        </p>
      </div>

      <div className="w-full min-h-[50vh] grid place-content-center animate-fade-in">
        <Button
          onClick={() => navigate('/')}
          className="w-auto flex gap-2 items-center py-1.5 px-3 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md shadow-md hover:shadow-lg scale-100 hover:scale-105 text-sm"
        >
          <FaHome className="text-white" size={14} /> Home
        </Button>
      </div>
    </section>
  );
};

export default Profile;
