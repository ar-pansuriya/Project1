import vector from "../../assets/Vector.svg";
import {
  IoChevronForwardOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
} from "react-icons/io5";
import ExpandedItemsButton from "../Buttons/ExpandedItemsButton";

// The main component to display match details
const StewardshipRight = ({ selectedData = {}, setOnNextPre }) => {
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

  console.log(selectedData, "selectedData");

  return (
    <div className="bg-[#F9FAFB] text-[#25245F] flex flex-col rounded-3xl h-[79%] w-[58%] px-5 py-4">
      {/* Title Section */}

      {/* Match Header Section */}
      <div className="mt-1 mb-3 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="font-medium mb-4">Match Details</h1>
          <p>Source Information (EFX)</p>
          <p className="text-xs text-[#66668F] font-light">
            Markaaz ID:{" "}
            <strong className="font-semibold">
              {selectedData.PRIMARY_MKID}
            </strong>
          </p>
          <p className="text-xs text-[#66668F] font-light">
            Source Record ID:{" "}
            <strong className="font-semibold">
              {selectedData.PRIMARY_MKID_SOURCE_ID}
            </strong>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col justify-center gap-4 items-end">
          <div className="flex items-center gap-3">
            <div className="text-sm">
              {/* Pass selectedData to ExpandedItemsButton */}
              <ExpandedItemsButton item={selectedData} />
            </div>
            <button
              onClick={() => {
                const randomNumber = Math.floor(100 + Math.random() * 900);
                const prefixedValue = `Pre-${randomNumber}`;
                setOnNextPre(prefixedValue);
              }}
              className="text-[#0A78CD] font-medium flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-white text-sm border border-[#F2F4F5]"
            >
              <IoArrowBackOutline />
              Prev
            </button>
            <button
              onClick={() => {
                const randomNumber = Math.floor(100 + Math.random() * 900);
                const prefixedValue = `Next-${randomNumber}`;
                setOnNextPre(prefixedValue);
              }}
              className="text-[#0A78CD] font-medium flex items-center justify-center gap-1 px-3 py-2 rounded-full bg-white text-sm border border-[#F2F4F5]"
            >
              Next
              <IoArrowForwardOutline />
            </button>
          </div>
          <p className="text-xs text-[#66668F] font-light">
            Match ID:{" "}
            <strong className="font-semibold">{selectedData.MATCH_MKID}</strong>
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex h-full gap-4 overflow-hidden">
        {/* Left Section: Field Values */}
        <div className="w-[50%] flex flex-col gap-2 h-full bg-white rounded-2xl p-2 overflow-y-auto">
          <div className="flex items-center w-full text-xs font-medium px-3">
            <h2 className="w-[40%]">Field</h2>
            <h2 className="w-[60%]">Value</h2>
          </div>
          {/* Map through field values and display them */}
          {Object.entries(selectedData.PRIMARY_MKID_DATA).map(
            ([key, value]) => (
              <div
                key={key}
                style={{ marginBottom: "6px" }}
                className="text-[14px]"
              >
                <strong>{key}:</strong> {value}
              </div>
            )
          )}
        </div>

        {/* Right Section: Company Details */}
        <div className="w-[50%] h-full overflow-y-auto">
          <div className="bg-white rounded-2xl w-full p-2 flex flex-col gap-2 overflow-y-auto">
            <div className="w-full flex items-center text-xs font-medium px-3 text-[#25245F]">
              <h2 className="w-[40%]">Field</h2>
              <h2 className="w-[60%]">Value</h2>
            </div>

            {/* Map through company details and display them */}
            {Object.entries(selectedData.MATCH_SOURCE_DATA).map(
              ([key, value]) =>
                key !== "fullAddress" && (
                  <div
                    key={key}
                    style={{ marginBottom: "6px" }}
                    className="text-[14px]"
                  >
                    <strong>{key}:</strong> {value}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StewardshipRight;
