import { useMemo, useEffect } from "react";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthErr,
  selectAuthStatus,
  selectForgotPass,
  setForgotPass,
  userResetForgotenPass,
} from "../../features/auth/authSlice";
import BtnLoading from "../../components/BtnLoading";
import Snackbar from "../../components/Snackbar";

const ResetForgotenPassword = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const err = useSelector(selectAuthErr);
  const email = useSelector(selectForgotPass);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      code: yup.string().required(),
      password: yup.string().min(5).max(255).required(),
    });
  }, []);
  // form
  const { register, handleSubmit, control, watch, setError } = useForm({
    defaultValues: {
      code: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const formValues = watch();

  const { errors } = useFormState({ control });

  const handleFormSubmit = () => {
    dispatch(
      userResetForgotenPass({
        ...formValues,
        email,
        newPassword: formValues.password,
      })
    );
  };

  useEffect(() => {
    if (err) setError("code", { message: err });
  }, [err]);

  return (
    <div className="form-auth">
      <h2 className="form-auth-h2">
        Please enter reset code and your new password.
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="loginForm">
        <div>
          <input
            placeholder="Reset Code*"
            className="formInput"
            style={{
              border: errors.code && "2px solid red",
            }}
            {...register("code")}
          />
          <br />
          <span className="form-auth-error-input">{errors?.code?.message}</span>
        </div>
        <div>
          <input
            type="password"
            placeholder="Password*"
            className="formInput"
            style={{
              border: errors.password && "2px solid red",
            }}
            {...register("password")}
          />
          <br />
          <span className="form-auth-error-input">
            {errors?.password?.message}
          </span>
        </div>

        <br />
        <div className="form-auth-loading-btn">
          <BtnLoading
            type="submit"
            title="Reset Password"
            variant="contained"
            loading={status === "loading"}
            disabled={!formValues.code || !formValues.password}
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

      <Snackbar message="Please check your email for the code to reset your password." />
    </div>
  );
};

export default ResetForgotenPassword;
