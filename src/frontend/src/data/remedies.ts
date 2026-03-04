export interface Remedy {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  application: string[];
  benefits: string;
  frequency: string;
  disclaimer?: string;
}

export interface Subcategory {
  id: string;
  label: string;
  description: string;
  remedies: Remedy[];
  tips?: { title: string; desc: string }[];
  disclaimer?: string;
}

// ==================== HEALTH REMEDIES ====================
export const healthSubcategories: Subcategory[] = [
  {
    id: "immunity",
    label: "Immunity Boosting",
    description:
      "Strengthen your body's natural defense system with these powerful Ayurvedic immunity boosters.",
    remedies: [
      {
        id: "turmeric-golden-milk",
        name: "Turmeric Golden Milk",
        description:
          "A warming anti-inflammatory bedtime tonic made with turmeric and spices.",
        ingredients: [
          "1 cup warm milk",
          "1 tsp turmeric powder",
          "1/2 tsp cinnamon",
          "Pinch of black pepper",
          "1 tsp honey",
        ],
        application: [
          "Heat milk until warm (not boiling)",
          "Add turmeric, cinnamon, and black pepper",
          "Stir well and let steep for 2 minutes",
          "Add honey before drinking",
        ],
        benefits:
          "Powerful anti-inflammatory and immune-boosting properties. Curcumin in turmeric enhances antibody responses.",
        frequency: "Daily before bedtime",
      },
      {
        id: "tulsi-ginger-tea",
        name: "Tulsi-Ginger Tea",
        description:
          "An adaptogenic herbal tea that strengthens immunity with antimicrobial ginger.",
        ingredients: [
          "10-12 fresh tulsi leaves",
          "1-inch ginger root",
          "2 cups water",
          "1 tsp honey",
          "Few drops lemon juice",
        ],
        application: [
          "Crush tulsi leaves and grate ginger",
          "Boil water and add tulsi and ginger",
          "Simmer for 5-7 minutes",
          "Strain, add honey and lemon",
        ],
        benefits:
          "Tulsi is an adaptogen that strengthens immunity. Ginger adds antimicrobial properties.",
        frequency: "Twice daily, morning and evening",
      },
      {
        id: "chyawanprash-tonic",
        name: "Chyawanprash Tonic",
        description:
          "Traditional Ayurvedic herbal jam formula for immunity and vitality.",
        ingredients: ["1 tbsp Chyawanprash", "1 cup warm milk or water"],
        application: [
          "Take 1 tablespoon of Chyawanprash",
          "Mix with warm milk or water",
          "Consume on empty stomach",
        ],
        benefits:
          "Traditional Ayurvedic formula with 40+ herbs. Boosts immunity, energy, and vitality.",
        frequency: "Once daily in the morning",
      },
      {
        id: "amla-honey-shot",
        name: "Amla-Honey Immunity Shot",
        description:
          "A potent Vitamin C shot made with Indian gooseberry for immune defense.",
        ingredients: [
          "2 fresh amla (Indian gooseberry)",
          "1 tsp honey",
          "Pinch of rock salt",
        ],
        application: [
          "Extract juice from fresh amla",
          "Mix with honey and rock salt",
          "Consume immediately",
        ],
        benefits:
          "Amla is richest source of Vitamin C. Enhances white blood cell production and antioxidant defense.",
        frequency: "Daily on empty stomach",
      },
    ],
  },
  {
    id: "digestion",
    label: "Digestion & Gut Health",
    description:
      "Restore your digestive fire and balance with these time-tested Ayurvedic remedies.",
    remedies: [
      {
        id: "triphala-powder",
        name: "Triphala Powder",
        description:
          "The classic three-fruit Ayurvedic formula that balances all doshas and aids digestion.",
        ingredients: [
          "1 tsp Triphala powder",
          "1 cup warm water",
          "Optional: 1/2 tsp honey",
        ],
        application: [
          "Mix Triphala powder in warm water",
          "Stir well until dissolved",
          "Add honey if desired",
          "Drink on empty stomach",
        ],
        benefits:
          "Balances all three doshas, improves digestion, and gently cleanses the digestive tract.",
        frequency: "Once daily before bedtime or early morning",
      },
      {
        id: "ginger-lemon-tonic",
        name: "Ginger-Lemon Digestive Tonic",
        description:
          "A zingy digestive shot that ignites Agni and reduces bloating.",
        ingredients: [
          "1-inch fresh ginger",
          "1/2 lemon juice",
          "1 tsp honey",
          "Pinch of rock salt",
          "1 cup warm water",
        ],
        application: [
          "Grate ginger and extract juice",
          "Mix ginger juice with lemon juice",
          "Add honey and rock salt",
          "Mix in warm water and drink",
        ],
        benefits:
          "Stimulates digestive fire (Agni), reduces bloating, and improves nutrient absorption.",
        frequency: "Before meals, 2-3 times daily",
      },
      {
        id: "ccf-tea",
        name: "Cumin-Coriander-Fennel Tea (CCF Tea)",
        description:
          "A three-seed digestive tea that soothes gas and bloating all day.",
        ingredients: [
          "1 tsp cumin seeds",
          "1 tsp coriander seeds",
          "1 tsp fennel seeds",
          "3 cups water",
        ],
        application: [
          "Boil water in a pot",
          "Add all three seeds",
          "Simmer for 5-10 minutes",
          "Strain and sip throughout the day",
        ],
        benefits:
          "Balances digestive fire, reduces gas and bloating, supports healthy metabolism.",
        frequency: "Sip throughout the day between meals",
      },
      {
        id: "ajwain-water",
        name: "Ajwain Water",
        description:
          "A simple carom seed water remedy for instant relief from indigestion.",
        ingredients: ["1 tsp ajwain (carom seeds)", "1 cup water"],
        application: [
          "Boil water with ajwain seeds",
          "Simmer for 3-5 minutes",
          "Strain and drink warm",
        ],
        benefits:
          "Relieves indigestion, gas, and acidity. Powerful carminative properties.",
        frequency:
          "After heavy meals or when experiencing digestive discomfort",
      },
    ],
  },
  {
    id: "weight-management",
    label: "Weight Management",
    description:
      "Achieve healthy weight balance naturally with these Ayurvedic metabolism-boosting remedies.",
    remedies: [
      {
        id: "lemon-honey-water",
        name: "Warm Lemon-Honey Water",
        description:
          "The classic morning detox drink that kickstarts metabolism and fat burning.",
        ingredients: [
          "1 cup warm water",
          "1/2 lemon juice",
          "1 tsp raw honey",
          "Pinch of cinnamon powder",
        ],
        application: [
          "Heat water until warm (not boiling)",
          "Squeeze fresh lemon juice",
          "Add honey and cinnamon",
          "Stir well and drink immediately",
        ],
        benefits:
          "Boosts metabolism, aids fat burning, and detoxifies the body naturally.",
        frequency: "Every morning on empty stomach",
      },
      {
        id: "triphala-guggul",
        name: "Triphala-Guggul Formula",
        description:
          "A classic Ayurvedic combination for healthy metabolism and cholesterol support.",
        ingredients: [
          "1 tsp Triphala powder",
          "500mg Guggul extract",
          "1 cup warm water",
        ],
        application: [
          "Mix Triphala powder in warm water",
          "Take Guggul tablet with the mixture",
          "Consume before bedtime",
        ],
        benefits:
          "Supports healthy metabolism, reduces cholesterol, and promotes fat metabolism.",
        frequency: "Once daily before sleep",
      },
      {
        id: "ginger-green-tea",
        name: "Ginger-Green Tea Metabolism Booster",
        description:
          "A thermogenic herbal drink that burns calories and curbs appetite.",
        ingredients: [
          "1 green tea bag",
          "1-inch fresh ginger",
          "1 cup hot water",
          "Few mint leaves",
          "1/2 tsp honey",
        ],
        application: [
          "Grate ginger and add to hot water",
          "Add green tea bag and mint leaves",
          "Steep for 5 minutes",
          "Strain, add honey, and drink",
        ],
        benefits:
          "Increases thermogenesis, burns calories, and reduces appetite naturally.",
        frequency: "2-3 times daily between meals",
      },
      {
        id: "cabbage-carrot-juice",
        name: "Cabbage-Carrot Detox Juice",
        description:
          "A fiber-rich vegetable juice that promotes satiety and supports weight loss.",
        ingredients: [
          "1 cup chopped cabbage",
          "1 medium carrot",
          "1/2 cucumber",
          "1/2 lemon juice",
          "Pinch of black salt",
        ],
        application: [
          "Blend all vegetables with little water",
          "Strain if desired",
          "Add lemon juice and black salt",
          "Drink fresh immediately",
        ],
        benefits:
          "Low in calories, high in fiber. Promotes satiety and supports healthy weight loss.",
        frequency: "Once daily as meal replacement or before meals",
      },
    ],
  },
  {
    id: "diabetes-bp",
    label: "Diabetes & BP Support",
    description:
      "Support healthy blood sugar and blood pressure levels with these natural Ayurvedic remedies.",
    disclaimer:
      "These remedies are complementary to medical treatment. Always consult your healthcare provider before making changes to your diabetes or blood pressure management plan.",
    remedies: [
      {
        id: "fenugreek-water",
        name: "Fenugreek Seed Water",
        description:
          "Overnight-soaked fenugreek seeds that help regulate blood sugar and improve insulin sensitivity.",
        ingredients: ["1 tbsp fenugreek seeds", "1 cup water"],
        application: [
          "Soak fenugreek seeds in water overnight",
          "Drink the water on empty stomach",
          "Chew the soaked seeds if desired",
        ],
        benefits:
          "Helps regulate blood sugar levels and improves insulin sensitivity naturally.",
        frequency: "Daily in the morning on empty stomach",
      },
      {
        id: "bitter-gourd-juice",
        name: "Bitter Gourd Juice",
        description:
          "A potent blood sugar-lowering juice with insulin-like compounds.",
        ingredients: [
          "1 small bitter gourd",
          "1/2 cup water",
          "Pinch of rock salt",
          "Few drops lemon juice",
        ],
        application: [
          "Wash and chop bitter gourd",
          "Blend with water",
          "Strain and add salt and lemon",
          "Drink fresh immediately",
        ],
        benefits:
          "Contains insulin-like compounds that help lower blood glucose levels effectively.",
        frequency: "Once daily in the morning",
      },
      {
        id: "cinnamon-honey-tonic",
        name: "Cinnamon-Honey Tonic",
        description:
          "A warming spice tonic that improves insulin sensitivity before meals.",
        ingredients: [
          "1 tsp cinnamon powder",
          "1 tsp honey",
          "1 cup warm water",
        ],
        application: [
          "Mix cinnamon powder in warm water",
          "Let it steep for 10 minutes",
          "Add honey and stir well",
          "Drink before meals",
        ],
        benefits:
          "Improves insulin sensitivity and helps maintain healthy blood sugar levels.",
        frequency: "Twice daily before main meals",
      },
      {
        id: "garlic-lemon-bp",
        name: "Garlic-Lemon BP Control",
        description:
          "A natural blood pressure-lowering tonic with cardiovascular benefits.",
        ingredients: [
          "2-3 garlic cloves",
          "1/2 lemon juice",
          "1 cup warm water",
        ],
        application: [
          "Crush garlic cloves",
          "Mix with lemon juice",
          "Add to warm water",
          "Drink on empty stomach",
        ],
        benefits:
          "Helps lower blood pressure naturally and supports cardiovascular health.",
        frequency: "Daily in the morning",
      },
    ],
  },
  {
    id: "stress-sleep",
    label: "Stress & Sleep Solutions",
    description:
      "Find calm and restful sleep with these soothing Ayurvedic remedies for stress management.",
    remedies: [
      {
        id: "ashwagandha-moon-milk",
        name: "Ashwagandha Moon Milk",
        description:
          "A cortisol-reducing bedtime tonic with the king of Ayurvedic adaptogens.",
        ingredients: [
          "1 cup warm milk",
          "1 tsp ashwagandha powder",
          "1/4 tsp nutmeg powder",
          "1 tsp honey",
          "Pinch of cardamom",
        ],
        application: [
          "Warm milk gently (do not boil)",
          "Add ashwagandha and nutmeg",
          "Stir well and let steep for 2 minutes",
          "Add honey and cardamom before drinking",
        ],
        benefits:
          "Ashwagandha is a powerful adaptogen that reduces cortisol, calms the mind, and promotes deep sleep.",
        frequency: "Daily 30 minutes before bedtime",
      },
      {
        id: "brahmi-tulsi-tea",
        name: "Brahmi-Tulsi Stress Relief Tea",
        description:
          "A cognitive-enhancing, anxiety-reducing herbal tea for daily calm.",
        ingredients: [
          "1 tsp dried brahmi leaves",
          "8-10 fresh tulsi leaves",
          "2 cups water",
          "1 tsp honey",
          "Few drops lemon",
        ],
        application: [
          "Boil water with brahmi and tulsi",
          "Simmer for 5-7 minutes",
          "Strain into a cup",
          "Add honey and lemon",
        ],
        benefits:
          "Brahmi enhances cognitive function and reduces anxiety. Tulsi balances stress hormones.",
        frequency: "Twice daily, morning and evening",
      },
      {
        id: "chamomile-lavender-blend",
        name: "Chamomile-Lavender Sleep Blend",
        description:
          "A sedative herbal infusion for deep relaxation and restful sleep.",
        ingredients: [
          "1 chamomile tea bag",
          "1 tsp dried lavender flowers",
          "1 cup hot water",
          "1 tsp honey",
        ],
        application: [
          "Steep chamomile and lavender in hot water",
          "Cover and let infuse for 10 minutes",
          "Strain and add honey",
          "Sip slowly before bed",
        ],
        benefits:
          "Chamomile and lavender have natural sedative properties that promote relaxation and restful sleep.",
        frequency: "Every night 30-60 minutes before sleep",
      },
      {
        id: "almond-saffron-milk",
        name: "Warm Almond-Saffron Milk",
        description:
          "A mood-lifting, magnesium-rich bedtime drink for quality sleep.",
        ingredients: [
          "10 soaked almonds",
          "1 cup warm milk",
          "2-3 saffron strands",
          "1/4 tsp cardamom powder",
          "1 tsp honey",
        ],
        application: [
          "Blend soaked almonds with little milk",
          "Heat remaining milk with saffron",
          "Mix almond paste into warm milk",
          "Add cardamom and honey",
        ],
        benefits:
          "Almonds contain magnesium for relaxation. Saffron elevates mood and promotes quality sleep.",
        frequency: "Daily before bedtime",
      },
    ],
  },
];

// ==================== SKIN CARE ====================
export const skinSubcategories: Subcategory[] = [
  {
    id: "natural-glow",
    label: "Natural Glow Remedies",
    description:
      "Achieve radiant, glowing skin naturally with these Ayurvedic beauty treatments.",
    remedies: [
      {
        id: "turmeric-yogurt-mask",
        name: "Turmeric-Yogurt Glow Mask",
        description:
          "A brightening face mask that combines turmeric and yogurt for a radiant glow.",
        ingredients: [
          "1 tsp turmeric powder",
          "2 tbsp plain yogurt",
          "1 tsp honey",
          "Few drops lemon juice",
        ],
        application: [
          "Mix all ingredients into a smooth paste",
          "Apply evenly on cleansed face",
          "Leave on for 15-20 minutes",
          "Rinse with lukewarm water",
        ],
        benefits:
          "Turmeric brightens skin, yogurt exfoliates gently, and honey moisturizes for a natural glow.",
        frequency: "2-3 times per week",
      },
      {
        id: "saffron-milk-radiance",
        name: "Saffron-Milk Radiance Treatment",
        description:
          "A luxurious saffron and sandalwood treatment for complexion enhancement.",
        ingredients: [
          "4-5 saffron strands",
          "2 tbsp raw milk",
          "1 tsp sandalwood powder",
        ],
        application: [
          "Soak saffron in milk for 30 minutes",
          "Add sandalwood powder and mix",
          "Apply on face and neck",
          "Wash off after 20 minutes",
        ],
        benefits:
          "Saffron enhances complexion, milk nourishes, and sandalwood provides cooling effect.",
        frequency: "Twice weekly for best results",
      },
      {
        id: "aloe-rosewater-toner",
        name: "Aloe Vera-Rose Water Toner",
        description: "A hydrating and pH-balancing toner for instant glow.",
        ingredients: [
          "2 tbsp fresh aloe vera gel",
          "2 tbsp rose water",
          "Few drops vitamin E oil",
        ],
        application: [
          "Mix aloe vera gel with rose water",
          "Add vitamin E oil",
          "Apply with cotton pad after cleansing",
          "Let it absorb naturally",
        ],
        benefits:
          "Hydrates deeply, balances pH, and gives instant glow while soothing the skin.",
        frequency: "Daily, morning and evening",
      },
      {
        id: "papaya-honey-enzyme",
        name: "Papaya-Honey Enzyme Mask",
        description:
          "An enzyme-rich mask that exfoliates dead cells for brighter skin.",
        ingredients: [
          "1/4 cup mashed ripe papaya",
          "1 tbsp honey",
          "1 tsp lemon juice",
        ],
        application: [
          "Mash papaya into smooth pulp",
          "Mix with honey and lemon juice",
          "Apply on face avoiding eyes",
          "Rinse after 15 minutes",
        ],
        benefits:
          "Papaya enzymes exfoliate dead cells, revealing brighter, smoother, glowing skin.",
        frequency: "Once weekly",
      },
    ],
  },
  {
    id: "acne",
    label: "Acne & Pimples",
    description:
      "Clear acne naturally with these powerful Ayurvedic antibacterial and anti-inflammatory treatments.",
    remedies: [
      {
        id: "neem-turmeric-paste",
        name: "Neem-Turmeric Acne Paste",
        description:
          "A powerful antibacterial paste to tackle acne and prevent scarring.",
        ingredients: [
          "10-12 fresh neem leaves",
          "1 tsp turmeric powder",
          "2 tbsp rose water",
        ],
        application: [
          "Grind neem leaves into paste",
          "Mix with turmeric and rose water",
          "Apply on affected areas",
          "Wash off after 15 minutes",
        ],
        benefits:
          "Neem has powerful antibacterial properties. Turmeric reduces inflammation and prevents scarring.",
        frequency: "Daily or every other day",
      },
      {
        id: "tea-tree-aloe-spot",
        name: "Tea Tree-Aloe Spot Treatment",
        description:
          "A targeted overnight treatment that kills acne bacteria without drying.",
        ingredients: [
          "2 tbsp fresh aloe vera gel",
          "3-4 drops tea tree essential oil",
          "1 tsp honey",
        ],
        application: [
          "Mix aloe vera gel with tea tree oil",
          "Add honey and blend well",
          "Apply directly on pimples",
          "Leave overnight or for 2 hours",
        ],
        benefits:
          "Tea tree oil kills acne-causing bacteria. Aloe soothes and heals without drying.",
        frequency: "Daily on active breakouts",
      },
      {
        id: "sandalwood-rosewater-pack",
        name: "Sandalwood-Rosewater Face Pack",
        description:
          "A cooling face pack that heals acne and controls excess oil.",
        ingredients: [
          "2 tbsp sandalwood powder",
          "3 tbsp rose water",
          "1 tsp multani mitti (Fuller's earth)",
        ],
        application: [
          "Mix sandalwood and multani mitti",
          "Add rose water to make paste",
          "Apply evenly on face",
          "Rinse when completely dry",
        ],
        benefits:
          "Sandalwood cools and heals. Multani mitti absorbs excess oil and unclogs pores.",
        frequency: "2-3 times per week",
      },
      {
        id: "cinnamon-honey-mask",
        name: "Cinnamon-Honey Antibacterial Mask",
        description:
          "A sweet and spicy antibacterial mask for acne-prone skin.",
        ingredients: ["1 tsp cinnamon powder", "2 tbsp raw honey"],
        application: [
          "Mix cinnamon and honey thoroughly",
          "Apply on cleansed face",
          "Leave for 10-15 minutes",
          "Rinse with warm water",
        ],
        benefits:
          "Cinnamon has antimicrobial properties. Honey moisturizes while fighting bacteria.",
        frequency: "2-3 times weekly",
      },
    ],
  },
  {
    id: "pigmentation",
    label: "Pigmentation & Dark Spots",
    description:
      "Fade dark spots and even out skin tone with these natural Ayurvedic brightening treatments.",
    disclaimer:
      "Sun Protection: Always use sunscreen during the day when using these remedies, as some ingredients can increase sun sensitivity.",
    remedies: [
      {
        id: "lemon-honey-brightening",
        name: "Lemon-Honey Brightening Mask",
        description:
          "A vitamin C-rich brightening mask to lighten dark spots and even tone.",
        ingredients: [
          "1 tbsp fresh lemon juice",
          "2 tbsp honey",
          "1 tsp yogurt",
        ],
        application: [
          "Mix lemon juice with honey and yogurt",
          "Apply on pigmented areas",
          "Leave for 15-20 minutes",
          "Rinse with cool water",
        ],
        benefits:
          "Lemon's vitamin C lightens dark spots. Honey moisturizes while yogurt gently exfoliates.",
        frequency: "3 times per week (evening only)",
      },
      {
        id: "potato-cucumber-pack",
        name: "Potato-Cucumber Depigmentation Pack",
        description:
          "Natural bleaching agents from potato and soothing cucumber for depigmentation.",
        ingredients: [
          "1/4 potato juice",
          "1/4 cucumber juice",
          "1 tbsp aloe vera gel",
        ],
        application: [
          "Extract fresh potato and cucumber juice",
          "Mix with aloe vera gel",
          "Apply on affected areas",
          "Wash off after 20 minutes",
        ],
        benefits:
          "Potato contains natural bleaching agents. Cucumber soothes and hydrates.",
        frequency: "Daily for visible results",
      },
      {
        id: "saffron-milk-complexion",
        name: "Saffron-Milk Complexion Enhancer",
        description:
          "A premium saffron-infused pack that naturally lightens pigmentation over time.",
        ingredients: [
          "5-6 saffron strands",
          "3 tbsp raw milk",
          "1 tsp gram flour (besan)",
        ],
        application: [
          "Soak saffron in milk for 1 hour",
          "Add gram flour to make paste",
          "Apply evenly on face",
          "Rinse when dry",
        ],
        benefits:
          "Saffron lightens pigmentation and evens skin tone naturally over time.",
        frequency: "3-4 times per week",
      },
      {
        id: "orange-peel-yogurt",
        name: "Orange Peel-Yogurt Vitamin C Mask",
        description:
          "An antioxidant-rich vitamin C mask that fades dark spots.",
        ingredients: [
          "2 tbsp dried orange peel powder",
          "2 tbsp plain yogurt",
          "1 tsp honey",
        ],
        application: [
          "Mix orange peel powder with yogurt",
          "Add honey and blend well",
          "Apply on pigmented areas",
          "Wash off after 15 minutes",
        ],
        benefits:
          "Orange peel is rich in vitamin C that fades dark spots and brightens complexion.",
        frequency: "2-3 times weekly",
      },
    ],
  },
  {
    id: "anti-aging",
    label: "Anti-Aging Ayurveda",
    description:
      "Turn back time naturally with these Ayurvedic anti-aging treatments that nourish and rejuvenate.",
    remedies: [
      {
        id: "almond-saffron-serum",
        name: "Almond-Saffron Youth Serum",
        description:
          "A rich nourishing serum that fights free radicals and promotes youthful skin.",
        ingredients: [
          "10 soaked almonds",
          "4-5 saffron strands",
          "2 tbsp milk",
          "1 tsp honey",
          "Few drops vitamin E oil",
        ],
        application: [
          "Blend soaked almonds with milk",
          "Add saffron soaked in warm milk",
          "Mix in honey and vitamin E",
          "Apply and massage gently for 5 minutes",
          "Leave for 20 minutes, then rinse",
        ],
        benefits:
          "Almonds nourish deeply, saffron brightens, and vitamin E fights free radicals for youthful skin.",
        frequency: "3 times per week",
      },
      {
        id: "avocado-honey-collagen",
        name: "Avocado-Honey Collagen Boost Mask",
        description:
          "A plumping avocado mask that reduces fine lines and boosts hydration.",
        ingredients: [
          "1/2 ripe avocado",
          "1 tbsp honey",
          "1 tsp olive oil",
          "Few drops lemon juice",
        ],
        application: [
          "Mash avocado into smooth paste",
          "Mix with honey and olive oil",
          "Add lemon juice",
          "Apply thick layer on face and neck",
          "Rinse after 20-25 minutes",
        ],
        benefits:
          "Avocado's healthy fats plump skin, honey hydrates, and antioxidants reduce fine lines.",
        frequency: "Twice weekly",
      },
      {
        id: "rosewater-glycerin-tonic",
        name: "Rose Water-Glycerin Hydration Tonic",
        description:
          "A daily hydrating spritz that plumps skin and reduces wrinkle appearance.",
        ingredients: [
          "3 tbsp rose water",
          "1 tbsp vegetable glycerin",
          "Few drops frankincense oil",
        ],
        application: [
          "Mix rose water with glycerin",
          "Add frankincense oil",
          "Store in spray bottle",
          "Spritz on face morning and night",
        ],
        benefits:
          "Deeply hydrates, plumps skin, and reduces appearance of wrinkles with regular use.",
        frequency: "Daily, morning and evening",
      },
      {
        id: "papaya-yogurt-renewal",
        name: "Papaya-Yogurt Enzyme Renewal Mask",
        description:
          "An enzyme renewal mask that reveals fresher, younger-looking skin.",
        ingredients: [
          "1/4 cup mashed papaya",
          "2 tbsp yogurt",
          "1 tsp honey",
          "1 tsp aloe vera gel",
        ],
        application: [
          "Blend papaya into smooth pulp",
          "Mix with yogurt, honey, and aloe",
          "Apply evenly avoiding eye area",
          "Leave for 15-20 minutes",
          "Rinse with lukewarm water",
        ],
        benefits:
          "Papaya enzymes exfoliate dead cells, revealing fresher, younger-looking skin.",
        frequency: "Once weekly",
      },
    ],
  },
  {
    id: "face-packs",
    label: "DIY Herbal Face Packs",
    description:
      "Create spa-quality face packs at home with simple, natural Ayurvedic recipes for every skin type.",
    remedies: [
      {
        id: "multani-mitti-pack",
        name: "Multani Mitti Deep Cleanse Pack",
        description:
          "Best for: Oily & Combination Skin — deep cleansing with Fuller's earth.",
        ingredients: [
          "2 tbsp multani mitti (Fuller's earth)",
          "1 tbsp rose water",
          "1 tsp lemon juice",
          "1 tsp honey",
        ],
        application: [
          "Mix multani mitti with rose water",
          "Add lemon juice and honey",
          "Apply evenly on face",
          "Let dry completely (15-20 min)",
          "Rinse with lukewarm water",
        ],
        benefits:
          "Absorbs excess oil, unclogs pores, removes impurities, and tightens skin naturally.",
        frequency: "Twice weekly",
      },
      {
        id: "besan-turmeric-pack",
        name: "Besan-Turmeric Brightening Pack",
        description:
          "Best for: All Skin Types — brightening and exfoliating with gram flour.",
        ingredients: [
          "2 tbsp gram flour (besan)",
          "1/2 tsp turmeric",
          "2 tbsp milk or yogurt",
          "1 tsp honey",
        ],
        application: [
          "Mix besan with turmeric",
          "Add milk/yogurt to make paste",
          "Mix in honey",
          "Apply and leave for 15 minutes",
          "Scrub gently while rinsing",
        ],
        benefits:
          "Brightens complexion, removes tan, exfoliates dead skin, and gives instant glow.",
        frequency: "2-3 times per week",
      },
      {
        id: "oatmeal-honey-pack",
        name: "Oatmeal-Honey Soothing Pack",
        description:
          "Best for: Sensitive & Dry Skin — soothing and moisturizing oatmeal pack.",
        ingredients: [
          "2 tbsp ground oatmeal",
          "1 tbsp honey",
          "1 tbsp yogurt",
          "Few drops almond oil",
        ],
        application: [
          "Grind oatmeal into fine powder",
          "Mix with honey and yogurt",
          "Add almond oil",
          "Apply gently on face",
          "Rinse after 15-20 minutes",
        ],
        benefits:
          "Soothes irritation, deeply moisturizes, reduces redness, and calms sensitive skin.",
        frequency: "2-3 times weekly",
      },
      {
        id: "sandalwood-rose-pack",
        name: "Sandalwood-Rose Cooling Pack",
        description:
          "Best for: All Skin Types — cooling and anti-inflammatory sandalwood pack.",
        ingredients: [
          "2 tbsp sandalwood powder",
          "3 tbsp rose water",
          "1 tsp honey",
          "Pinch of turmeric",
        ],
        application: [
          "Mix sandalwood with rose water",
          "Add honey and turmeric",
          "Apply evenly on face and neck",
          "Leave until completely dry",
          "Rinse with cool water",
        ],
        benefits:
          "Cools and soothes skin, reduces inflammation, evens tone, and provides natural glow.",
        frequency: "2-3 times per week",
      },
      {
        id: "banana-honey-pack",
        name: "Banana-Honey Nourishing Pack",
        description:
          "Best for: Dry & Mature Skin — deeply nourishing and restoring elasticity.",
        ingredients: [
          "1/2 ripe banana",
          "1 tbsp honey",
          "1 tsp olive oil",
          "Few drops lemon juice",
        ],
        application: [
          "Mash banana into smooth paste",
          "Mix with honey and olive oil",
          "Add lemon juice",
          "Apply thick layer",
          "Wash off after 20 minutes",
        ],
        benefits:
          "Deeply nourishes, hydrates dry skin, reduces fine lines, and restores elasticity.",
        frequency: "Twice weekly",
      },
    ],
  },
];

// ==================== HAIR CARE ====================
export const hairSubcategories: Subcategory[] = [
  {
    id: "hair-fall",
    label: "Hair Fall Treatment",
    description:
      "Stop hair loss naturally with powerful Ayurvedic herbs and oils.",
    tips: [
      {
        title: "Gentle Care",
        desc: "Avoid harsh chemicals and heat styling tools",
      },
      {
        title: "Protein Diet",
        desc: "Eat protein-rich foods like lentils, nuts, and eggs",
      },
      {
        title: "Scalp Massage",
        desc: "Regular oil massage improves blood circulation",
      },
    ],
    remedies: [
      {
        id: "onion-juice-treatment",
        name: "Onion Juice Hair Treatment",
        description:
          "Sulfur-rich onion juice that stimulates follicles and promotes hair regrowth.",
        ingredients: [
          "2 medium onions",
          "1 tbsp coconut oil",
          "1 tsp honey",
          "Few drops of essential oil (optional)",
        ],
        application: [
          "Peel and chop onions",
          "Blend and extract juice",
          "Mix with coconut oil and honey",
          "Apply on scalp and massage",
          "Leave for 30-45 minutes",
          "Wash with mild herbal shampoo",
        ],
        benefits:
          "Stimulates hair follicles. Rich in sulfur. Promotes hair regrowth. Strengthens hair roots.",
        frequency: "Apply 2-3 times per week",
      },
      {
        id: "fenugreek-hair-mask",
        name: "Fenugreek Seeds Hair Mask",
        description:
          "A protein-rich fenugreek mask that reduces hair fall and adds shine.",
        ingredients: [
          "3 tbsp fenugreek seeds",
          "1/2 cup water",
          "1 tbsp coconut oil",
          "1 tbsp yogurt",
        ],
        application: [
          "Soak fenugreek seeds overnight",
          "Grind into smooth paste",
          "Mix with coconut oil and yogurt",
          "Apply on scalp and hair",
          "Leave for 30 minutes",
          "Rinse thoroughly with water",
        ],
        benefits:
          "Reduces hair fall. Strengthens hair shaft. Adds shine. Prevents dandruff.",
        frequency: "Use twice weekly",
      },
      {
        id: "amla-shikakai-pack",
        name: "Amla-Shikakai Hair Pack",
        description:
          "A traditional three-herb hair pack that nourishes roots and promotes growth.",
        ingredients: [
          "2 tbsp amla powder",
          "2 tbsp shikakai powder",
          "1 tbsp bhringraj powder",
          "1 cup water",
          "1 tbsp coconut oil",
        ],
        application: [
          "Mix all powders together",
          "Add water to make paste",
          "Add coconut oil",
          "Apply on scalp and hair",
          "Leave for 45 minutes",
          "Wash with lukewarm water",
        ],
        benefits:
          "Traditional hair fall remedy. Nourishes scalp. Strengthens roots. Promotes healthy growth.",
        frequency: "Apply 2 times per week",
      },
      {
        id: "curry-leaves-oil",
        name: "Curry Leaves-Coconut Oil Treatment",
        description:
          "A warming infused oil that prevents hair fall and darkens hair naturally.",
        ingredients: [
          "1 cup fresh curry leaves",
          "1/2 cup coconut oil",
          "1 tsp fenugreek seeds",
        ],
        application: [
          "Heat coconut oil in a pan",
          "Add curry leaves and fenugreek",
          "Heat until leaves turn black",
          "Cool and strain the oil",
          "Massage into scalp",
          "Leave overnight, wash in morning",
        ],
        benefits:
          "Prevents premature hair fall. Darkens hair. Nourishes follicles. Improves hair texture.",
        frequency: "Use 2-3 times weekly",
      },
    ],
  },
  {
    id: "hair-growth",
    label: "Hair Growth Remedies",
    description:
      "Stimulate healthy hair growth with traditional Ayurvedic treatments.",
    tips: [
      {
        title: "Balanced Diet",
        desc: "Include biotin-rich foods like nuts and seeds",
      },
      {
        title: "Stay Hydrated",
        desc: "Drink plenty of water for healthy hair growth",
      },
      {
        title: "Reduce Stress",
        desc: "Practice yoga and meditation for better results",
      },
    ],
    remedies: [
      {
        id: "castor-coconut-blend",
        name: "Castor Oil-Coconut Oil Blend",
        description:
          "A powerful growth-stimulating oil blend that thickens hair density.",
        ingredients: [
          "2 tbsp castor oil",
          "2 tbsp coconut oil",
          "1 tsp vitamin E oil",
          "Few drops of rosemary oil",
        ],
        application: [
          "Mix all oils in a bowl",
          "Warm slightly for better absorption",
          "Part hair into sections",
          "Apply oil on scalp and massage",
          "Leave overnight or minimum 2 hours",
          "Wash with mild shampoo",
        ],
        benefits:
          "Stimulates hair growth. Thickens hair. Nourishes follicles. Improves hair density.",
        frequency: "Apply 2-3 times per week",
      },
      {
        id: "aloe-bhringraj-mask",
        name: "Aloe Vera-Bhringraj Hair Mask",
        description:
          "A rapid growth-promoting mask using the king of Ayurvedic hair herbs.",
        ingredients: [
          "3 tbsp fresh aloe vera gel",
          "2 tbsp bhringraj powder",
          "1 tbsp coconut oil",
          "1 tsp honey",
        ],
        application: [
          "Extract fresh aloe vera gel",
          "Mix with bhringraj powder",
          "Add coconut oil and honey",
          "Apply on scalp and hair length",
          "Massage for 5-10 minutes",
          "Leave for 30 minutes then wash",
        ],
        benefits:
          "Promotes rapid hair growth. Strengthens hair roots. Prevents hair loss. Adds volume.",
        frequency: "Use twice weekly",
      },
      {
        id: "egg-yogurt-protein",
        name: "Egg-Yogurt Protein Treatment",
        description:
          "A high-protein mask that promotes growth and repairs damaged hair.",
        ingredients: [
          "1 whole egg",
          "2 tbsp yogurt",
          "1 tbsp olive oil",
          "1 tsp honey",
        ],
        application: [
          "Beat egg thoroughly",
          "Mix with yogurt and olive oil",
          "Add honey and blend well",
          "Apply on damp hair",
          "Leave for 30 minutes",
          "Rinse with cool water and shampoo",
        ],
        benefits:
          "Rich in protein. Promotes hair growth. Adds shine and strength. Repairs damaged hair.",
        frequency: "Apply once weekly",
      },
      {
        id: "hibiscus-curry-pack",
        name: "Hibiscus-Curry Leaves Hair Pack",
        description:
          "A follicle-stimulating pack that prevents greying and promotes thick growth.",
        ingredients: [
          "10 hibiscus flowers",
          "15 curry leaves",
          "2 tbsp coconut oil",
          "1 tbsp yogurt",
        ],
        application: [
          "Grind hibiscus flowers and curry leaves",
          "Mix with coconut oil",
          "Add yogurt to make paste",
          "Apply on scalp and hair",
          "Leave for 45 minutes",
          "Wash with herbal shampoo",
        ],
        benefits:
          "Stimulates hair follicles. Prevents premature greying. Promotes thick growth. Conditions hair.",
        frequency: "Use 2 times per week",
      },
    ],
  },
  {
    id: "dandruff",
    label: "Dandruff & Scalp Care",
    description:
      "Eliminate dandruff and maintain a healthy scalp with natural solutions.",
    tips: [
      {
        title: "Regular Washing",
        desc: "Wash hair 2-3 times weekly with herbal shampoo",
      },
      {
        title: "Avoid Hot Water",
        desc: "Use lukewarm water to prevent scalp dryness",
      },
      {
        title: "Healthy Diet",
        desc: "Reduce sugar and increase omega-3 fatty acids",
      },
    ],
    remedies: [
      {
        id: "neem-tea-tree-treatment",
        name: "Neem-Tea Tree Oil Treatment",
        description:
          "A potent antifungal treatment that eliminates dandruff and soothes the scalp.",
        ingredients: [
          "1 cup neem leaves",
          "2 cups water",
          "5 drops tea tree oil",
          "1 tbsp coconut oil",
        ],
        application: [
          "Boil neem leaves in water",
          "Let it cool and strain",
          "Add tea tree oil and coconut oil",
          "Apply on scalp after shampooing",
          "Massage gently for 5 minutes",
          "Leave for 10 minutes then rinse",
        ],
        benefits:
          "Eliminates dandruff. Antifungal properties. Soothes itchy scalp. Prevents recurrence.",
        frequency: "Use 2-3 times per week",
      },
      {
        id: "lemon-yogurt-scalp",
        name: "Lemon-Yogurt Scalp Mask",
        description:
          "A pH-balancing scalp mask that removes dandruff flakes and reduces oiliness.",
        ingredients: [
          "2 tbsp fresh lemon juice",
          "4 tbsp yogurt",
          "1 tsp honey",
          "1 tsp coconut oil",
        ],
        application: [
          "Mix lemon juice with yogurt",
          "Add honey and coconut oil",
          "Apply on scalp sections",
          "Massage gently",
          "Leave for 30 minutes",
          "Wash with mild shampoo",
        ],
        benefits:
          "Removes dandruff flakes. Balances scalp pH. Reduces oiliness. Refreshes scalp.",
        frequency: "Apply twice weekly",
      },
      {
        id: "fenugreek-curd-pack",
        name: "Fenugreek-Curd Anti-Dandruff Pack",
        description:
          "A stubborn dandruff treatment with fenugreek and apple cider vinegar.",
        ingredients: [
          "3 tbsp fenugreek seeds",
          "1/2 cup yogurt",
          "1 tsp lemon juice",
          "1 tsp apple cider vinegar",
        ],
        application: [
          "Soak fenugreek seeds overnight",
          "Grind into paste",
          "Mix with yogurt and lemon juice",
          "Add apple cider vinegar",
          "Apply on scalp",
          "Leave for 45 minutes then wash",
        ],
        benefits:
          "Treats stubborn dandruff. Moisturizes scalp. Reduces inflammation. Prevents dryness.",
        frequency: "Use 2 times per week",
      },
      {
        id: "aloe-coconut-soother",
        name: "Aloe Vera-Coconut Oil Scalp Soother",
        description:
          "A cooling scalp soother that reduces flaking and deeply moisturizes.",
        ingredients: [
          "3 tbsp fresh aloe vera gel",
          "2 tbsp coconut oil",
          "1 tsp neem oil",
          "Few drops of peppermint oil",
        ],
        application: [
          "Extract fresh aloe vera gel",
          "Mix with coconut oil and neem oil",
          "Add peppermint oil",
          "Apply on scalp and massage",
          "Leave for 1 hour",
          "Wash with herbal shampoo",
        ],
        benefits:
          "Soothes irritated scalp. Reduces flaking. Moisturizes deeply. Cooling effect.",
        frequency: "Apply 2-3 times weekly",
      },
    ],
  },
  {
    id: "grey-hair",
    label: "Grey Hair Solutions",
    description:
      "Prevent and reverse premature greying with Ayurvedic remedies.",
    tips: [
      {
        title: "Reduce Stress",
        desc: "Practice meditation to prevent stress-induced greying",
      },
      {
        title: "Vitamin B12",
        desc: "Include B12-rich foods like dairy and eggs",
      },
      {
        title: "Avoid Chemicals",
        desc: "Use natural hair products without harsh chemicals",
      },
    ],
    remedies: [
      {
        id: "curry-leaves-infusion",
        name: "Curry Leaves-Coconut Oil Infusion",
        description:
          "A melanin-boosting infused oil that prevents premature greying naturally.",
        ingredients: [
          "2 cups fresh curry leaves",
          "1 cup coconut oil",
          "1 tbsp fenugreek seeds",
        ],
        application: [
          "Heat coconut oil in a pan",
          "Add curry leaves and fenugreek seeds",
          "Heat until leaves turn crispy",
          "Cool and strain the oil",
          "Massage into scalp and hair",
          "Leave overnight, wash in morning",
        ],
        benefits:
          "Prevents premature greying. Darkens hair naturally. Nourishes hair roots. Promotes melanin production.",
        frequency: "Use 3-4 times per week",
      },
      {
        id: "amla-henna-pack",
        name: "Amla-Henna Hair Pack",
        description:
          "A natural hair darkening pack that covers grey and conditions hair.",
        ingredients: [
          "3 tbsp amla powder",
          "2 tbsp henna powder",
          "1 tbsp coffee powder",
          "1 cup water",
          "1 tbsp yogurt",
        ],
        application: [
          "Mix amla, henna, and coffee powder",
          "Add water to make thick paste",
          "Let it sit for 2-3 hours",
          "Add yogurt before applying",
          "Apply on hair and scalp",
          "Leave for 2-3 hours then wash",
        ],
        benefits:
          "Natural hair darkening. Covers grey hair. Conditions hair. Strengthens hair shaft.",
        frequency: "Apply once every 2 weeks",
      },
      {
        id: "black-tea-coffee-rinse",
        name: "Black Tea-Coffee Rinse",
        description:
          "A temporary natural darkening rinse that adds shine and covers grey.",
        ingredients: [
          "2 tbsp black tea leaves",
          "2 tbsp coffee powder",
          "3 cups water",
        ],
        application: [
          "Boil water with tea and coffee",
          "Simmer for 10 minutes",
          "Let it cool completely",
          "Strain the liquid",
          "Use as final rinse after shampooing",
          "Leave in hair, do not rinse",
        ],
        benefits:
          "Darkens hair temporarily. Adds shine. Covers grey strands. Natural and safe.",
        frequency: "Use after every hair wash",
      },
      {
        id: "bhringraj-brahmi-oil",
        name: "Bhringraj-Brahmi Oil Treatment",
        description:
          "A traditional Ayurvedic formula that promotes hair pigmentation and nourishment.",
        ingredients: [
          "2 tbsp bhringraj powder",
          "2 tbsp brahmi powder",
          "1 cup coconut oil",
          "1 tsp black sesame seeds",
        ],
        application: [
          "Heat coconut oil gently",
          "Add bhringraj and brahmi powder",
          "Add crushed sesame seeds",
          "Heat for 10 minutes on low flame",
          "Cool and strain",
          "Massage into scalp, leave overnight",
        ],
        benefits:
          "Prevents premature greying. Promotes hair pigmentation. Nourishes deeply. Traditional Ayurvedic remedy.",
        frequency: "Apply 2-3 times weekly",
      },
    ],
  },
  {
    id: "oils-masks",
    label: "Ayurvedic Oils & Masks",
    description:
      "Nourish and strengthen hair with traditional oil blends and hair masks.",
    tips: [
      {
        title: "Warm Oil",
        desc: "Slightly warm oil penetrates better into hair shaft",
      },
      {
        title: "Massage Technique",
        desc: "Use circular motions to improve blood circulation",
      },
      { title: "Storage", desc: "Store homemade oils in dark glass bottles" },
    ],
    remedies: [
      {
        id: "ayurvedic-hot-oil",
        name: "Ayurvedic Hot Oil Treatment",
        description:
          "A deeply nourishing multi-oil blend for shine, strength, and growth.",
        ingredients: [
          "2 tbsp coconut oil",
          "1 tbsp castor oil",
          "1 tbsp almond oil",
          "5 drops rosemary oil",
          "1 tsp vitamin E oil",
        ],
        application: [
          "Mix all oils in a bowl",
          "Warm the oil mixture gently",
          "Part hair into sections",
          "Apply warm oil on scalp",
          "Massage for 10-15 minutes",
          "Leave for 1-2 hours or overnight",
          "Wash with mild shampoo",
        ],
        benefits:
          "Deep nourishment. Strengthens hair. Promotes growth. Adds shine and softness.",
        frequency: "Use 2-3 times per week",
      },
      {
        id: "brahmi-amla-oil",
        name: "Brahmi-Amla Hair Oil",
        description:
          "A traditional Ayurvedic hair oil formula for thickness, prevention of fall, and darkening.",
        ingredients: [
          "1 cup coconut oil",
          "2 tbsp brahmi powder",
          "2 tbsp amla powder",
          "1 tbsp bhringraj powder",
          "10 curry leaves",
        ],
        application: [
          "Heat coconut oil on low flame",
          "Add all powders and curry leaves",
          "Simmer for 15 minutes",
          "Cool and strain",
          "Store in glass bottle",
          "Apply and massage 2-3 times weekly",
        ],
        benefits:
          "Traditional Ayurvedic formula. Prevents hair fall. Darkens hair. Promotes thick growth.",
        frequency: "Apply 2-3 times weekly",
      },
      {
        id: "banana-avocado-mask",
        name: "Banana-Avocado Deep Conditioning Mask",
        description:
          "An intensely moisturizing mask that repairs damaged hair and adds softness.",
        ingredients: [
          "1 ripe banana",
          "1/2 ripe avocado",
          "2 tbsp honey",
          "1 tbsp olive oil",
          "1 tbsp yogurt",
        ],
        application: [
          "Mash banana and avocado together",
          "Add honey and olive oil",
          "Mix in yogurt",
          "Apply on damp hair",
          "Cover with shower cap",
          "Leave for 30-45 minutes",
          "Rinse thoroughly with water",
        ],
        benefits:
          "Intense moisturization. Repairs damaged hair. Adds softness. Natural conditioning.",
        frequency: "Use once weekly",
      },
      {
        id: "hibiscus-fenugreek-mask",
        name: "Hibiscus-Fenugreek Hair Mask",
        description:
          "A growth-stimulating mask with hibiscus flowers and fenugreek for volume.",
        ingredients: [
          "10 hibiscus flowers",
          "3 tbsp fenugreek seeds",
          "2 tbsp yogurt",
          "1 tbsp coconut oil",
          "1 tsp honey",
        ],
        application: [
          "Soak fenugreek seeds overnight",
          "Grind hibiscus and fenugreek together",
          "Add yogurt, coconut oil, and honey",
          "Apply on scalp and hair",
          "Leave for 45 minutes",
          "Wash with herbal shampoo",
        ],
        benefits:
          "Stimulates hair growth. Prevents hair fall. Conditions deeply. Adds volume.",
        frequency: "Apply twice weekly",
      },
      {
        id: "neem-tulsi-scalp-oil",
        name: "Neem-Tulsi Scalp Treatment Oil",
        description:
          "An antibacterial scalp oil that treats infections and promotes healthy growth.",
        ingredients: [
          "1 cup coconut oil",
          "1 cup neem leaves",
          "1 cup tulsi leaves",
          "1 tbsp fenugreek seeds",
          "5 drops tea tree oil",
        ],
        application: [
          "Heat coconut oil gently",
          "Add neem, tulsi leaves, and fenugreek",
          "Simmer for 20 minutes",
          "Cool and strain",
          "Add tea tree oil",
          "Massage into scalp before bed",
        ],
        benefits:
          "Treats scalp infections. Prevents dandruff. Antibacterial properties. Promotes healthy scalp.",
        frequency: "Use 2-3 times per week",
      },
    ],
  },
];

// ==================== LIFESTYLE & WEIGHT ====================
export const lifestyleSubcategories: Subcategory[] = [
  {
    id: "weight-loss",
    label: "Weight Loss Plan",
    description:
      "Natural Ayurvedic strategies for sustainable weight management.",
    remedies: [
      {
        id: "morning-detox-water",
        name: "Morning Detox Water",
        description:
          "A classic Ayurvedic morning ritual to kickstart metabolism.",
        ingredients: [
          "1 cup warm water",
          "1/2 lemon",
          "1 tsp honey",
          "Pinch of cinnamon",
        ],
        application: [
          "Warm water to comfortable temperature",
          "Squeeze lemon juice",
          "Add honey and cinnamon",
          "Drink on empty stomach immediately",
        ],
        benefits:
          "Kickstarts digestion, boosts metabolism, and helps flush toxins from the body.",
        frequency: "Every morning before breakfast",
      },
      {
        id: "triphala-night",
        name: "Triphala Night Cleanse",
        description:
          "The classic Ayurvedic formula for gentle overnight cleansing and fat metabolism.",
        ingredients: ["1 tsp Triphala powder", "1 cup warm water"],
        application: [
          "Mix Triphala in warm water",
          "Stir until dissolved",
          "Drink 30 minutes before bed",
        ],
        benefits:
          "Cleanses digestive tract, improves metabolism, and supports healthy weight management.",
        frequency: "Nightly before sleep",
      },
      {
        id: "cumin-water",
        name: "Cumin-Infused Slimming Water",
        description:
          "A metabolism-boosting cumin infusion that reduces bloating and fat.",
        ingredients: ["1 tsp cumin seeds", "1 glass water"],
        application: [
          "Soak cumin seeds in water overnight",
          "Boil in the morning",
          "Cool and strain",
          "Drink on empty stomach",
        ],
        benefits:
          "Reduces belly fat, improves digestion, and boosts metabolic rate.",
        frequency: "Daily on empty stomach",
      },
      {
        id: "yoga-weight",
        name: "Yoga for Weight Reduction",
        description:
          "Key yoga poses and breathing exercises for natural weight management.",
        ingredients: ["Yoga mat", "Comfortable clothing"],
        application: [
          "Practice Surya Namaskar (10 rounds)",
          "Perform Kapalbhati pranayama (5 min)",
          "Hold Naukasana (boat pose) for 30 seconds",
          "Practice Trikonasana on both sides",
        ],
        benefits:
          "Burns calories, strengthens core, reduces stress-related weight gain, and improves body composition.",
        frequency: "Daily for 30-45 minutes",
      },
    ],
  },
  {
    id: "morning-routine",
    label: "Morning Routine",
    description:
      "Ayurvedic Dinacharya practices for a productive and balanced day.",
    remedies: [
      {
        id: "tongue-scraping",
        name: "Tongue Scraping (Jihwa Prakshalana)",
        description:
          "A foundational Ayurvedic morning practice to remove overnight toxins.",
        ingredients: ["Copper or stainless steel tongue scraper"],
        application: [
          "Wake up early (ideally before sunrise)",
          "Scrape tongue from back to front",
          "Repeat 5-7 times",
          "Rinse mouth with warm water",
        ],
        benefits:
          "Removes Ama (toxins), improves taste sensation, and prevents bacterial buildup.",
        frequency: "Every morning before brushing",
      },
      {
        id: "oil-pulling",
        name: "Oil Pulling (Kavala Graha)",
        description:
          "Ancient Ayurvedic mouth therapy for oral and systemic health.",
        ingredients: ["1 tbsp sesame or coconut oil"],
        application: [
          "Take oil in mouth on empty stomach",
          "Swish for 15-20 minutes",
          "Spit into trash (not sink)",
          "Rinse with warm water",
          "Brush teeth normally",
        ],
        benefits:
          "Detoxifies mouth, strengthens gums, reduces bacteria, and improves overall health.",
        frequency: "Daily morning before eating",
      },
      {
        id: "abhyanga",
        name: "Self-Massage (Abhyanga)",
        description:
          "Daily warm oil self-massage that nourishes skin and calms the nervous system.",
        ingredients: ["Warm sesame or coconut oil (3-4 tbsp)"],
        application: [
          "Warm oil to body temperature",
          "Start from head and work downward",
          "Use long strokes on limbs, circular on joints",
          "Massage for 10-15 minutes",
          "Leave oil for 5-10 minutes then shower",
        ],
        benefits:
          "Nourishes skin, improves circulation, calms Vata, and promotes lymphatic drainage.",
        frequency: "Daily before shower",
      },
      {
        id: "morning-tea",
        name: "Ayurvedic Morning Tea",
        description:
          "A warming spice tea that gently awakens the digestive system.",
        ingredients: [
          "1 cup water",
          "1/4 tsp ginger",
          "1/4 tsp cardamom",
          "1/4 tsp cinnamon",
          "1 tsp honey",
        ],
        application: [
          "Boil water with spices",
          "Simmer for 5 minutes",
          "Strain into cup",
          "Add honey when cooled slightly",
        ],
        benefits:
          "Stimulates Agni (digestive fire), clears Ama, and prepares the body for the day.",
        frequency: "Every morning after morning rituals",
      },
    ],
  },
  {
    id: "stress-management",
    label: "Stress Management",
    description:
      "Holistic Ayurvedic approaches to managing stress and anxiety.",
    remedies: [
      {
        id: "ashwagandha-daily",
        name: "Ashwagandha Daily Tonic",
        description:
          "The most potent Ayurvedic adaptogen for chronic stress relief.",
        ingredients: [
          "1 tsp ashwagandha powder",
          "1 cup warm milk",
          "Pinch of nutmeg",
          "1 tsp honey",
        ],
        application: [
          "Warm milk gently",
          "Stir in ashwagandha powder",
          "Add nutmeg",
          "Add honey when slightly cooled",
        ],
        benefits:
          "Reduces cortisol by up to 30%, improves stress resilience, and enhances overall well-being.",
        frequency: "Daily, morning or evening",
      },
      {
        id: "pranayama-stress",
        name: "Pranayama for Stress Relief",
        description:
          "Breath work techniques that activate the parasympathetic nervous system.",
        ingredients: ["Quiet space", "Comfortable seating"],
        application: [
          "Practice Nadi Shodhana (alternate nostril breathing) for 5 min",
          "Follow with Bhramari (humming bee breath) for 5 min",
          "End with Savasana for 5 minutes",
        ],
        benefits:
          "Instantly calms the mind, reduces anxiety, balances nervous system, and lowers blood pressure.",
        frequency: "Twice daily, especially when stressed",
      },
      {
        id: "brahmi-supplement",
        name: "Brahmi Memory Tonic",
        description:
          "A cognitive-enhancing herb that reduces mental fatigue and anxiety.",
        ingredients: [
          "1 tsp brahmi powder",
          "1 cup warm milk or ghee",
          "Pinch of cardamom",
        ],
        application: [
          "Mix brahmi in warm milk",
          "Add cardamom",
          "Drink slowly",
        ],
        benefits:
          "Reduces anxiety, enhances memory, improves cognitive function, and calms the mind.",
        frequency: "Daily in the morning",
      },
      {
        id: "aromatherapy-stress",
        name: "Ayurvedic Aromatherapy",
        description: "Calming herbal aromas that soothe the nervous system.",
        ingredients: [
          "Sandalwood essential oil",
          "Lavender oil",
          "Rose water mist",
        ],
        application: [
          "Add 2-3 drops sandalwood to diffuser",
          "Mist face and surroundings with rose water",
          "Apply diluted lavender to temples",
          "Practice deep breathing with the aromas",
        ],
        benefits:
          "Calms Vata, reduces anxiety, promotes mental clarity, and creates peaceful environment.",
        frequency: "Evening ritual or when stressed",
      },
    ],
  },
  {
    id: "detox",
    label: "Detox & Cleanse",
    description:
      "Ayurvedic detoxification practices to remove Ama and restore vitality.",
    remedies: [
      {
        id: "kitchari-cleanse",
        name: "Kitchari Mono-Diet Cleanse",
        description:
          "The ultimate Ayurvedic cleansing meal that gives digestion a complete rest.",
        ingredients: [
          "1/2 cup mung dal",
          "1/2 cup basmati rice",
          "1 tsp ghee",
          "Cumin, turmeric, coriander (1/2 tsp each)",
          "4 cups water",
        ],
        application: [
          "Rinse rice and dal",
          "Heat ghee and add spices",
          "Add rice and dal, stir",
          "Add water and cook 30 min",
          "Eat warm for 1-3 days for cleanse",
        ],
        benefits:
          "Rests digestive system, removes Ama, resets metabolism, and restores doshic balance.",
        frequency: "1-3 day cleanse quarterly",
      },
      {
        id: "ginger-detox-tea",
        name: "Ginger-Lemon Detox Tea",
        description:
          "A powerful daily detox brew that flushes toxins and supports liver function.",
        ingredients: [
          "2-inch fresh ginger root",
          "1 lemon",
          "1 tsp honey",
          "2 cups hot water",
          "Pinch of cayenne",
        ],
        application: [
          "Slice ginger into hot water",
          "Steep for 10 minutes",
          "Add lemon juice and honey",
          "Add cayenne",
          "Drink while warm",
        ],
        benefits:
          "Stimulates lymphatic system, supports liver detox, and reduces inflammation.",
        frequency: "Daily, morning and evening",
      },
      {
        id: "dry-brushing",
        name: "Dry Brushing (Garshana)",
        description:
          "Ayurvedic lymphatic brushing technique that stimulates detoxification.",
        ingredients: ["Natural bristle dry brush"],
        application: [
          "Begin at feet and brush upward",
          "Use long strokes toward the heart",
          "Use circular motions on belly and joints",
          "Spend 5-10 minutes",
          "Follow with warm shower",
        ],
        benefits:
          "Stimulates lymphatic drainage, removes dead skin, improves circulation, and reduces Kapha.",
        frequency: "Daily before shower",
      },
      {
        id: "neem-detox",
        name: "Neem Leaf Detox",
        description:
          "A bitter Ayurvedic herb that purifies blood and detoxifies the liver.",
        ingredients: ["1 tsp neem powder or 5-6 neem leaves"],
        application: [
          "Chew fresh neem leaves in morning",
          "Or mix neem powder in water",
          "Drink on empty stomach",
          "Follow with a glass of plain water",
        ],
        benefits:
          "Purifies blood, detoxifies liver, eliminates parasites, and clears skin conditions.",
        frequency: "Daily morning for 2-4 weeks",
      },
    ],
  },
  {
    id: "yoga-wellness",
    label: "Yoga & Wellness",
    description:
      "Holistic Ayurvedic yoga and wellness practices for mind-body balance.",
    remedies: [
      {
        id: "surya-namaskar",
        name: "Surya Namaskar (Sun Salutation)",
        description:
          "The complete Ayurvedic yoga sequence for full body wellness.",
        ingredients: ["Yoga mat", "Early morning sunlight"],
        application: [
          "Face east at sunrise",
          "Complete 12-position sequence slowly",
          "Synchronize breath with movement",
          "Begin with 5 rounds",
          "Build to 12+ rounds over weeks",
        ],
        benefits:
          "Stretches all major muscle groups, improves flexibility, boosts metabolism, and balances doshas.",
        frequency: "Daily at sunrise",
      },
      {
        id: "meditation-ayurveda",
        name: "Ayurvedic Meditation Practice",
        description:
          "Daily meditation practice tailored to your dosha type for mental balance.",
        ingredients: [
          "Quiet space",
          "Comfortable seating",
          "Optional: japa mala beads",
        ],
        application: [
          "Sit comfortably with spine straight",
          "Close eyes and take 3 deep breaths",
          "Focus on natural breath or mantra",
          "Begin with 10 minutes daily",
          "Gradually extend to 20-30 minutes",
        ],
        benefits:
          "Reduces stress hormones, improves focus, balances Vata mind, and promotes inner peace.",
        frequency: "Daily morning and evening",
      },
      {
        id: "ayurvedic-sleep",
        name: "Ayurvedic Sleep Ritual",
        description:
          "Evening practices that promote deep, restorative Ayurvedic sleep.",
        ingredients: [
          "Warm sesame oil",
          "Lavender essential oil",
          "Warm milk with nutmeg",
        ],
        application: [
          "Disconnect from screens 1 hour before bed",
          "Apply warm sesame oil to feet",
          "Drink warm nutmeg milk",
          "Diffuse lavender oil",
          "Sleep before 10 PM",
        ],
        benefits:
          "Promotes deep sleep, reduces Vata aggravation, restores Ojas, and enhances morning energy.",
        frequency: "Nightly routine",
      },
      {
        id: "seasonal-routine",
        name: "Seasonal Routine (Ritucharya)",
        description:
          "Adapting diet and lifestyle to seasonal changes for optimal health.",
        ingredients: [
          "Seasonal foods and herbs",
          "Appropriate warm or cool oils",
        ],
        application: [
          "Spring (Vasanta): Light diet, detox, dry massage",
          "Summer (Grishma): Cooling foods, rose water, coconut oil",
          "Monsoon (Varsha): Digestive spices, light meals",
          "Winter (Hemanta): Nourishing foods, sesame oil massage",
        ],
        benefits:
          "Prevents seasonal illness, maintains doshic balance, and aligns body with natural rhythms.",
        frequency: "Adjust practices with each season",
      },
    ],
  },
];

// ==================== CHRONIC HEALTH ====================
export const chronicSubcategories: Subcategory[] = [
  {
    id: "diabetes",
    label: "Diabetes Management",
    description:
      "Support healthy blood sugar levels with time-tested Ayurvedic remedies.",
    disclaimer:
      "These remedies support overall wellness and are complementary to medical treatment. Always consult your healthcare provider for diabetes management.",
    remedies: [
      {
        id: "bitter-melon-daily",
        name: "Bitter Melon Daily Protocol",
        description:
          "A comprehensive bitter melon regimen for blood sugar support.",
        ingredients: [
          "1 small bitter melon",
          "Pinch of rock salt",
          "Few drops lemon",
        ],
        application: [
          "Extract fresh bitter melon juice",
          "Add salt and lemon",
          "Drink on empty stomach",
          "Continue for minimum 3 months",
        ],
        benefits:
          "Contains charantin and polypeptide-p which mimic insulin and help reduce blood sugar naturally.",
        frequency: "Daily in the morning",
      },
      {
        id: "gymnema-tea",
        name: "Gymnema Sylvestre Tea",
        description:
          "The 'sugar destroyer' herb that reduces sugar cravings and blood glucose.",
        ingredients: [
          "1 tsp gymnema leaves (dried)",
          "2 cups water",
          "1 tsp fenugreek seeds",
        ],
        application: [
          "Boil water with gymnema and fenugreek",
          "Simmer for 10 minutes",
          "Strain and drink",
        ],
        benefits:
          "Reduces sugar absorption, regenerates beta cells, and decreases sugar cravings.",
        frequency: "Twice daily before meals",
      },
      {
        id: "vijaysar-water",
        name: "Vijaysar Wood Water",
        description:
          "A traditional Ayurvedic remedy using pterocarpus wood for blood sugar.",
        ingredients: ["Vijaysar wood tumbler or powder", "1-2 cups water"],
        application: [
          "Pour water in vijaysar wood cup overnight",
          "Or steep powder in warm water for 30 minutes",
          "Drink in the morning on empty stomach",
        ],
        benefits:
          "Helps regenerate pancreatic cells, improves insulin sensitivity, and manages blood sugar.",
        frequency: "Daily on empty stomach",
      },
      {
        id: "methi-dal",
        name: "Methi Dal Power Meal",
        description:
          "A nutrient-dense Ayurvedic meal that regulates post-meal blood sugar.",
        ingredients: [
          "1 cup fenugreek leaves",
          "1/2 cup moong dal",
          "Turmeric, cumin, ginger",
          "2 cups water",
        ],
        application: [
          "Cook moong dal with spices",
          "Add fenugreek leaves",
          "Cook until soft",
          "Eat as lunch or dinner",
        ],
        benefits:
          "Slows glucose absorption, improves insulin response, and provides sustained energy.",
        frequency: "3-4 times per week",
      },
    ],
  },
  {
    id: "blood-pressure",
    label: "Blood Pressure",
    description:
      "Natural Ayurvedic approaches to maintaining healthy blood pressure levels.",
    disclaimer:
      "These remedies complement but do not replace prescribed medication. Always consult your cardiologist before changing your treatment plan.",
    remedies: [
      {
        id: "arjuna-heart-tonic",
        name: "Arjuna Bark Heart Tonic",
        description:
          "The most revered Ayurvedic heart herb for cardiovascular support.",
        ingredients: ["1 tsp arjuna bark powder", "1 cup milk or water"],
        application: [
          "Boil arjuna powder in milk/water for 5 minutes",
          "Strain if needed",
          "Drink warm twice daily",
        ],
        benefits:
          "Strengthens heart muscle, reduces cholesterol, lowers blood pressure, and improves cardiac function.",
        frequency: "Twice daily",
      },
      {
        id: "garlic-heart",
        name: "Raw Garlic Protocol",
        description:
          "Daily raw garlic consumption for natural blood pressure reduction.",
        ingredients: ["2-3 raw garlic cloves", "Warm water or honey"],
        application: [
          "Crush or chop garlic",
          "Wait 10 minutes (activates allicin)",
          "Consume with warm water or honey",
          "Best on empty stomach",
        ],
        benefits:
          "Allicin in garlic dilates blood vessels, reduces arterial stiffness, and lowers systolic pressure.",
        frequency: "Daily morning",
      },
      {
        id: "hibiscus-tea",
        name: "Hibiscus-Rose BP Tea",
        description:
          "A pleasantly tart floral tea with clinically proven blood pressure benefits.",
        ingredients: [
          "2 tbsp dried hibiscus flowers",
          "1 tsp rose petals",
          "2 cups hot water",
          "1 tsp honey",
        ],
        application: [
          "Steep hibiscus and rose in hot water",
          "Cover and steep for 10-15 minutes",
          "Strain and add honey",
          "Drink warm or cool",
        ],
        benefits:
          "Studies show hibiscus lowers systolic BP by up to 7 mmHg. Acts as natural ACE inhibitor.",
        frequency: "2-3 times daily",
      },
      {
        id: "savasana-bp",
        name: "Yoga Nidra for BP",
        description:
          "Deep relaxation practice that significantly reduces blood pressure.",
        ingredients: ["Yoga mat", "Blanket", "Quiet space"],
        application: [
          "Lie in savasana",
          "Follow guided body scan",
          "Practice 20-30 minutes",
          "Focus on breath and muscle relaxation",
        ],
        benefits:
          "Reduces stress hormones, activates parasympathetic system, and reduces blood pressure naturally.",
        frequency: "Daily, especially evening",
      },
    ],
  },
  {
    id: "thyroid",
    label: "Thyroid Support",
    description: "Ayurvedic support for thyroid function and hormonal balance.",
    disclaimer:
      "Thyroid conditions require medical management. These remedies provide complementary nutritional support. Always work with your endocrinologist.",
    remedies: [
      {
        id: "ashwagandha-thyroid",
        name: "Ashwagandha Thyroid Support",
        description:
          "The premier Ayurvedic adaptogen for thyroid hormone balance.",
        ingredients: [
          "500mg ashwagandha extract or 1 tsp powder",
          "Warm milk or water",
        ],
        application: [
          "Mix ashwagandha in warm milk",
          "Take consistently",
          "Ideally with breakfast and dinner",
        ],
        benefits:
          "Studies show ashwagandha can improve TSH and T4 levels in subclinical hypothyroidism.",
        frequency: "Twice daily with meals",
      },
      {
        id: "shankha-pushpi-thyroid",
        name: "Brahmi-Shankha Pushpi Tonic",
        description:
          "A nerve-calming tonic that supports thyroid and adrenal health.",
        ingredients: [
          "1/2 tsp brahmi powder",
          "1/2 tsp shankha pushpi powder",
          "Warm milk",
        ],
        application: [
          "Mix both powders in warm milk",
          "Stir well",
          "Drink at bedtime",
        ],
        benefits:
          "Calms nervous system, reduces thyroid-related anxiety, and supports hormone balance.",
        frequency: "Daily before bed",
      },
      {
        id: "iodine-herbs",
        name: "Sea Vegetable & Iodine Protocol",
        description:
          "Natural food sources to support thyroid iodine requirements.",
        ingredients: [
          "Nori or dulse flakes",
          "Brazil nuts (selenium)",
          "Pumpkin seeds (zinc)",
        ],
        application: [
          "Add nori to soups or salads daily",
          "Eat 1-2 Brazil nuts daily for selenium",
          "Consume pumpkin seeds as snack",
        ],
        benefits:
          "Provides natural iodine, selenium, and zinc needed for thyroid hormone synthesis.",
        frequency: "Daily as part of diet",
      },
      {
        id: "yoga-thyroid",
        name: "Yoga for Thyroid Health",
        description: "Specific yoga poses that stimulate the thyroid gland.",
        ingredients: ["Yoga mat"],
        application: [
          "Practice Sarvangasana (shoulder stand) 30-60 sec",
          "Follow with Halasana (plow pose)",
          "Practice Matsyasana (fish pose)",
          "Perform Ujjayi pranayama for 5 min",
        ],
        benefits:
          "Shoulder stand and plow pose increase blood flow to thyroid gland and stimulate function.",
        frequency: "Daily yoga practice",
      },
    ],
  },
  {
    id: "pcos",
    label: "PCOS & Hormonal",
    description:
      "Natural Ayurvedic approaches for hormonal balance and PCOS management.",
    disclaimer:
      "PCOS management requires medical supervision. These natural remedies complement but do not replace medical treatment.",
    remedies: [
      {
        id: "shatavari-pcos",
        name: "Shatavari Hormonal Tonic",
        description: "The premier female Ayurvedic tonic for hormonal balance.",
        ingredients: [
          "1 tsp shatavari powder",
          "1 cup warm milk",
          "Pinch of cardamom",
        ],
        application: [
          "Mix shatavari in warm milk",
          "Add cardamom",
          "Drink daily",
        ],
        benefits:
          "Balances estrogen, supports ovarian health, reduces androgen levels, and regulates cycles.",
        frequency: "Daily, morning and evening",
      },
      {
        id: "spearmint-tea-pcos",
        name: "Spearmint Anti-Androgen Tea",
        description:
          "Clinical studies show spearmint tea reduces excess androgens in PCOS.",
        ingredients: [
          "2 tsp dried spearmint leaves",
          "2 cups hot water",
          "1 tsp honey",
        ],
        application: [
          "Steep spearmint in hot water for 5 minutes",
          "Add honey if desired",
          "Drink warm",
        ],
        benefits:
          "Reduces free testosterone, improves hormonal profile, and reduces hirsutism.",
        frequency: "Twice daily",
      },
      {
        id: "cinnamon-pcos",
        name: "Cinnamon Insulin Sensitivity Protocol",
        description:
          "Daily cinnamon supplementation to address insulin resistance in PCOS.",
        ingredients: ["1/2 tsp Ceylon cinnamon", "Warm water or tea"],
        application: [
          "Add cinnamon to morning drink",
          "Use in cooking whenever possible",
          "Take consistently for 3+ months",
        ],
        benefits:
          "Improves insulin sensitivity, regulates menstrual cycles, and supports PCOS management.",
        frequency: "Daily with meals",
      },
      {
        id: "detox-pcos",
        name: "Ayurvedic PCOS Detox Plan",
        description:
          "A seasonal Panchakarma-inspired cleanse for hormonal reset.",
        ingredients: ["Triphala", "Neem", "Guduchi (tinospora)", "Warm water"],
        application: [
          "Morning: triphala water",
          "Afternoon: neem tea",
          "Evening: guduchi kadha (decoction)",
          "Continue for 21 days",
        ],
        benefits:
          "Removes toxins from reproductive tract, balances doshas, and creates hormonal equilibrium.",
        frequency: "21-day seasonal cleanse",
      },
    ],
  },
  {
    id: "arthritis",
    label: "Arthritis & Joint Pain",
    description:
      "Ayurvedic remedies for joint pain relief and inflammation management.",
    disclaimer:
      "These remedies provide complementary pain management support. Consult your rheumatologist for arthritis treatment.",
    remedies: [
      {
        id: "boswellia-joint",
        name: "Shallaki (Boswellia) Joint Formula",
        description:
          "The most powerful Ayurvedic anti-inflammatory for joint health.",
        ingredients: [
          "Shallaki/Boswellia supplement (400-500mg)",
          "Warm water or ginger tea",
        ],
        application: [
          "Take Shallaki capsules with warm ginger tea",
          "Maintain consistent timing",
          "Take with meals for best absorption",
        ],
        benefits:
          "Clinical studies show 50%+ reduction in joint pain. Reduces leukotriene production and inflammation.",
        frequency: "2-3 times daily with meals",
      },
      {
        id: "turmeric-joint",
        name: "Anti-Inflammatory Golden Paste",
        description:
          "A bioavailability-optimized turmeric paste for systemic inflammation.",
        ingredients: [
          "1/2 cup turmeric powder",
          "1 cup water",
          "1/3 cup coconut oil",
          "1 tsp black pepper",
        ],
        application: [
          "Mix turmeric with water in pan",
          "Cook on low heat until paste forms",
          "Add oil and pepper, mix well",
          "Store in fridge",
          "Take 1 tsp daily in warm milk",
        ],
        benefits:
          "Curcumin reduces TNF-alpha and IL-6, key inflammatory markers in arthritis.",
        frequency: "1-2 tsp daily in warm milk",
      },
      {
        id: "sesame-oil-massage",
        name: "Sesame Oil Joint Massage",
        description:
          "Traditional Ayurvedic warm oil massage for joint lubrication.",
        ingredients: ["Warm sesame oil", "Optional: camphor, eucalyptus oil"],
        application: [
          "Warm sesame oil to comfortable temperature",
          "Apply to painful joints generously",
          "Massage with gentle circular motions for 10-15 min",
          "Cover with warm cloth",
          "Rest for 30 minutes",
        ],
        benefits:
          "Reduces Vata in joints, lubricates joint membranes, reduces stiffness, and relieves pain.",
        frequency: "Daily, especially in cold weather",
      },
      {
        id: "castor-oil-arthritis",
        name: "Castor Oil Pack for Joints",
        description:
          "A traditional healing compress that reduces joint inflammation.",
        ingredients: [
          "Organic castor oil",
          "Flannel cloth",
          "Hot water bottle",
        ],
        application: [
          "Saturate flannel with castor oil",
          "Apply to painful joint",
          "Cover with plastic wrap",
          "Apply hot water bottle for 45 min",
          "Rest during treatment",
        ],
        benefits:
          "Deeply penetrates tissue, reduces inflammation, improves circulation, and relieves chronic pain.",
        frequency: "3-4 times per week",
      },
    ],
  },
];

export const categoryInfo = {
  health: {
    title: "Health Remedies",
    description:
      "Time-tested Ayurvedic remedies for overall wellness, immunity, digestion, and vitality.",
    icon: "🌿",
    color: "brand-blue",
    subcategories: healthSubcategories,
  },
  skin: {
    title: "Skin Care",
    description:
      "Natural Ayurvedic beauty treatments for glowing, healthy, radiant skin.",
    icon: "💆",
    color: "brand-green",
    subcategories: skinSubcategories,
  },
  hair: {
    title: "Hair Care",
    description:
      "Powerful Ayurvedic remedies for hair fall prevention, growth, and scalp health.",
    icon: "💇",
    color: "brand-blue",
    subcategories: hairSubcategories,
  },
  lifestyle: {
    title: "Lifestyle & Weight",
    description:
      "Holistic Ayurvedic lifestyle practices for weight management, stress relief, and daily wellness.",
    icon: "🧘",
    color: "brand-green",
    subcategories: lifestyleSubcategories,
  },
  chronic: {
    title: "Chronic Health",
    description:
      "Complementary Ayurvedic support for managing chronic health conditions.",
    icon: "🩺",
    color: "brand-blue",
    subcategories: chronicSubcategories,
  },
};
