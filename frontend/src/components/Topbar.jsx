import React from 'react';
import resumylogo from '../assets/resumylogo.png';
import { motion } from 'framer-motion';

const Topbar = () => {
  return (
    <motion.div
      className="w-full h-20 bg-white border-b shadow-xs flex items-center px-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center">
        <img 
          src={resumylogo} 
          alt="logo" 
          className="h-auto mt-3 w-24 object-cover rounded-md"
        />
      </div>
    </motion.div>
  )
}

export default Topbar;
