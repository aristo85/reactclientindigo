import { useMemo, useEffect } from "react";
import * as yup from "yup";
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthErr,
  selectAuthStatus,
  selectResetedPass,
  setForgotPass,
  userLogin,
} from "../../features/auth/authSlice";
import BtnLoading from "../../components/BtnLoading";
import Snackbari from "../../components/Snackbar";

const LoginForm = ({}) => {
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const err = useSelector(selectAuthErr);
  const isResetedPass = useSelector(selectResetedPass);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(5).max(255).required(),
    });
  }, []);
  // form
  const { register, handleSubmit, control, watch, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const formValues = watch();

  const { errors } = useFormState({ control });

  const handleFormSubmit = () => {
    dispatch(userLogin(formValues));
  };

  useEffect(() => {
    if (err) setError("email", { message: err });
  }, [err]);

  return (
    <div>
      <h2 className="form-auth-h2">Welcome Back!</h2>
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
        <div style={{ textAlign: "end" }}>
          <Button
            onClick={() => dispatch(setForgotPass("resetCode"))}
            style={{ textTransform: "none" }}
          >
            Forgot Password?
          </Button>
        </div>
        <br />
        <div className="form-auth-loading-btn">
          <BtnLoading
            type="submit"
            title="Log In"
            variant="contained"
            loading={status === "loading"}
            disabled={!formValues.email || !formValues.password}
          />
        </div>
      </form>
      {isResetedPass && <Snackbari message="Your password has been changed" />}
    </div>
  );
};

export default LoginForm;
