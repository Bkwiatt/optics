import { useState, useEffect } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  DocumentPlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const laborTypes = [
  { type: "Foreman", rate: 60 },
  { type: "Apprentice", rate: 30 },
  { type: "FE Tech", rate: 50 },
  { type: "Designer", rate: 70 },
  { type: "Shop", rate: 45 },
  { type: "Superintendant", rate: 80 },
];

const timeTypes = [
  { type: "Straight Time", multiplier: 1 },
  { type: "Overtime", multiplier: 1.5 },
  { type: "Double Time", multiplier: 2 },
];

const miscItems = ["Lift", "Gas Surcharge", "Other"];

const equipmentTypes = [
  "Wet Systems",
  "Dry Systems",
  "Pre-Action Systems",
  "Deluge Systems",
  "Mist Systems",
  "Fire Alarm Systems",
  "Standpipes",
  "Fire Pump - 250 GPM",
  "Fire Pump - 500 GPM",
  "Fire Pump - 750 GPM",
  "Fire Pump - 1000 GPM",
  "Fire Pump - 1250 GPM",
  "Fire Pump - 1500 GPM",
  "Fire Pump - 2000 GPM",
  "Fire Pump - 2500 GPM",
  "Fire Pump - 3500 GPM",
  "Fire Pump - 4000 GPM",
];

const generateQuoteNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

const ProjectEstimator = () => {
  const [customerInfo, setCustomerInfo] = useState({
    quoteNumber: generateQuoteNumber(),
    quoteDate: new Date().toISOString().slice(0, 10),
    customerName: "",
    address: "",
    jobDescription: "",
  });

  const [laborers, setLaborers] = useState([]);
  const [subcontractors, setSubcontractors] = useState([]);
  const [miscellaneous, setMiscellaneous] = useState([]);
  const [systems, setSystems] = useState([]);

  const commonButtonClasses = "px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center w-48 cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-lg";
  const headerGradient = "bg-gradient-to-r from-gray-100 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-900 shadow-md dark:shadow-none";
  const headerTextColor = "text-gray-800 dark:text-white";
  const headerSubTextColor = "text-green-500 font-semibold";
  const buttonBg = "bg-blue-400 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer";
  const buttonGreenBg = "bg-green-400 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer";
  const buttonRedBg = "bg-red-400 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer";
  const buttonYellowBg = "bg-yellow-400 dark:bg-yellow-600 hover:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 cursor-pointer";
  const sectionBg = "bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100";
  const sectionHeader = "text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 cursor-pointer hover:opacity-80 transition-opacity duration-200";
  const sectionDivider = "my-3 border-gray-300 dark:border-gray-700";
  const inputField = "p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:shadow-md transition-shadow duration-200 cursor-text w-full";
  const selectField = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 cursor-pointer hover:border-indigo-500 transition-border duration-200";
  const readOnlyField = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-not-allowed";
  const itemRowBg = "mt-2 flex items-center w-full gap-4 rounded-md p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200";
  const labelText = "block text-gray-700 dark:text-gray-300 text-sm font-bold mb-1 cursor-pointer hover:opacity-80 transition-opacity duration-200";
  const removeButton = "text-red-500 self-center cursor-pointer hover:text-red-700 transition-colors duration-200";
  const totalLabel = "text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1";
  const totalValue = "font-bold";
  const quoteInfoText = "text-sm text-gray-600 dark:text-gray-400 mb-1";

  const calculateSubcontractorTotal = (sub) => {
    return sub.cost * (1 + sub.markup / 100);
  };

  const calculateMiscTotal = (item) => {
    return item.cost * (1 + item.markup / 100);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const addLaborer = () => {
    const initialLaborType = laborTypes[0];
    setLaborers([
      ...laborers,
      {
        type: initialLaborType.type,
        hours: 0,
        timeType: timeTypes[0].type,
        rate: initialLaborType.rate,
      },
    ]);
  };
  const removeLaborer = (index) => {
    setLaborers(laborers.filter((_, i) => i !== index));
  };
  const updateLaborer = (index, field, value) => {
    const updatedLaborers = [...laborers];
    updatedLaborers[index][field] = value;

    if (field === "type" || field === "timeType") {
      const selectedLaborType = laborTypes.find((lt) => lt.type === updatedLaborers[index].type);
      const selectedTimeType = timeTypes.find((tt) => tt.type === updatedLaborers[index].timeType);

      let newRate = selectedLaborType?.rate || 0;
      if (selectedTimeType?.type === "Overtime") {
        newRate *= 1.5;
      } else if (selectedTimeType?.type === "Double Time") {
        newRate *= 2;
      }
      updatedLaborers[index].rate = newRate;
    }

    setLaborers(updatedLaborers);
  };

  const calculateLaborCost = (laborer) => {
    return laborer.hours * laborer.rate;
  };

  const totalLaborCostBeforeMarkup = laborers.reduce((sum, laborer) => sum + calculateLaborCost(laborer), 0);
  const totalSubcontractorCostBeforeMarkup = subcontractors.reduce((sum, sub) => sum + sub.cost, 0);
  const totalMiscCostBeforeMarkup = miscellaneous.reduce((sum, item) => sum + item.cost, 0);
  const totalSystemCostBeforeMarkup = systems.reduce((sum, system) => sum + Number(system.count), 0);

  const totalLaborCostWithMarkup = totalLaborCostBeforeMarkup; // No markup on labor for this example
  const totalSubcontractorCostWithMarkup = subcontractors.reduce((sum, sub) => sum + calculateSubcontractorTotal(sub), 0);
  const totalMiscCostWithMarkup = miscellaneous.reduce((sum, item) => sum + calculateMiscTotal(item), 0);
  const totalSystemCostWithMarkup = totalSystemCostBeforeMarkup; // No markup on systems for this example

  const jobCostBeforeMarkup = totalLaborCostBeforeMarkup + totalSubcontractorCostBeforeMarkup + totalMiscCostBeforeMarkup + totalSystemCostBeforeMarkup;
  const jobTotalWithMarkup = totalLaborCostWithMarkup + totalSubcontractorCostWithMarkup + totalMiscCostWithMarkup + totalSystemCostWithMarkup;
  const margin = jobTotalWithMarkup > 0 ? ((jobTotalWithMarkup - jobCostBeforeMarkup) / jobTotalWithMarkup) * 100 : 0;

  const addSubcontractor = () => {
    setSubcontractors([...subcontractors, { name: "", cost: 0, markup: 20 }]);
  };
  const removeSubcontractor = (index) => {
    setSubcontractors(subcontractors.filter((_, i) => i !== index));
  };
  const updateSubcontractor = (index, field, value) => {
    const updatedSubs = [...subcontractors];
    updatedSubs[index][field] = value;
    setSubcontractors(updatedSubs);
  };

  const addMiscItem = () => {
    setMiscellaneous([
      ...miscellaneous,
      { type: miscItems[0], cost: 0, markup: 20 },
    ]);
  };
  const removeMiscItem = (index) => {
    setMiscellaneous(miscellaneous.filter((_, i) => i !== index));
  };
  const updateMiscItem = (index, field, value) => {
    const updatedMisc = [...miscellaneous];
    updatedMisc[index][field] = value;
    setMiscellaneous(updatedMisc);
  };

  const addSystem = () => {
    setSystems([...systems, { type: equipmentTypes[0], count: 1 }]);
  };
  const removeSystem = (index) => {
    setSystems(systems.filter((_, i) => i !== index));
  };
  const updateSystem = (index, field, value) => {
    const updatedSystems = [...systems];
    updatedSystems[index][field] = value;
    setSystems(updatedSystems);
  };

  const leftSectionWidth = "60%"; // You can adjust this percentage
  const rightSectionWidth = "40%"; // The remaining percentage

  return (
    <div className="flex flex-col w-full">
      {/* Page Header */}
      <div className={`${headerGradient} py-6 px-8 flex items-center justify-between sticky top-0 z-10`}>
        <div className="flex flex-col">
          <h1 className={`${headerTextColor} text-3xl font-bold`}>Project Estimator</h1>
          <h2 className={`${headerSubTextColor} text-lg`}>Create and manage project estimates</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className={buttonBg}>
            <ArrowDownTrayIcon className="h-5 w-5" />
            Load
          </button>
          <button className={buttonGreenBg}>
            <DocumentPlusIcon className="h-5 w-5" />
            Save
          </button>
          <button className={buttonRedBg}>
            <TrashIcon className="h-5 w-5" />
            Delete
          </button>
          <button className={buttonYellowBg}>
            <CheckCircleIcon className="h-5 w-5" />
            Award
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full mt-6">
        {/* Left Section - Input Form */}
        <div
          className={`${sectionBg} max-w-none ml-0 p-6 rounded-lg shadow-md flex flex-col items-start mr-6 relative`}
          style={{ width: leftSectionWidth }}
        >
          {/* Quote Info (Top Right) */}
          <div className="absolute top-4 right-4 text-right">
            <p className={quoteInfoText}>
              Quote #: <span className="font-semibold">{customerInfo.quoteNumber}</span>
            </p>
            <p className={quoteInfoText}>
              Date: <span className="font-semibold">{customerInfo.quoteDate}</span>
            </p>
          </div>

          {/* Customer Info Section */}
          <div className="mb-6 w-full">
            <h2 className={`${sectionHeader}`}>
              Project Estimation
            </h2>
            <hr className={sectionDivider} />
            <h3 className={`${sectionHeader} text-lg font-semibold`}>
              Customer Information
            </h3>
            <div className="grid grid-cols-1 gap-4 w-full">
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={customerInfo.customerName}
                onChange={handleCustomerInfoChange}
                className={inputField}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                className={inputField}
              />
              <textarea
                name="jobDescription"
                placeholder="Job Description"
                value={customerInfo.jobDescription}
                onChange={handleCustomerInfoChange}
                className={inputField}
                rows="3"
              />
            </div>
          </div>

          {/* Labor Section */}
          <div className="mb-6 w-full">
            <h3 className={`${sectionHeader}`}>
              Labor Hours
            </h3>
            <hr className={sectionDivider} />
            <div className="flex justify-start mb-3">
              <button onClick={addLaborer} className={`${commonButtonClasses} mt-0`}>
                <PlusIcon className="h-5 w-5 text-white mr-2" /> Add Laborer
              </button>
            </div>
            {laborers.map((laborer, index) => (
              <div
                key={index}
                className={itemRowBg}
              >
                <div className="w-1/3">
                  <label
                    htmlFor={`labor-type-${index}`}
                    className={labelText}
                  >
                    Labor Type
                  </label>
                  <select
                    id={`labor-type-${index}`}
                    value={laborer.type}
                    onChange={(e) => updateLaborer(index, "type", e.target.value)}
                    className={selectField}
                  >
                    {laborTypes.map((lt) => (
                      <option key={lt.type} value={lt.type} className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700">
                        {lt.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/3">
                  <label
                    htmlFor={`time-type-${index}`}
                    className={labelText}
                  >
                    Time Type
                  </label>
                  <select
                    id={`time-type-${index}`}
                    value={laborer.timeType}
                    onChange={(e) => updateLaborer(index, "timeType", e.target.value)}
                    className={selectField}
                  >
                    {timeTypes.map((tt) => (
                      <option key={tt.type} value={tt.type} className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700">
                        {tt.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`labor-rate-${index}`}
                    className={labelText}
                  >
                    Labor Rate
                  </label>
                  <input
                    id={`labor-rate-${index}`}
                    type="number"
                    value={laborer.rate.toFixed(2)}
                    readOnly
                    className={readOnlyField}
                  />
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`labor-hours-${index}`}
                    className={labelText}
                  >
                    Hours
                  </label>
                  <input
                    id={`labor-hours-${index}`}
                    type="number"
                    value={laborer.hours}
                    onChange={(e) =>
                      updateLaborer(index, "hours", Number(e.target.value))
                    }
                    className={inputField}
                  />
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`labor-total-${index}`}
                    className={labelText}
                  >
                    Total
                  </label>
                  <span
                    id={`labor-total-${index}`}
                    className={`${readOnlyField}`}
                  >
                    ${calculateLaborCost(laborer).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => removeLaborer(index)}
                  className={removeButton}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Subcontractor Section */}
          <div className="mb-6 w-full">
            <h3 className={`${sectionHeader}`}>
              Subcontractors
            </h3>
            <hr className={sectionDivider} />
            <div className="flex justify-start mb-3">
              <button
                onClick={addSubcontractor}
                className={`${commonButtonClasses} bg-green-500 hover:bg-green-700 mt-0`}
              >
                <PlusIcon className="h-5 w-5 text-white mr-2" /> Add Sub
              </button>
            </div>
            {subcontractors.map((sub, index) => (
              <div
                key={index}
                className={itemRowBg}
              >
                <div className="w-1/4">
                  <label
                    htmlFor={`sub-name-${index}`}
                    className={labelText}
                  >
                    Name
                  </label>
                  <input
                    id={`sub-name-${index}`}
                    type="text"
                    value={sub.name}
                    onChange={(e) => updateSubcontractor(index, "name", e.target.value)}
                    placeholder="Name"
                    className={inputField}
                  />
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`sub-cost-${index}`}
                    className={labelText}
                  >
                    Cost
                  </label>
                  <input
                    id={`sub-cost-${index}`}
                    type="number"
                    value={sub.cost}
                    onChange={(e) => updateSubcontractor(index, "cost", Number(e.target.value))}
                    placeholder="Cost"
                    className={inputField}
                  />
                </div>
                <div className="relative w-24">
                  <label
                    htmlFor={`sub-markup-${index}`}
                    className={labelText}
                  >
                    Markup %
                  </label>
                  <input
                    id={`sub-markup-${index}`}
                    type="number"
                    value={sub.markup}
                    onChange={(e) =>
                      updateSubcontractor(index, "markup", Number(e.target.value))
                    }
                    placeholder="Markup %"
                    className={inputField}
                  />
                  <span className="absolute right-2 top-7 text-gray-500 dark:text-gray-300 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                    %
                  </span>
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`sub-total-${index}`}
                    className={labelText}
                  >
                    Total
                  </label>
                  <span
                    id={`sub-total-${index}`}
                    className={`${readOnlyField}`}
                  >
                    ${calculateSubcontractorTotal(sub).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => removeSubcontractor(index)}
                  className={removeButton}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Miscellaneous Section */}
          <div className="mb-6 w-full">
            <h3 className={`${sectionHeader}`}>
              Miscellaneous
            </h3>
            <hr className={sectionDivider} />
            <div className="flex justify-start mb-3">
              <button
                onClick={addMiscItem}
                className={`${commonButtonClasses} bg-yellow-500 hover:bg-yellow-700 mt-0`}
              >
                <PlusIcon className="h-5 w-5 text-white mr-2" /> Add Misc Item
              </button>
            </div>
            {miscellaneous.map((item, index) => (
              <div
                key={index}
                className={itemRowBg}
              >
                <div className="w-1/3">
                  <label
                    htmlFor={`misc-type-${index}`}
                    className={labelText}
                  >
                    Item Type
                  </label>
                  <select
                    id={`misc-type-${index}`}
                    value={item.type}
                    onChange={(e) => updateMiscItem(index, "type", e.target.value)}
                    className={selectField}
                  >
                    {miscItems.map((misc) => (
                      <option key={misc} value={misc} className="cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-700">
                        {misc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`misc-cost-${index}`}
                    className={labelText}
                  >
                    Cost
                  </label>
                  <input
                    id={`misc-cost-${index}`}
                    type="number"
                    value={item.cost}
                    onChange={(e) => updateMiscItem(index, "cost", Number(e.target.value))}
                    placeholder="Cost"
                    className={inputField}
                  />
                </div>
                <div className="relative w-24">
                  <label
                    htmlFor={`misc-markup-${index}`}
                    className={labelText}
                  >
                    Markup %
                  </label>
                  <input
                    id={`misc-markup-${index}`}
                    type="number"
                    value={item.markup}
                    onChange={(e) =>
                      updateMiscItem(index, "markup", Number(e.target.value))
                    }
                    placeholder="Markup %"
                    className={inputField}
                  />
                  <span className="absolute right-2 top-7 text-gray-500 dark:text-gray-300 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                    %
                  </span>
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`misc-total-${index}`}
                    className={labelText}
                  >
                    Total
                  </label>
                  <span
                    id={`misc-total-${index}`}
                    className={`${readOnlyField}`}
                  >
                    ${calculateMiscTotal(item).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => removeMiscItem(index)}
                  className={removeButton}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* System Information Section */}
          <div className="mb-6 w-full">
            <h3 className={`${sectionHeader}`}>
              System Information
            </h3>
            <hr className={sectionDivider} />
            <div className="flex justify-start mb-3">
              <button
                onClick={addSystem}
                className={`${commonButtonClasses} bg-purple-500 hover:bg-purple-700 mt-0`}
              >
                <PlusIcon className="h-5 w-5 text-white mr-2" /> Add Equipment
              </button>
            </div>
            {systems.map((system, index) => (
              <div
                key={index}
                className={itemRowBg}
              >
                <div className="w-2/3">
                  <label
                    htmlFor={`system-type-${index}`}
                    className={labelText}
                  >
                    Equipment Type
                  </label>
                  <select
                    id={`system-type-${index}`}
                    value={system.type}
                    onChange={(e) => updateSystem(index, "type", e.target.value)}
                    className={selectField}
                  >
                    {equipmentTypes.map((equipment) => (
                      <option key={equipment} value={equipment} className="cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-700">
                        {equipment}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <label
                    htmlFor={`system-count-${index}`}
                    className={labelText}
                  > Count
                  </label>
                  <input
                    id={`system-count-${index}`}
                    type="number"
                    value={system.count || ""}
                    onChange={(e) =>
                      updateSystem(index, "count", Number(e.target.value))
                    }
                    placeholder="Count"
                    className={inputField}
                  />
                </div>
                <button
                  onClick={() => removeSystem(index)}
                  className={removeButton}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div> {/* Closing tag for the left section div - ADDED HERE */}

        {/* Right Section - Total Breakdown */}
        <div
          className={`${sectionBg} max-w-none p-6 rounded-lg shadow-md flex flex-col items-start`}
          style={{ width: rightSectionWidth }}
        >
          <div className="mb-6 w-full">
            <h3 className={`${sectionHeader}`}>
              Total Breakdown
            </h3>
            <hr className={sectionDivider} />
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total Labor Hours: <span className={`${totalValue}`}>{laborers.reduce((sum, l) => sum + Number(l.hours), 0)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total Labor Cost: <span className={`${totalValue}`}>${totalLaborCostBeforeMarkup.toFixed(2)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total Subcontractor Cost: <span className={`${totalValue}`}>${totalSubcontractorCostBeforeMarkup.toFixed(2)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total Subcontractor Total: <span className={`${totalValue}`}>${totalSubcontractorCostWithMarkup.toFixed(2)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total Miscellaneous Cost: <span className={`${totalValue}`}>${totalMiscCostBeforeMarkup.toFixed(2)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total Miscellaneous Total: <span className={`${totalValue}`}>${totalMiscCostWithMarkup.toFixed(2)}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Total System Count: <span className={`${totalValue}`}>{totalSystemCostBeforeMarkup}</span>
            </p>
            <hr className={sectionDivider} />
            <p className={`${totalLabel}`}>
              Job Cost: <span className={`${totalValue}`}>${jobCostBeforeMarkup.toFixed(2)}</span>
            </p>
            <p className={`${totalLabel}`}>
              Job Total: <span className={`${totalValue}`}>${jobTotalWithMarkup.toFixed(2)}</span>
            </p>
            <p className={`${totalLabel}`}>
              Margin: <span className={`${totalValue}`}>{margin.toFixed(2)}%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEstimator;