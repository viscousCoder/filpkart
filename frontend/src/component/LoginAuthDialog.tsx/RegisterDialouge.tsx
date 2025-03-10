import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Button,
  Typography,
  styled,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createNewUser, userLogin } from "../../store/UserSlice";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
}

interface LoginState {
  email: string;
  password: string;
}

interface SignupState {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phonenumber: string;
}

interface AccountState {
  view: "login" | "signup";
  heading: string;
  subHeading: string;
}

interface ErrorState {
  [key: string]: string;
}

const Component = styled(DialogContent)`
  height: 70vh;
  width: 100%;
  padding: 0;
  padding-top: 0;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  width: 40%;
  height: 100%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;

const loginInitialValues: LoginState = {
  email: "",
  password: "",
};

const signupInitialValues: SignupState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phonenumber: "",
};

const accountInitialValues = {
  login: {
    view: "login" as const,
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup" as const,
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

// Regular expressions for validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
const phonenumberRegex = /^[0-9]{10}$/;
const nameRegex = /^[A-Za-z]+$/;

const RegisterDialouge: React.FC<LoginProps> = ({
  open,
  setOpen,
  setAccount,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [login, setLogin] = useState<LoginState>(loginInitialValues);
  const [signup, setSignup] = useState<SignupState>(signupInitialValues);
  const [error, setError] = useState<ErrorState>({});
  const [account, toggleAccount] = useState<AccountState>(
    accountInitialValues.login
  );

  useEffect(() => {
    setError({});
    const token = localStorage.getItem("token");
    if (token) setOpen(false);
  }, [login, signup]);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleFocus = (field: string) => {
    setError((prev: ErrorState) => ({ ...prev, [field]: "" }));
  };

  const loginUser = () => {
    const errors: ErrorState = {};

    if (!emailRegex.test(login.email)) {
      errors.email = "Please enter a valid Email/Mobile number";
    }

    if (!login.password || !passwordRegex.test(login.password)) {
      errors.password = "Password contain 8-15,uppercase,lowercase,special";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Login data:", login);
      handleClose();
      setAccount(login.email);
      dispatch(userLogin({ userData: login, navigate }));
    } else {
      setError(errors);
    }
  };

  const signupUser = () => {
    const errors: ErrorState = {};

    if (!signup.firstname || !nameRegex.test(signup.firstname)) {
      errors.firstname = "First name should only contain alphabets";
    }

    if (!signup.lastname || !nameRegex.test(signup.lastname)) {
      errors.lastname = "Last name should only contain alphabets";
    }

    if (!emailRegex.test(signup.email)) {
      errors.email = "Please enter a valid Email";
    }

    if (!signup.password || !passwordRegex.test(signup.password)) {
      errors.password = "Password contain 8-15,uppercase,lowercase,special";
    }

    if (!signup.phonenumber || !phonenumberRegex.test(signup.phonenumber)) {
      errors.phonenumber = "Phonenumber number should be 10 digits";
    }

    if (Object.keys(errors).length === 0) {
      console.log("Signup data:", signup);
      handleClose();
      setAccount(signup.email);
      dispatch(createNewUser({ userData: signup }));
      toggleAccount(accountInitialValues.signup);
      setError({});
    } else {
      setError(errors);
    }
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
    setError({});
  };

  const toggleSignin = () => {
    toggleAccount(accountInitialValues.login);
    setError({});
  };

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset" } }}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <Component>
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Image sx={{ width: { xs: "100%", md: "40%" } }}>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <Wrapper
              sx={{
                display: { sx: "block", md: "flex" },
              }}
            >
              <TextField
                variant="standard"
                onChange={onValueChange}
                name="email"
                label="Enter Email"
                onFocus={() => handleFocus("email")}
              />
              {error.email && <Error>{error.email}</Error>}
              <TextField
                variant="standard"
                onChange={onValueChange}
                name="password"
                label="Enter Password"
                onFocus={() => handleFocus("password")}
              />
              {error.password && <Error>{error.password}</Error>}
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={loginUser}>Login</LoginButton>
              <Text style={{ textAlign: "center" }}>OR</Text>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={toggleSignup}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={onInputChange}
                name="firstname"
                label="Enter Firstname"
                onFocus={() => handleFocus("firstname")}
              />
              {error.firstname && <Error>{error.firstname}</Error>}
              <TextField
                variant="standard"
                onChange={onInputChange}
                name="lastname"
                label="Enter Lastname"
                onFocus={() => handleFocus("lastname")}
              />
              {error.lastname && <Error>{error.lastname}</Error>}
              <TextField
                variant="standard"
                onChange={onInputChange}
                name="email"
                label="Enter Email"
                onFocus={() => handleFocus("email")}
              />
              {error.email && <Error>{error.email}</Error>}
              <TextField
                variant="standard"
                onChange={onInputChange}
                name="password"
                label="Enter Password"
                onFocus={() => handleFocus("password")}
              />
              {error.password && <Error>{error.password}</Error>}
              <TextField
                variant="standard"
                onChange={onInputChange}
                name="phonenumber"
                label="Enter Phonenumber"
                onFocus={() => handleFocus("phonenumber")}
              />
              {error.phonenumber && <Error>{error.phonenumber}</Error>}
              <LoginButton onClick={signupUser}>Continue</LoginButton>
              <CreateAccount onClick={toggleSignin}>
                Already have an account? signin
              </CreateAccount>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
};

export default RegisterDialouge;
