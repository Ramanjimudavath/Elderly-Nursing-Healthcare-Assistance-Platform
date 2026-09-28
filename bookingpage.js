// pages/BookService.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookService = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchCaregivers();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchCaregivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/caregivers/available",
      );
      setCaregivers(response.data);
    } catch (error) {
      console.error("Error fetching caregivers:", error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const bookingData = {
        ...data,
        service: selectedService,
        bookingType: data.bookingType,
        duration: parseInt(data.duration),
      };

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      toast.success("Service booked successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error booking service:", error);
      toast.error("Failed to book service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Book a Service
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name} - ${service.price}/hr
                  </option>
                ))}
              </select>
            </div>

            {/* Caregiver Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Caregiver
              </label>
              <select
                {...register("caregiver", {
                  required: "Please select a caregiver",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a caregiver</option>
                {caregivers.map((caregiver) => (
                  <option key={caregiver._id} value={caregiver._id}>
                    {caregiver.user.name} - {caregiver.yearsOfExperience} years
                    exp
                  </option>
                ))}
              </select>
              {errors.caregiver && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.caregiver.message}
                </p>
              )}
            </div>

            {/* Booking Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Booking Type
              </label>
              <select
                {...register("bookingType", {
                  required: "Please select booking type",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="long-term">Long-term</option>
              </select>
              {errors.bookingType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.bookingType.message}
                </p>
              )}
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (hours)
              </label>
              <input
                type="number"
                {...register("duration", {
                  required: "Please enter duration",
                  min: {
                    value: 1,
                    message: "Duration must be at least 1 hour",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of hours"
              />
              {errors.duration && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="datetime-local"
                {...register("startDate", {
                  required: "Please select start date",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                {...register("specialInstructions")}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any specific requirements or instructions..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Booking..." : "Book Service"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookService;
