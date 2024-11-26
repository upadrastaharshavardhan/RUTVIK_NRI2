// // Let's split this into multiple files for better organization

// // types.ts
// export interface PoojaType {
//   id: string;
//   name: string;
//   category: 'life_events' | 'homam' | 'shanti_pooja' | 'special_occasions' | 'ancestral_rituals' | 'regular_pooja';
//   description: string;
//   duration?: string;
//   requirements?: string[];
//   samagri?: string[];
// }

// // categories.ts
// export type PoojaCategory = 'life_events' | 'homam' | 'shanti_pooja' | 'special_occasions' | 'ancestral_rituals' | 'regular_pooja';

// // utils.ts
// export const getPoojaByCategoryId = (category: string) => {
//   return poojaTypes.filter(pooja => pooja.category === category);
// };

// export const getPoojaById = (id: string) => {
//   return poojaTypes.find(pooja => pooja.id === id);
// };

// // poojaData.ts
// export const poojaTypes: PoojaType[] = [
//   // Life Events
//   {
//     id: 'aksharabhyasam',
//     name: 'Aksharabhyasam',
//     category: 'life_events',
//     description: 'Traditional ceremony marking a child\'s formal education initiation, performed between ages 3-5. The child writes their first letters in rice, seeking blessings from Lord Ganesha and Goddess Saraswati.',
//     duration: '2-3 hours',
//     requirements: ['Traditional clothes for child', 'New books', 'Writing materials'],
//     samagri: ['Rice', 'Turmeric', 'Kumkum', 'Flowers', 'Betel leaves', 'Betel nuts', 'Fruits', 'Coconut', 'Lamp with oil/ghee']
//   },
//   {
//     id: 'annaprasana',
//     name: 'Annaprasana',
//     category: 'life_events',
//     description: 'Baby\'s first solid food ceremony, performed between 6-8 months. This sacred ritual marks the beginning of the child\'s ability to consume solid food.',
//     duration: '1-2 hours',
//     requirements: ['New clothes for baby', 'Silver/Gold feeding spoon'],
//     samagri: ['Cooked rice with ghee', 'Payasam', 'Banana', 'Honey', 'Turmeric', 'Kumkum', 'Flowers']
//   },
//   {
//     id: 'nischitartham',
//     name: 'Nischitartham',
//     category: 'life_events',
//     description: 'Engagement ceremony where both families formally agree to the marriage alliance. Exchange of gifts and rings symbolizes the commitment.',
//     duration: '2-3 hours',
//     requirements: ['Rings', 'New clothes', 'Traditional items'],
//     samagri: ['Flowers', 'Fruits', 'Coconut', 'Betel leaves', 'Turmeric', 'Kumkum']
//   },
//   {
//     id: 'bhima_ratha_shanti',
//     name: 'Bhima Ratha Shanti Ceremony',
//     category: 'life_events',
//     description: 'Special ceremony performed when a person reaches 70 years of age, seeking blessings for a healthy and peaceful life ahead.',
//     duration: '3-4 hours',
//     requirements: ['New clothes', 'Traditional items'],
//     samagri: ['Special puja items', 'Flowers', 'Fruits', 'Coconut', 'Incense']
//   },

//   // Homams (Adding new ones)
//   {
//     id: 'hayagreeva_homam',
//     name: 'Hayagreeva Homam',
//     category: 'homam',
//     description: 'Sacred fire ritual dedicated to Lord Hayagreeva, the god of knowledge and wisdom.',
//     duration: '2-3 hours',
//     requirements: ['White clothes preferred'],
//     samagri: ['Ghee', 'White flowers', 'Special herbs', 'Books', 'Honey']
//   },
//   {
//     id: 'kala_bhairava_homam',
//     name: 'Kala Bhairava Homam',
//     category: 'homam',
//     description: 'Powerful ritual to remove negative energies and provide protection.',
//     duration: '2-3 hours',
//     requirements: ['Black or dark blue clothes preferred'],
//     samagri: ['Black sesame', 'Special oils', 'Black flowers', 'Specific herbs']
//   },
//   {
//     id: 'karthaveeryarjuna_homam',
//     name: 'Karthaveeryarjuna Homam',
//     category: 'homam',
//     description: 'Ritual for gaining strength, prosperity, and victory over enemies.',
//     duration: '3-4 hours',
//     requirements: ['Red clothes preferred'],
//     samagri: ['Special herbs', 'Red flowers', 'Ghee', 'Specific items']
//   },

//   // Shanti Poojas (New category)
//   {
//     id: 'dhanishta_panchakam_shanti',
//     name: 'Dhanishta Panchakam Shanti',
//     category: 'shanti_pooja',
//     description: 'Special ritual performed to nullify the negative effects of Dhanishta Panchakam.',
//     duration: '2-3 hours',
//     requirements: ['Horoscope details', 'White clothes'],
//     samagri: ['Special items as per priest']
//   },
//   {
//     id: 'kuja_rahu_sandhi_shanti',
//     name: 'Kuja Rahu Sandhi Shanti',
//     category: 'shanti_pooja',
//     description: 'Ritual to mitigate the negative effects of Mars and Rahu conjunction.',
//     duration: '2-3 hours',
//     requirements: ['Horoscope', 'Red clothes'],
//     samagri: ['Special items for planetary peace']
//   },

//   // Regular Poojas (New category)
//   {
//     id: 'ayudha_pooja',
//     name: 'Ayudha Pooja',
//     category: 'regular_pooja',
//     description: 'Worship of tools, instruments, and vehicles during Navratri.',
//     duration: '1-2 hours',
//     requirements: ['Tools/Vehicles to be blessed'],
//     samagri: ['Flowers', 'Fruits', 'Kumkum', 'Turmeric']
//   },
//   {
//     id: 'saraswathi_pooja',
//     name: 'Saraswathi Pooja',
//     category: 'regular_pooja',
//     description: 'Worship of Goddess Saraswati for knowledge and wisdom.',
//     duration: '1-2 hours',
//     requirements: ['White clothes preferred', 'Books/Instruments'],
//     samagri: ['White flowers', 'Fruits', 'Special items']
//   },
//   {
//     id: 'vastu_shanti',
//     name: 'Vastu Shanti Pooja',
//     category: 'regular_pooja',
//     description: 'Ritual to harmonize the energies of a living space according to Vastu principles.',
//     duration: '2-3 hours',
//     requirements: ['House/Office layout', 'New items'],
//     samagri: ['Navaratnas', 'Copper items', 'Special herbs']
//   }
// ];

// // Export everything from a single file
// export * from './types';
// export * from './categories';
// export * from './utils';
// export * from './poojaData';



export interface PoojaType {
  id: string;
  name: string;
  category: 'life_events' | 'homam' | 'special_occasions';
  description: string;
  duration?: string;
  requirements?: string[];
  samagri?: string[];
}

export const poojaTypes: PoojaType[] = [
  // Life Events
  {
    id: 'aksharabhyasam',
    name: 'Aksharabhyasam',
    category: 'life_events',
    description: 'Traditional ceremony marking a child\'s formal education initiation, typically performed between ages 3-5. The child writes their first letters in rice, symbolizing the beginning of their educational journey.',
    duration: '2-3 hours',
    requirements: ['Traditional clothes for child', 'New books', 'Writing materials'],
    samagri: ['Rice', 'Turmeric', 'Kumkum', 'Flowers', 'Betel leaves', 'Betel nuts', 'Fruits', 'Coconut', 'Lamp with oil/ghee', 'Camphor']
  },
  {
    id: 'annaprasanam',
    name: 'Annaprasanam',
    category: 'life_events',
    description: 'Baby\'s first solid food ceremony, performed between 6-8 months. This sacred ritual marks an important milestone in a child\'s life as they transition to solid food.',
    duration: '1-2 hours',
    requirements: ['New clothes for baby', 'Silver/Gold feeding spoon'],
    samagri: ['Cooked rice with ghee', 'Payasam', 'Banana', 'Honey', 'Turmeric', 'Kumkum', 'Flowers', 'Coconut', 'Fruits', 'Lamp with oil/ghee']
  },
  {
    id: 'barasala',
    name: 'Barasala (Namakaranam)',
    category: 'life_events',
    description: 'The naming ceremony for a newborn, typically performed on the 12th day after birth. The chosen name is whispered into the baby\'s ear by the father.',
    duration: '1-2 hours',
    requirements: ['New clothes for baby', 'Horoscope chart'],
    samagri: ['Rice', 'Turmeric', 'Kumkum', 'Flowers', 'Coconut', 'Betel leaves', 'Fruits', 'Honey', 'Ghee lamp', 'Sacred thread']
  },
  {
    id: 'karna_vedha',
    name: 'Karna Vedha',
    category: 'life_events',
    description: 'Ear-piercing ceremony for infants, considered important for both spiritual and physical well-being.',
    duration: '1 hour',
    requirements: ['New clothes', 'Gold earrings'],
    samagri: ['Turmeric paste', 'Coconut oil', 'Cotton', 'Antiseptic solution', 'Flowers', 'Fruits', 'Betel leaves', 'Kumkum']
  },
  {
    id: 'upanayanam',
    name: 'Upanayanam',
    category: 'life_events',
    description: 'Sacred thread ceremony marking the beginning of Vedic education. The child receives the sacred thread and Gayatri mantra initiation.',
    duration: '4-5 hours',
    requirements: ['Traditional dhoti and angavastram', 'New clothes'],
    samagri: ['Sacred thread', 'Deer skin/mat', 'Yagnopaveetam', 'Palasha stick', 'Kamandalu', 'Darbha grass', 'Ghee', 'Wooden sandals', 'Begging bowl']
  },
  {
    id: 'marriage',
    name: 'Marriage (Vivaha)',
    category: 'life_events',
    description: 'Traditional Hindu wedding ceremony performed according to Vedic rituals, including Saptapadi (seven steps) around the sacred fire.',
    duration: '3-4 hours',
    requirements: ['Traditional wedding attire', 'Mangalsutra', 'Wedding rings'],
    samagri: ['Haldi', 'Kumkum', 'Rice', 'Coconuts', 'Mango leaves', 'Flowers', 'Fruits', 'Betel leaves', 'Ghee', 'Sacred thread']
  },
  {
    id: 'gruhapravesam',
    name: 'Gruhapravesam',
    category: 'life_events',
    description: 'House warming ceremony performed when moving into a new home, seeking divine blessings for prosperity and peace.',
    duration: '2-3 hours',
    requirements: ['New items for home', 'Main door decoration'],
    samagri: ['Kalash with water', 'Mango leaves', 'Coconut', 'Rice', 'Turmeric', 'Kumkum', 'Flowers', 'Navadhanya', 'Ghee lamp', 'Gangajal']
  },
  {
    id: 'sashtiapthapoorthi',
    name: 'Sashtiapthapoorthi (60th Birthday)',
    category: 'life_events',
    description: 'Special celebration marking the completion of 60 years, symbolizing a full cycle of life according to Hindu calendar.',
    duration: '3-4 hours',
    requirements: ['New clothes for couple', 'Traditional items'],
    samagri: ['Kalash', 'Navadhanya', 'Flowers', 'Fruits', 'Coconut', 'Betel leaves', 'Kumkum', 'Turmeric', 'Ghee lamp']
  },
  {
    id: 'bhima_ratha_shanti',
    name: 'Bhima Ratha Shanti (70th Birthday)',
    category: 'life_events',
    description: 'Milestone birthday celebration seeking blessings for longevity and good health.',
    duration: '2-3 hours',
    requirements: ['New clothes', 'Traditional items'],
    samagri: ['Kalash', 'Navadhanya', 'Flowers', 'Fruits', 'Coconut', 'Betel leaves', 'Kumkum', 'Turmeric']
  },
  {
    id: 'sathabhishekam',
    name: 'Sathabhishekam (80th Birthday)',
    category: 'life_events',
    description: 'Rare and auspicious celebration of completing 80 years, including special abhishekam ceremonies.',
    duration: '3-4 hours',
    requirements: ['New clothes', 'Traditional items'],
    samagri: ['Panchamrit', 'Flowers', 'Fruits', 'Coconut', 'Betel leaves', 'Kumkum', 'Turmeric', 'Ghee lamp']
  },

  // Homams
  {
    id: 'ganapathi_homam',
    name: 'Ganapathi Homam',
    category: 'homam',
    description: 'Sacred fire ritual dedicated to Lord Ganesha for removing obstacles and ensuring success in new ventures.',
    duration: '1-2 hours',
    requirements: ['Yellow/Red clothes preferred'],
    samagri: ['Ghee', 'Samidha', 'Modak', 'Durva grass', 'Red flowers', 'Coconut', 'Red chandanam', 'Agarbatti', 'Camphor']
  },
  {
    id: 'navagraha_homam',
    name: 'Navagraha Homam',
    category: 'homam',
    description: 'Powerful ritual to appease the nine planets and overcome planetary doshas affecting one\'s life.',
    duration: '2-3 hours',
    requirements: ['Traditional dress', 'Navaratna items'],
    samagri: ['Nine types of grains', 'Nine colors of flowers', 'Ghee', 'Samidha', 'Navadhanya', 'Copper vessel']
  },
  {
    id: 'ayushya_homam',
    name: 'Ayushya Homam',
    category: 'homam',
    description: 'Performed for longevity, good health, and protection from diseases and accidents.',
    duration: '1-2 hours',
    requirements: ['White clothes preferred'],
    samagri: ['Ghee', 'Samidha', 'Special herbs', 'White flowers', 'Coconut', 'Fruits', 'Honey']
  },
  {
    id: 'chandi_homam',
    name: 'Chandi Homam',
    category: 'homam',
    description: 'Powerful ritual dedicated to Goddess Chandi for protection and removal of negative energies.',
    duration: '3-4 hours',
    requirements: ['Red clothes preferred'],
    samagri: ['Ghee', 'Red flowers', 'Special herbs', 'Kumkum', 'Turmeric', 'Fruits', 'Coconut']
  },
  {
    id: 'dhanvantari_homam',
    name: 'Dhanvantari Homam',
    category: 'homam',
    description: 'Performed for good health and healing, dedicated to Lord Dhanvantari, the god of medicine.',
    duration: '2-3 hours',
    requirements: ['White clothes preferred'],
    samagri: ['Medicinal herbs', 'Ghee', 'White flowers', 'Fruits', 'Honey', 'Special oils']
  },
  {
    id: 'durga_homam',
    name: 'Durga Homam',
    category: 'homam',
    description: 'Powerful ritual for protection and strength, dedicated to Goddess Durga.',
    duration: '2-3 hours',
    requirements: ['Red clothes preferred'],
    samagri: ['Red flowers', 'Ghee', 'Special herbs', 'Kumkum', 'Turmeric', 'Fruits']
  },

  // Special Occasions
  {
    id: 'satyanarayan_vrat',
    name: 'Satyanarayan Vrat',
    category: 'special_occasions',
    description: 'Sacred puja dedicated to Lord Vishnu, performed for wish fulfillment and thanksgiving.',
    duration: '2-3 hours',
    requirements: ['Yellow/White clothes preferred'],
    samagri: ['Panchamrit', 'Banana leaves', 'Ghee', 'Sugar', 'Wheat flour', 'Fruits', 'Betel nuts']
  },
  {
    id: 'varalakshmi_vratam',
    name: 'Varalakshmi Vratam',
    category: 'special_occasions',
    description: 'Special puja performed by married women for family prosperity and well-being.',
    duration: '2-3 hours',
    requirements: ['Red/Green saree preferred', 'Kalash'],
    samagri: ['Turmeric', 'Kumkum', 'Rice', 'Flowers', 'Bangles', 'Coconut', 'Betel leaves']
  },
  {
    id: 'hanuman_parayanam',
    name: 'Hanuman Parayanam',
    category: 'special_occasions',
    description: 'Recitation of Hanuman Chalisa and other texts dedicated to Lord Hanuman for strength and protection.',
    duration: '2-3 hours',
    requirements: ['Orange/Red clothes preferred'],
    samagri: ['Sindoor', 'Oil lamp', 'Flowers', 'Fruits', 'Betel leaves', 'Coconut']
  },
  {
    id: 'venkateshwara_kalyanotsavam',
    name: 'Venkateshwara Kalyanotsavam',
    category: 'special_occasions',
    description: 'Divine marriage ceremony of Lord Venkateshwara and Goddess Padmavati.',
    duration: '3-4 hours',
    requirements: ['Traditional dress'],
    samagri: ['Flowers', 'Fruits', 'Coconut', 'Kumkum', 'Turmeric', 'Vastram', 'Kalash']
  },
  {
    id: 'shop_opening',
    name: 'Shop Opening Ceremony',
    category: 'special_occasions',
    description: 'Auspicious ceremony for new business ventures, seeking divine blessings for success.',
    duration: '1-2 hours',
    requirements: ['New account books', 'Business documents'],
    samagri: ['Kalash', 'Coconut', 'Rice', 'Turmeric', 'Kumkum', 'Flowers', 'Fruits']
  },
  {
    id: 'movie_opening',
    name: 'Movie Opening Pooja',
    category: 'special_occasions',
    description: 'Traditional ceremony performed at the beginning of a new film project for its success.',
    duration: '1-2 hours',
    requirements: ['Script/Screenplay copy', 'Camera for muhurtham shot'],
    samagri: ['Coconut', 'Flowers', 'Fruits', 'Kumkum', 'Turmeric', 'Camphor', 'Incense']
  }
];

export const getPoojaByCategoryId = (category: string) => {
  return poojaTypes.filter(pooja => pooja.category === category);
};

export const getPoojaById = (id: string) => {
  return poojaTypes.find(pooja => pooja.id === id);
};