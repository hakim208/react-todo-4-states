"use client"
import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 text-center p-8">
      <h1 className="text-5xl font-bold mb-6 text-blue-800">
        📝 ToDo List бо <span className="text-indigo-600">4 Намуди State Manager</span>
      </h1>

      <p className="text-lg text-gray-700 mb-10 max-w-md">
        Сравните Zustand, Redux, Mobx и Jotai в действии. Ясно, быстро и визуально!
      </p>

      <div className="text-xl font-semibold text-gray-800 animate-bounce">
        👉 Select your option above!
      </div>

      <div className="mt-4 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 text-indigo-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </div>
  )
}

export default Home