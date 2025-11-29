import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import avatar from "../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "https://resumy-backend.onrender.com"

const MotionCard = motion(Card); // make Card motion-enabled

const ProfilePage = () => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    id: savedUser?.id,
    name: savedUser?.name,
    phone: savedUser?.phone,
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", form.id);
    data.append("name", form.name);
    data.append("phone", form.phone);
    if (imageFile) data.append("profilePic", imageFile);

    try {
      const res = await axios.put(`${API_URL}/user/profile`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile Updated!");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.data._id,
          name: res.data.data.name,
          email: res.data.data.email,
          phone: res.data.data.phone,
          profilePic: res.data.data.profilePic,
        })
      );

      setEdit(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center p-6"
    >
      <MotionCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg shadow-md"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">My Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            <Avatar className="w-28 h-28">
              <AvatarImage
                src={
                  preview
                    ? preview
                    : savedUser?.profilePic
                    ? `${API_URL}/uploads/profile/${savedUser.profilePic}`
                    : avatar
                }
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            {edit && (
              <Input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-3 w-56"
              />
            )}
          </div>

          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                name="name"
                disabled={!edit}
                value={form.name}
                onChange={handleChange}
                className={!edit ? "bg-gray-100" : ""}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email (not editable)</label>
              <Input value={savedUser.email} disabled className="bg-gray-100" />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                name="phone"
                disabled={!edit}
                value={form.phone}
                onChange={handleChange}
                className={!edit ? "bg-gray-100" : ""}
              />
            </div>

            {!edit ? (
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button type="button" onClick={() => setEdit(true)} className="w-full">
                  Edit Profile
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button type="submit" className="w-full bg-green-600 text-white">
                    Save Changes
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={() => setEdit(false)}
                  >
                    Cancel
                  </Button>
                </motion.div>
              </>
            )}

            <motion.div whileHover={{ scale: 1.03 }}>
              <Button
                type="button"
                className="w-full bg-red-600 text-white"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.reload();
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
};

export default ProfilePage;
