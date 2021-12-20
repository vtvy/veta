import React, { useRef } from "react";
import Avatars from "../../../assets/images/avatars";

function ImgField({ onSelectAvt, setIsDefault, setFile }) {
  const handleOnclick = (e, avatar) => {
    if (e.target.classList.contains("default-avatar")) {
      const newAvatar =
        avatar.slice(avatar.indexOf("avatar"), avatar.indexOf(".")) + ".svg";
      onSelectAvt(avatar);
      setFile(newAvatar);
      console.log(newAvatar);
    } else {
      const file = e.target.files[0];
      setIsDefault(false);
      setFile(file);
      console.log(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        className=" w-20 h-20 appearance-none hidden"
        onChange={handleOnclick}
      />
      <label
        htmlFor="file"
        className="w-[5.5rem] ml-1 flex items-center justify-center text-5xl h-[5.5rem] bg-[#4F46E5] text-white rounded-[50%]"
      >
        +
      </label>
      <div className="flex w-[36rem] h-32 overflow-scroll overflow-y-hidden ">
        {Avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt=""
            className="cursor-pointer default-avatar "
            onClick={(e) => handleOnclick(e, avatar)}
          />
        ))}
      </div>
    </>
  );
}

export default ImgField;
