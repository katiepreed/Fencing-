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
  const [dataTeam1, setDataTeam1] = useState([
    { id: 1, predefined: "Row 1", input: "" },
    { id: 2, predefined: "Row 2", input: "" },
    { id: 3, predefined: "Row 3", input: "" },
  ]);

  const [dataTeam2, setDataTeam2] = useState([
    { id: 1, predefined: "Row 1", input: "" },
    { id: 2, predefined: "Row 2", input: "" },
    { id: 3, predefined: "Row 3", input: "" },
  ]);

  const handleInputChangeTeam1 = (id, value) => {
    setDataTeam1((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, input: value } : row))
    );
  };

  const handleInputChangeTeam2 = (id, value) => {
    setDataTeam2((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, input: value } : row))
    );
  };

  return (
    <>
      <div className="tables">
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Predefined Column</th>
              <th>Input Column</th>
            </tr>
          </thead>
          <tbody>
            {dataTeam1.map((row) => (
              <tr key={row.id}>
                <td>{row.predefined}</td>
                <td>
                  <input
                    type="text"
                    value={row.input}
                    onChange={(e) =>
                      handleInputChangeTeam1(row.id, e.target.value)
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
              <th>Predefined Column</th>
              <th>Input Column</th>
            </tr>
          </thead>
          <tbody>
            {dataTeam2.map((row) => (
              <tr key={row.id}>
                <td>{row.predefined}</td>
                <td>
                  <input
                    type="text"
                    value={row.input}
                    onChange={(e) =>
                      handleInputChangeTeam2(row.id, e.target.value)
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
