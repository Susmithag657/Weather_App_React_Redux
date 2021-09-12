import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { addUser } from "../actions/ActionCreators";
import axios from "axios";

const SignUp = ({ addUser }) => {
  let initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    toggle: false
  };
  const history = useHistory();
  const handleBlur = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
    // if(e.target.name=='email'){
    //   axios.get(
    //     `https://sheet.best/api/sheets/6e5cecfd-c1ca-446c-9e8e-5a51a92bde67/search?email=*${email}`).then(res=>{
    //       if(res.data.length){

    //       }
    //     });
    // };
  };
  const validatePassword = (e) => {
    if (e.target.value !== user.password) {
      seterror({ error: "Password doesnt match" });
    } else seterror({ error: "" });
  };
  const [user, setuser] = useState(initialState);
  const [error, seterror] = useState({ error: "" });
  const [disabled, setdisabled] = useState(true);

  const onSubmit = (values, actions) => {
    if (values.toggle) {
      actions.setSubmitting = true;
      console.log("values :" + values);
      addUser(values)
        .then((res) => {
          console.log(res);
          actions.setSubmitting = false;
          actions.resetForm();
          history.push("/Home");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Please accept terms and conditions");
    }
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please provide Name"),
    email: yup.string().email("Invalid email").required("Please provide email"),
    // .test("Unique Email", "This email already exists", function (value) {
    //   axios
    //     .get(
    //       `https://sheet.best/api/sheets/6e5cecfd-c1ca-446c-9e8e-5a51a92bde67/search?email=*${value}`
    //     )
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data.length > 0) {
    //         return true;
    //       }
    //       return false;
    //     });
    // })
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password should be 8 chars minimum."),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (password && password.length > 0 ? true : false),
        then: yup
          .string()
          .oneOf([yup.ref("password")], "Password doesn't match")
      }),
    toggle: yup.bool().oneOf([true], "Please Accept Terms & Conditions")
  });
  return (
    <div className="card container mt-5">
      <h1 className="title">
        <strong>Sign Up</strong>
      </h1>
      <div className="card-body">
        <div className="d-flex justify-content-around flex-md-wrap">
          <div>
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ isValid, isSubmitting }) => (
                <Form>
                  <div className="input-container">
                    <i className="fas fa-user icon"></i>
                    <div>
                      <Field
                        className="mb-3"
                        type="input"
                        name="name"
                        placeholder="Your Name"
                        onBlur={(e) => handleBlur(e)}
                      />

                      <ErrorMessage name="name">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="input-container">
                    <i className="fas fa-envelope icon"></i>
                    <div>
                      <Field
                        className="mb-3"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        onBlur={(e) => handleBlur(e)}
                      />

                      <ErrorMessage name="email">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="input-container">
                    <i className="fas fa-lock icon"></i>
                    <div>
                      <Field
                        className="mb-3"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onBlur={(e) => handleBlur(e)}
                      />
                      <span>
                        <ErrorMessage name="password">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </span>
                    </div>
                  </div>
                  <div className="input-container">
                    <i className="fas fa-lock icon"></i>
                    <div>
                      <Field
                        name="confirmPassword"
                        className="mb-3"
                        type="password"
                        placeholder="Repeat your Password"
                        onBlur={(e) => validatePassword(e)}
                      />
                      <span>
                        <ErrorMessage name="confirmPassword">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </span>
                    </div>
                  </div>
                  <div className="form-check input-container">
                    <Field
                      className="form-check-input"
                      name="toggle"
                      type="checkbox"
                      id="flexCheckDefault"
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      I agree all statements in Terms of Service
                    </label>
                    <ErrorMessage name="toggle">
                      {(msg) => <div className="invalid-feedback">{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <button
                    type="submit"
                    className="btn-register"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div>
            <img
              src="Images/signup-image.webp"
              className="img-fluid card-img-top"
              alt="sign-up.img"
            />
            <Link to="/signin">I am already a member</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user))
  };
};

export default connect(null, mapDispatchToProps)(SignUp);

// .matches(
//   /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
//   "Passord must have one uppercase, one number and one special case character"
// )
