import axios from "axios";

function TestServer() {
  let otp = 0;
  const send = () => {
    // axios
    //   .post("http://localhost:9999/api/auth/otp", {
    //     email: "votrieuvy1661@gmail.com",
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     otp = window.prompt("input your otp");
    //     console.log(otp);
    //   });
    // console.log(props.data);
  };
  const submit = () => {
    axios
      .post("http://localhost:9999/api/auth/register", {
        email: "votrieuvy1661@gmail.com",
        password: "vataweb123",
        firstName: "Vy",
        lastName: "CT",
        avatar: "/images/avatars/avatar(1).svg",
        birthDate: "2001-06-16",
        otp: otp,
      })
      .then((response) => console.log(response));
  };

  let a = "";

  if (!a) {
    var b = 0;
  }

  // const submit = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
  //       email: "votrieuvy1661@gmail.com",
  //       password: "vataweb123",
  //     })
  //     .then((response) => console.log(response.data));
  // };

  return <div>{b}</div>;
}

export default TestServer;
