'use client'

import { useState } from "react";
import AddMediaForm from "./AddMediaForm";

export default function MediaContentToggleForm() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-xl mx-auto py-6">
      <button
        onClick={() => setShowForm(prev => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Hide Add Media Form" : "Show Add Media Form"}
      </button>

      {showForm && <AddMediaForm />}
    </div>
  );
}
