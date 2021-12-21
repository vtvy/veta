import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImgField from "./ImgField";
import ErrorMessage from "./ErrorMessage";
import { useRef } from "react";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is a required field"),
  lastName: yup.string().required(),
  password: yup.string().min(6).max(20).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  birthDate: yup.date().max(new Date()),
});

function RegisterForm({ onSubmit }) {
  const [selectedAvt, setSelectedAvt] = useState(null);
  const [isDefault, setIsDefault] = useState(true);
  const [isOpenSelectAvt, setIsOpenSelectAvt] = useState(false);
  const [file, setFile] = useState();

  const handleSelectAvt = (avatar) => {
    setSelectedAvt(avatar);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("isDefault", isDefault);
    formData.append("birthDate", data.birthDate);
    formData.append("avatar", file);
    onSubmit(formData);
  };

  const formRef = useRef();

  const handleOnclick = () => {
    setIsOpenSelectAvt(!isOpenSelectAvt);
  };

  return (
    <form
      ref={formRef}
      className={` w-xl h-full flex  relative bg-white transition-all duration-[0.25s] ${
        isOpenSelectAvt ? "w-[72.4rem]" : ""
      }`}
      encType="multipart/form-data"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="max-w-xl w-full  self-start bg-white shadow rounded-lg p-10 space-y-6">
        <div className="flex w-full justify-between gap-x-4">
          <div className="flex flex-col">
            <label
              className="text-base font-bold text-gray-600 mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="border rounded-md  w-full bg-white px-6 py-4"
              type="text"
              name="firstName"
              placeholder="First Name"
              {...register("firstName")}
            />

            {errors.firstName ? (
              <ErrorMessage message={errors.firstName.message} />
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col">
            <label
              className="text-base font-bold text-gray-600 mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="border rounded-md w-full bg-white px-6 py-4"
              type="text"
              name="lastName"
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName ? (
              <ErrorMessage message={errors.lastName.message} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label
            className="text-base font-bold text-gray-600 mb-1"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border rounded-md bg-white px-6 py-4"
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password ? (
            <ErrorMessage message={errors.password.message} />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label
            className="text-base font-bold text-gray-600 mb-1"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="border rounded-md bg-white px-6 py-4"
            type="password"
            name="conFirmPassword"
            placeholder="Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <ErrorMessage message={errors.confirmPassword.message} />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          <label
            className="text-base font-bold text-gray-600 mb-1"
            htmlFor="password"
          >
            Date of Birth
          </label>
          <input
            className="border rounded-md bg-white px-6 py-4"
            type="date"
            name="birtDate"
            {...register("birthDate")}
          />
        </div>

        <div>
          <button className="w-full bg-indigo-600 text-white rounded-md p-4">
            Register
          </button>
        </div>
        <div className="relative pb-2">
          <div className="absolute top-0 left-0 w-full border-b"></div>
        </div>
      </div>
      {isOpenSelectAvt && (
        <div className="flex flex-col w-1/2 justify-end">
          <div className="flex justify-center items-center flex-1">
            <img
              src={selectedAvt}
              alt=""
              className="max-w-[30rem] max-h-[30rem]"
            />
          </div>
          <ImgField
            onSelectAvt={handleSelectAvt}
            setIsDefault={setIsDefault}
            setFile={setFile}
          />
        </div>
      )}
      <div
        className="absolute w-16 h-16 bg-indigo-600 text-white rounded-[50%] top-1/2 right-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-5xl shadow cursor-pointer"
        onClick={handleOnclick}
      >
        {isOpenSelectAvt ? "<" : ">"}
      </div>
    </form>
  );
}

export default RegisterForm;
