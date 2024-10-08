import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [serverError, setServerError] = useState(null);
  const [pending, setPending] = useState(false)

  const onSubmit = async (data) => {
    if(data && !pending) {
      const {email, name, password } = data

      try {
        setPending(true)
        const response = await fetch("http://localhost:5000/auth/create-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password
          }),
        });
        const userCreated = await response.json()
        if(response.ok){
          reset()
          navigate("/")
        }else {
          console.log(userCreated)
          setServerError(userCreated.message || "error in creating user please try again" )
        }
      } catch (error) {
        setServerError("Server Error please try again later");
      } finally {
        setPending(false)
      }
    }
  }

  

  return (
    <div className=" flex flex-col h-full gap-4 px-2 py-4">
      <h1 className="text-3xl text-center font-extrabold">Sign-Up</h1>
      {serverError && <div className="bg-neutral max-w-[600px] min-h-11 rounded-md shadow-md self-center w-full "> <p className="text-error text-center font-semibold text-md px-2 py-3 ">{serverError}</p></div>}
      <form
      onSubmit={handleSubmit(onSubmit)} 
      className="grid gap-4 px-3 py-2  w-full max-w-[600px] mx-auto ">
        <div className="grid gap-1 text-xl font-semibold">
          <label htmlFor="">Email* :</label>
          <input
            {...register("email", {
              required: "Email cannot be empty",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
            type="text"
            placeholder="You@example.com"
            className="input input-bordered w-full placeholder:text-md font-thin "
          />
           {errors.email && <p className="text-sm px-2 text-error">{errors.email.message}</p>}
        </div>
        <div className="grid gap-1 text-xl font-semibold">
          <label htmlFor="">Name* :</label>
          <input
            {...register("name", {
              required: "Name is Required",
              minLength: {
                value: 2,
                message: "Name Should be more than 2 Characters",
              },
              maxLength: { value: 20, message: "Name is too big" },
            })}
            type="text"
            placeholder="john"
            className="input input-bordered w-full placeholder:text-md font-thin"
          />
          {errors.name && <p className="text-sm px-2 text-error">{errors.name.message}</p>}
        </div>
        <div className="grid gap-1 text-xl font-semibold">
          <label htmlFor="">Password* :</label>
          <input
            {...register("password", {
              required: "Password cannot be empty",
              minLength: {
                value: 6,
                message:
                  "short password, password should contain minimum 6 characters",
              },
              maxLength: {
                value: 20,
                message:
                  "password is too long, it should be less than 20 characters",
              },
            })}
            type="password"
            placeholder="min 6 characters"
            className="input input-bordered w-full placeholder:text-md font-thin "
          />
          {errors.password && <p className="text-sm px-2 text-error">{errors.password.message}</p>}
        </div>
        {/* yet to implement */}
        {/* <div className="grid gap-1 text-xl font-semibold">
          <label htmlFor="">Confirm Password* :</label>
        <input
          type="password"
          placeholder="min 6 characters"
          className="input input-bordered w-full placeholder:text-md font-light"
        />
        </div>
        <div className="grid gap-1 text-xl font-semibold">
          <label htmlFor="">Profile Pic</label>
        <input
          type="file"
          placeholder="upload profile Pic"
          className="input max-w-xs"
        />
        </div> */}
        <button
          type="submit"
          className= {`text-xl font-semibold btn btn-primary w-full ${pending? 'btn-disabled' : ''}`}
        >
         {pending? <span className="loading loading-dots loading-sm">signing up</span>: 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
