import { useState } from "react";

export const useForm = (callback, initState = {}) => {
  const [values, setValues] = useState(initState);
  const onChanged = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    values,
    onChanged,
    onSubmit,
  };
};
