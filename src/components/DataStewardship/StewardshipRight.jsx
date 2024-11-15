import vector from "../../assets/Vector.svg";
import {
  IoChevronForwardOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import ExpandedItemsButton from "../Buttons/ExpandedItemsButton";

// The main component to display match details
const StewardshipRight = ({ selectedData }) => {
  // If no data is selected, display the initial state
  if (!selectedData) {
    return (
      <div className="bg-[#F9FAFB] rounded-3xl h-[79%] w-[58%] flex flex-col items-center justify-center gap-6">
        <img src={vector} alt="Vector illustration" />
        <p className="text-xl text-[#66668F] font-light">Click on</p>
        <IoChevronForwardOutline className="bg-[#0A78CD] text-white p-1 text-4xl rounded-full" />
        <button className="text-xl text-[#66668F] font-light">
          button to view more
        </button>
      </div>
    );
  }

  // Destructure selectedData object for easy access
  const { primaryData, matchData, matchId, dataSource, id } = selectedData;

  // Determine data source prefix (EFX, CS, OC)
  let prefix = "";
  if (dataSource === "EFX") prefix = "EFX_";
  else if (dataSource === "CS") prefix = "CS_";
  else if (dataSource === "OC") prefix = "OC_";

  // Prepare field values by filtering keys based on the dataSource prefix
  const fieldValuesData = Object.keys(primaryData)
    .filter((key) => key.startsWith(prefix))
    .map((key) => ({
      field: key,
      value: primaryData[key],
    }));

  // Prepare company details to display
  const companyDetails = [
    { field: "Company Number", value: primaryData[`${prefix}ID`] || "-" },
    { field: "Name", value: primaryData[`${prefix}NAME`] || "-" },
    { field: "Address", value: primaryData[`${prefix}ADDRESS`] || "-" },
    { field: "City", value: primaryData[`${prefix}CITY`] || "-" },
    { field: "Country", value: primaryData[`${prefix}CTRYNAME`] || "-" },
    { field: "Postal Code", value: primaryData[`${prefix}ZIPCODE`] || "-" },
  ];

  return (
    <div className="bg-[#F9FAFB] text-[#25245F] flex flex-col rounded-3xl h-[79%] w-[58%] px-5 py-4">
      {/* Title Section */}
      <h1 className="font-medium">Match Details</h1>

      {/* Match Header Section */}
      <div className="mt-1 mb-3 flex items-center justify-between">
        <div className="text-sm">
          <p>Source Information</p>
          <p className="text-xs text-[#66668F] font-light">Markaaz ID: {matchId}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <ExpandedItemsButton />
          </div>
          <button className="text-[#0A78CD] font-medium flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-white text-sm border border-[#F2F4F5]">
            <IoArrowBackOutline />
            Prev
          </button>
          <button className="text-[#0A78CD] font-medium flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-white text-sm border border-[#F2F4F5]">
            Next
            <IoArrowForwardOutline />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex h-full gap-4 overflow-hidden">

        {/* Left Section: Field Values */}
        <div className="w-[45%] flex flex-col gap-2 h-full bg-white rounded-2xl p-2 overflow-y-auto">
          <div className="flex items-center w-full text-xs font-medium px-3">
            <h2 className="w-[40%]">Field</h2>
            <h2 className="w-[60%]">Value</h2>
          </div>
          {/* Map through field values and display them */}
          {fieldValuesData.map((data) => (
            <div
              key={data.field}
              className="bg-[#F9FAFB] rounded-full w-full p-4 text-[#66668F] font-light flex items-center text-xs"
            >
              <p className="w-[40%]">{data.field}</p>
              <p className="w-[60%]">{data.value}</p>
            </div>
          ))}
        </div>

        {/* Right Section: Company Details */}
        <div className="w-[55%] h-full overflow-y-auto">
          <div className="bg-white rounded-2xl w-full h-[50%] p-2 flex flex-col gap-2 overflow-y-auto">
            <div className="w-full flex items-center text-xs font-medium px-3 text-[#25245F]">
              <h2 className="w-[40%]">Field</h2>
              <h2 className="w-[60%]">Value</h2>
            </div>

            {/* Map through company details and display them */}
            {companyDetails.map((data) => (
              <div
                key={data.field}
                className="bg-[#F9FAFB] rounded-full w-full p-4 text-[#66668F] font-light flex items-center text-xs"
              >
                <p className="w-[40%]">{data.field}</p>
                <p className="w-[60%]">{data.value}</p>
              </div>
            ))}
          </div>
          {/* Additional sections can be added here */}
        </div>
      </div>
    </div>
  );
};

export default StewardshipRight;
