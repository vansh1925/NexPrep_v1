import React from 'react';
import { Link } from 'react-router-dom';

const SessionCard = ({
  sessionTitle,
  skills,
  experience,
  qnaCount,
  lastUpdated,
  description,
  profileImageUrl,
  username,
  onDelete,
  sessionId
}) => {
  return (
    <Link to={`/session/${sessionId}`} className="block bg-white rounded-xl shadow-md p-5 flex flex-col gap-4 border border-gray-200 max-w-xl w-full hover:shadow-xl hover:border-green-300 transition-all duration-300 ease-in-out cursor-pointer transform hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <img
          src={profileImageUrl}
          alt={username}
          className="w-14 h-14 rounded-full object-cover border-2 border-green-400"
        />
        <div>
          <div className="font-bold text-xl text-gray-800 leading-snug">{sessionTitle}</div>
          <div className="text-gray-600 text-sm mt-0.5">{skills}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mt-2">
        <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">Experience: {experience}</span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">{qnaCount} Q&amp;A</span>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">Last Updated: {lastUpdated}</span>
      </div>
      <div className="text-gray-700 text-base mt-1 leading-relaxed">{description}</div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-gray-500 text-xs">Preparing for {sessionTitle.toLowerCase()} roles</span>
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigating when clicking the delete button
            onDelete();
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-200 shadow-md"
        >
          Delete
        </button>
      </div>
    </Link>
  );
};

export default SessionCard; 