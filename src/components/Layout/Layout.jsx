import { Outlet } from 'react-router-dom';
import Nav from '../Navbar/Nav';
import Search from '../Search/Search';
import DataStewardshipData from '../DataStewardship/StewardshipParent';
import { useState } from 'react';

const Layout = () => {
  // Add a state to track whether the user is logged in
  const [searchData, setSearchData] = useState([]);
  const [totalRecords,setTotalRecords]=useState();


  return (
    <div className="h-screen overflow-hidden relative">
      <Nav />
      <Search totalRecords={totalRecords} setSearchData={setSearchData}/>
      <DataStewardshipData setTotalRecords={setTotalRecords} searchData={searchData}/>
      <main>
        <Outlet />
      </main>
      <footer className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-light text-center">
        &copy; 2024 Markaaz Inc. Use of this portal is governed by the terms of the licensing agreement
      </footer>
    </div>
  );
};

export default Layout;
