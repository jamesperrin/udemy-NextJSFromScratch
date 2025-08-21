'use client';
import { useState, useEffect } from 'react';
import { FaBookmark } from 'react-icons/fa';

const BookmarkButton = ({ property }) => {
  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
        <FaBookmark className="mr-2" /> Remove Bookmark
      </button>
    </>
  );
};

export default BookmarkButton;
