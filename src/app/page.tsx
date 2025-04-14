'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CoffeeEntry } from '@/types';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [coffeeEntries, setCoffeeEntries] = useState<CoffeeEntry[]>([]);
  const [selectedType, setSelectedType] = useState('black');
  const [selectedSource, setSelectedSource] = useState('homemade');
  const [showBreakdown, setShowBreakdown] = useState(false);

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

  // Update localStorage when entries change
  useEffect(() => {
    if (status === 'authenticated' && coffeeEntries.length > 0) {
      const savedEntries = localStorage.getItem('coffeeEntries');
      let allEntries: CoffeeEntry[] = [];
      
      if (savedEntries) {
        allEntries = JSON.parse(savedEntries);
        // Remove current user's entries
        allEntries = allEntries.filter(entry => entry.userId !== session?.user?.id);
      }
      
      // Add updated entries
      allEntries = [...allEntries, ...coffeeEntries];
      localStorage.setItem('coffeeEntries', JSON.stringify(allEntries));
    }
  }, [coffeeEntries, status, session]);

  const addCoffee = () => {
    if (!session?.user?.id) return;
    
    const newEntry: CoffeeEntry = {
      type: selectedType,
      source: selectedSource,
      timestamp: Date.now(),
      userId: session.user.id
    };
    setCoffeeEntries(prevEntries => [...prevEntries, newEntry]);
  };

  // Count coffee types
  const coffeeTypeCounts = coffeeEntries.reduce((counts: Record<string, number>, entry) => {
    counts[entry.type] = (counts[entry.type] || 0) + 1;
    return counts;
  }, {});

  // Count coffee sources
  const coffeeSourceCounts = coffeeEntries.reduce((counts: Record<string, number>, entry) => {
    counts[entry.source] = (counts[entry.source] || 0) + 1;
    return counts;
  }, {});

  const coffeeTypes = ['black', 'latte', 'flat white', 'cappuccino', 'espresso'];
  const coffeeSources = ['homemade', 'costa', 'starbucks', 'nero', 'other'];

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <div className="w-full flex items-center mb-8 relative">
          <div className="absolute left-0">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
          <h1 className="text-4xl font-bold mx-auto">Coffee Tracker</h1>
          <div className="absolute right-0">
            <Link 
              href="/history" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
            >
              View History
            </Link>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md flex flex-col items-center">
          <div className="mb-4 text-center">
            <p className="text-lg">Welcome, <span className="font-semibold">{session?.user?.name || 'User'}</span>!</p>
          </div>
          
          <div className="mb-6">
            <Image 
              src="/coffee-clipart-39.jpg" 
              alt="Coffee Cup" 
              width={120} 
              height={120}
              className="mb-4 rounded-md"
            />
          </div>
          
          <div className="mb-8 text-center">
            <p className="text-xl mb-2">You've had</p>
            <p className="text-6xl font-bold text-amber-700">{coffeeEntries.length}</p>
            <p className="text-xl mt-2">coffees</p>
            
            {coffeeEntries.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-amber-600 hover:text-amber-700 font-medium text-sm underline mt-2"
                >
                  {showBreakdown ? 'Hide Breakdown' : 'Show Breakdown'}
                </button>
                
                {showBreakdown && (
                  <div className="mt-4 text-left">
                    <div className="mb-4">
                      <p className="text-lg font-medium mb-2">By Type:</p>
                      <ul className="list-disc pl-5">
                        {Object.entries(coffeeTypeCounts).map(([type, count]) => (
                          <li key={type} className="text-md">
                            {type}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-lg font-medium mb-2">By Source:</p>
                      <ul className="list-disc pl-5">
                        {Object.entries(coffeeSourceCounts).map(([source, count]) => (
                          <li key={source} className="text-md">
                            {source}: {count}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-col w-full max-w-xs gap-3 mb-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="coffee-type" className="text-sm text-gray-600 dark:text-gray-300">Coffee Type:</label>
              <select
                id="coffee-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none"
              >
                {coffeeTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1">
              <label htmlFor="coffee-source" className="text-sm text-gray-600 dark:text-gray-300">Coffee Source:</label>
              <select
                id="coffee-source"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded-md py-2 px-3 text-gray-700 dark:text-gray-200 focus:outline-none"
              >
                {coffeeSources.map(source => (
                  <option key={source} value={source}>
                    {source.charAt(0).toUpperCase() + source.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={addCoffee}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-md text-md transition-colors duration-200 mt-2"
            >
              Add Coffee
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
