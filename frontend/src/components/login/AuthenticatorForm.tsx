import axios from "axios";
import React, { FormEvent, useState } from "react";

interface AuththenicatorProps {
  loginData: {
    id: number;
    secret?: string;
    otpauth_url?: string;
  };
  success:Function
}

const AuthenticatorForm = (props: AuththenicatorProps) => {
  const [code, setCode] = useState<string | null>();
  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();
     const {status} = await axios.post("two-factor/", {
      ...props.loginData,
      code: code,
    }, {withCredentials:true});
    console.log(props.loginData);
    if(status==200){
     props.success()
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Enter authenticator code
            </h1>
            <form
              onSubmit={formSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  6 digits code
                </label>
                <input
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  name="code"
                  id="id"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="6 digits code"
                />
              </div>

              <button
                type="submit"
                className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                      bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                      dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 
                      `}
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

export default AuthenticatorForm;
