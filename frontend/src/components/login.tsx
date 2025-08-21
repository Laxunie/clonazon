import type { AuthProps } from "../utils/types";
import api, { setAccessToken } from "../api/axios";
import { useState } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

type FormData = {
  email: string;
  password: string;
};

type FormKeys = keyof FormData;

type InputField = {
  name: FormKeys;
  type: string;
  placeholder: string;
};

const Login = ({ toggleAuthMode }: AuthProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<FormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name as FormKeys]: value,
    }));
    setError("");
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;
      dispatch(setUser(user));
      setAccessToken(accessToken);
      console.log("Login successful, access token set:", accessToken);
    } catch (err: unknown) {
      let message = "Login failed";

      if (axios.isAxiosError(err)) {
        // err is now typed as AxiosError
        message = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        // fallback for normal JS errors
        message = err.message;
      }

      setError(message);
      console.error("Login failed:", err);
    }
  };

  const inputFields: InputField[] = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  return (
    <form className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto flex flex-col gap-3 border border-gray-100">
      <h2 className="text-xl font-semibold mb-2 text-center text-blue-600">Login</h2>

      {inputFields.map(field => (
        <input
          key={field.name}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={form[field.name]}
          onChange={handleInputChange}
          className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-gray-50"
        />
      ))}

      {error && (
        <div className="text-red-500 text-sm -mt-2 mb-1">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={() => handleLogin(form.email, form.password)}
        className="w-full mt-2 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div className="text-center mt-2">
        <span className="text-gray-500 text-sm">Don't have an account? </span>
        <button
          type="button"
          className="text-blue-600 hover:underline text-sm font-medium"
          onClick={toggleAuthMode}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Login;
