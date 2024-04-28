import React, { useEffect, useState } from "react";
import useMe from "../../hooks/useMe";
import Navbar from "../../components/Navbar";
import { GetRebateApiResponseType, getAdminRebateApi } from "../../api";

export default function Rebate() {
  const me = useMe();
  const [rebate, setRebate] = useState<GetRebateApiResponseType[]>([])
  useEffect(() => {
    (async () => {
        try {
            const responses = await Promise.all([getAdminRebateApi()])
            setRebate(responses[0].data)
        } catch (err) {}
    })()
},[])
  return (
    <div className="homeBg h-screen">
      <Navbar me={me} />
      <div
        style={{
          background:
            "linear-gradient(180.03deg, rgba(217, 217, 217, 0.74) 2.4%, rgba(217, 217, 217, 0.43) 99.98%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.7)",
          marginTop: "2rem",
        }}
      >
        <p>Rebate</p>
        <table className="w-full">
          <thead>
            <th>S.No.</th>
            <th>Rebate Id</th>
            <th>No. of Days</th>
            <th>From</th>
            <th>To</th>
          </thead>
          <tbody>
            {rebate.map((ele, index) => (
              <tr key={`${ele.rebateId}`} className="text-center border">
                <td>{index + 1}</td>
                <td>{ele.rebateId}</td>
                <td>{ele.days}</td>
                <td>{ele.from}</td>
                <td>{ele.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
