import "./App.css";
import { Table } from "antd";
import FingerprintJS from "@fingerprintjs/fingerprintjs-pro";
import axios from "axios";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

function App() {
  let [visitorID, setVisitorID] = useState(null);
  let [fpInfo, setFpInfo] = useState(null);

  useEffect(() => {
    FingerprintJS.load({ token: "KOvSOQ8tGOvM1XhMY7YG" })
      .then((fp) => fp.get())
      .then((result) => {
        console.log(result);
        setVisitorID(result.visitorId);
      });
  });

  useEffect(() => {
    console.log(visitorID);
    axios
      .get(
        `https://api.fpjs.io/visitors/${visitorID}?token=EoaDEifytrYzG7tca3df&limit=10000`
      )
      .then((res) => {
        console.log(res.data);
        setFpInfo(res.data.visits);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [visitorID]);

  useEffect(() => {
    console.log(fpInfo);
  }, [fpInfo]);

  const columns = [
    {
      title: "URL",
      dataIndex: "url",
      fixed: "top",
    },
    {
      title: "RequestID",
      dataIndex: "requestId",
      fixed: "top",
    },
    {
      title: "IP",
      dataIndex: "ip",
      fixed: "top",
    },
    {
      title: "Device",
      dataIndex: "browserDetails",
      fixed: "top",
      render: (data) => {
        return `${data.device}`;
      },
    },
    {
      title: "Browser",
      dataIndex: "browserDetails",
      fixed: "top",
      render: (data) => {
        return `${data.browserName} ${data.browserFullVersion}`;
      },
    },
    {
      title: "Operating System",
      dataIndex: "browserDetails",
      fixed: "top",
      render: (data) => {
        return `${data.os} ${data.osVersion}`;
      },
    },
    {
      title: "Incognito",
      dataIndex: "incognito",
      fixed: "top",
      render: (data) => {
        return data ? "Yes" : "No";
      },
    },
    {
      title: "Location",
      dataIndex: "ipLocation",
      fixed: "top",
      render: (data) => {
        return `${data.city.name} ${data.subdivisions[0].isoCode}, ${data.postalCode}, ${data.country.name}`;
      },
    },
    {
      title: "Date and Time",
      dataIndex: "time",
      key: "time",
      fixed: "top",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        let aTime = DateTime.fromISO(a.time);
        let bTime = DateTime.fromISO(b.time);

        return aTime - bTime;
      },
      render: (data) => {
        return `${data.slice(0, 10)} ${data.slice(11, 19)}  `;
      },
    },
    {
      title: "Time Zone",
      dataIndex: "ipLocation",
      fixed: "top",
      render: (data) => {
        return `${data.timezone}`;
      },
    },
  ];

  return (
    <div className="App">
      <h1>Your ID is: {visitorID}</h1>
      <Table
        columns={columns}
        dataSource={fpInfo}
        key={"requestId"}
        pagination={{
          pageSize: 20,
          position: ["bottomCenter"],
          total: fpInfo ? fpInfo.length : 0,
          showTotal(total, range) {
            return `${range[0]}-${range[1]} of ${total} items`;
          },
        }}
      />
    </div>
  );
}

export default App;
