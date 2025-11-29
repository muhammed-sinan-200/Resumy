import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import loginImg from '../assets/loginImg.png'

const API_URL = "https://resumy-backend.onrender.com"
const LoginPage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/overview" replace />
  }
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/user/login`, form)
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.reload();
      navigate("/overview");


    } catch (error) {
      console.log(error);
      alert("Login failed");

    }
    setLoading(false)
  }
  return (
    <div className='w-full min-h-screen bg-white flex md:flex-row'>

      <div className='hidden md:flex flex flex-col bg-cover bg-center w-1/2' style={{ backgroundImage: `url(${loginImg})` }}>

      </div>
      <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-5 bg-white'>
        <div>
          <h1 className='text-3xl font-bold text-blue-600 my-2'>Good to see you again</h1>
          <p className='text-xl font-semibold text-gray-500 mb-5'>Let's pick up where you left off</p>
        </div>
        <Card>
          <CardContent className="p-5">
            <h2 className="text-2xl font-semibold mb-5 text-center">Login to <span className='text-blue-700'>Resumy</span></h2>

            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="w-full bg-green-600 text-white">
                {loading ? "Signing in…" : "Login"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <a href="/register" className="text-green-700 font-semibold hover:underline">
                Register
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage