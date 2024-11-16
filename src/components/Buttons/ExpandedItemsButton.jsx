import React, { useEffect, useState } from 'react';

const ExpandedItemsButton = ({ item }) => {
  const [isMatched, setIsMatched] = useState(true);

  // Retrieve the initial state from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem(`MATCH_${item.MATCH_MKID}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsMatched(parsedData.isMatched);
    }
  }, [item.MATCH_MKID]);

  // Toggle match state and save it to localStorage
  const toggleMatch = () => {
    const newMatchedState = !isMatched;
    setIsMatched(newMatchedState);

    const data = JSON.stringify({ MATCH_MKID: item.MATCH_MKID, isMatched: newMatchedState, PRIMARY_MKID: item.PRIMARY_MKID });
    localStorage.setItem(`MATCH_${item.MATCH_MKID}`, data);
    localStorage.setItem(`recently`, data);
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('matchStateUpdated'));
  };

  // Listen for changes in localStorage to sync state across components
  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem(`MATCH_${item.MATCH_MKID}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setIsMatched(parsedData.isMatched);
      }
    };

    // Add event listeners for both localStorage changes and custom event
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('matchStateUpdated', handleStorageChange);

    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('matchStateUpdated', handleStorageChange);
    };
  }, [item.MATCH_MKID]);

  return (
    <button
      onClick={toggleMatch}
      className="flex w-fit items-center justify-between bg-white rounded-full border border-[#F2F4F5]"
    >
      <p
        className={`font-medium py-2 px-3 rounded-full ${isMatched ? 'text-[#25245F]' : 'bg-[#0A78CD] text-white box-shadow'
          }`}
      >
        Reject
      </p>
      <p
        className={`font-medium py-2 px-3 rounded-full ${isMatched ? 'bg-[#0A78CD] text-white box-shadow' : 'text-[#25245F]'
          }`}
      >
        Match
      </p>
    </button>
  );
};

export default ExpandedItemsButton;
