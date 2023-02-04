import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const regSchema = yup.object().shape({
    firstName: yup.string().required("First name is required!"),
    lastName: yup.string().required("Last name is required!"),
    email: yup.string().email("Please enter a valid email").required("Email is Required!"),
    password: yup
    .string()
    .min(3)
    .matches(passwordRules, { message: "Please create a stronger password!" })
    .required("Password is required!"),
    location: yup.string().required("Location is required!"),
    occupation: yup.string().required("Occupation is required!"),
    picture: yup.string().required("A Profile Photo is required!"),
})

export const loginSchema = yup.object({
    email: yup.string().email("Please enter a valid email").required("Email is Required!"),
    password: yup.string().required("Please enter your password"),
})