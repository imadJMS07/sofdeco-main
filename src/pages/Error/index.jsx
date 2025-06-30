import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-lg text-gray-600 mb-8">
          {error?.message || 'Sorry, an unexpected error has occurred.'}
        </p>
        <p className="text-sm text-gray-500">
          {error?.statusText || error?.status}
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
} 