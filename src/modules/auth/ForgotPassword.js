import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import BtnLoading from "../../components/BtnLoading";
import {
  selectAuthErr,
  selectAuthStatus,
  setForgotPass,
  userResetcode,
} from "../../features/auth/authSlice";
import { Button } from "@mui/material";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const err = useSelector(selectAuthErr);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email().required(),
    });
  }, []);

  // form
  const { register, handleSubmit, control, watch, setError } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const formValues = watch();
  const { errors } = useFormState({ control });

  const handleFormSubmit = async () => {
    const result = await dispatch(userResetcode(formValues));
    if (userResetcode.fulfilled.match(result)) {
      dispatch(setForgotPass(`${formValues.email}`));
    }
  };

  useEffect(() => {
    if (err) setError("email", { message: err });
  }, [err]);

  return (
    <div className="form-auth">
      <h2 className="form-auth-h2">
        Please enter your email to find your account
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="loginForm">
        <div>
          <input
            placeholder="Email*"
            className="formInput"
            style={{
              border: errors.email && "2px solid red",
            }}
            {...register("email")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.email?.message}
          </span>
        </div>

        <br />
        <div className="form-auth-loading-btn">
          <BtnLoading
            type="submit"
            title="Reset Password"
            variant="contained"
            loading={status === "loading"}
            disabled={!formValues.email}
          />
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => dispatch(setForgotPass(null))}
            style={{ textTransform: "none" }}
          >
            Return to Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
