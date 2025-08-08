// components/ErrorMessage.jsx
"use client";
import React from "react";
import { MdErrorOutline } from "react-icons/md";

export default function ErrorMessage({ message = "City not found or available" }) {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-2 text-red-600 text-lg font-semibold">
        <MdErrorOutline className="text-2xl" />
        <span>{message}</span>
      </div>
    </div>
  );
}
