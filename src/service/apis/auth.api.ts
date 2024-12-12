import catchAsync from "../../utils/catchAsync";
import httpsCall from "../httpsCall";

type LoginData = {
  email: string;
  password: string;
};

type ForgotPaawordData = {
  email: string;
};

type ResetPasswordData = {
  password: string;
  cpassword: string;
};

export const logInApi = catchAsync(async (values: LoginData) => {
  const data = await httpsCall.post(`admin/login`, values);
  return data;
});

export const forgotPasswordApi = catchAsync(
  async (values: ForgotPaawordData) => {
    const data = await httpsCall.post(
      `admin/forgot-password`,
      values
    );
    return data;
  }
);

export const resetPasswordApi = catchAsync(
  async (values: ResetPasswordData) => {
    const data = await httpsCall.patch(`admin/reset-password`, values);
    return data;
  }
);
