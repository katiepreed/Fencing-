import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RefPage from "./RefPage";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";

/*

1. A set of order of matches 
2. Table is always populated in the same way (via the fencer number)
3. Order is done via the number associated to fencer 


TO DO:

1. Assign name to number via input
  - render via table (that is populated from input)

2. A new page for:

 - Timer (start / stop)
 - score for each player 
 - populate new page from button in table that provides names of player for that row. 

2. Info for table:
  - number (team 1)
  - name (team 1)
  - team score (column for each score e.g. (2: 5)
  - number (team 2)
  - name (team 2)

*/

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/refPage" element={<RefPage />} />
    </Routes>
  );
}

function HomePage() {
  const navigate = useNavigate();

  const handleClick = (matchID) => {
    navigate("/refPage", { matchID: { matchID } });
  };

  const [dataTeam, setDataTeam] = useState([
    {
      id: 1,
      name: "",
    },
    {
      id: 2,
      name: "",
    },
    {
      id: 3,
      name: "",
    },
    {
      id: 4,
      name: "",
    },
    {
      id: 5,
      name: "",
    },
    {
      id: 6,
      name: "",
    },
  ]);

  const team1 = dataTeam.slice(0, 3);
  const team2 = dataTeam.slice(3, 6);

  const data = React.useMemo(
    () => [
      {
        matchID: 1,
        homeNumber: 3,
        homeName: dataTeam[2].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(1)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[5].name,
        awayNumber: 6,
      },
      {
        matchID: 2,
        homeNumber: 1,
        homeName: dataTeam[0].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(2)}>Start</button>,        
        awayTeamScore: 0,
        awayName: dataTeam[4].name,
        awayNumber: 5,
      },
      {
        matchID: 3,
        homeNumber: 2,
        homeName: dataTeam[1].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(3)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[3].name,
        awayNumber: 4,
      },
      {
        matchID: 4,
        homeNumber: 1,
        homeName: dataTeam[0].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(4)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[5].name,
        awayNumber: 6,
      },
      {
        matchID: 5,
        homeNumber: 3,
        homeName: dataTeam[2].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(5)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[3].name,
        awayNumber: 4,
      },
      {
        matchID: 6,
        homeNumber: 2,
        homeName: dataTeam[1].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(6)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[4].name,
        awayNumber: 5,
      },
      {
        matchID: 7,
        homeNumber: 1,
        homeName: dataTeam[0].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(7)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[3].name,
        awayNumber: 4,
      },
      {
        matchID: 8,
        homeNumber: 2,
        homeName: dataTeam[1].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(8)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[5].name,
        awayNumber: 6,
      },
      {
        matchID: 9,
        homeNumber: 3,
        homeName: dataTeam[2].name,
        homeTeamScore: 0,
        matchScore: <button onClick={handleClick(9)}>Start</button>,
        awayTeamScore: 0,
        awayName: dataTeam[4].name,
        awayNumber: 5,
      },
    ],
    [dataTeam]
  );

  const handleInputChangeTeam = (id, value) => {
    setDataTeam((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, name: value } : row))
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Number",
        accessor: "homeNumber",
      },
      {
        Header: "Name",
        accessor: "homeName",
      },
      {
        Header: "Home Team Score",
        accessor: "homeTeamScore",
      },
      {
        Header: "Match Score",
        accessor: "matchScore",
      },
      {
        Header: "Away Team Score",
        accessor: "awayTeamScore",
      },
      {
        Header: "Name",
        accessor: "awayName",
      },
      {
        Header: "Number",
        accessor: "awayNumber",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Fencing Tournament Manager</h1>
        <p className="app-subtitle">Track matches, scores, and timing</p>
      </header>
      <div className="tables-container">
        <table border="1" cellPadding="10" className="team-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {team1.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    value={row.input}
                    onChange={(e) =>
                      handleInputChangeTeam(row.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table border="1" cellPadding="10" className="team-table">
          <thead>
            <tr>
              <th>Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {team2.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <input
                    type="text"
                    value={row.input}
                    onChange={(e) =>
                      handleInputChangeTeam(row.id, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="match-table-container">
        {/* Wrapper div to center the table */}
        <table {...getTableProps()} className="match-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-blue-500 text-white"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="p-3 border-b-2 border-gray-200"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={`border-b border-gray-300 ${
                    i % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-100 transition`}
                  key={i}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="p-3 text-center">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
