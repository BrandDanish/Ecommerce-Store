import { useState } from "react"
import UserLog from "./UserLog";
import axios from 'axios'
import { useNavigate} from "react-router-dom";
const UserSign = () => {
  const navigate=useNavigate()
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form,setForm]=useState({
    name:"",
    email:"",
    password:"",
  })
  const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validation before sending
    if (!form.name || !form.email || !form.password) {
      setErrorMsg("Please fill in all required fields!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
         
        }
      );
      setShowPopup(true);
      navigate('/login')
      setForm({
        name: "",
        email: "",
        password: "",
      });

      setTimeout(() => setShowPopup(false), 1500);
    } catch (err) {
      console.error("Error adding signup:", err);
    }
  };
  if (showLogin) {
    return <UserLog />;
  }

  return (
    <div className="flex min-h-screen mb-20">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="/Icons/mobilecart.png"
          alt="Shopping"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96">
          <h2 className="text-2xl font-bold mb-2">Create an account</h2>
          <p className="text-black mb-6">Enter your details below</p>
           {errorMsg && (
          <div className="bg-red-500 text-white px-3 py-2 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}
          {/* Input Fields */}
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border-b border-gray-300 py-2 mb-3"
          />
          <input
            value={form.email}
            onChange={handleChange}
            type="email"
            name='email'
            placeholder="Email or Phone Number"
            className="w-full border-b border-gray-300 py-2 mb-3"
          />
          <input
            type="password"
            name='password'
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border-b border-gray-300 py-2 mb-4"
          />

          {/* Buttons */}
          <button 
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded font-medium mb-3">
            Create Account
          </button>
   </form>
          <button className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded">
            <img src="/Icons/Icon-Google.png" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have account?{" "}
            <button
              onClick={() => setShowLogin(true)}
              className="text-black font-medium"
            >
              Log in
            </button>
          </p>
          {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-green-500 text-white px-4 sm:px-8 py-4 rounded shadow-lg text-base sm:text-lg font-semibold max-w-xs sm:max-w-md text-center">
            User successfully added!
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default UserSign;
