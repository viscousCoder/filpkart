// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Container,
//   Paper,
//   Grid,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { useNavigate } from "react-router-dom";
// import { userLogin } from "../../store/UserSlice";

// const LoginForm: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({
//     email: "",
//     password: "",
//   });

//   // Validation functions

//   const validateEmail = (email: string) =>
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   const validatePassword = (password: string) =>
//     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     let errorMessage = "";
//     switch (name) {
//       case "email":
//         errorMessage = validateEmail(value) ? "" : "Invalid email format";
//         break;
//       case "password":
//         errorMessage = validatePassword(value)
//           ? ""
//           : "Min 8 chars, 1 letter & 1 number";
//         break;
//       default:
//         break;
//     }
//     setErrors({ ...errors, [name]: errorMessage });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newErrors = {
//       email: validateEmail(formData.email) ? "" : "Invalid email format",
//       password: validatePassword(formData.password)
//         ? ""
//         : "Min 8 chars, 1 letter & 1 number",
//     };

//     setErrors(newErrors);

//     const isValid = Object.values(newErrors).every((error) => error === "");
//     if (isValid) {
//       console.log("Form submitted successfully!", formData);
//       // dispatch(loginAdminUser({ userData: formData, navigate }));
//       dispatch(userLogin({ userData: formData, navigate }));
//     } else {
//       alert("Please correct the errors before submitting.");
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Paper elevation={3} sx={{ padding: 3, mt: 5, borderRadius: 2 }}>
//         <Grid container spacing={2} alignItems="center">
//           {/* Left side - Image */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               background: "linear-gradient(to right, #007bff, #0056b3)",
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               color: "white",
//               padding: 4,
//               minHeight: "100%",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 textAlign: "center",
//                 padding: 3,
//               }}
//             >
//               <Box
//                 component="img"
//                 src="https://via.placeholder.com/400x400"
//                 alt="Welcome Illustration"
//                 sx={{
//                   width: "80%",
//                   height: "auto",
//                   borderRadius: 2,
//                   mb: 2,
//                 }}
//               />
//               <Typography variant="h4" fontWeight="bold">
//                 Join Us Today!
//               </Typography>
//               <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
//                 Create an account and start your journey with us.
//               </Typography>
//             </Box>
//           </Grid>

//           {/* Right side - Registration Form */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom textAlign="center">
//               Login
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} noValidate>
//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 type="password"
//                 label="Password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={!!errors.password}
//                 helperText={errors.password}
//                 margin="normal"
//               />

//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 sx={{ mt: 2 }}
//               >
//                 Login
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/UserSlice";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Common validation function
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "email":
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? ""
          : "Invalid email format";
      case "password":
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
          ? ""
          : "Min 8 chars, 1 letter & 1 number";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const errorMsg = validateField(
        key,
        formData[key as keyof typeof formData]
      );
      return { ...acc, [key]: errorMsg };
    }, {} as typeof errors);

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Form submitted successfully!", formData);
      dispatch(userLogin({ userData: formData, navigate }));
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Left Side - Image & Info */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              background: "linear-gradient(to right, #007bff, #0056b3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "white",
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 3,
              }}
            >
              <Box
                component="img"
                src="https://via.placeholder.com/400x400"
                alt="Welcome Illustration"
                sx={{ width: "80%", height: "auto", borderRadius: 2, mb: 2 }}
              />
              <Typography variant="h4" fontWeight="bold">
                Join Us Today!
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: "gray" }}>
                Create an account and start your journey with us.
              </Typography>
            </Box>
          </Grid>

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {["email", "password"].map((field) => (
                <TextField
                  key={field}
                  fullWidth
                  type={field === "password" ? "password" : "text"}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  error={!!errors[field as keyof typeof errors]}
                  helperText={errors[field as keyof typeof errors]}
                  margin="normal"
                />
              ))}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default LoginForm;
