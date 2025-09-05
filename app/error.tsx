'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="p-6">
      <p className="mb-4">Oh no, something went wrong... maybe refresh?</p>
      <button
        onClick={() => reset()}
        className="rounded-md px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black text-sm"
      >
        Try again
      </button>
    </div>
  );
}
