import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RefPage from "./RefPage";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";

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

  // Load team data from localStorage or use default empty values
  const [dataTeam, setDataTeam] = useState(() => {
    const savedTeams = localStorage.getItem("fencingTeams");
    if (savedTeams) {
      return JSON.parse(savedTeams);
    }
    return [
      { id: 1, name: "" },
      { id: 2, name: "" },
      { id: 3, name: "" },
      { id: 4, name: "" },
      { id: 5, name: "" },
      { id: 6, name: "" },
    ];
  });

  // Save team data whenever it changes
  useEffect(() => {
    localStorage.setItem("fencingTeams", JSON.stringify(dataTeam));
  }, [dataTeam]);

  const team1 = dataTeam.slice(0, 3);
  const team2 = dataTeam.slice(3, 6);

  // Store match data with matchStatus instead of React components
  const [matchData, setMatchData] = useState(() => {
    const savedMatches = localStorage.getItem("fencingMatches");
    if (savedMatches) {
      return JSON.parse(savedMatches);
    }
    return [
      {
        matchID: 1,
        homeNumber: 3,
        homeName: dataTeam[2].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[5].name,
        awayNumber: 6,
      },
      {
        matchID: 2,
        homeNumber: 1,
        homeName: dataTeam[0].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[4].name,
        awayNumber: 5,
      },
      {
        matchID: 3,
        homeNumber: 2,
        homeName: dataTeam[1].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[3].name,
        awayNumber: 4,
      },
      {
        matchID: 4,
        homeNumber: 1,
        homeName: dataTeam[0].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[5].name,
        awayNumber: 6,
      },
      {
        matchID: 5,
        homeNumber: 3,
        homeName: dataTeam[2].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[3].name,
        awayNumber: 4,
      },
      {
        matchID: 6,
        homeNumber: 2,
        homeName: dataTeam[1].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[4].name,
        awayNumber: 5,
      },
      {
        matchID: 7,
        homeNumber: 1,
        homeName: dataTeam[0].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[3].name,
        awayNumber: 4,
      },
      {
        matchID: 8,
        homeNumber: 2,
        homeName: dataTeam[1].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[5].name,
        awayNumber: 6,
      },
      {
        matchID: 9,
        homeNumber: 3,
        homeName: dataTeam[2].name,
        homeTeamScore: 0,
        matchStatus: "notStarted",
        awayTeamScore: 0,
        awayName: dataTeam[4].name,
        awayNumber: 5,
      },
    ];
  });

  // Update match data when team names change
  useEffect(() => {
    setMatchData((prevMatches) =>
      prevMatches.map((match) => {
        // Find correct team names based on match numbers
        const homeTeam = dataTeam.find((team) => team.id === match.homeNumber);
        const awayTeam = dataTeam.find((team) => team.id === match.awayNumber);

        return {
          ...match,
          homeName: homeTeam ? homeTeam.name : "",
          awayName: awayTeam ? awayTeam.name : "",
        };
      })
    );
  }, [dataTeam]);

  // Save match data whenever it changes
  useEffect(() => {
    localStorage.setItem("fencingMatches", JSON.stringify(matchData));
  }, [matchData]);

  const handleClick = (matchID) => {
    // Update the match status in the local state
    const updatedMatchData = matchData.map((match) =>
      match.matchID === matchID
        ? { ...match, matchStatus: "inProgress" }
        : match
    );
    setMatchData(updatedMatchData);

    // Find the match to navigate with
    const matchToNavigate = matchData.find(
      (match) => match.matchID === matchID
    );

    // Navigate to the ref page with the match data
    navigate("/refPage", { state: { matchData: matchToNavigate } });
  };

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
        Header: "Match",
        accessor: "matchStatus",
        // Custom cell renderer for the match status column
        Cell: ({ row }) =>
          row.original.matchStatus === "notStarted" ? (
            <button onClick={() => handleClick(row.original.matchID)}>
              Start
            </button>
          ) : (
            `${row.original.homeTeamScore} - ${row.original.awayTeamScore}`
          ),
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
      data: matchData,
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
                    value={row.name}
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
                    value={row.name}
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
