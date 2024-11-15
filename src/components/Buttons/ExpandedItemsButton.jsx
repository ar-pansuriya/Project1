import React, { useState } from 'react'

const ExpandedItemsButton = () => {
  const [isMatched, setIsMatched] = useState(false)

  const toggleMatch = () => {
    setIsMatched(!isMatched)
  }

  return (
    <button onClick={toggleMatch} className='flex w-fit items-center justify-between bg-white rounded-full border border-[#F2F4F5]'>
      <p className={`font-medium py-2 px-3 rounded-full ${isMatched ? 'bg-[#0A78CD] text-white box-shadow' : 'text-[#25245F]'}`}>Reject</p>
      <p className={`font-medium py-2 px-3 rounded-full ${isMatched ? 'text-[#25245F]' : 'bg-[#0A78CD] text-white box-shadow'} `}>Match</p>
    </button>
  )
}

export default ExpandedItemsButton