// Tamil Nadu Districts for agricultural predictions
export const DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore",
  "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kancheepuram",
  "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai",
  "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai",
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi",
  "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli",
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur",
  "Vellore", "Viluppuram", "Virudhunagar"
] as const;

// Common crops grown in Tamil Nadu
export const CROPS = [
  "Rice", "Sugarcane", "Banana", "Groundnut", "Cotton",
  "Maize", "Coconut", "Turmeric", "Tapioca", "Millets",
  "Black Gram", "Green Gram", "Sesame", "Sunflower", "Sorghum",
  "Onion", "Tomato", "Chillies", "Brinjal", "Mango"
] as const;

// Agricultural seasons
export const SEASONS = [
  { value: "kharif", label: "Kharif (Jun-Oct)", description: "Monsoon season crops" },
  { value: "rabi", label: "Rabi (Oct-Mar)", description: "Winter season crops" },
  { value: "summer", label: "Summer (Mar-Jun)", description: "Summer season crops" },
  { value: "whole_year", label: "Whole Year", description: "Perennial crops" }
] as const;

// API Configuration - Update this with your FastAPI backend URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
