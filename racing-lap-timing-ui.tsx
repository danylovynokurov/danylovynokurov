import React, { useState } from 'react';

const RacingLapTimingSystem = () => {
  const [driverNames, setDriverNames] = useState([]);
  const [newDriverName, setNewDriverName] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [lapMinutes, setLapMinutes] = useState('');
  const [lapSeconds, setLapSeconds] = useState('');
  const [lapMilliseconds, setLapMilliseconds] = useState('');
  const [penaltySeconds, setPenaltySeconds] = useState(0);
  const [lapTimes, setLapTimes] = useState({});
  const [penalties, setPenalties] = useState({});

  const handleAddDriver = () => {
    if (newDriverName.trim() !== '') {
      setDriverNames([...driverNames, newDriverName.trim()]);
      setNewDriverName('');
    }
  };

  const handleSelectDriver = (driver) => {
    setSelectedDriver(driver);
  };

  const handleAddLap = () => {
    if (selectedDriver && lapMinutes && lapSeconds && lapMilliseconds) {
      const formattedLapTime = `${lapMinutes.padStart(2, '0')}:${lapSeconds.padStart(2, '0')}.${lapMilliseconds.padStart(3, '0')}`;
      const formattedPenaltySeconds = penaltySeconds.toString().padStart(2, '0');

      setLapTimes((prevLapTimes) => ({
        ...prevLapTimes,
        [selectedDriver]: [...(prevLapTimes[selectedDriver] || []), formattedLapTime],
      }));

      setPenalties((prevPenalties) => ({
        ...prevPenalties,
        [selectedDriver]: [...(prevPenalties[selectedDriver] || []), formattedPenaltySeconds],
      }));

      setSelectedDriver('');
      setLapMinutes('');
      setLapSeconds('');
      setLapMilliseconds('');
      setPenaltySeconds(0);
    }
  };

  const handleReset = () => {
    setDriverNames([]);
    setSelectedDriver('');
    setLapTimes({});
    setPenalties({});
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Racing Lap Timing System</h1>
      <div className="mb-4">
        <label htmlFor="new-driver-name" className="block mb-2 font-medium">
          Add New Driver
        </label>
        <div className="flex space-x-2">
          <input
            id="new-driver-name"
            type="text"
            value={newDriverName}
            onChange={(e) => setNewDriverName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter driver name"
          />
          <button
            onClick={handleAddDriver}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="selected-driver" className="block mb-2 font-medium">
          Select Driver
        </label>
        <select
          id="selected-driver"
          value={selectedDriver}
          onChange={(e) => handleSelectDriver(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a driver</option>
          {driverNames.map((driver) => (
            <option key={driver} value={driver}>
              {driver}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="lap-time" className="block mb-2 font-medium">
            Lap Time
          </label>
          <div className="flex space-x-2">
            <input
              id="lap-minutes"
              type="number"
              min="0"
              max="99"
              value={lapMinutes}
              onChange={(e) => setLapMinutes(e.target.value)}
              className="w-16 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center">:</span>
            <input
              id="lap-seconds"
              type="number"
              min="0"
              max="59"
              value={lapSeconds}
              onChange={(e) => setLapSeconds(e.target.value)}
              className="w-16 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center">.</span>
            <input
              id="lap-milliseconds"
              type="number"
              min="0"
              max="999"
              value={lapMilliseconds}
              onChange={(e) => setLapMilliseconds(e.target.value)}
              className="w-16 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label htmlFor="penalty-seconds" className="block mb-2 font-medium">
            Penalty (seconds)
          </label>
          <input
            id="penalty-seconds"
            type="number"
            min="0"
            value={penaltySeconds}
            onChange={(e) => setPenaltySeconds(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-end justify-end">
          <button
            onClick={handleAddLap}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Add Lap
          </button>
        </div>
      </div>
      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-gray-200 text-left">Driver</th>
              <th className="px-4 py-2 bg-gray-200 text-left">Lap Times</th>
              <th className="px-4 py-2 bg-gray-200 text-left">Penalties (s)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(lapTimes).map(([driver, laps]) => (
              <tr key={driver} className="border-b">
                <td className="px-4 py-2">{driver}</td>
                <td className="px-4 py-2">
                  {laps.map((lap, index) => (
                    <div key={index}>{lap}</div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  {(penalties[driver] || []).map((penalty, index) => (
                    <div key={index}>{penalty}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
        >
          Reset
        </button>
        <div>
          <span className="mr-2">Drivers:</span>
          {driverNames.length > 0
            ? driverNames.map((driver, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 mr-2 rounded ${
                    driver === selectedDriver
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handleSelectDriver(driver)}
                >
                  {driver}
                </span>
              ))
            : 'No drivers added'}
        </div>
      </div>
    </div>
  );
};

export default RacingLapTimingSystem;
