import { useForm } from "react-hook-form";
import { Button, TextField, Stack, Typography } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../../../api/axios";
import { endPoints } from "../../../api/endPoints";
import toast from 'react-hot-toast';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [image, setImage] = useState();
  const ClickFunction = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("mobile", data.mobile);
    formData.append("password", data.password);
    formData.append("photo", image);
    try {
      const  response = await axiosInstance.post(endPoints.auth.signup,formData);
      if(response.status === 200){
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(ClickFunction)}>
      <TextField
        className={errors.name ? "input-error" : ""}
        {...register("name", {
          required: "Name is required",
        })}
        label="Name"
        type="text"
        variant="outlined"
        color="secondary"
        error={errors.name}
        helperText={errors.name && errors.name.message}
        sx={{m:1, width: '50ch'}}
      />
      <br />
      <TextField
        className={errors.email ? "input-error" : ""}
        {...register("email", {
          required: "email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        label="Email"
        type="email"
        variant="outlined"
        color="secondary"
        error={errors.email}
        helperText={errors.email && errors.email.message}
        sx={{m:1, width: '50ch'}}
      />
      <br />
      <TextField
        className={errors.mobile ? "input-error" : ""}
        {...register("mobile", {
          required: "Mobile number is required",
        })}
        label="Mobile"
        type="number"
        variant="outlined"
        color="secondary"
        error={errors.mobile}
        helperText={errors.mobile && errors.mobile.message}
        sx={{m:1, width: '50ch'}}
      />
      <br />
      <TextField
        className={errors.password ? "input-error" : ""}
        {...register("password", {
          required: "Password is required",
        })}
        label="Password"
        type="password"
        variant="outlined"
        color="secondary"
        error={errors.password}
        helperText={errors.password && errors.password.message}
        sx={{m:1, width: '50ch'}}
      />
      <br />
      <TextField
        {...register("photo", {
          required: "Photo is required",
        })}
        type="file"
        variant="outlined"
        color="secondary"
        onChange={(e) => setImage(e.target.files[0])}
        error={!!errors.photo}
        helperText={errors.photo && errors.photo.message}
        fullWidth
        sx={{ backgroundColor: "white", borderRadius: "5px", mb: 4 , width: '50ch'}}
      />
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        style={{
          display: `${image ? "flex" : "none"}`,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <img
          src={image && URL.createObjectURL(image)}
          height={100}
          width={"auto"}
          style={{ borderRadius: "10px" }}
        />
        {image && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            Selected file: {image.name}
          </Typography>
        )}
      </Stack>
      <br />
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}
