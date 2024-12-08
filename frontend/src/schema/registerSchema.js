import * as yup from "yup"

const registerSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().required("Please enter a password")
});

export default registerSchema;