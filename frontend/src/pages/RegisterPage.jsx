import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from 'axios';
import React, { useState } from 'react'
import registerImage from '../assets/registerImage.png'
import { Navigate, useNavigate } from 'react-router-dom';


export const API_URL = "https://resumy-backend.onrender.com"
const RegisterPage = () => {
    const [image, setImage] = useState(null);
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/" />
    }
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);


        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("password", form.password);


        if (image) {
            formData.append("profilePic", image);
        }
        try {
            const response = await axios.post(`${API_URL}/user/register`, formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            alert("Registration success")
            navigate('/login')
        } catch (error) {
            alert("Registration failed!")
            console.log(error);

        }
        setLoading(false);
    }



    return (
        <div className='w-full min-h-screen flex md:flex-row'>
            <div className='hidden md:flex flex flex-col bg-cover bg-center w-1/2'
                style={{ backgroundImage: `url(${registerImage})` }}>
            </div>
            <div className='w-full md:w-1/2 flex flex-col items-center justify-center p-5 bg-white'>
                <div>
                    <h1 className='text-3xl font-bold text-blue-600 my-2'>Looking for the right mentor to upgrade your resume?</h1>
                    <p className='text-xl font-semibold text-gray-500 mb-5'>Start your journey with Resumy</p>
                </div>
                <Card>
                    <CardContent className='p-3'>
                        <h2 className='text-2xl font-bold mb-5 text-center'>Create an Account on <span className='text-blue-700'>Resumy</span></h2>

                        <form
                            onSubmit={handleRegister}
                            className='space-y-4'
                        >
                            <Input
                                name='name'
                                type='text'
                                placeholder='Your Name'
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name='email'
                                type='email'
                                placeholder='Your Email'
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name='password'
                                type='password'
                                placeholder='Your Password'
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name='phone'
                                type='number'
                                placeholder='Your Phone'
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                            <label className="block">
                                <span className="text-sm font-medium">Add photo(Optional)</span>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="mt-1 block w-full border p-2 rounded cursor-pointer"
                                />
                            </label>

                            <Button type='submit' className='w-full bg-green-700 text-white'>
                                {loading ? "Please wait..." : "Register"}
                            </Button>
                        </form>
                        <p className='text-center text-sm mt-4'>Already have an account? {" "}
                            <a href='/login' className='text-green-700 font-semibold hover:underline    '>Login</a>
                        </p>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default RegisterPage 