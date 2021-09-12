import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { loginUser } from "../actions/ActionCreators";

const SignIn = ({ loginUser }) => {
  let initialState = {
    name: "",
    password: "",
    toggle: false
  };
  const history = useHistory();
  const onSubmit = (values, actions) => {
    actions.setSubmitting(true);
    loginUser({ name: values.name, password: values.password }).then((res) => {
      if (res) {
        history.push("/home");
      } else {
        console.log("Sign In failed");
        alert("Sign In failed");
        //history.push("/signIn");
        actions.resetForm();
      }
    });
    console.log(values);
    actions.setSubmitting(false);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please provide Name"),
    password: yup
      .string()
      .required("Please provide password")
      .min(8, "Password should be 8 chars minimum.")
  });
  return (
    <div className="card container-md mt-5">
      <h1 className="title">
        <strong>Sign In</strong>
      </h1>
      <div className="card-body">
        <div className="d-flex justify-content-around flex-md-wrap">
          <div>
            <img
              src="Images/signin-image.webp"
              className="card-img-top"
              alt="sign-up.img"
            />
            <Link to="/signup">Create an account</Link>
          </div>
          <div className="d-flex flex-column">
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
                        type="text"
                        placeholder="Your Name"
                        name="name"
                      />
                      <ErrorMessage name="name">
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
                      />
                      <ErrorMessage name="password">
                        {(msg) => <div className="error">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className="input-container ">
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      name="toggle"
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="flex-shrink-1 align-self-start">
                    <button
                      type="submit"
                      className="btn-login mb-3 mt-2"
                      disabled={isSubmitting}
                    >
                      Log In
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (user) => dispatch(loginUser(user))
  };
};
export default connect(null, mapDispatchToProps)(SignIn);
