import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartNoAxesCombined, FileText, MessageSquare, UserRoundCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import React from 'react'

const user = JSON.parse(localStorage.getItem("user"))

const OverviewPage = () => {
    const cards = [
        {
            title: "Total Resumes Uploaded",
            value: "6",
            desc: "Resumes analyzed by AI",
            icon: <FileText className="text-blue-700" size={30} />
        },
        {
            title: "AI Feedback Count",
            value: "6",
            desc: "Provide accurate suggestions",
            icon: <MessageSquare className="text-orange-600" size={30} />
        },
        {
            title: "Upload Analytics",
            value: "18%+",
            desc: "Growth this month",
            icon: <ChartNoAxesCombined className="text-yellow-600" size={30} />
        },
        {
            title: "Profile Completion",
            value: "70%",
            desc: "Completed profile progress",
            icon: <UserRoundCheck className="text-green-600" size={30} />
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='space-y-10 py-10 sm:px-8 px-4 bg-dark-100 min-h-screen'
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='text-center space-y-1'
            >
                <h1 className='font-bold text-3xl'>
                    Hey, {user?.name || "User"}
                </h1>

                <p className="text-gray-800 text-xl">
                    Your Personal AI-Powered Resume Analyzer
                </p>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Analyze your resume, get smart improvements, and track your growth instantly.
                </p>           
            </motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-6 sm:px-10 lg:px'>
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15, duration: 0.4 }}
                    >
                        <Card className='shadow-md bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer'>
                            <CardHeader className='items-center justify-between pb-2 gap-4'>
                                <CardTitle className="text-xl font-bold text-gray-700">
                                    {card.title}
                                </CardTitle>
                                {card.icon}
                            </CardHeader>

                            <CardContent>
                                <p className='text-5xl tracking-tight font-semibold'>{card.value}</p>
                                <p className='text-sm text-gray-500 mt-2'>{card.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-center mt-10'
            >
                <h1 className='text-2xl font-semibold'>Ready to enhance your resume?</h1>
                <p className='text-xl text-gray-500 mt-1'>Upload your resume and get expert-level AI suggestions instantly.</p>

                <motion.div whileHover={{ scale: 1.05 }} className='inline-block'>
                    <Link to='/upload'>
                        <Button className='px-6 py-3 mt-5 text-lg cursor-pointer'>Upload Resume</Button>
                    </Link>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default OverviewPage
