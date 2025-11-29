import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import support from '../assets/support.svg';
import { motion } from 'framer-motion';

const HelpSupportPage = () => {
  const faqs = [
    {
      question: "How do I upload my resume?",
      answer: "You can upload your resume from the Upload Resume page. Just drag and drop your CV or select it manually, then click Upload to start the analysis."
    },
    {
      question: "What formats are supported?",
      answer: "We currently support PDF, DOC, and DOCX resume formats. More formats will be added soon."
    },
    {
      question: "How accurate is the AI feedback?",
      answer: "Our AI uses advanced language models trained on industry-standard hiring data. While highly accurate, the feedback should be used as guidance - not a guaranteed outcome."
    },
    {
      question: "Will my resume be stored securely?",
      answer: "Yes. Your resume is stored using encrypted cloud storage and is never shared with third parties. You control your data at all times and can delete it whenever you want."
    },
    {
      question: "How many resumes can I upload?",
      answer: "It's easy"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='bg-white w-full min-h-screen p-10'
    >
      <motion.h1 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5 }} className='text-3xl text-black font-bold'>FAQs</motion.h1>
      <motion.h3 initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5, delay:0.1 }} className='text-2xl text-gray-900 mt-1'>Find quick answers to the most common questions.</motion.h3>
      <motion.p initial={{ y:-20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.5, delay:0.2 }} className='text-gray-500 text-sm mt-1'>Last updated on November 2025</motion.p>

      <div className='mt-8 mx-auto max-w-4xl'>
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            initial={{ opacity:0, y:10 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: index * 0.1, duration:0.4 }}
            className='mb-5'
          >
            <Accordion type="single" collapsible className='border rounded-xl px-4 border-gray-300 hover:border-green-400'>
              <AccordionItem value={`item-${index+1}`}>
                <AccordionTrigger className='text-start text-xl font-semibold cursor-pointer'>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className='text-lg text-gray-500'>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay: faqs.length * 0.1 + 0.1, duration:0.5 }}
          className="mt-16 mx-auto max-w-3xl"
        >
          <h2 className="text-3xl font-bold text-black">Support</h2>
          <p className="text-gray-600 mt-1 text-lg">
            If you have suggestions or found an issue, feel free to contact us.
          </p>

          <div  
            className="mt-6 border border-gray-300 rounded-xl p-8 shadow-sm bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${support})`}}
          >
            <h3 className="text-2xl font-semibold text-gray-900">Give Feedback or Report a Bug</h3>
            <p className="text-gray-500 mt-1">
              Send us your message and our team will get back to you soon.
            </p>

            <form className="mt-6 space-y-5">
              <div>
                <label className="text-gray-700 text-sm font-medium">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-1 w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-green-500 shadow-sm bg-white/90"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:border-green-500 shadow-sm bg-white/90"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm font-medium">Message</label>
                <textarea
                  placeholder="Write your message..."
                  className="mt-1 w-full border rounded-lg px-4 py-2 h-32 text-gray-700 focus:outline-none focus:border-green-500 bg-white/90 shadow-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HelpSupportPage;
