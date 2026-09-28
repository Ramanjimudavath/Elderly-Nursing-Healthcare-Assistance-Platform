// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "caregiver", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  profileImage: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
// models/Patient.js
const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  medicalConditions: [String],
  allergies: [String],
  medications: [
    {
      name: String,
      dosage: String,
      frequency: String,
    },
  ],
  mobilityStatus: {
    type: String,
    enum: ["Independent", "Walker", "Wheelchair", "Bedridden"],
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
  },
  preferredLanguage: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
// models/Caregiver.js
const mongoose = require("mongoose");

const caregiverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  qualifications: [
    {
      type: String,
      required: true,
    },
  ],
  certifications: [
    {
      name: String,
      issuingAuthority: String,
      date: Date,
      expiryDate: Date,
    },
  ],
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  services: [
    {
      type: String,
      enum: [
        "Nursing Care",
        "Elderly Attendant",
        "Physiotherapy",
        "Post-Hospital Care",
      ],
    },
  ],
  availability: {
    monday: { start: String, end: String },
    tuesday: { start: String, end: String },
    wednesday: { start: String, end: String },
    thursday: { start: String, end: String },
    friday: { start: String, end: String },
    saturday: { start: String, end: String },
    sunday: { start: String, end: String },
  },
  serviceAreas: [String],
  hourlyRate: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: Number,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationDocuments: [String],
  bio: String,
  languages: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Caregiver", caregiverSchema);
// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caregiver",
    required: true,
  },
  service: {
    type: String,
    enum: [
      "Nursing Care",
      "Elderly Attendant",
      "Physiotherapy",
      "Post-Hospital Care",
    ],
    required: true,
  },
  bookingType: {
    type: String,
    enum: ["hourly", "daily", "long-term"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  careNotes: [
    {
      note: String,
      date: {
        type: Date,
        default: Date.now,
      },
      caregiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  serviceAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  specialInstructions: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
module.exports = {
  User: mongoose.model("User", userSchema),
  Patient: mongoose.model("Patient", patientSchema),
  Caregiver: mongoose.model("Caregiver", caregiverSchema),
  Booking: mongoose.model("Booking", bookingSchema),
};
