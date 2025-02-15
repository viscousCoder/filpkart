// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Autocomplete,
//   Container,
//   Paper,
//   Grid,
// } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../store/store.tsx";
// import { Link } from "react-router-dom";
// import { createNewUser } from "../../store/UserSlice.tsx";
// import backgroundImage from "../../assets/signup.png";

// // const genders = ["Male", "Female", "Other"];
// const roles = ["USER", "ADMIN"];

// const RegisterForm: React.FC = () => {
//   // const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     // age: "",
//     phonenumber: "",
//     email: "",
//     password: "",
//     // gender: "",
//     role: "",
//   });

//   const [errors, setErrors] = useState({
//     firstname: "",
//     lastname: "",
//     // age: "",
//     phonenumber: "",
//     email: "",
//     password: "",
//     // gender: "",
//     role: "",
//   });

//   // Validation functions
//   const validateName = (name: string) => /^[A-Za-z]{4,}$/.test(name);
//   const validatePhone = (phone: string) => /^[0-9]{10}$/.test(phone);
//   const validateEmail = (email: string) =>
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   const validatePassword = (password: string) =>
//     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
//   // const validateAge = (age: string) => {
//   //   const ageNum = Number(age);
//   //   return ageNum >= 18 && ageNum <= 100;
//   // };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value.toString() });

//     let errorMessage = "";
//     switch (name) {
//       case "firstname":
//       case "lastname":
//         errorMessage = validateName(value)
//           ? ""
//           : "Must be at least 4 letters (no numbers)";
//         break;
//       case "phonenumber":
//         errorMessage = validatePhone(value) ? "" : "Must be a 10-digit number";
//         break;
//       case "email":
//         errorMessage = validateEmail(value) ? "" : "Invalid email format";
//         break;
//       case "password":
//         errorMessage = validatePassword(value)
//           ? ""
//           : "Min 8 chars, 1 letter & 1 number";
//         break;
//         // case "age":
//         //   errorMessage = validateAge(value) ? "" : "Age must be 18-100";
//         break;
//       default:
//         break;
//     }
//     setErrors({ ...errors, [name]: errorMessage });
//   };

//   const handleAutocompleteChange = (name: string, value: string | null) => {
//     setFormData({ ...formData, [name]: value || "" });
//     setErrors({ ...errors, [name]: value ? "" : "This field is required" });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newErrors = {
//       firstname: validateName(formData.firstname)
//         ? ""
//         : "Must be at least 4 letters",
//       lastname: validateName(formData.lastname)
//         ? ""
//         : "Must be at least 4 letters",
//       phonenumber: validatePhone(formData.phonenumber)
//         ? ""
//         : "Must be a 10-digit number",
//       email: validateEmail(formData.email) ? "" : "Invalid email format",
//       password: validatePassword(formData.password)
//         ? ""
//         : "Min 8 chars, 1 letter & 1 number",
//       // age: validateAge(formData.age) ? "" : "Age must be between 18 and 100",
//       // gender: formData.gender ? "" : "This field is required",
//       role: formData.role ? "" : "This field is required",
//     };

//     setErrors(newErrors);

//     const isValid = Object.values(newErrors).every((error) => error === "");
//     if (isValid) {
//       console.log("Form submitted successfully!", formData);
//       // alert("Form submitted successfully! Check console for details.");

//       // dispatch(createAdminUser({ userData: formData, navigate }));
//       dispatch(createNewUser({ userData: formData }));
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
//               backgroundImage: `url(${backgroundImage})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               textAlign: "center",
//               color: "white",
//               padding: 4,
//               minHeight: "38rem",
//             }}
//           ></Grid>

//           {/* Right side - Registration Form */}
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom textAlign="center">
//               Register
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit} noValidate>
//               <TextField
//                 fullWidth
//                 label="First Name"
//                 name="firstname"
//                 value={formData.firstname}
//                 onChange={handleChange}
//                 error={!!errors.firstname}
//                 helperText={errors.firstname}
//                 margin="normal"
//               />
//               <TextField
//                 fullWidth
//                 label="Last Name"
//                 name="lastname"
//                 value={formData.lastname}
//                 onChange={handleChange}
//                 error={!!errors.lastname}
//                 helperText={errors.lastname}
//                 margin="normal"
//               />

//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 name="phonenumber"
//                 value={formData.phonenumber}
//                 onChange={handleChange}
//                 error={!!errors.phonenumber}
//                 helperText={errors.phonenumber}
//                 margin="normal"
//               />
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

//               <Autocomplete
//                 options={roles}
//                 value={formData.role}
//                 onChange={(_, value) => handleAutocompleteChange("role", value)}
//                 renderInput={(params) => (
//                   <TextField
//                     {...params}
//                     label="Role"
//                     error={!!errors.role}
//                     helperText={errors.role}
//                     margin="normal"
//                   />
//                 )}
//               />
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 sx={{ mt: 2 }}
//               >
//                 Register
//               </Button>
//               <Link to="/admin/login">
//                 Already have an accound , start your journey with us.
//               </Link>
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default RegisterForm;

import React, { useState, useCallback } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Autocomplete,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store.tsx";
import { Link } from "react-router-dom";
import { createNewUser } from "../../store/UserSlice.tsx";
import backgroundImage from "../../assets/signup.png";
import { validateFormField } from "../../utils/validation.ts";

const roles = ["USER", "ADMIN"];

// 🔹 Reusable Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={error}
    margin="normal"
  />
);

const RegisterForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateFormField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  const handleAutocompleteChange = useCallback((value: string | null) => {
    setFormData((prev) => ({ ...prev, role: value || "" }));
    setErrors((prev) => ({ ...prev, role: value ? "" : "Role is required" }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      newErrors[key] = validateFormField(key, value);
    });

    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => error === "")) {
      console.log("Submitting:", formData);
      dispatch(createNewUser({ userData: formData }));
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Left Image Section */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "38rem",
            }}
          />

          {/* Right Form Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <FormInput
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                error={errors.firstname}
              />
              <FormInput
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                error={errors.lastname}
              />
              <FormInput
                label="Phone Number"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                error={errors.phonenumber}
              />
              <FormInput
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              {/* Role Selector */}
              <Autocomplete
                options={roles}
                value={formData.role}
                onChange={(_, value) => handleAutocompleteChange(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Role"
                    error={!!errors.role}
                    helperText={errors.role}
                    margin="normal"
                  />
                )}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Register
              </Button>
              <Link to="/admin/login">
                Already have an account? Log in here.
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
