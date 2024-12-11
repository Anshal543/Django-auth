import axios from "axios";
import React, { FormEvent, useState } from "react";

type Notify = {
  message: string;
  show: boolean;
  error: boolean;
};

const ForgotPassword = () => {
  const [email, setEmail] = useState<string | null>();
  const [notify, setNotify] = useState<Notify>({
    message: "",
    show: false,
    error: false,
  });
  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("forgot/", { email: email });
      setNotify({
        message: "Check your email for password reset link",
        show: true,
        error: false,
      });
    } catch (error) {
      setNotify({ message: "An error occured", show: true, error: true });
    }
  };
  let info;
  if (notify.show) {
    info = (
      <p
        className={`text-sm text-center ${
          notify.error ? "text-red-500" : "text-green-500"
        }`}
      >
        {notify.message}
      </p>
    );
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter your email
            </h1>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {info}
            </h1>
            <form
              onSubmit={formSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@example.com"
                />
              </div>

              <button
                type="submit"
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 `}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
