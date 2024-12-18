import * as Yup from "yup";

export const postSchema = Yup.object().shape({
  caption: Yup.string().required("Caption is needed"),
});
