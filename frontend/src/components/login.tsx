import type { AuthProps } from "../utils/types"
import api, { setAccessToken } from "../api/axios";
import { useState } from "react";

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

  const [form, setForm] = useState<FormData>({
      email: "",
      password: ""
  });
  const [passwordError, setPasswordError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
        ...prev,
        [name as keyof FormData]: value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
        setPasswordError('');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      console.log("Login successful, access token set:", accessToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

    const inputFields: InputField[] = [
      { name: "email", type: "email", placeholder: "Email" },
      { name: "password", type: "password", placeholder: "Password" },
    ];

  return (
    <div>
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
        <button onClick={() => handleLogin(form.email, form.password)}>Login</button>
        <span>Don't have an account? <button className='cursor-pointer' onClick={toggleAuthMode}>Sign up</button></span>
    </div>
  )
}

export default Login