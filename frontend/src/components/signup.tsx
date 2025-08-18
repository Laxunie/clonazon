import { useState } from "react";
import type { AuthProps } from "../utils/types"
import { Country, State, City } from 'country-state-city';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
};

type FormKeys = keyof FormData;

type InputField = {
  name: FormKeys;
  type: string;
  placeholder: string;
};

const SignUp = ({ toggleAuthMode }: AuthProps) => {
    const countries = Country.getAllCountries();
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedState, setSelectedState] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [form, setForm] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        address: "",
    });

    const states = State.getStatesOfCountry(selectedCountry);
    const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];
    
    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
        setSelectedState("");
        setSelectedCity("");
    };
    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(event.target.value);
        setSelectedCity("");
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
            setForm(prev => ({
                ...prev,
                [name as keyof FormData]: value,
            }));
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(form);
        console.log("Country:", selectedCountry);
        console.log("State:", selectedState);
        console.log("City:", selectedCity);
    }

    const regionLabels: Record<string, string> = {
        US: "State",
        CA: "Province / Territory",
        GB: "County",
        JP: "Prefecture",
        AU: "State / Territory"
    };

    const getRegionLabel = (countryCode: string) => {
        return regionLabels[countryCode] || "Region";
    };

    const inputFields: InputField[] = [
        { name: "firstName", type: "text", placeholder: "First Name" },
        { name: "lastName", type: "text", placeholder: "Last Name" },
        { name: "email", type: "email", placeholder: "Email" },
        { name: "phone", type: "tel", placeholder: "Phone" },
        { name: "password", type: "password", placeholder: "Password" },
        { name: "confirmPassword", type: "password", placeholder: "Confirm Password" },
        { name: "address", type: "text", placeholder: "Address" },
    ];

    return (
        <form className="bg-white rounded-xl shadow p-6 w-full max-w-md mx-auto flex flex-col gap-3 border border-gray-100">
            <h2 className="text-xl font-semibold mb-2 text-center text-blue-600">Sign Up</h2>
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
            <select value={selectedCountry} onChange={handleCountryChange} className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-gray-50">
                <option value="">Country</option>
                {countries.map(country => (
                    <option key={country.isoCode} value={country.isoCode}>
                        {country.name}
                    </option>
                ))}
            </select>
            <select value={selectedState} onChange={handleStateChange} className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400" disabled={!selectedCountry || states.length === 0 }>
                <option value="">{getRegionLabel(selectedCountry)}</option>
                {states.map(state => (
                    <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                    </option>
                ))}
            </select>
            <select value={selectedCity} onChange={handleCityChange} className="w-full px-3 py-2 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-400 bg-gray-50 disabled:bg-gray-200 disabled:text-gray-400" disabled={!selectedState || cities.length === 0}>
                <option value="">City</option>
                {cities.map(city => (
                    <option key={city.name} value={city.name}>
                        {city.name}
                    </option>
                ))}
            </select>
            <button type="submit" onClick={handleSubmit} className="w-full mt-2 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Sign Up</button>
            <div className="text-center mt-2">
                <span className="text-gray-500 text-sm">Already have an account? </span>
                <button type="button" className="text-blue-600 hover:underline text-sm font-medium" onClick={toggleAuthMode}>Sign in</button>
            </div>
        </form>
    )
}

export default SignUp