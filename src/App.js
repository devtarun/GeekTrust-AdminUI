import { useState } from "react";
import "./styles.css";
import Table1 from "./Table/Table";
import Table2 from "./TableNew/Table";
import MOCKDATA from "./MOCK_DATA.json";

export default function App() {
  const [tableData, setTableData] = useState(MOCKDATA);

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>Without any plugins</h1>
      <Table1 data={tableData} setData={setTableData} />
      <hr
        style={{
          margin: "50px 0",
        }}
      />
      <h1 style={{ textAlign: "center" }}>With plugin: react-table</h1>
      <Table2 _data={tableData} _setData={setTableData} />
    </div>
  );
}
