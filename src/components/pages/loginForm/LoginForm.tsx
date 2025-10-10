'use client';

import { useState } from "react";
import RippleButton from "@/components/buttons/RippleButton";
import { authService } from "@/services/authService/authService";
import { useRouter } from "next/navigation";
import CheckBox from "@/components/checkboxs/Checkbox";
import { LoginData } from "@/types/auth";
import Cookies from 'js-cookie';
import TimesheetInput from "@/components/inputs/TimesheetInput";

const LoginForm: React.FC = () => {
  const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const isFormValid = userNameOrEmailAddress.trim() !== '' && password.trim() !== '';

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleLogin = async () => {
    const loginData: LoginData = {
      userNameOrEmailAddress,
      password,
      rememberClient: isChecked,
    };
    const authenRes = await authService.authenUser(loginData);
    const accessToken = authenRes.data.result.accessToken;
    const userId = authenRes.data.result.userId;
    if (authenRes) {
      Cookies.set('accessToken', accessToken, { expires: 7 });
      Cookies.set('userId', userId, { expires: 7 });
      router.push('/main/tasks');
    } else {
      console.log("Login failed");
    }
  }

  return (
    <div className="body bg-white min-h-[50px] relative mb-7 shadow-lg p-5 text-sm text-[#555]">
      <div className="loginWithEmail text-center font-bold text-lg mb-5">
        <h4 className="text-center font-bold text-[18px] my-[10px] mb-[20px]">Log in</h4>
        <div className="form mb-10">
          <div className="input-group flex items-end w-full mb-12">
            <i className="material-icons pr-2">person</i>
            <TimesheetInput
              labelText="User name or email"
              inputType="text"
              inputId="username"
              value={userNameOrEmailAddress}
              onChange={(e) => setUserNameOrEmailAddress(e.target.value)}   
            />
          </div>
          <div className="input-group flex items-center w-full mb-14">
            <i className="material-icons pr-2">lock</i>
            <TimesheetInput 
              labelText="Password"
              inputType="password"
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
        </div>
        <div className="submit flex justify-between items-center mb-5">
          <div className="checkbox">
            <CheckBox
              checked={isChecked} 
              onChange={handleCheckboxChange} 
            />
          </div>
          <div className="submit-btn">
            <RippleButton 
              text="Login" 
              bgBtncolor="#ff4081"
              textBtncolor="#fff"
              onClick={handleLogin}
              disabled={!isFormValid}
              width="fit-content"
            />
          </div>
        </div>
      </div>
      <div className="loginWithMezon py-5">
        <RippleButton 
          text="Login With Mezon" 
          bgBtncolor="#3f51b5"
          textBtncolor="#fff"
          width="100%"
        />
      </div>
    </div>
  );
};

export default LoginForm;