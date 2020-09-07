import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function DisplayComp() {
  const [unis, setUnis] = useState([]);
  const cookies = new Cookies();
  const user = cookies.get("id");
  const data = { user: user };
  useEffect(() => {
    axios
      .post("http://localhost:4000/getunis", data)
      .then((response) => {
        console.log(response.data);
        setUnis(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th>Uni Name</th>
          <th>student no</th>
          <th>web URL</th>
          <th>Register Date</th>
          <th>Expiration Date</th>
          <th>email</th>
          <th>contact</th>
        </tr>
      </thead>
      <tbody>
        {unis.map((uni) => (
          <tr key={uni.email}>
            <td>{uni.uniname}</td>
            <td>{uni.studentNo}</td>
            <td>{uni.webURL}</td>
            <td>{uni.regDate}</td>
            <td>{uni.expDate}</td>
            <td>{uni.email}</td>
            <td>{uni.contact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DisplayComp;
