import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch(
      "http://frontendapi00test.v6pohbale0-pxr4kozpq3gn.p.temp-site.link/api/create/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(values),
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://frontendapi00test.v6pohbale0-pxr4kozpq3gn.p.temp-site.link/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(values),
      }
    );
    console.log("here");

    const loggedIn = await loggedInResponse.json();

    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          token_type: loggedIn.token_type,
          token: loggedIn.access_token,
        })
      );
      navigate("/home");
    }
    console.log(JSON.stringify(values));
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  const isNonMobileScreen = useMediaQuery("(max-width:700px)");

  return (
    <Box>
      <Box width="100%" backgroundColor="alt" p="1rem 6%" textAlign="center">
        {" "}
        <Typography p="3rem" fontWeight="bold" fontSize="32px" color="primary">
          {isLogin ? "LOGIN" : "SIGN UP"}
        </Typography>
      </Box>{" "}
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        backgroundColor="alt"
        p="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
      >
        {" "}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {isRegister && (
                  <>
                    <TextField
                      label="Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name}
                      name="first_name"
                      placeholder="Enter Your Name"
                      error={
                        Boolean(touched.first_name) &&
                        Boolean(errors.first_name)
                      }
                      helperText={touched.first_name && errors.first_name}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Mobile Number"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      placeholder="Enter Your Mobile Number"
                      name="last_name"
                      error={
                        Boolean(touched.last_name) && Boolean(errors.last_name)
                      }
                      helperText={touched.last_name && errors.last_name}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </>
                )}

                <TextField
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Please Enter Your Email"
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Please Enter Your Password"
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>

              {/* BUTTONS */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "1rem 0",
                    width: "55%",
                    borderRadius: "7px",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </Button>
                <FlexBetween sx={{ flexDirection: "row", alignSelf: "end" }}>
                  {" "}
                  <Typography
                    sx={{ display: "flex" }}
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                  >
                    {isLogin
                      ? "If you haven't Registered yet?  "
                      : "If you already have an account?  "}
                  </Typography>{" "}
                  <Typography
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                    sx={{
                      display: "flex",
                      textDecoration: "underline",
                      color: palette.primary.main,
                      "&:hover": {
                        cursor: "pointer",
                        color: palette.primary.dark,
                      },
                    }}
                  >
                    {isLogin ? "    Sign Up here." : "   Login here."}
                  </Typography>{" "}
                </FlexBetween>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Form;
