// pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaUserMd,
  FaClock,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import ServiceCard from "../components/ServiceCard";

const LandingPage = () => {
  const [services] = useState([
    {
      id: 1,
      name: "Nursing Care",
      description: "Professional nursing care at home with trained nurses",
      icon: "🏥",
      price: "$25/hr",
    },
    {
      id: 2,
      name: "Elderly Attendant",
      description: "Compassionate attendants for daily care and companionship",
      icon: "👵",
      price: "$18/hr",
    },
    {
      id: 3,
      name: "Physiotherapy",
      description: "Expert physiotherapy sessions for mobility and recovery",
      icon: "💪",
      price: "$35/hr",
    },
    {
      id: 4,
      name: "Post-Hospital Care",
      description: "Comprehensive care support after hospital discharge",
      icon: "🏨",
      price: "$30/hr",
    },
  ]);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <FaHeart className="text-red-500 text-2xl" />
              <span className="text-2xl font-bold text-gray-800">
                ElderlyCare
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Quality Elderly Care at Your Fingertips
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Connect with verified caregivers for nursing, companionship, and
              healthcare services in the comfort of your home.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center"
              >
                Book a Service <FaArrowRight className="ml-2" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose ElderlyCare?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide trusted, reliable, and compassionate care for your
              loved ones
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-50 rounded-xl text-center"
            >
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold mb-2">
                Verified Caregivers
              </h3>
              <p className="text-gray-600">
                All caregivers undergo thorough verification and background
                checks
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-50 rounded-xl text-center"
            >
              <div className="text-4xl mb-4">🕒</div>
              <h3 className="text-xl font-semibold mb-2">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600">
                Book hourly, daily, or long-term care services as per your needs
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-50 rounded-xl text-center"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Track service status and receive instant updates
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-50 rounded-xl text-center"
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Regular quality monitoring and customer satisfaction surveys
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600">
              Comprehensive healthcare solutions for elderly individuals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold">500+</div>
              <div className="mt-2">Caregivers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">1000+</div>
              <div className="mt-2">Happy Families</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">98%</div>
              <div className="mt-2">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">50+</div>
              <div className="mt-2">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of families who trust ElderlyCare for their loved
            ones
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Start Your Care Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2024 ElderlyCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
