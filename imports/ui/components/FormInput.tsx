import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FormInput, LoginInfo, RegisterInfo, AuthField } from "/imports/api/interaces";


interface FormInputProps extends FormInput{
  update: (key: string, value: string) => void
}


const FormInput = ({label, type , name, update}: FormInputProps) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="w-fit flex flex-col mt-2 items-start">
      <label htmlFor={name} className={`uppercase  ml-2 tracking-wide transition-all font-bold ${active ? 'translate-y-5 text-[12px]' : 'translate-y-12'}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        id={name}
        className={`h-[60px] pt-3 w-[300px] bg-transparent text-xl border-white border-2 rounded-md pl-2`}
        onChange={(e) => {
          setActive(e.target.value !== "");
          update(label, e.target.value)
        }}
        onFocus={() => setActive(true)}
        onBlur={(e) => setActive(e.target.value !== "")}
      />
    </div>
  );
};

export default FormInput;
