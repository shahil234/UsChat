import * as yup from "yup";

const loginSchema = yup.object({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().required("Please enter your password")
})