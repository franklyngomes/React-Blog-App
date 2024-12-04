import { Button, TextField } from "@mui/material";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setData(data => ({
      ...data,
      [name] : value
    }))
  }
  const ClickFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        endPoints.auth.signin, data);
      if (response.status === 200) {
        localStorage.getItem("token", response.data.token);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={ClickFunction}>
      <TextField
        onChange={handleChange}
        name="email"
        value={data.email}
        className=""
        label="Email"
        type="email"
        variant="outlined"
        color="secondary"
        sx={{ m: 1, width: "50ch" }}
      />
      <br />
      <TextField
        onChange={handleChange}
        name="password"
        value={data.password}
        className=""
        label="Password"
        type="password"
        variant="outlined"
        color="secondary"
        sx={{ m: 1, width: "50ch" }}
      />
      <br />
      <Button variant="outlined" color="secondary" type="submit">
        Submit
      </Button>
    </form>
  );
}
