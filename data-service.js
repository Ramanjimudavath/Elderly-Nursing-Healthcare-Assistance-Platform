// data-service.js
// This acts as our backend API using localStorage

const DB_KEY = "elderlyCareData";
const USD_TO_INR = 85; // 1 USD = ₹85

// Initialize Database with default data
function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    // Base prices in USD
    const baseCaregivers = [
      {
        id: 101,
        name: "Sarah Johnson",
        role: "Nurse",
        rating: 5.0,
        experience: 8,
        rate: 25,
        available: true,
      },
      {
        id: 102,
        name: "Michael Chen",
        role: "Physiotherapist",
        rating: 4.8,
        experience: 6,
        rate: 35,
        available: true,
      },
      {
        id: 103,
        name: "Emily Rodriguez",
        role: "Attendant",
        rating: 5.0,
        experience: 10,
        rate: 28,
        available: false,
      },
    ];

    // Convert base prices to INR based on Experience + Rating
    const caregivers = baseCaregivers.map((c) => {
      // Calculate dynamic INR price
      // Base conversion + Bonus based on (Experience * 0.5) + (Rating * 10)
      const bonusMultiplier = 1 + (c.experience * 0.5 + c.rating * 2) / 100;
      const inrPrice = Math.round(c.rate * USD_TO_INR * bonusMultiplier);
      return { ...c, rateINR: inrPrice };
    });

    const initialData = {
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          role: "user",
        },
        {
          id: 999,
          name: "Admin",
          email: "admin@elderlycare.com",
          password: "admin123",
          role: "admin",
        },
      ],
      patients: [],
      caregivers: caregivers,
      bookings: [
        {
          id: 1,
          service: "Nursing Care",
          caregiver: "Sarah Johnson",
          date: "2026-06-25",
          time: "10:00",
          status: "In Progress",
          amount: 2500,
          userId: 1,
        },
        {
          id: 2,
          service: "Elderly Attendant",
          caregiver: "Emily Rodriguez",
          date: "2026-06-24",
          time: "08:00",
          status: "Pending",
          amount: 2800,
          userId: 1,
        },
        {
          id: 3,
          service: "Physiotherapy",
          caregiver: "Michael Chen",
          date: "2026-06-23",
          time: "14:00",
          status: "Completed",
          amount: 3600,
          userId: 1,
        },
      ],
    };
    localStorage.setItem(DB_KEY, JSON.stringify(initialData));
  }
}

// Generic CRUD functions
function getData() {
  initDB();
  return JSON.parse(localStorage.getItem(DB_KEY));
}

function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// --- USER & AUTH FEATURES ---
function registerUser(name, email, password) {
  const db = getData();
  const existingUser = db.users.find((u) => u.email === email);
  if (existingUser)
    return { success: false, message: "Email already registered" };

  const newUser = { id: Date.now(), name, email, password, role: "user" };
  db.users.push(newUser);
  saveData(db);
  return { success: true, user: newUser };
}

function loginUser(email, password) {
  const db = getData();
  const user = db.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    const userExists = db.users.find((u) => u.email === email);
    if (userExists) return { success: false, message: "Incorrect password" };
    return { success: false, message: "User not found. Please register." };
  }
  return { success: true, user };
}

// --- PATIENT PROFILE FEATURES ---
function createPatientProfile(userId, patientData) {
  const db = getData();
  patientData.id = Date.now();
  patientData.userId = Number(userId);
  db.patients.push(patientData);
  saveData(db);
  return patientData;
}

function getPatientProfile(userId) {
  const db = getData();
  return db.patients.find((p) => p.userId === Number(userId));
}

// --- BOOKING FEATURES ---
function createBooking(bookingData) {
  const db = getData();
  bookingData.id = Date.now();
  bookingData.status = "Pending";
  bookingData.userId = Number(bookingData.userId);

  // If amount is in USD, convert to INR
  if (bookingData.amount && bookingData.amount < 100) {
    bookingData.amount = Math.round(bookingData.amount * USD_TO_INR);
  }

  db.bookings.push(bookingData);
  saveData(db);
  return bookingData;
}

function getUserBookings(userId) {
  const db = getData();
  return db.bookings.filter((b) => b.userId === Number(userId));
}

function updateBookingStatus(bookingId, newStatus) {
  const db = getData();
  const booking = db.bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = newStatus;
    saveData(db);
    return true;
  }
  return false;
}
// --- DIGITAL VERIFICATION SYSTEM ---
function verifyCaregiver(caregiverId) {
  const db = getData();
  const caregiver = db.caregivers.find((c) => c.id === caregiverId);

  if (caregiver) {
    caregiver.isVerified = true;
    caregiver.verifiedDate = new Date().toISOString();
    caregiver.digitalCertificate = `https://elderlycare.com/verify/${caregiverId}`;
    saveData(db);
    return { success: true, certificate: caregiver.digitalCertificate };
  }
  return { success: false };
}

function getVerifiedCaregivers() {
  const db = getData();
  return db.caregivers.filter((c) => c.isVerified === true);
}

// --- DIGITAL NOTIFICATION SYSTEM (Mock) ---
function sendDigitalNotification(userId, message) {
  // In a real app, this would send an SMS/Email/Push notification
  console.log(`📱 DIGITAL NOTIFICATION to User ${userId}: ${message}`);

  // Simulate saving to a notification log
  const db = getData();
  if (!db.notifications) db.notifications = [];
  db.notifications.push({
    userId: Number(userId),
    message: message,
    read: false,
    date: new Date().toISOString(),
  });
  saveData(db);
  return true;
}
// --- CAREGIVER FEATURES ---
function getCaregivers() {
  return getData().caregivers;
}

// --- REPORT FEATURES ---
function getReports() {
  return getData().reports || [];
}

function generateReport(type) {
  const db = getData();
  if (!db.reports) db.reports = [];
  const newReport = {
    id: Date.now(),
    type: type,
    date: new Date().toISOString().split("T")[0],
    value:
      type === "Revenue"
        ? `₹${(Math.random() * 100000 + 50000).toFixed(2)}`
        : "Generated",
    status: "Generated",
  };
  db.reports.push(newReport);
  saveData(db);
  return newReport;
}

// --- SUPPORT FEATURES ---
function getSupportTickets() {
  return getData().supportTickets || [];
}

function createSupportTicket(subject, message) {
  const db = getData();
  if (!db.supportTickets) db.supportTickets = [];
  const ticket = {
    id: Date.now(),
    subject: subject,
    message: message,
    status: "Open",
    date: new Date().toISOString().split("T")[0],
  };
  db.supportTickets.push(ticket);
  saveData(db);
  return ticket;
}
// --- SIMULATE CAREGIVER ACTION (For Testing Real-Time Updates) ---
function simulateCaregiverUpdate(bookingId) {
  const db = getData();
  const booking = db.bookings.find((b) => b.id === bookingId);

  if (booking) {
    // Simulate a status change
    if (booking.status === "Pending") {
      booking.status = "In Progress";
    } else if (booking.status === "In Progress") {
      booking.status = "Completed";
    } else {
      booking.status = "Pending";
    }
    saveData(db);
    return { success: true, newStatus: booking.status };
  }
  return { success: false };
}
// --- DIGITAL ANALYTICS & TRACKING ---
function getBookingAnalytics(userId) {
  const db = getData();
  const userBookings = db.bookings.filter((b) => b.userId === Number(userId));

  return {
    totalBookings: userBookings.length,
    completed: userBookings.filter((b) => b.status === "Completed").length,
    inProgress: userBookings.filter((b) => b.status === "In Progress").length,
    pending: userBookings.filter((b) => b.status === "Pending").length,
    totalSpent: userBookings.reduce((sum, b) => sum + b.amount, 0),
  };
}
// --- NEW HELPER FOR DASHBOARD STATS ---
function getTotalBookingsForUser(userId) {
  const db = getData();
  return db.bookings.filter((b) => b.userId === Number(userId)).length;
}
