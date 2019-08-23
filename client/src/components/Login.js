import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login({ touched, errors }) {

  const token = localStorage.getItem("token");
  if (token) {
    return <Redirect to="/bubblepage" />;
  }

  return (
    <Form className="form">
      <div className="form-group">
        <label className="label">User name</label>
        <Field
          className="input"
          name="username"
          type="username"
          autoComplete="off"
        />
        <p>{touched.username && errors.username}</p>
      </div>
      <div className="form-group">
        <label className="label">Password</label>
        <Field
          className="input"
          name="password"
          type="password"
          autoComplete="off"
        />
      </div>
      <p>{touched.password && errors.password}</p>
      <button className="btn">Submit &rarr;</button>
    </Form>
  );
}


// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route


export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required(),
    password: Yup.string()
      .required()
      .min(6)
  }),
  handleSubmit(values, formikBag) {

    const url = "http://localhost:5000/api/login";
    axios
      .post(url, values)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        console.log('%c Token has been saved, re-routing to bubblepage...', 'color: green;') // CSS in console log xD
        formikBag.props.history.push("/bubblepage");
      })
      .catch(errors => {
        console.log(errors.response.data);
      });
  }
})(Login);