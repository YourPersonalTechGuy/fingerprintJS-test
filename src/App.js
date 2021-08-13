import "./App.css";
import { Table } from "antd";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
// import axios from "axios";
import { useState } from "react";

function App() {
  let [visitorID, setVisitorID] = useState(null);
  let [fpInfo, setFpInfo] = useState(null);

  FingerprintJS.load({ token: "vRAfqZN2JkpjoXL6tAaM" })
    .then((fp) => fp.get())
    .then((result) => {
      console.log(result);
      setVisitorID(result.visitorId);
      setFpInfo(null);
      console.log(visitorID);
    });

  const columns = [
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      ellipsis: true,
      fixed: "top",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      align: "left",
      fixed: "top",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      fixed: "top",
    },
  ];

  return (
    <div className="App">
      <Table columns={columns} dataSource={fpInfo} />
    </div>
  );
}

export default App;
