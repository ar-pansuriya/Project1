import { useState, useEffect } from "react";
import DataStewardshipDataLeft from "./StewardshipLeft";
import DataStewardshipDataRight from "./StewardshipRight";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { getAPI } from "@/Functions/apiFunction";

// API endpoint and headers
const API_URL = "https://api-ds.markaazdata.com";
const API_KEY = "4uFqMLILOj26lMArLOilW9rfEFCUYfHe2MzmfjJY";
const COUNT_RECORDS_API_KEY = "4uFqMLILOj26lMArLOilW9rfEFCUYfHe2MzmfjJY";

const StewardshipParent = () => {
  // State hooks for managing data and UI states
  const [stewardshipData, setStewardshipData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for data fetch
  const [error, setError] = useState(null); // Error state for handling API errors
  const [displayedData, setDisplayedData] = useState([]); // Data displayed initially
  const [totalRecords, setTotalRecords] = useState(null); // Total record count from API
  const itemsPerPage = 10; // Number of items to load per page

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Function to fetch stewardship data
    const fetchData = async () => {
      try {
        // Fetch data from API
        const response = await axios.get(`${API_URL}/getData`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        const mkidData = await getAPI("/getDataDistinctMKID");
        console.log("mkidData======", mkidData);

        //For lockRecord API

        // const mkIds = mkidData.map((item) => item.MK_ID);
        // console.log("mkIds", mkIds);

        // if (mkidData) {
        //   for (const mkId of mkIds) {
        //     try {
        //       const response = await getAPI("/lockRecord", mkId);
        //       console.log("API Response Lock Data:", response);
        //     } catch (error) {
        //       console.error("Error with API request:", error);
        //     }
        //   }
        // }

        // Validate if response data is in the expected format
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Unexpected data format received");
        }

        // Map API response to expected data format
        const mappedData = response.data.map((item) => {
          let primaryData = {};
          let matchData = {};

          // Safely parse primary and match data from JSON
          try {
            primaryData = JSON.parse(item.PRIMARY_MKID_DATA || "{}");
            matchData = JSON.parse(item.MATCH_SOURCE_DATA || "{}");
          } catch (e) {
            console.error("Error parsing JSON data", e);
          }

          // Determine data source prefix based on source
          let prefix = "";
          if (item.PRIMARY_MKID_SRC === "EFX") {
            prefix = "EFX_";
          } else if (item.PRIMARY_MKID_SRC === "CS") {
            prefix = "CS_";
          } else if (item.PRIMARY_MKID_SRC === "OC") {
            prefix = "OC_";
          }

          // Extract fields from primary data using the prefix
          const companyName = primaryData[`${prefix}AFFLULTNAMEALL`] || "";
          const addressParts = [
            primaryData[`${prefix}AFFLULTADDRESSALL`],
            primaryData[`${prefix}AFFLULTCITYALL`],
            primaryData[`${prefix}AFFLULTCTRYISOCDALL`],
            primaryData[`${prefix}AFFLULTZIPCODEALL`],
          ].filter(Boolean);
          const address = addressParts.join(", ");
          const phone = primaryData[`${prefix}PHONE`] || "";

          // Extract match data fields
          const matchAddress =
            matchData.ADDRESS1 ||
            matchData.ADDRESS2 ||
            matchData.ADDRESS3 ||
            "";
          const matchCompanyName = matchData.NAME || "";

          // Return the formatted data object
          return {
            id: item.PRIMARY_MKID,
            matchId: item.MATCH_MKID,
            sourceRecordId: item.PRIMARY_MKID_SOURCE_ID,
            matchSourceRecordId: item.MATCH_MKID_SOURCE_ID,
            companyName: companyName || matchCompanyName, // Use match data if primary is unavailable
            address: address || matchAddress, // Use match data if primary address is missing
            phone,
            matchAddress,
            matchPercentage: `${item.BOOSTED_SCORE}%`,
            dataSource: item.PRIMARY_MKID_SRC,
            primaryData,
            matchData,
            rawData: item, // Keep raw item for further use if needed
          };
        });

        // Set the state with the fetched and mapped data
        setStewardshipData(mappedData);
        setDisplayedData(mappedData.slice(0, itemsPerPage)); // Show initial 10 records
      } catch (error) {
        // Handle any errors during the fetch
        console.error("Error fetching data:", error);
        setError(error.message || "An unknown error occurred");
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    // Function to fetch total record count from API
    const fetchTotalRecords = async () => {
      try {
        const res = await axios.get(`${API_URL}/countRecords`, {
          headers: {
            "x-api-key": COUNT_RECORDS_API_KEY,
          },
        });
        setTotalRecords(res.data.overall_count_for_match_merge); // Set total record count
      } catch (error) {
        console.error("Error fetching total record count:", error);
      }
    };

    // Call the data fetching functions
    fetchData();
    fetchTotalRecords();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Handle selection of data and set selectedData state
  const handleSelectData = (data) => {
    if (!data) {
      setSelectedData(null); // Reset selection if no data is provided
      return;
    }
    const { id, matchId } = data;
    const selectedItem = stewardshipData.find(
      (item) => item.matchId === matchId
    );
    setSelectedData(selectedItem); // Set the selected item based on matchId
  };

  // Display loading state when data is being fetched
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="flex items-center gap-2">
          Loading Data <Loader2Icon className="h-4 w-4 animate-spin" />
        </p>
      </div>
    );
  }

  // Display error message if there is an error fetching data
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-between px-5 py-4 gap-6">
      {/* Left panel displaying data */}
      <DataStewardshipDataLeft
        stewardshipData={stewardshipData}
        onSelectData={handleSelectData}
        onSelectExpandedData={setSelectedData}
        totalRecords={totalRecords}
      />
      {/* Right panel displaying selected data */}
      <DataStewardshipDataRight selectedData={selectedData} />
    </div>
  );
};

export default StewardshipParent;
