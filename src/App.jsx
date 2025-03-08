import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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
  /*
  const [dataTeam, setDataTeam] = useState([
    { id: 1, awayNumber: 1, nameHome: "", homeTeamScore: 0, matchScore: 0, awayTeamScore: 5, awayName: "Bob", awayNumber: 3},
  ]);
  */

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

  const handleInputChangeTeam = (id, value) => {
    setDataTeam((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, name: value } : row))
    );
  };

  return (
    <>
      <div className="tables">
        <table border="1" cellPadding="10">
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
        <table border="1" cellPadding="10">
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
    </>
  );
}

export default App;
