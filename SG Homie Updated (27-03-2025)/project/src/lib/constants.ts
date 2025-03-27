export const LOCATIONS = [
  'ANG MO KIO',
  'BEDOK',
  'BISHAN',
  'BUKIT BATOK',
  'BUKIT MERAH',
  'BUKIT PANJANG',
  'BUKIT TIMAH',
  'CENTRAL AREA',
  'CHOA CHU KANG',
  'CLEMENTI',
  'GEYLANG',
  'HOUGANG',
  'JURONG EAST',
  'JURONG WEST',
  'KALLANG/WHAMPOA',
  'MARINE PARADE',
  'PASIR RIS',
  'PUNGGOL',
  'QUEENSTOWN',
  'SEMBAWANG',
  'SENGKANG',
  'SERANGOON',
  'TAMPINES',
  'TOA PAYOH',
  'WOODLANDS',
  'YISHUN'
].sort();

export const FLAT_TYPES = [
  '2 ROOM',
  '3 ROOM',
  '4 ROOM',
  '5 ROOM',
  'EXECUTIVE'
];

export const INCOME_RANGES = [
  '0-3000',
  '3001-6000',
  '6001-9000',
  '9001-12000',
  '12001+'
];

// Dummy property data
export const DUMMY_PROPERTIES = LOCATIONS.flatMap(location => 
  FLAT_TYPES.map((type, index) => ({
    id: `${location.toLowerCase().replace(/\W/g, '-')}-${type.toLowerCase().replace(/\W/g, '-')}-${index}`,
    title: `${type} Flat in ${location}`,
    description: `Beautiful ${type} flat in ${location} with modern amenities and great connectivity.`,
    location,
    type,
    price: 300000 + (Math.random() * 700000),
    size: `${70 + (index * 20)} sqm`,
    floor: `${Math.floor(Math.random() * 20) + 1}`,
    yearBuilt: `${2000 + Math.floor(Math.random() * 23)}`,
    coordinates: [
      1.3521 + (Math.random() - 0.5) * 0.1,
      103.8198 + (Math.random() - 0.5) * 0.1
    ],
    image: `https://images.unsplash.com/photo-1565967511849-76a60a516170?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80`,
    amenities: [
      {
        name: 'Shopping Mall',
        type: 'shopping',
        distance: `${Math.floor(Math.random() * 1000)}m`
      },
      {
        name: 'MRT Station',
        type: 'transport',
        distance: `${Math.floor(Math.random() * 800)}m`
      },
      {
        name: 'Primary School',
        type: 'education',
        distance: `${Math.floor(Math.random() * 1200)}m`
      }
    ],
    score: Math.floor(Math.random() * 3) + 7
  }))
);