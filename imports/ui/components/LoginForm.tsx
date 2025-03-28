import React, { useState } from "react";
import FormInput from "./FormInput";
import { LoginInfo, AuthField } from "/imports/api/interaces";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";
import { AuthenticateUser } from "/imports/api/User/methods";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userData, setUserData] = useState<LoginInfo>({
    username: "",
    password: "",
  });

  const LoginInputData = [
    {
      label: "username",
      name: "username-l",
      type: "text",
    },

    {
      label: "password",
      name: "password-l",
      type: "password",
    },
  ];
  const updateUserData = (key: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await AuthenticateUser(userData)
      const [success, message] = res;
      if (success) {
        navigate("/");
      } else {
        setErrorMessage(message);
      }
    } catch (err: any) {
      setErrorMessage(err.reason || "Registration failed");
    }
  };

  return (
    <form
      method="POST"
      className="w-full h-fit flex flex-col items-center pt-8"
      onSubmit={(e) => LoginUser(e)}
    >
      {LoginInputData.map((value) => (
        <FormInput
          name={value.name}
          label={value.label}
          type={value.type}
          update={updateUserData}
        />
      ))}

      <h1 className=" italic text-red-500 my-2">{errorMessage}</h1>
      <input
        type="submit"
        value="Login"
        className={`text-2xl w-[200px] rounded-md h-[60px] bg-transparent border-2 border-white mt-4 uppercase font-bold cursor-pointer`}
      />
    </form>
  );
};

export default LoginForm;
