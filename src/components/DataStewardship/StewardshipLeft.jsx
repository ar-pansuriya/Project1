// import {
//   IoAddOutline,
//   IoChevronForwardOutline,
//   IoChevronBackOutline,
//   IoRemoveOutline,
// } from "react-icons/io5";
// import { SlLocationPin } from "react-icons/sl";
// import { LuPhone } from "react-icons/lu";
// import { useEffect, useState } from "react";
// import ExpandedItemsButton from "../Buttons/ExpandedItemsButton";

// const StewardshipLeft = ({ stewardshipData, onSelectData, onSelectExpandedData, totalRecords }) => {
//   const [expandedId, setExpandedId] = useState(null);
//   const [selectedId, setSelectedId] = useState(null);
//   const [displayedCount, setDisplayedCount] = useState(10) // Initial displayed count

//   // Function to toggle expanded items
//   // const toggleExpand = (uniqueKey) => {
//   //   setExpandedId((prev) => (prev === uniqueKey ? null : uniqueKey));
//   //   // onSelectExpandedData(prev === uniqueKey ? null : itemData)
//   //   onSelectExpandedData(newExpandedId ? stewardshipData.find(item => item.id === uniqueKey.split('-')[0]) : null); // Pass data or null
//   //   return newExpandedId;
//   // };

//   // Function to toggle expanded items
//   const toggleExpand = (uniqueKey) => {
//     setExpandedId((prev) => {
//       const isCollapsing = prev === uniqueKey;
//       onSelectExpandedData(isCollapsing ? null : stewardshipData.find(item => `${item.id}-${item.index}` === uniqueKey)); // Pass data or null
//       return isCollapsing ? null : uniqueKey;
//     });
//   };

//   // Function to handle selection
//   const handleSelectData = (id, matchId) => {
//     if (selectedId === id) {
//       setSelectedId(null);
//       onSelectData(null);
//     } else {
//       setSelectedId(id);
//       onSelectData(id && matchId ? { id, matchId } : null);
//     }
//   };

//   // Infinite scrolling functionality
//   const handleScroll = () => {
//     const scrollContainer = document.querySelector('.scroll-container')
//     if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
//       setDisplayedCount((prevCount) => prevCount + 10) // Load 10 more records
//     }
//   }

//   // Attach scroll event listener on mount
//   useEffect(() => {
//     const scrollContainer = document.querySelector('.scroll-container')
//     if (scrollContainer) {
//       scrollContainer.addEventListener('scroll', handleScroll)
//     }
//     return () => {
//       if (scrollContainer) {
//         scrollContainer.removeEventListener('scroll', handleScroll)
//       }
//     }
//   }, [])

//   return (
//     <div className="bg-[#F9FAFB] rounded-3xl h-[79%] w-[42%] py-4 pb-3 px-4 overflow-y-auto scroll-container">
//       {/* Header section with column titles */}
//       <div className="flex items-center gap-7 text-sm">
//         <div className="w-1/2 flex items-center">
//           <p className="w-1/2 text-center pl-4">Markaaz ID</p>
//           <p className="w-1/2 text-right">Source Record ID</p>
//         </div>
//         <div className="w-1/2 flex items-center">
//           <p className="w-1/2 text-left">Company</p>
//           <p className="w-1/2 text-left">Matches</p>
//         </div>
//         <div>
//           <p className="text-xs">Total Records: {totalRecords}</p>
//         </div>
//       </div>

//       {/* Mapping through the stewardship data to display each item */}
//       {stewardshipData.slice(0, displayedCount).map((item, index) => {
//         const {
//           id,
//           matchId,
//           sourceRecordId,
//           matchSourceRecordId,
//           companyName,
//           address,
//           matchAddress,
//           phone,
//           matchPercentage,
//           dataSource,
//           matchesCount,
//         } = item;

//         const uniqueKey = `${id}-${index}`

//         return (
//           <div key={uniqueKey} className="bg-white rounded-2xl p-3 my-2">
//             <div className="text-[#66668F] flex text-xs justify-between px-1">
//               <div className="w-1/2 pr-3 pl-1 gap-2 flex justify-between">
//                 {expandedId === uniqueKey ? (
//                   <IoRemoveOutline
//                     onClick={() => toggleExpand(uniqueKey)}
//                     className="bg-[#e6f1fa] text-[#0A78CD] rounded-full shrink-0 p-1 text-3xl cursor-pointer"
//                   />
//                 ) : (
//                   <IoAddOutline
//                     onClick={() => toggleExpand(uniqueKey)}
//                     className="bg-[#e6f1fa] text-[#0A78CD] rounded-full shrink-0 p-1 text-3xl cursor-pointer"
//                   />
//                 )}
//                 <div className="flex w-full font-light gap-5 justify-between">
//                   <div className="w-1/2">
//                     <p>{id}</p>
//                     <p>{dataSource}</p>
//                   </div>
//                   <p className="w-1/2 text-left">{sourceRecordId}</p>
//                 </div>
//               </div>
//               <div className="w-1/2 pr-3 pl-1 gap-2 flex justify-between">
//                 <div className="flex w-full font-light gap-5 justify-between">
//                   <div className="w-1/2 flex flex-col gap-2">
//                     <p>{companyName}</p>
//                     <div className="flex gap-1">
//                       <SlLocationPin className="shrink-0 text-base text-[#0A78CD] font-semibold" />
//                       {address}
//                     </div>
//                     {phone && (
//                       <div className="flex gap-1">
//                         <LuPhone className="shrink-0 text-base text-[#0A78CD]" />
//                         {phone}
//                       </div>
//                     )}
//                   </div>
//                   <div className="w-1/2 text-left h-full flex flex-col pb-3 justify-between">
//                     <p>Matches {matchesCount}</p>
//                     <button className="rounded-full w-fit py-2 px-4 bg-[#0A78CD] box-shadow text-white font-medium">
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {expandedId === uniqueKey && (
//               <div className="bg-[#ECF5FB] rounded-xl mt-2 overflow-hidden">
//                 <div className="bg-[#C8D3DB] p-3">
//                   <div className="flex items-center w-full justify-between px-2 ">
//                     <div className="w-1/2 flex items-center text-sm">
//                       <p className="w-1/2">Markaaz ID</p>
//                       <p className="w-1/2">Source Record ID</p>
//                     </div>
//                     <div className="w-1/2 flex items-center text-sm">
//                       <p className="w-1/2">Company</p>
//                       <p className="w-1/2">Match(%)</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-3 border-b border-[#66668F33]">
//                   <div className="flex w-full font-light text-[#66668F] justify-between px-2 ">
//                     <div className="w-1/2 flex text-xs">
//                       <div className="w-1/2">
//                         <p>{matchId}</p>
//                         <p>{dataSource}</p>
//                       </div>
//                       <p className="w-1/2">{matchSourceRecordId}</p>
//                     </div>
//                     <div className="w-1/2 flex text-xs">
//                       <div className="w-1/2 flex flex-col gap-2">
//                         <p>{companyName}</p>
//                         <div className="flex gap-1">
//                           <SlLocationPin className="shrink-0 text-base text-[#0A78CD] font-semibold" />
//                           {matchAddress}
//                         </div>
//                         {phone && (
//                           <div className="flex gap-1">
//                             <LuPhone className="shrink-0 text-base text-[#0A78CD]" />
//                             {phone}
//                           </div>
//                         )}
//                       </div>
//                       <div className="w-1/2 flex flex-col justify-between gap-2 pb-4">
//                         <div className="flex w-full items-center justify-between pb-3">
//                           <p>{matchPercentage}</p>
//                           {selectedId === id ? (
//                             <IoChevronBackOutline
//                               onClick={() => handleSelectData(id, matchId)}
//                               className="bg-[#0A78CD] text-white p-1 rounded-full shrink-0 text-3xl cursor-pointer"
//                             />
//                           ) : (
//                             <IoChevronForwardOutline
//                               onClick={() => handleSelectData(id, matchId)}
//                               className="bg-[#f0f0f4] text-[#66668F] p-1 rounded-full shrink-0 text-3xl cursor-pointer"
//                             />
//                           )}
//                         </div>
//                         <ExpandedItemsButton />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default StewardshipLeft;



import {
  IoAddOutline,
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { LuPhone } from "react-icons/lu";
import { useEffect, useState } from "react";
import ExpandedItemsButton from "../Buttons/ExpandedItemsButton";

const StewardshipLeft = ({ stewardshipData, onSelectData, onSelectExpandedData, totalRecords }) => {
  // State hooks to manage expanded, selected items and the number of records to display
  const [expandedId, setExpandedId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [displayedCount, setDisplayedCount] = useState(10); // Initial number of records to display

  // Toggle function for expanding/collapsing item details
  const toggleExpand = (uniqueKey) => {
    setExpandedId((prev) => {
      const isCollapsing = prev === uniqueKey;
      // Pass the expanded data to the parent or null if collapsing
      onSelectExpandedData(isCollapsing ? null : stewardshipData.find(item => `${item.id}-${item.index}` === uniqueKey));
      return isCollapsing ? null : uniqueKey; // Return the new expanded ID or null
    });
  };

  // Handle item selection for data display
  const handleSelectData = (id, matchId) => {
    if (selectedId === id) {
      setSelectedId(null); // Deselect if the same item is clicked
      onSelectData(null); // Pass null to the parent
    } else {
      setSelectedId(id); // Set the selected item
      onSelectData(id && matchId ? { id, matchId } : null); // Pass selected data to parent
    }
  };

  // Infinite scrolling functionality to load more items
  const handleScroll = () => {
    const scrollContainer = document.querySelector('.scroll-container');
    // Check if user has reached the bottom of the scroll container
    if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
      setDisplayedCount((prevCount) => prevCount + 10); // Load 10 more records
    }
  };

  // Attach and clean up the scroll event listener
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="bg-[#F9FAFB] rounded-3xl h-[79%] w-[42%] py-4 pb-3 px-4 overflow-y-auto scroll-container">
      {/* Header section displaying the column titles */}
      <div className="flex items-center gap-7 text-sm">
        <div className="w-1/2 flex items-center">
          <p className="w-1/2 text-center pl-4">Markaaz ID</p>
          <p className="w-1/2 text-right">Source Record ID</p>
        </div>
        <div className="w-1/2 flex items-center">
          <p className="w-1/2 text-left">Company</p>
          <p className="w-1/2 text-left">Matches</p>
        </div>
        <div>
          <p className="text-xs">Total Records: {totalRecords}</p>
        </div>
      </div>

      {/* Map through the stewardship data to display each record */}
      {stewardshipData.slice(0, displayedCount).map((item, index) => {
        const {
          id,
          matchId,
          sourceRecordId,
          matchSourceRecordId,
          companyName,
          address,
          matchAddress,
          phone,
          matchPercentage,
          dataSource,
          matchesCount,
        } = item;

        const uniqueKey = `${id}-${index}`;

        return (
          <div key={uniqueKey} className="bg-white rounded-2xl p-3 my-2">
            {/* Display record details */}
            <div className="text-[#66668F] flex text-xs justify-between px-1">
              <div className="w-1/2 pr-3 pl-1 gap-2 flex justify-between">
                {/* Toggle expand icon */}
                {expandedId === uniqueKey ? (
                  <IoRemoveOutline
                    onClick={() => toggleExpand(uniqueKey)}
                    className="bg-[#e6f1fa] text-[#0A78CD] rounded-full shrink-0 p-1 text-3xl cursor-pointer"
                  />
                ) : (
                  <IoAddOutline
                    onClick={() => toggleExpand(uniqueKey)}
                    className="bg-[#e6f1fa] text-[#0A78CD] rounded-full shrink-0 p-1 text-3xl cursor-pointer"
                  />
                )}
                <div className="flex w-full font-light gap-5 justify-between">
                  <div className="w-1/2">
                    <p>{id}</p>
                    <p>{dataSource}</p>
                  </div>
                  <p className="w-1/2 text-left">{sourceRecordId}</p>
                </div>
              </div>
              <div className="w-1/2 pr-3 pl-1 gap-2 flex justify-between">
                <div className="flex w-full font-light gap-5 justify-between">
                  <div className="w-1/2 flex flex-col gap-2">
                    <p>{companyName}</p>
                    <div className="flex gap-1">
                      <SlLocationPin className="shrink-0 text-base text-[#0A78CD] font-semibold" />
                      {address}
                    </div>
                    {phone && (
                      <div className="flex gap-1">
                        <LuPhone className="shrink-0 text-base text-[#0A78CD]" />
                        {phone}
                      </div>
                    )}
                  </div>
                  <div className="w-1/2 text-left h-full flex flex-col pb-3 justify-between">
                    <p>Matches {matchesCount}</p>
                    <button className="rounded-full w-fit py-2 px-4 bg-[#0A78CD] box-shadow text-white font-medium">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded view section */}
            {expandedId === uniqueKey && (
              <div className="bg-[#ECF5FB] rounded-xl mt-2 overflow-hidden">
                <div className="bg-[#C8D3DB] p-3">
                  <div className="flex items-center w-full justify-between px-2">
                    <div className="w-1/2 flex items-center text-sm">
                      <p className="w-1/2">Markaaz ID</p>
                      <p className="w-1/2">Source Record ID</p>
                    </div>
                    <div className="w-1/2 flex items-center text-sm">
                      <p className="w-1/2">Company</p>
                      <p className="w-1/2">Match(%)</p>
                    </div>
                  </div>
                </div>

                {/* Expanded item details */}
                <div className="p-3 border-b border-[#66668F33]">
                  <div className="flex w-full font-light text-[#66668F] justify-between px-2">
                    <div className="w-1/2 flex text-xs">
                      <div className="w-1/2">
                        <p>{matchId}</p>
                        <p>{dataSource}</p>
                      </div>
                      <p className="w-1/2">{matchSourceRecordId}</p>
                    </div>
                    <div className="w-1/2 flex text-xs">
                      <div className="w-1/2 flex flex-col gap-2">
                        <p>{companyName}</p>
                        <div className="flex gap-1">
                          <SlLocationPin className="shrink-0 text-base text-[#0A78CD] font-semibold" />
                          {matchAddress}
                        </div>
                        {phone && (
                          <div className="flex gap-1">
                            <LuPhone className="shrink-0 text-base text-[#0A78CD]" />
                            {phone}
                          </div>
                        )}
                      </div>
                      <div className="w-1/2 flex flex-col justify-between gap-2 pb-4">
                        <div className="flex w-full items-center justify-between pb-3">
                          <p>{matchPercentage}</p>
                          {/* Select/Unselect Button */}
                          {selectedId === id ? (
                            <IoChevronBackOutline
                              onClick={() => handleSelectData(id, matchId)}
                              className="bg-[#0A78CD] text-white p-1 rounded-full shrink-0 text-3xl cursor-pointer"
                            />
                          ) : (
                            <IoChevronForwardOutline
                              onClick={() => handleSelectData(id, matchId)}
                              className="bg-[#f0f0f4] text-[#66668F] p-1 rounded-full shrink-0 text-3xl cursor-pointer"
                            />
                          )}
                        </div>
                        <ExpandedItemsButton />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StewardshipLeft;
