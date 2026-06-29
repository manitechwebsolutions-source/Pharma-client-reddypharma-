export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  available: boolean;
  emoji: string;
  image?: string; // data URL stored in localStorage
};

export const CATEGORIES = [
  "All",
  "Medicines",
  "Supplements",
  "Personal Care",
  "Baby Care",
  "Equipment",
] as const;

export const PRODUCTS: Product[] = [
  { id: "1", name: "Paracetamol 500mg", category: "Medicines", description: "Effective pain & fever relief tablets.", available: true, emoji: "💊" },
  { id: "2", name: "Vitamin D3 60K", category: "Supplements", description: "Weekly dose to support bone health.", available: true, emoji: "🌞" },
  { id: "3", name: "Multivitamin Daily", category: "Supplements", description: "Complete daily nutrition support.", available: true, emoji: "🧪" },
  { id: "4", name: "Cetirizine 10mg", category: "Medicines", description: "Fast relief from allergy symptoms.", available: true, emoji: "💊" },
  { id: "5", name: "Hand Sanitizer 500ml", category: "Personal Care", description: "70% alcohol, kills 99.9% germs.", available: true, emoji: "🧴" },
  { id: "6", name: "Baby Diapers (Pack)", category: "Baby Care", description: "Soft, ultra-absorbent, all-night dry.", available: true, emoji: "👶" },
  { id: "7", name: "BP Monitor Digital", category: "Equipment", description: "Clinically accurate home BP monitor.", available: true, emoji: "🩺" },
  { id: "8", name: "Glucometer Kit", category: "Equipment", description: "Blood sugar testing with 25 strips.", available: false, emoji: "🩸" },
  { id: "9", name: "Face Wash Neem", category: "Personal Care", description: "Gentle deep-cleansing daily face wash.", available: true, emoji: "🧼" },
  { id: "10", name: "Baby Lotion Soothing", category: "Baby Care", description: "Hypoallergenic moisturizing lotion.", available: true, emoji: "🍼" },
  { id: "11", name: "Pulse Oximeter", category: "Equipment", description: "Fingertip SpO2 & pulse monitor.", available: true, emoji: "📟" },
  { id: "12", name: "Omega-3 Fish Oil", category: "Supplements", description: "Heart & brain wellness capsules.", available: true, emoji: "🐟" },
];
