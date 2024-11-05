import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./CSS/UserProfile.css"; // Import the new CSS file
import axios from "axios";

const UserProfile = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const updateUser = async (e) => {
    if (userId && token) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/users/${userId}`,
          {
            name: e.name,
            email: e.email,
            role: e.role,
            shopName: e.shopName,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        console.log("User updated successfully", response.data);
      } catch (error) {
        console.error("Error updating user", error);
      }
    }
  };
  const initialValues = {
    name: "",
    email: "",
    role: "select",
    shopName: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (values.role === "select") {
      errors.role = "Role is required";
    }

    if (values.role === "admin" && !values.shopName) {
      errors.shopName = "Shop Name is required for Admin";
    }

    return errors;
  };

  const onSubmit = (values) => {
    console.log("Form data", values);
    updateUser(values);
  };

  return (
    <div className="user-profile-form">
      <h2>User Profile</h2>
      <Formik
        initialValues={initialValues}
        /*      validate={validate} */
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email ID</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-control">
              <label htmlFor="role">Role</label>
              <Field as="select" id="role" name="role">
                <option value="select">Select the Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              <ErrorMessage name="role" component="div" className="error" />
            </div>

            {values.role === "user" && (
              <div className="form-control">
                <label htmlFor="shopName">Shop Name</label>
                <Field type="text" id="shopName" name="shopName" />
                <ErrorMessage
                  name="shopName"
                  component="div"
                  className="error"
                />
              </div>
            )}

            <div className="form-actions">
              <button type="submit">Update</button>
              <button type="button" onClick={() => console.log("Cancel")}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfile;
