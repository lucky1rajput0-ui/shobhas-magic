export type ProductStatus = "available" | "coming-soon";

export type ProductVariant = {
  id: string;
  label: string;
  sku: string;
  price: number;
  grams?: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  images: string[];
  collectionIds: string[];
  featured: boolean;
  status: ProductStatus;
  variants: ProductVariant[];
  ingredients: string[];
  allergens: string[];
  shelfLife: string;
  storage: string;
  originNote: string;
  occasions: string[];
  seoKeywords: string[];
};

export type CollectionGroup =
  | "kitchen"
  | "festive"
  | "gifting"
  | "regional"
  | "coming-soon";

export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  group: CollectionGroup;
  image: string;
  featured: boolean;
};

export const collections: Collection[] = [
  {
    id: "traditional-sweets",
    slug: "traditional-sweets",
    name: "Traditional Sweets",
    description: "Time-honoured recipes, prepared in small batches in Kolkata.",
    group: "kitchen",
    image: "/images/assortment.jpg",
    featured: true,
  },
  {
    id: "festive-collections",
    slug: "festive-collections",
    name: "Festive Collections",
    description: "Curated boxes for Diwali, Chhath, Holi, Raksha Bandhan and more.",
    group: "festive",
    image: "/images/gifting-hero.jpg",
    featured: true,
  },
  {
    id: "gifting",
    slug: "gifting",
    name: "Gifting",
    description: "Wedding, corporate and personal gifts, composed with care.",
    group: "gifting",
    image: "/images/hampers.jpg",
    featured: true,
  },
  {
    id: "regional-favourites",
    slug: "regional-favourites",
    name: "Regional Favourites",
    description: "Indian sweets, snacks and delicacies with a regional soul.",
    group: "regional",
    image: "/images/heritage.jpg",
    featured: true,
  },
  {
    id: "coming-soon",
    slug: "coming-soon",
    name: "Coming Soon",
    description: "Makhana, sattu, namkeen, spices and pantry essentials — on their way.",
    group: "coming-soon",
    image: "/images/coming-soon.jpg",
    featured: true,
  },
  {
    id: "diwali",
    slug: "diwali-boxes",
    name: "Diwali Boxes",
    description: "Assortments composed for the festival of lights.",
    group: "festive",
    image: "/images/diwali.jpg",
    featured: false,
  },
  {
    id: "chhath",
    slug: "chhath-boxes",
    name: "Chhath Boxes",
    description: "Thoughtfully prepared collections inspired by the traditions of Chhath.",
    group: "festive",
    image: "/images/chhath.jpg",
    featured: false,
  },
  {
    id: "holi",
    slug: "holi-collections",
    name: "Holi Collections",
    description: "Bright, shareable sweets for the festival of colour.",
    group: "festive",
    image: "/images/gifting-hero.jpg",
    featured: false,
  },
  {
    id: "raksha-bandhan",
    slug: "raksha-bandhan",
    name: "Raksha Bandhan",
    description: "Gifts for siblings, packed to travel well.",
    group: "festive",
    image: "/images/hampers.jpg",
    featured: false,
  },
  {
    id: "festive-hampers",
    slug: "festive-hampers",
    name: "Festive Hampers",
    description: "Larger assortments for homes that like to host.",
    group: "festive",
    image: "/images/hampers.jpg",
    featured: false,
  },
  {
    id: "wedding-gifting",
    slug: "wedding-gifting",
    name: "Wedding Gifting",
    description: "Elegant Indian sweets and curated hampers for weddings.",
    group: "gifting",
    image: "/images/wedding.jpg",
    featured: false,
  },
  {
    id: "corporate-gifting",
    slug: "corporate-gifting",
    name: "Corporate Gifting",
    description: "Premium food hampers for clients, employees and partners.",
    group: "gifting",
    image: "/images/corporate.jpg",
    featured: false,
  },
  {
    id: "personal-gifting",
    slug: "personal-gifting",
    name: "Personal Gifting",
    description: "A beautiful box for a neighbour, a host, or someone far from home.",
    group: "gifting",
    image: "/images/insta-table.jpg",
    featured: false,
  },
];

const sweetWeights = (
  slug: string,
  prices: [number, number, number],
): ProductVariant[] => [
  {
    id: `${slug}-250`,
    label: "250g",
    sku: `${slug.toUpperCase()}-250`,
    price: prices[0],
    grams: 250,
    inStock: true,
  },
  {
    id: `${slug}-500`,
    label: "500g",
    sku: `${slug.toUpperCase()}-500`,
    price: prices[1],
    grams: 500,
    inStock: true,
  },
  {
    id: `${slug}-1000`,
    label: "1kg",
    sku: `${slug.toUpperCase()}-1KG`,
    price: prices[2],
    grams: 1000,
    inStock: true,
  },
];

const boxSizes = (
  slug: string,
  sizes: { label: string; price: number; sku: string }[],
): ProductVariant[] =>
  sizes.map((s) => ({
    id: `${slug}-${s.sku.toLowerCase()}`,
    label: s.label,
    sku: s.sku,
    price: s.price,
    inStock: true,
  }));

export const products: Product[] = [
  {
    id: "thekua",
    slug: "thekua",
    name: "Thekua",
    tagline: "A crisp wheat-and-jaggery classic.",
    description: "Traditional Thekua made using a time-honoured family recipe.",
    longDescription:
      "Thekua is a crisp, golden sweet of whole wheat, ghee and jaggery — pressed in a carved mould and fried until fragrant. It is a festival staple across North India, especially around Chhath, and one of the recipes that has lived in our kitchen for thirty years. We prepare it in small batches in Kolkata, keeping the crumb dense, the edges deep-golden, and the flavour of fennel quietly present. It travels well, keeps well, and is as at home on a festive thali as it is with afternoon tea.",
    images: ["/images/thekua.jpg", "/images/story-hands.jpg", "/images/assortment.jpg"],
    collectionIds: ["traditional-sweets", "regional-favourites", "chhath"],
    featured: true,
    status: "available",
    variants: sweetWeights("thekua", [349, 629, 1149]),
    ingredients: [
      "Whole wheat flour",
      "Jaggery",
      "Ghee",
      "Fennel seeds",
      "Green cardamom",
      "Grated coconut",
    ],
    allergens: ["Gluten", "Milk"],
    shelfLife: "21 days",
    storage: "Store in a cool, dry place in an airtight tin.",
    originNote:
      "A North Indian festival sweet with deep roots in Bihar and eastern Uttar Pradesh, prepared in our Kolkata kitchen.",
    occasions: ["Chhath", "Diwali", "Everyday", "Travel"],
    seoKeywords: ["Thekua", "Chhath sweets", "traditional Indian sweets", "Bihari sweets"],
  },
  {
    id: "khajur",
    slug: "khajur",
    name: "Khajur",
    tagline: "Flaky, layered, quietly rich.",
    description: "A traditional Indian sweet with a rich, comforting flavour.",
    longDescription:
      "Our Khajur is a laminated, ghee-fried pastry — shattering, golden layers with a warm, buttery sweetness. It is the kind of sweet people remember from railway platforms and wedding tins, refined here for a modern table. We keep the layers fine and the finish dry, so it sits well in a gift box and beside a cup of chai.",
    images: ["/images/khajur.jpg", "/images/assortment.jpg", "/images/insta-mise.jpg"],
    collectionIds: ["traditional-sweets", "regional-favourites"],
    featured: true,
    status: "available",
    variants: sweetWeights("khajur", [369, 659, 1199]),
    ingredients: ["Refined wheat flour", "Ghee", "Sugar", "Cardamom"],
    allergens: ["Gluten", "Milk"],
    shelfLife: "18 days",
    storage: "Keep airtight, away from humidity.",
    originNote: "A much-loved North Indian fried sweet, finished in our Kolkata kitchen.",
    occasions: ["Festive", "Tea time", "Gifting"],
    seoKeywords: ["Khajur", "traditional Indian sweets", "Indian festive sweets"],
  },
  {
    id: "tilkut",
    slug: "tilkut",
    name: "Tilkut",
    tagline: "Toasted sesame, set in jaggery.",
    description: "Sesame-based traditional sweet inspired by Bihar's culinary heritage.",
    longDescription:
      "Tilkut is sesame at its most generous — toasted seeds bound in jaggery, pressed into discs with a snap and a lingering roast. The craft is associated with winter in Gaya and the wider Magadh region; we make ours in Kolkata, keeping the sesame forward and the sweetness measured. It is a winter favourite, a Sankranti staple, and a gift that feels both rustic and considered.",
    images: ["/images/tilkut.jpg", "/images/insta-sesame.jpg", "/images/assortment.jpg"],
    collectionIds: ["traditional-sweets", "regional-favourites"],
    featured: true,
    status: "available",
    variants: sweetWeights("tilkut", [389, 699, 1279]),
    ingredients: ["White sesame seeds", "Jaggery", "Ghee", "Cardamom"],
    allergens: ["Sesame", "Milk"],
    shelfLife: "30 days",
    storage: "Store cool and dry. Sesame oils bloom in warmth — refrigerate in summer.",
    originNote:
      "Inspired by the winter sesame sweets of Bihar, made for tables well beyond the region.",
    occasions: ["Makar Sankranti", "Winter", "Festive"],
    seoKeywords: ["Tilkut", "sesame sweet", "Bihari food", "traditional Indian sweets"],
  },
  {
    id: "gujiya",
    slug: "gujiya",
    name: "Gujiya",
    tagline: "A crescent filled with khoya and nuts.",
    description: "Delicate festive sweet filled with a rich traditional filling.",
    longDescription:
      "Gujiya — also known as pedakiya in parts of the east — is a crimped crescent of pastry, filled with slow-cooked khoya, nuts and a little sugar, then fried until the shell is blistered and gold. It is a Holi essential across North India and a wedding favourite. Ours is made with a dry, travel-friendly filling so the pastry stays crisp in the box.",
    images: ["/images/gujiya.jpg", "/images/gifting-hero.jpg", "/images/assortment.jpg"],
    collectionIds: ["traditional-sweets", "regional-favourites", "holi"],
    featured: true,
    status: "available",
    variants: sweetWeights("gujiya", [399, 729, 1349]),
    ingredients: [
      "Refined wheat flour",
      "Khoya",
      "Ghee",
      "Sugar",
      "Almonds",
      "Pistachio",
      "Cardamom",
    ],
    allergens: ["Gluten", "Milk", "Tree nuts"],
    shelfLife: "10 days",
    storage: "Best within a week. Keep refrigerated in warm weather.",
    originNote:
      "A festive dumpling with a long North Indian lineage, including Uttar Pradesh and Bihar.",
    occasions: ["Holi", "Diwali", "Weddings"],
    seoKeywords: ["Gujiya", "Holi sweets", "Indian festive sweets", "wedding sweets"],
  },
  {
    id: "peda",
    slug: "peda",
    name: "Peda",
    tagline: "Slow milk, saffron, pistachio.",
    description: "Soft, rich and indulgent Indian milk sweet.",
    longDescription:
      "Peda is milk reduced until it is dense and fudge-like, finished with saffron and pistachio. It is one of India's most recognisable sweets — offered at celebrations, packed for trains, and expected at weddings. We make a soft, saffron-forward peda that holds its shape in a gift box without tasting of sugar first.",
    images: ["/images/peda.jpg", "/images/story-kitchen.jpg", "/images/assortment.jpg"],
    collectionIds: ["traditional-sweets", "regional-favourites", "wedding-gifting"],
    featured: true,
    status: "available",
    variants: sweetWeights("peda", [429, 779, 1429]),
    ingredients: ["Khoya (reduced milk)", "Sugar", "Saffron", "Pistachio", "Cardamom", "Ghee"],
    allergens: ["Milk", "Tree nuts"],
    shelfLife: "7 days refrigerated",
    storage: "Keep refrigerated. Bring to room temperature before serving.",
    originNote: "A pan-Indian milk sweet, prepared in the slow, old way in Kolkata.",
    occasions: ["Weddings", "Diwali", "Anniversaries", "Corporate"],
    seoKeywords: ["Peda", "Indian milk sweet", "wedding sweets", "Indian food gifts"],
  },
  {
    id: "anarsa",
    slug: "anarsa",
    name: "Anarsa",
    tagline: "Rice, jaggery, a poppy-seed crust.",
    description: "A traditional festive delicacy with a distinctive texture and flavour.",
    longDescription:
      "Anarsa is a festive sweet of soaked rice and jaggery, flattened and fried so one side is lacy and caramelised, the other jeweled with poppy seeds. It is made for Diwali in many homes across North and West India. The batter asks for patience — rice fermented just enough — and that is how we still do it.",
    images: ["/images/anarsa.jpg", "/images/heritage.jpg", "/images/assortment.jpg"],
    collectionIds: ["traditional-sweets", "regional-favourites", "diwali"],
    featured: true,
    status: "available",
    variants: sweetWeights("anarsa", [409, 749, 1379]),
    ingredients: ["Rice flour", "Jaggery", "Poppy seeds", "Ghee", "Sesame"],
    allergens: ["Sesame", "Milk"],
    shelfLife: "12 days",
    storage: "Airtight, cool and dry.",
    originNote:
      "A Diwali sweet with homes in Bihar, Maharashtra and beyond — ours is the North Indian style.",
    occasions: ["Diwali", "Festive", "Winter"],
    seoKeywords: ["Anarsa", "Diwali sweets", "traditional Indian sweets"],
  },
  {
    id: "diwali-box",
    slug: "diwali-gift-box",
    name: "Diwali Gift Box",
    tagline: "An assortment composed for the festival of lights.",
    description: "Beautifully curated assortments for Diwali and winter celebrations.",
    longDescription:
      "A composed box of our dry festive sweets — Thekua, Tilkut, Anarsa, Khajur and Peda — arranged in compartments and tied as a gift. Designed to sit on a coffee table as easily as it travels to another city. Choose a size for a household, a host, or a whole office floor.",
    images: ["/images/diwali.jpg", "/images/gifting-hero.jpg", "/images/hampers.jpg"],
    collectionIds: ["festive-collections", "diwali", "gifting", "personal-gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("diwali-box", [
      { label: "Petite · 6 sweets", price: 1850, sku: "DIW-PETITE" },
      { label: "Classic · 12 sweets", price: 3250, sku: "DIW-CLASSIC" },
      { label: "Grand · 24 sweets", price: 4950, sku: "DIW-GRAND" },
    ]),
    ingredients: ["Assorted traditional sweets — see individual products"],
    allergens: ["Gluten", "Milk", "Sesame", "Tree nuts"],
    shelfLife: "See contents — typically 7–21 days",
    storage: "Cool, dry place. Refrigerate peda on arrival.",
    originNote: "Packed in Kolkata for Diwali gifting across India and overseas.",
    occasions: ["Diwali", "Corporate", "Family"],
    seoKeywords: ["Diwali gift box", "Indian festive sweets", "Indian gifting"],
  },
  {
    id: "chhath-box",
    slug: "chhath-gift-box",
    name: "Chhath Gift Box",
    tagline: "Prepared with the quiet discipline of the festival.",
    description: "Thoughtfully prepared collections inspired by the traditions of Chhath.",
    longDescription:
      "A Chhath box built around Thekua, with Khajur and a small measure of dry fruit. We pack it simply — brass-toned tray, cream board, a note on the recipes — for families who keep the festival, and for those sending a taste of home.",
    images: ["/images/chhath.jpg", "/images/thekua.jpg", "/images/story-hands.jpg"],
    collectionIds: ["festive-collections", "chhath", "gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("chhath-box", [
      { label: "Home box", price: 1650, sku: "CHH-HOME" },
      { label: "Family box", price: 2850, sku: "CHH-FAMILY" },
    ]),
    ingredients: ["Thekua", "Khajur", "Dry fruit"],
    allergens: ["Gluten", "Milk"],
    shelfLife: "21 days",
    storage: "Cool and dry.",
    originNote: "Packed in Kolkata, with recipes that belong to the Chhath table.",
    occasions: ["Chhath"],
    seoKeywords: ["Chhath sweets", "Thekua", "Chhath gift box"],
  },
  {
    id: "holi-box",
    slug: "holi-collection",
    name: "Holi Collection",
    tagline: "Gujiya, and the sweets that belong beside it.",
    description: "A Holi assortment led by gujiya, made to share.",
    longDescription:
      "Holi in a box: gujiya at the centre, with peda and a dry sweet for those who prefer less syrup. Packed to be opened in a living room full of people.",
    images: ["/images/gujiya.jpg", "/images/gifting-hero.jpg"],
    collectionIds: ["festive-collections", "holi", "gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("holi-box", [
      { label: "Sharing box", price: 1750, sku: "HOLI-SHARE" },
      { label: "Large gathering", price: 2950, sku: "HOLI-LARGE" },
    ]),
    ingredients: ["Gujiya", "Peda", "Khajur"],
    allergens: ["Gluten", "Milk", "Tree nuts"],
    shelfLife: "7–10 days",
    storage: "Refrigerate after opening.",
    originNote: "A North Indian Holi assortment, packed in Kolkata.",
    occasions: ["Holi"],
    seoKeywords: ["Holi sweets", "Gujiya", "Indian festive sweets"],
  },
  {
    id: "rakhi-box",
    slug: "raksha-bandhan-box",
    name: "Raksha Bandhan Box",
    tagline: "A box that travels well between siblings.",
    description: "A considered mix of dry sweets for Raksha Bandhan.",
    longDescription:
      "Dry sweets chosen because they travel: Thekua, Tilkut, Khajur and a few pedas. A cream box, a ribbon, space for your own note.",
    images: ["/images/hampers.jpg", "/images/insta-table.jpg"],
    collectionIds: ["festive-collections", "raksha-bandhan", "gifting", "personal-gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("rakhi-box", [
      { label: "For one", price: 1550, sku: "RAKHI-ONE" },
      { label: "For the family", price: 2650, sku: "RAKHI-FAM" },
    ]),
    ingredients: ["Thekua", "Tilkut", "Khajur", "Peda"],
    allergens: ["Gluten", "Milk", "Sesame", "Tree nuts"],
    shelfLife: "7–21 days",
    storage: "Cool and dry; refrigerate peda.",
    originNote: "Packed in Kolkata for siblings everywhere.",
    occasions: ["Raksha Bandhan"],
    seoKeywords: ["Raksha Bandhan gifts", "Indian gifting", "Indian food gifts"],
  },
  {
    id: "festive-hamper",
    slug: "festive-hamper",
    name: "Festive Hamper",
    tagline: "A larger gesture for the house that hosts.",
    description: "A generous hamper of sweets, tins and a handwritten card.",
    longDescription:
      "Our festive hamper is for hosts, in-laws, and the colleague who always invites you in. Multiple tins, an assortment across the collection, packed in a cream crate.",
    images: ["/images/hampers.jpg", "/images/gifting-hero.jpg", "/images/wedding.jpg"],
    collectionIds: ["festive-collections", "festive-hampers", "gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("festive-hamper", [
      { label: "Hamper", price: 2150, sku: "HAM-STD" },
      { label: "Grand hamper", price: 3650, sku: "HAM-GRAND" },
    ]),
    ingredients: ["Assorted sweets in tins"],
    allergens: ["Gluten", "Milk", "Sesame", "Tree nuts"],
    shelfLife: "See contents",
    storage: "Cool and dry.",
    originNote: "Assembled in Kolkata.",
    occasions: ["Festive", "Housewarming", "Thank you"],
    seoKeywords: ["festive hampers", "Indian gifting", "Indian food gifts"],
  },
  {
    id: "wedding-hamper",
    slug: "wedding-gift-hamper",
    name: "Wedding Gift Hamper",
    tagline: "Sweets worthy of a wedding tray.",
    description: "Elegant Indian sweets and curated hampers for weddings and family celebrations.",
    longDescription:
      "A wedding hamper in ivory and antique gold: peda, gujiya, dry sweets and a silk pouch. Suitable as a family gift, a return gift at scale (ask us), or a box for guests travelling in.",
    images: ["/images/wedding.jpg", "/images/peda.jpg", "/images/hampers.jpg"],
    collectionIds: ["gifting", "wedding-gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("wedding-hamper", [
      { label: "Guest box", price: 2450, sku: "WED-GUEST" },
      { label: "Family hamper", price: 4250, sku: "WED-FAM" },
      { label: "Ceremonial crate", price: 7500, sku: "WED-CERE" },
    ]),
    ingredients: ["Peda", "Gujiya", "Dry festive sweets"],
    allergens: ["Gluten", "Milk", "Tree nuts", "Sesame"],
    shelfLife: "7–14 days",
    storage: "Refrigerate milk sweets.",
    originNote: "Wedding gifting from our Kolkata kitchen, delivered across India.",
    occasions: ["Weddings", "Engagements", "Receptions"],
    seoKeywords: ["wedding sweets", "wedding gifting", "Indian gifting"],
  },
  {
    id: "corporate-hamper",
    slug: "corporate-gift-hamper",
    name: "Corporate Gift Hamper",
    tagline: "Quiet luxury, for a client list.",
    description: "Premium food hampers designed for clients, employees and business partners.",
    longDescription:
      "A restrained kraft-and-forest box with a wax seal, filled with our most travel-stable sweets. Designed for bulk orders: consistent presentation, a card with your message, delivery to multiple cities on request.",
    images: ["/images/corporate.jpg", "/images/hampers.jpg", "/images/diwali.jpg"],
    collectionIds: ["gifting", "corporate-gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("corporate-hamper", [
      { label: "Colleague", price: 1950, sku: "CORP-COL" },
      { label: "Client", price: 3450, sku: "CORP-CLIENT" },
      { label: "Partner", price: 5950, sku: "CORP-PART" },
    ]),
    ingredients: ["Assorted dry sweets"],
    allergens: ["Gluten", "Milk", "Sesame", "Tree nuts"],
    shelfLife: "14–21 days",
    storage: "Cool and dry.",
    originNote: "Bulk packing from Kolkata, with nationwide and overseas dispatch.",
    occasions: ["Diwali", "Year end", "Onboarding", "Thank you"],
    seoKeywords: ["corporate gifting", "Indian food gifts", "Diwali corporate gifts"],
  },
  {
    id: "personal-box",
    slug: "personal-gift-box",
    name: "Personal Gift Box",
    tagline: "For one person, chosen with care.",
    description: "A smaller, beautiful box for birthdays, hosts and homesickness.",
    longDescription:
      "Four to six pieces, a handwritten-style card, cream board. Enough to say you thought of someone.",
    images: ["/images/insta-table.jpg", "/images/gifting-hero.jpg"],
    collectionIds: ["gifting", "personal-gifting"],
    featured: false,
    status: "available",
    variants: boxSizes("personal-box", [
      { label: "Small", price: 1450, sku: "PERS-S" },
      { label: "Generous", price: 2250, sku: "PERS-M" },
    ]),
    ingredients: ["Assorted sweets"],
    allergens: ["Gluten", "Milk", "Sesame", "Tree nuts"],
    shelfLife: "7–21 days",
    storage: "Cool and dry.",
    originNote: "Packed to order in Kolkata.",
    occasions: ["Birthday", "Thank you", "Just because"],
    seoKeywords: ["Indian gifting", "personal gift box", "Indian food gifts"],
  },
  {
    id: "makhana",
    slug: "makhana",
    name: "Makhana",
    tagline: "Roasted fox nuts, the Indian way.",
    description: "Light, roasted makhana for snacking and festive bowls.",
    longDescription:
      "We are bringing roasted makhana into the Shobha's Magic pantry — lightly seasoned, packed for everyday snacking and festive bowls. Join the list and we will write when the first batch is ready.",
    images: ["/images/makhana.jpg", "/images/coming-soon.jpg"],
    collectionIds: ["coming-soon", "regional-favourites"],
    featured: false,
    status: "coming-soon",
    variants: [
      {
        id: "makhana-wait",
        label: "Coming soon",
        sku: "MAKHANA",
        price: 0,
        inStock: false,
      },
    ],
    ingredients: ["Makhana (fox nuts)", "Ghee", "Rock salt"],
    allergens: [],
    shelfLife: "To be announced",
    storage: "Airtight, cool and dry.",
    originNote: "A Bihar pantry classic, joining our Kolkata kitchen soon.",
    occasions: ["Everyday", "Festive"],
    seoKeywords: ["Makhana", "Bihari food", "Indian snacks"],
  },
  {
    id: "sattu",
    slug: "sattu",
    name: "Sattu",
    tagline: "Roasted gram flour, the everyday staple.",
    description: "Stone-style sattu for drinks, parathas and summer afternoons.",
    longDescription:
      "Sattu is next. We are sourcing and milling with the same patience we give our sweets. Register your interest and we will send word.",
    images: ["/images/coming-soon.jpg"],
    collectionIds: ["coming-soon", "regional-favourites"],
    featured: false,
    status: "coming-soon",
    variants: [
      {
        id: "sattu-wait",
        label: "Coming soon",
        sku: "SATTU",
        price: 0,
        inStock: false,
      },
    ],
    ingredients: ["Roasted gram"],
    allergens: [],
    shelfLife: "To be announced",
    storage: "Airtight.",
    originNote: "A Bihar and eastern UP staple, joining the brand as we grow.",
    occasions: ["Everyday"],
    seoKeywords: ["Sattu", "Bihari food", "Indian pantry"],
  },
  {
    id: "namkeen",
    slug: "namkeen",
    name: "Namkeen",
    tagline: "Savoury mixes, made to our standard.",
    description: "A forthcoming line of traditional Indian namkeen.",
    longDescription:
      "Namkeen is on the workbench — mixes we would serve at home, packed for the pantry. Tell us you would like the first tins.",
    images: ["/images/coming-soon.jpg"],
    collectionIds: ["coming-soon", "regional-favourites"],
    featured: false,
    status: "coming-soon",
    variants: [
      {
        id: "namkeen-wait",
        label: "Coming soon",
        sku: "NAMKEEN",
        price: 0,
        inStock: false,
      },
    ],
    ingredients: ["To be announced"],
    allergens: ["May contain gluten, nuts"],
    shelfLife: "To be announced",
    storage: "Airtight.",
    originNote: "Savoury Indian snacks, coming from our Kolkata kitchen.",
    occasions: ["Everyday", "Tea time"],
    seoKeywords: ["Namkeen", "Indian snacks"],
  },
  {
    id: "spices",
    slug: "spices",
    name: "Spices",
    tagline: "Whole spices, chosen with a cook's eye.",
    description: "A small, considered spice collection is on the way.",
    longDescription:
      "Cardamom, fennel, cloves, cinnamon — the same spices that live in our sweets, packed for your kitchen. Coming soon.",
    images: ["/images/coming-soon.jpg", "/images/heritage.jpg"],
    collectionIds: ["coming-soon"],
    featured: false,
    status: "coming-soon",
    variants: [
      {
        id: "spices-wait",
        label: "Coming soon",
        sku: "SPICES",
        price: 0,
        inStock: false,
      },
    ],
    ingredients: ["Whole spices"],
    allergens: [],
    shelfLife: "To be announced",
    storage: "Cool, dark, airtight.",
    originNote: "Pantry spices selected for the Indian home cook.",
    occasions: ["Everyday"],
    seoKeywords: ["Indian spices", "pantry essentials"],
  },
  {
    id: "indian-snacks",
    slug: "indian-snacks",
    name: "Indian Snacks",
    tagline: "Between a sweet tin and a proper meal.",
    description: "A forthcoming range of Indian snacks from our kitchen.",
    longDescription:
      "We are developing a snack line that meets the same standard as our sweets. Join the list.",
    images: ["/images/coming-soon.jpg"],
    collectionIds: ["coming-soon", "regional-favourites"],
    featured: false,
    status: "coming-soon",
    variants: [
      {
        id: "snacks-wait",
        label: "Coming soon",
        sku: "SNACKS",
        price: 0,
        inStock: false,
      },
    ],
    ingredients: ["To be announced"],
    allergens: [],
    shelfLife: "To be announced",
    storage: "Airtight.",
    originNote: "Indian snacks, made in Kolkata.",
    occasions: ["Everyday"],
    seoKeywords: ["Indian snacks", "regional snacks"],
  },
  {
    id: "pantry-essentials",
    slug: "pantry-essentials",
    name: "Pantry Essentials",
    tagline: "The dry goods we cook with, for your shelf.",
    description: "Jaggery, flours and other kitchen staples — coming soon.",
    longDescription:
      "As Shobha's Magic grows from sweets into a wider Indian food brand, pantry essentials will follow. We will pack what we already trust in our own kitchen.",
    images: ["/images/coming-soon.jpg", "/images/insta-mise.jpg"],
    collectionIds: ["coming-soon"],
    featured: false,
    status: "coming-soon",
    variants: [
      {
        id: "pantry-wait",
        label: "Coming soon",
        sku: "PANTRY",
        price: 0,
        inStock: false,
      },
    ],
    ingredients: ["To be announced"],
    allergens: [],
    shelfLife: "To be announced",
    storage: "Airtight.",
    originNote: "Indian pantry goods from the same kitchen as our sweets.",
    occasions: ["Everyday"],
    seoKeywords: ["Indian pantry", "authentic regional Indian food"],
  },
];

export const collectionGroups: {
  id: CollectionGroup;
  title: string;
  intro: string;
}[] = [
  {
    id: "kitchen",
    title: "Traditional Sweets",
    intro: "Thekua, Khajur, Tilkut, Gujiya, Peda, Anarsa.",
  },
  {
    id: "festive",
    title: "Festive Collections",
    intro: "Diwali, Chhath, Holi, Raksha Bandhan, festive hampers.",
  },
  {
    id: "gifting",
    title: "Gifting",
    intro: "Wedding, corporate and personal boxes.",
  },
  {
    id: "regional",
    title: "Regional Favourites",
    intro: "Traditional Indian sweets, regional snacks and delicacies.",
  },
  {
    id: "coming-soon",
    title: "Coming Soon",
    intro: "Makhana, sattu, namkeen, spices, snacks and pantry essentials.",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured && p.status === "available");
}

export function getAvailableProducts() {
  return products.filter((p) => p.status === "available");
}

export function productsInCollection(collectionId: string) {
  return products.filter((p) => p.collectionIds.includes(collectionId));
}

export function productsForCollectionSlug(slug: string) {
  const col = getCollectionBySlug(slug);
  if (!col) return [];
  return productsInCollection(col.id);
}

export function featuredCollections() {
  return collections.filter((c) => c.featured);
}

export function collectionsByGroup(group: CollectionGroup) {
  return collections.filter((c) => c.group === group);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return getAvailableProducts();
  return products.filter((p) => {
    const blob = [
      p.name,
      p.tagline,
      p.description,
      p.longDescription,
      ...p.occasions,
      ...p.seoKeywords,
      ...p.ingredients,
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}

export function defaultVariant(product: Product) {
  return (
    product.variants.find((v) => v.grams === 500 && v.inStock) ??
    product.variants.find((v) => v.inStock) ??
    product.variants[0]
  );
}

export function minPrice(product: Product) {
  const priced = product.variants.filter((v) => v.price > 0);
  if (!priced.length) return 0;
  return Math.min(...priced.map((v) => v.price));
}

export function relatedProducts(product: Product, limit = 4) {
  const set = new Set(product.collectionIds);
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.status === "available" &&
        p.collectionIds.some((id) => set.has(id)),
    )
    .slice(0, limit);
}
