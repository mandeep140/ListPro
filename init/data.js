const sampleListings = [ 
  {
    title: "Mountain Adventure",
    description: "Explore the best hiking trails in the mountains.",
    image: "https://img.freepik.com/free-photo/beautiful-view-sunset-mountains_23-2148019892.jpg?size=626&ext=jpg", // Mountain Adventure Image
    price: 200,
    location: "Colorado",
    country: "USA"
  },
  {
    title: "Beach Getaway",
    description: "A relaxing vacation on a beautiful beach.",
    image: "https://img.freepik.com/free-photo/beach-sunset-ocean_23-2148019892.jpg?size=626&ext=jpg", // Beach Getaway Image
    price: 150,
    location: "Florida",
    country: "USA"
  },
  {
    title: "City Tour",
    description: "Discover the urban wonders with our exclusive city tour.",
    image: "https://img.freepik.com/free-photo/new-york-city-skyline-night_23-2148019892.jpg?size=626&ext=jpg", // City Tour Image
    price: 100,
    location: "New York",
    country: "USA"
  },
  {
    title: "Desert Safari",
    description: "Experience the thrill of a desert safari ride.",
    image: "https://img.freepik.com/free-photo/desert-safari-ride-sand-dunes_23-2148019892.jpg?size=626&ext=jpg", // Desert Safari Image
    price: 250,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Tropical Island Escape",
    description: "Escape to a tropical paradise with crystal clear waters.",
    image: "https://img.freepik.com/free-photo/tropical-island-beach-palm-trees_23-2148019892.jpg?size=626&ext=jpg", // Tropical Island Escape Image
    price: 300,
    location: "Maldives",
    country: "Maldives"
  },
  {
    title: "Safari Adventure",
    description: "A thrilling safari experience in the African savannah.",
    image: "https://img.freepik.com/free-photo/african-safari-elephant_23-2148019892.jpg?size=626&ext=jpg", // Safari Adventure Image
    price: 400,
    location: "Kenya",
    country: "Kenya"
  },
  {
    title: "Mountain Skiing",
    description: "Enjoy the best slopes and snowy mountains for skiing.",
    image: "https://img.freepik.com/free-photo/skiing-snowy-mountains_23-2148019892.jpg?size=626&ext=jpg", // Mountain Skiing Image
    price: 350,
    location: "Switzerland",
    country: "Switzerland"
  },
  {
    title: "Cultural Heritage Tour",
    description: "A deep dive into history and culture of ancient civilizations.",
    image: "https://img.freepik.com/free-photo/ancient-ruins-greece_23-2148019892.jpg?size=626&ext=jpg", // Cultural Heritage Tour Image
    price: 220,
    location: "Athens",
    country: "Greece"
  },
  {
    title: "Luxury Cruise",
    description: "Enjoy a luxurious cruise through the Mediterranean Sea.",
    image: "https://img.freepik.com/free-photo/luxury-cruise-ship-sea_23-2148019892.jpg?size=626&ext=jpg", // Luxury Cruise Image
    price: 500,
    location: "Barcelona",
    country: "Spain"
  },
  {
    title: "Northern Lights Expedition",
    description: "Witness the beauty of the Northern Lights in the Arctic Circle.",
    image: "https://img.freepik.com/free-photo/northern-lights-arctic_23-2148019892.jpg?size=626&ext=jpg", // Northern Lights Image
    price: 600,
    location: "Iceland",
    country: "Iceland"
  },
  {
    title: "Romantic Paris Escape",
    description: "A dreamy getaway to the City of Lights with your loved one.",
    image: "https://img.freepik.com/free-photo/eiffel-tower-paris-night_23-2148019892.jpg?size=626&ext=jpg", // Romantic Paris Image
    price: 450,
    location: "Paris",
    country: "France"
  },
  {
    title: "Wildlife Photography Tour",
    description: "Capture amazing wildlife moments on this photography tour.",
    image: "https://img.freepik.com/free-photo/wildlife-photography-safari_23-2148019892.jpg?size=626&ext=jpg", // Wildlife Photography Image
    price: 550,
    location: "South Africa",
    country: "South Africa"
  },
  {
    title: "Snowboarding Adventure",
    description: "A thrilling snowboarding adventure in the snowy mountains.",
    image: "https://img.freepik.com/free-photo/snowboarding-mountains_23-2148019892.jpg?size=626&ext=jpg", // Snowboarding Adventure Image
    price: 400,
    location: "Canada",
    country: "Canada"
  },
  {
    title: "European Road Trip",
    description: "Travel across Europe in a luxurious road trip.",
    image: "https://img.freepik.com/free-photo/europe-road-trip-mountains_23-2148019892.jpg?size=626&ext=jpg", // European Road Trip Image
    price: 700,
    location: "Europe",
    country: "Europe"
  },
  {
    title: "Amazon Rainforest Adventure",
    description: "Experience the biodiversity of the Amazon Rainforest.",
    image: "https://img.freepik.com/free-photo/amazon-rainforest-jungle_23-2148019892.jpg?size=626&ext=jpg", // Amazon Rainforest Image
    price: 500,
    location: "Brazil",
    country: "Brazil"
  },
  {
    title: "Coral Reef Snorkeling",
    description: "Explore the wonders of coral reefs while snorkeling.",
    image: "https://img.freepik.com/free-photo/snorkeling-coral-reef_23-2148019892.jpg?size=626&ext=jpg", // Coral Reef Snorkeling Image
    price: 150,
    location: "Australia",
    country: "Australia"
  },
  {
    title: "Grand Canyon Exploration",
    description: "A breathtaking exploration of the Grand Canyon.",
    image: "https://img.freepik.com/free-photo/grand-canyon-sunset_23-2148019892.jpg?size=626&ext=jpg", // Grand Canyon Image
    price: 180,
    location: "Arizona",
    country: "USA"
  },
  {
    title: "Historical Rome Tour",
    description: "Visit the iconic landmarks and ruins in Rome.",
    image: "https://img.freepik.com/free-photo/rome-colosseum-ancient_23-2148019892.jpg?size=626&ext=jpg", // Historical Rome Image
    price: 250,
    location: "Rome",
    country: "Italy"
  },
  {
    title: "Pyramids of Giza Tour",
    description: "Discover the ancient wonders of the Pyramids in Egypt.",
    image: "https://img.freepik.com/free-photo/pyramids-giza-egypt_23-2148019892.jpg?size=626&ext=jpg", // Pyramids of Giza Image
    price: 300,
    location: "Cairo",
    country: "Egypt"
  },
  {
    title: "Volcano Adventure",
    description: "Explore an active volcano and surrounding hot springs.",
    image: "https://img.freepik.com/free-photo/active-volcano-eruption_23-2148019892.jpg?size=626&ext=jpg", // Volcano Adventure Image
    price: 220,
    location: "Hawaii",
    country: "USA"
  }
];

module.exports = { data: sampleListings };
