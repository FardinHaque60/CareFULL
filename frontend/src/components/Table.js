import React, { useState } from 'react';

const Table = ({weightData, heartData, stepsData, timeData}) => {
    const [activeTab, setActiveTab] = useState('Weight');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <div className="tab">
                <button style={{ marginRight: '0.5%' }} className={`btn btn-primary ${activeTab === 'Weight' ? 'active' : ''}`} onClick={() => handleTabClick('Weight')}>Weight</button>
                <button style={{ marginRight: '0.5%' }} className={`btn btn-primary ${activeTab === 'Heart' ? 'active' : ''}`} onClick={() => handleTabClick('Heart')}>Heart</button>
                <button style={{ marginRight: '0.5%' }} className={`btn btn-primary ${activeTab === 'Steps' ? 'active' : ''}`} onClick={() => handleTabClick('Steps')}>Steps</button>
                <button style={{ marginRight: '0.5%' }} className={`btn btn-primary ${activeTab === 'Time' ? 'active' : ''}`} onClick={() => handleTabClick('Time')}>Time</button>
            </div>

            {activeTab === 'Weight' && <WeightTable weightData={weightData} />}
            {activeTab === 'Heart' && <HeartTable heartData={heartData} />}
            {activeTab === 'Steps' && <StepsTable stepsData={stepsData} />}
            {activeTab === 'Time' && <TimeTable timeData={timeData} />}
        </div>
    );
}

const WeightTable = ({weightData}) => {
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Weight Entry (lbs)</th>
                    {/* Add more headers if needed */}
                </tr>
            </thead>
            <tbody>
                {weightData.length > 0 ?
                (weightData.map((row, index) => (
                    <tr key={index}> 
                        <td>{row.date}</td>
                        <td>{row.weightEntry}</td>
                    </tr>
                ))) : 
                <tr>
                    <td colSpan="3">No data available</td>
                </tr>
                }
            </tbody>
        </table>
    );
};

const HeartTable = ({heartData}) => {
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Heart Rate Entry (bpm)</th>
                    {/* Add more headers if needed */}
                </tr>
            </thead>
            <tbody>
                {heartData.length > 0 ? 
                (heartData.map((row, index) => (
                    <tr key={index}> 
                        <td>{row.date}</td>
                        <td>{row.heartEntry}</td>
                    </tr>
                ))) :
                <tr>
                    <td colSpan="3">No data available</td>
                </tr>
                }
            </tbody>
        </table>
    );
};

const StepsTable = ({stepsData}) => {
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Steps Entry</th>
                    {/* Add more headers if needed */}
                </tr>
            </thead>
            <tbody>
                {stepsData.length > 0 ? 
                (stepsData.map((row, index) => (
                    <tr key={index}> 
                        <td>{row.date}</td>
                        <td>{row.stepsEntry}</td>
                    </tr>
                ))) :
                <tr>
                    <td colSpan="3">No data available</td>
                </tr>
                }
            </tbody>
        </table>
    );
};

const TimeTable = ({timeData}) => {
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Type</th>
                    <th scope="col">Time Entry (Hours)</th>
                    {/* Add more headers if needed */}
                </tr>
            </thead>
            <tbody>
                {timeData.length > 0 ?
                (timeData.map((row, index) => (
                    <tr key={index}> 
                        <td>{row.date}</td>
                        <td>{row.timeType}</td>
                        <td>{row.timeEntry}</td>
                    </tr>
                ))) :
                <tr>
                    <td colSpan="3">No data available</td>
                </tr>
                }
            </tbody>
        </table>
    );
};

export default Table;