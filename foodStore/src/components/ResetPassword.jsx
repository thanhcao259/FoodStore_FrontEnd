import React, { useState } from "react";

import "../css/login.css";
// import forgotPasswordApi from "../api/forgotPasswordApi";
import { useLocation, useNavigate } from "react-router-dom";
import resetPasswordApi from "../api/resetPasswordApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetNewPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const naigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const username = queryParams.get("username");
  
  const handleResetPassword = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khâu không khớp");
      return;
    }
    const rs = await resetPasswordApi.add(username, token, newPassword);
    console.log(rs);
    if (!rs) {
      toast.error("Reset mật khẩu không thành công");
      naigate("/");
      return;
    }
    toast.success("Reset mật khẩu thành công");
    naigate("/");
    setIsSubmitting(false);
  };
  return (
    <div>
      <section class="login">
        <div
          class="register-form-box"
          style={{ height: "auto", padding: "40px" }}
        >
          <div class="form-value">
            <form class="login-form" onSubmit={handleResetPassword}>
              <h2>Đặt lại mật khẩu</h2>
              <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  className="email"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <label for="">Mật khẩu mới</label>
              </div>
              <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  className="email"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
                <label for="">Xác nhận mật khẩu</label>
              </div>
              <button class="btn-login" type="submit" disabled={isSubmitting}>
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetNewPassword;