import React, { useEffect, useState } from 'react'

const ExpandedItemsButton = ({ item }) => {
  const [isMatched, setIsMatched] = useState(true)

  const toggleMatch = () => {
    setIsMatched(!isMatched);
    const data = JSON.stringify({ MATCH_MKID: item.MATCH_MKID, isMatched: !isMatched })
    localStorage.setItem('reacentSelected', data)
  }



  useEffect(() => {
    const storedData = localStorage.getItem('reacentSelected');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.MATCH_MKID === item.MATCH_MKID) {
        console.log(parsedData.isMatched)
        setIsMatched(parsedData.isMatched); // Initialize state based on localStorage data
      }
    }
  }, [isMatched]);

  return (
    <button onClick={toggleMatch} className='flex w-fit items-center justify-between bg-white rounded-full border border-[#F2F4F5]'>
      <p className={`font-medium py-2 px-3 rounded-full ${isMatched ? 'text-[#25245F]' : 'bg-[#0A78CD] text-white box-shadow'} `}>Reject</p>
      <p className={`font-medium py-2 px-3 rounded-full ${isMatched ? 'bg-[#0A78CD] text-white box-shadow' : 'text-[#25245F]'}`}>Match</p>
    </button>
  )
}

export default ExpandedItemsButton