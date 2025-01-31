import { useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          'service_srliagu', // Replace with your EmailJS Service ID
          'template_2s90nai', // Replace with your EmailJS Template ID
          form.current,
          'xkDpyw5oN2Fxj_Ace' // Replace with your EmailJS Public Key
        )
        .then(
          () => {
            toast.success('Message sent successfully!');
            form.current?.reset();
          },
          (error) => {
            toast.error('Failed to send message. Please try again.');
            console.error('Email sending failed:', error);
          }
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <form
        ref={form}
        onSubmit={sendEmail}
        className="space-y-6 bg-white p-8 rounded-lg shadow-sm"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            name="user_name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition-all"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            your phone number
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            name="phone"
            id="phone"
            required
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            name="user_email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            id="message"
            name="message"
            rows={4}
            required
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-300 focus:ring-opacity-50 transition-all"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
        >
          Send Message
        </motion.button>
      </form>
      <Toaster position="bottom-right" />
    </motion.div>
  );
};

export default ContactForm;
