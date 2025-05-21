"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Pagination = () => {

  const [data,setData] = useState([]);
  const [page,setPage] = useState(2);

  const prevThree = Array.from({length:3},(_,index)=> page-1-index).filter((y)=>y>0).reverse();
  const nextFour = Array.from({length:4},(_,index)=> page+index);

  const paginationArr = [...prevThree,...nextFour];

  const handlePrev = () =>{
    setPage(page-1);
  }
  const handleNext = () =>{
    setPage(page+1);
  }
  
  useEffect(() => {
    axios.get(`https://picsum.photos/v2/list?page=${page}&limit=5`).then((x)=>setData(x.data));
  }, [page])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-100 rounded-lg p-4 shadow">
            <img
              src={item?.download_url}
              alt={item?.author || "Random"}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <span className="text-sm text-gray-700">{item?.author}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4">
        {page>1 ? <button onClick={handlePrev} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition">Prev</button> : ""}
        {
          paginationArr.map((val, index)=>{
            return <button onClick={()=>setPage(val)} key={index} className={val==page?"px-4 hover:scale-110 py-2 border border-black bg-white text-black rounded hover:bg-blue-600 transition":"px-4 hover:scale-110 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"}>{val}</button>
          })
        }
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Next</button>
      </div>
    </div>
  )
}

export default Pagination