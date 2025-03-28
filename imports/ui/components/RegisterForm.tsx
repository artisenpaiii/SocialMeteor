"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import { FormInput as FormInputInterface, RegisterInfo } from "/imports/api/interaces";
import { Meteor } from "meteor/meteor";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {   
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [userData, setUserData] = useState<RegisterInfo>({username: "", email: "", password: ""})
    const RegisterInputData:FormInputInterface[] = [
        {
            label: "username",
            name: "username-r",
            type: "text"
        },    
        {
            label: "email",
            name: "email-r",
            type: "email"
        },    
        {
            label: "password",
            name: "password-r",
            type: "password"
        },
    ]

    const updateUserData = (key: string, value: string) => {
      setUserData((prev) => ({
        ...prev,
        [key]: value, 
      }));
    };
    
    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const res = await Meteor.callAsync("InsertUser", userData);
        const [success, message] = res;
        if (success) {
          await Meteor.loginWithPassword(userData.email, userData.password);
          navigate("/")
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
      onSubmit={(e) => registerUser(e)}
      className="w-full h-fit flex flex-col items-center"
    >
       {RegisterInputData.map((value) =>(
            <FormInput key={value.label} name={value.name} label={value.label} type={value.type} update={updateUserData}/>
       ))} 
      
       <h1 className=" italic text-red-500 my-2">{errorMessage}</h1>
      <input type="submit"  value="Register" className={`w-[200px] rounded-md text-2xl h-[60px] bg-transparent border-2 border-white mt-4 uppercase font-bold cursor-pointer`}/>
    </form>
  );
};

export default RegisterForm;
