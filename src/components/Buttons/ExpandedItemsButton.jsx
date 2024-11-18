import React, { useEffect, useState } from "react";

const ExpandedItemsButton = ({ item, IsRejectAll }) => {
  const [isMatched, setIsMatched] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  // Initialize state from localStorage for the current item
  useEffect(() => {
    const storedData = localStorage.getItem(`MATCH_${item.MATCH_MKID}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsMatched(parsedData.isMatched || false); // Default to false if not set
      setIsRejected(parsedData.isRejected || false); // Default to false if not set
    } else {
      // If no stored data, set defaults
      setIsMatched(false);
      setIsRejected(false);
    }
  }, [item.MATCH_MKID]);

  // Update state when IsRejectAll changes
  useEffect(() => {
    if (IsRejectAll) {
      setIsRejected(true);
      setIsMatched(false);

      const updatedData = {
        MATCH_MKID: item.MATCH_MKID,
        isMatched: false,
        isRejected: true,
        PRIMARY_MKID: item.PRIMARY_MKID,
      };

      // Save the updated state to localStorage
      localStorage.setItem(
        `MATCH_${item.MATCH_MKID}`,
        JSON.stringify(updatedData)
      );
      localStorage.setItem(`recently`, JSON.stringify(updatedData));

      // Dispatch a custom event for syncing
      window.dispatchEvent(new Event("matchStateUpdated"));
    } else {
      setIsRejected(false);
      setIsMatched(false);

      const updatedData = {
        MATCH_MKID: item.MATCH_MKID,
        isMatched: false,
        isRejected: false,
        PRIMARY_MKID: item.PRIMARY_MKID,
      };

      // Save the updated state to localStorage
      localStorage.setItem(
        `MATCH_${item.MATCH_MKID}`,
        JSON.stringify(updatedData)
      );
      localStorage.setItem(`recently`, JSON.stringify(updatedData));

      // Dispatch a custom event for syncing
      window.dispatchEvent(new Event("matchStateUpdated"));
    }
  }, [IsRejectAll, item.MATCH_MKID, item.PRIMARY_MKID]);

  // Toggle match or reject state
  const toggleState = (action) => {
    const isMatchAction = action === "Match";
    const isRejectAction = action === "Reject";

    // Update states based on action
    setIsMatched(isMatchAction);
    setIsRejected(isRejectAction);

    const updatedData = {
      MATCH_MKID: item.MATCH_MKID,
      isMatched: isMatchAction,
      isRejected: isRejectAction,
      PRIMARY_MKID: item.PRIMARY_MKID,
    };

    // Save updated state to localStorage
    localStorage.setItem(
      `MATCH_${item.MATCH_MKID}`,
      JSON.stringify(updatedData)
    );
    localStorage.setItem(`recently`, JSON.stringify(updatedData));

    // Dispatch a custom event for syncing
    window.dispatchEvent(new Event("matchStateUpdated"));
  };

  // Sync state with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = localStorage.getItem(`MATCH_${item.MATCH_MKID}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setIsMatched(parsedData.isMatched || false);
        setIsRejected(parsedData.isRejected || false);
      }
    };

    // Add event listeners for storage updates and custom events
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("matchStateUpdated", handleStorageChange);

    return () => {
      // Cleanup event listeners
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("matchStateUpdated", handleStorageChange);
    };
  }, [item.MATCH_MKID]);

  return (
    <div className="flex w-fit items-center justify-between bg-white rounded-full border border-[#F2F4F5]">
      <button
        onClick={() => toggleState("Reject")}
        className={`font-medium py-2 px-3 rounded-full ${
          isRejected ? "bg-[#0A78CD] text-white box-shadow" : "text-[#25245F]"
        }`}
      >
        Reject
      </button>
      <button
        onClick={() => toggleState("Match")}
        className={`font-medium py-2 px-3 rounded-full ${
          isMatched ? "bg-[#0A78CD] text-white box-shadow" : "text-[#25245F]"
        }`}
      >
        Match
      </button>
    </div>
  );
};

export default ExpandedItemsButton;
