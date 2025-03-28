import React, { useEffect, useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const [slideActive, setSlideActive] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const computation = Tracker.autorun(() => {
      const user = Meteor.user();
      if (user) {
        navigate("/");
      }
    });

    return () => computation.stop(); // cleanup on unmount
  }, []);

  return (
    <main className=" w-screen h-screen relative  font-sans grid overflow-hidden ">
      <section className="w-[50%] h-[70%] bg-background-200 rounded-md relative place-self-center grid grid-cols-2 text-text-main">
        <div
          className={`flex flex-col items-center p-5 w-1/2 h-full absolute rounded-md bg-primary-300 z-20 transition-transform justify-center ${
            slideActive ? "" : "translate-x-full"
          }`}
          onClick={() => setSlideActive((prev) => !prev)}
        >
          <h1 className="text-5xl font-bold">WELCOME</h1>
          <p className={`text-center my-5 font-semibold`}>
            Blast off from the boring and crash-land into real connection!
            SocialMeteor is your cosmic space for conversations that matter—no
            asteroid belts of noise, just pure signal. Join the herd (or maybe a
            pack of dinosaurs?) and start your journey through the galaxy of
            genuine interactions. 🌠🦖
          </p>
          <button
            className={`text-3xl w-[200px] cursor-pointer h-[60px] uppercase bold border-2 border-white rounded-md font-bold`}
          >
            {slideActive ? "Register" : "Login"}
          </button>
        </div>
        <div className="p-4 w-full h-full flex flex-col text-center justify-center">
          <h1 className="text-5xl uppercase font-bold tracking-wider">
            Register
          </h1>
          <RegisterForm />
        </div>
        <div className="p-4 w-full h-full flex flex-col text-center justify-center">
          <h1 className="text-5xl uppercase font-bold tracking-wider">Login</h1>

          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
