import React, { useState, useEffect } from "react";
import { IoGitNetworkOutline, IoGlobeOutline, IoChevronDown } from "react-icons/io5";
import { FaCity } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { getAPI } from "@/Functions/apiFunction";

const Search = ({ setSearchData }) => {
  const [worldProvider, setWorlProvider] = useState(['EFX', 'CS', 'OC']);
  const [worldRegions, setWorldRegions] = useState([]);
  const [subRegions, setSubRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedSubRegion, setSelectedSubRegion] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");

  // Fetch world regions on component mount
  useEffect(() => {
    fetchWorldRegions();
  }, []);

  const fetchWorldRegions = async () => {
    try {
      const { distinct_world_regions } = await getAPI("/distinctWorldRegions");
      setWorldRegions(distinct_world_regions);
    } catch (error) {
      console.error("Error fetching world regions:", error);
    }
  };

  const fetchSubRegions = async (SelectedRegion) => {
    try {
      const { distinct_world_sub_regions } = await getAPI(`/distinctWorldSubRegions?region_selected=${SelectedRegion}`);
      setSubRegions(distinct_world_sub_regions.slice(0, 10));
    } catch (error) {
      console.error("Error fetching sub-regions:", error);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    fetchSubRegions(region);
    setSelectedSubRegion(null);
  };

  const handleSubRegionChange = (subRegion) => {
    setSelectedSubRegion(subRegion);
  };

  const handleChange = (e, name) => {
    if (name === 'Company') {
      setCompany(e.target.value);
    } else if (name === 'City') {
      setCity(e.target.value)
    }
  }

  const handleSearch = async () => {
    try {
      const response = await getAPI(`/filteredDataDistinctMKID?data_providers=${selectedProvider}&world_region=${selectedRegion}&world_sub_region=${selectedSubRegion}&company=${company}&city=${city}`);
      setSearchData(response);
      setSelectedProvider('');
      setSelectedSubRegion("");
      setSelectedRegion('');
    } catch (error) {
      console.error("Error fetching world regions:", error);
    }
  }

  const handleSaveChanges = async() => {
    try {

      const { MATCH_MKID, PRIMARY_MKID, isMatched } = JSON.parse(localStorage.getItem('recently'));
      console.log(MATCH_MKID, PRIMARY_MKID, isMatched, '-------2222');


      if (isMatched) {
        const response = await getAPI(`/matchRecord`,PRIMARY_MKID,MATCH_MKID);
      } else {
        const response = await getAPI(`/notMatchRecord`,PRIMARY_MKID,MATCH_MKID);
      }
      const response = await getAPI(`/unlockRecord`,PRIMARY_MKID,MATCH_MKID);
    } catch (error) {
      console.error("Error fetching world regions:", error);
    }
  }

  return (
    <div className="px-5 pt-4 pb-2 text-[#25245F] flex justify-between items-center">
      <h1 className="text-lg font-semibold">Data Stewardship</h1>
      <div className="flex flex-wrap gap-4 items-center">
        {/* Static Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#F9FAFB] hover:bg-[#fbfdfe] p-4 flex items-center text-[#66668F] font-normal justify-center gap-5 rounded-full">
              <div className="flex items-center gap-2 text-xs">
                <IoGitNetworkOutline className="text-[#0A78CD]" />
                {selectedProvider ? selectedProvider : "Data Provider"}
              </div>
              <IoChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {worldProvider.map((provider, i) => (
                <DropdownMenuItem key={i} onClick={() => setSelectedProvider(provider)}>
                  {provider}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* World Region Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#F9FAFB] hover:bg-[#fbfdfe] p-4 flex items-center text-[#66668F] font-normal justify-center gap-5 rounded-full">
              <div className="flex items-center gap-2 text-xs">
                <IoGlobeOutline className="text-[#0A78CD]" />
                {selectedRegion ? selectedRegion : "World Region"}
              </div>
              <IoChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {worldRegions.length > 0 ? worldRegions.map((region, index) => (
                <DropdownMenuItem key={index} onClick={() => handleRegionChange(region)}>
                  {region}
                </DropdownMenuItem>
              )) : <p>Data not found</p>}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* World Sub-Region Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-[#F9FAFB] hover:bg-[#fbfdfe] p-4 flex items-center text-[#66668F] font-normal justify-center gap-5 rounded-full">
              <div className="flex items-center gap-2 text-xs">
                <IoGlobeOutline className="text-[#0A78CD]" />
                {selectedSubRegion ? selectedSubRegion : "World Sub Region"}
              </div>
              <IoChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {subRegions.length > 0 ? subRegions.map((subRegion, index) => (
                <DropdownMenuItem key={index} onClick={() => handleSubRegionChange(subRegion)}>
                  {subRegion}
                </DropdownMenuItem>
              )) : <p>Data not found</p>}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Company Input */}
        <div className="relative">
          <FaCity className="absolute text-[#0A78CD] mt-3 ml-3 text-lg" />
          <input
            value={company}
            onChange={(e) => handleChange(e, 'Company')}
            className="bg-[#F9FAFB] p-3 pl-9 w-44 text-xs rounded-full placeholder:text-xs placeholder:text-[#66668F] focus:outline-none focus:ring-1 focus:ring-[#F2F4F5]"
            placeholder="Enter Company"
          />
        </div>

        {/* City Input */}
        <div className="relative">
          <MdLocationCity className="absolute text-[#0A78CD] mt-3 ml-3 text-lg" />
          <input
            value={city}
            onChange={(e) => handleChange(e, 'City')}
            className="bg-[#F9FAFB] p-3 pl-9 w-44 text-xs rounded-full placeholder:text-xs placeholder:text-[#66668F] focus:outline-none focus:ring-1 focus:ring-[#F2F4F5]"
            placeholder="Enter City"
          />
        </div>

        {/* Action Buttons */}
        <button onClick={() => handleSearch()} className="bg-[#0A78CD] box-shadow py-3 px-5 text-white text-xs font-semibold rounded-full">
          Search
        </button>
        <button onClick={() => handleSaveChanges()} className="text-[#0A78CD] border border-[#0A78CD] text-nowrap text-xs py-3 px-5 font-semibold rounded-full">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Search;
