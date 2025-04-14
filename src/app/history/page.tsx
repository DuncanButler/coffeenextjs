'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CoffeeEntry } from '@/types';

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [coffeeEntries, setCoffeeEntries] = useState<CoffeeEntry[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load coffee entries from localStorage on component mount
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      const savedEntries = localStorage.getItem('coffeeEntries');
      if (savedEntries) {
        const allEntries: CoffeeEntry[] = JSON.parse(savedEntries);
        // Filter entries to only show the current user's
        const userEntries = allEntries.filter(entry => entry.userId === session.user.id);
        setCoffeeEntries(userEntries);
      }
    }
  }, [status, session]);

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
          <p className="text-xl">Loading...</p>
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect to login
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <div className="w-full flex items-center mb-8 relative">
          <div className="absolute left-0">
            <Link 
              href="/" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Back to Tracker
            </Link>
          </div>
          <h1 className="text-4xl font-bold mx-auto">Coffee History</h1>
          <div className="absolute right-0">
            {/* Empty div for spacing, same width as button */}
            <div className="w-[139px]"></div>
          </div>
        </div>
        
        <div className="mb-4 text-center">
          <p className="text-lg">History for <span className="font-semibold">{session?.user?.name || 'User'}</span></p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full">
          {coffeeEntries.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No coffee entries yet.</p>
          ) : (
            <div className="w-full">
              <table className="w-full text-left">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Source</th>
                    <th className="p-3">Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {coffeeEntries.slice().reverse().map((entry, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">{entry.type}</td>
                      <td className="p-3">{entry.source || 'N/A'}</td>
                      <td className="p-3">{formatTimestamp(entry.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 