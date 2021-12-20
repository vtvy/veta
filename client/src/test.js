import axios from "axios";

function Test() {
  //   let otp = 0;
  //   const send = () => {
  //     axios
  //       .post("http://localhost:9999/api/auth/otp", {
  //         email: "votrieuvy1661@gmail.com",
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //         otp = window.prompt("input your otp");
  //         console.log(otp);
  //       });
  //   };
  //   const submit = () => {
  //     axios
  //       .post("http://localhost:9999/api/auth/register", {
  //         email: "votrieuvy1661@gmail.com",
  //         password: "vataweb123",
  //         firstName: "Vy",
  //         lastName: "CT",
  //         avatar: "/images/avatars/avatar(1).svg",
  //         birthDate: "2001-06-16",
  //         otp: otp,
  //       })
  //       .then((response) => console.log(response));
  //   };

  const submit = () => {
    axios
      .post("http://localhost:9999/api/auth/login", {
        email: "votrieuvy1661@gmail.com",
        password: "vataweb123",
      })
      .then((response) => console.log(response.data));
  };

  return (
    <div>
      {/* <button onClick={send}>Send OTP</button> */}
      <button onClick={submit}>Click here</button>
    </div>
  );
}

export default Test;
