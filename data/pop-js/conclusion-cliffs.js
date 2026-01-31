const utils = require("../_utils");

const prose = ["J.R.R. Token", "Jean Austere", "Mark Twine"];

const paneerMice = [
  [
    "Billy Lowfellow",
    "Indigo Montana",
    "Lady Breakwell",
    "Lisa Doolots",
    "Nancy Sketched",
    "Petra Pot",
  ],
  [
    "Gerald Rivers",
    "Great Ratsby",
    "Hardy Mice",
    "Lady Blatherly",
    "Robbin' Cloak",
    "Zephrum Bobblebrox",
  ],
  [
    "Captain Noname",
    "Danielle Targatheon",
    "Herbie Pirouette",
    "Ignoramius J. Wryly",
    "Madame Bogarty",
    "Mr. Daresee",
  ]
]

const sagaMice = [
  [
    "Dawn Quixotic",
    "Grandolph the Green",
    "Lady MacBath",
    "Rouge O'Hair",
    "Skillful Mr. Cutley",
    "Tumblestaff",
  ],
  [
    "Duke of Reuben",
    "Prince Hapless",
    "Professor Morty Artie",
    "Ratberry",
    "Red Valet",
    "Rinsebreeze",
  ]
]
const adventure = [
  "Captain Noname",
  "Dawn Quixotic",
  "Duke of Reuben",
  "Indigo Montana",
  "Robbin' Cloak",
  "Three Mouseketeers",
];

const comedy = [
  "Ignoramius J. Wryly",
  "Lady Breakwell",
  "Miss Crunchbull",
  "Ratberry",
  "Tumblestaff",
  "Zephrum Bobblebrox",
];

const fantasy = [
  "Danielle Targatheon",
  "Gerald Rivers",
  "Grandolph the Green",
  "Janis the Grey Witch",
  "Petra Pot",
  "Rinsebreeze",
];

const romance = [
  "Dilemma Woodmouse",
  "Lady Blatherly",
  "Lisa Doolots",
  "Mr. Daresee",
  "Red Valet",
  "Rouge O'Hair",
];

const suspense = [
  "Becca de Frost",
  "Hardy Mice",
  "Herbie Pirouette",
  "Nancy Sketched",
  "Professor Morty Artie",
  "Skillful Mr. Cutley",
];

const tragedy = [
  "Aching Heels",
  "Billy Lowfellow",
  "Great Ratsby",
  "Lady MacBath",
  "Madame Bogarty",
  "Prince Hapless",
];

function mouseToGenre(mouse) {
  if (adventure.includes(mouse)) return "Adventure";
  if (comedy.includes(mouse)) return "Comedy";
  if (fantasy.includes(mouse)) return "Fantasy";
  if (romance.includes(mouse)) return "Romance";
  if (suspense.includes(mouse)) return "Suspense";
  if (tragedy.includes(mouse)) return "Tragedy";
  return null;
}

module.exports = {
  default: {
    location: utils.genVarField("location", "Conclusion Cliffs"),
  },
  series: [
    {
      cheese: utils.genVarField("cheese", "Metaphor Manchego"),
      // stage: utils.genVarField("stage", "Not Writing"), // stage is not working properly in MHCT extension. Can be un-commented after 2026.01.27
      config: [
        {
          opts: {
            include: prose,
          },
          fields: {
            stage: "Not Writing",
          }
        }
      ]
    },
    {
      cheese: utils.genVarField("cheese", ["Plotting Paneer", "Storied Saga"]),
      stage: [
        {
          vars: {
            stage: {
              "Writing Adventure": true,
              "Writing Comedy": true,
              "Writing Fantasy": true,
              "Writing Romance": true,
              "Writing Suspense": true,
              "Writing Tragedy": true,
            }
          },
          fields: {
            stage: "Writing"
          }
        }
      ]
    }
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
  postProcess: function(data) {

    // Combine reskin mice (mice in same sub-array have the same AR)
    // Build a map of mouse -> array of reskin mice and mouse -> cheese type
    const reskinGroups = new Map();
    const mouseToCheeseType = new Map();

    paneerMice.forEach(group => {
      group.forEach(mouse => {
        reskinGroups.set(mouse, group);
        mouseToCheeseType.set(mouse, "Plotting Paneer");
      });
    });

    sagaMice.forEach(group => {
      group.forEach(mouse => {
        reskinGroups.set(mouse, group);
        mouseToCheeseType.set(mouse, "Storied Saga");
      });
    });

    // Track which groups we've already processed to avoid overcounting
    const processedGroups = new Set();

    // Combine seen/sample for reskin mice
    data.forEach((run, i) => {
      if (reskinGroups.has(run.mouse)) {
        const expectedCheese = mouseToCheeseType.get(run.mouse);

        // Only process if the cheese matches the expected cheese type
        if (run.cheese === expectedCheese) {
          const reskinGroup = reskinGroups.get(run.mouse);
          const groupKey = `${run.cheese}-${run.stage}-${reskinGroup[0]}`;

          // Skip if we've already processed this group
          if (processedGroups.has(groupKey)) {
            return;
          }
          processedGroups.add(groupKey);

          // Find all mice in the same reskin group with same cheese and stage
          const relatedIndices = [];
          data.forEach((other, j) => {
            if (other.cheese === run.cheese
                && other.stage === run.stage
                && reskinGroup.includes(other.mouse)) {
              relatedIndices.push(j);
            }
          });

          // Calculate combined seen and sample
          let totalSeen = 0;
          relatedIndices.forEach(idx => {
            totalSeen += data[idx].seen || 0;
          });

          relatedIndices.forEach(idx => {
            data[idx].seen = totalSeen;
            data[idx].attraction = (totalSeen / data[idx].sample * 100).toFixed(2) + "%";
          });
        }
      }
    });

    // Rename Writing stages based on mouse genre
    data.forEach(run => {
      if (run.stage === "Writing") {
        const genre = mouseToGenre(run.mouse);
        if (genre) {
          run.stage = `Writing ${genre}`;
        }
      }
    });

    // Deus Ex Maconnais exclusive mice
    data.push(...[
      { location: "Conclusion Cliffs", cheese: "Deus Ex Maconnais", stage: "Writing Adventure", mouse: "Three Mouseketeers", attraction: "100%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Deus Ex Maconnais", stage: "Writing Comedy", mouse: "Miss Crunchbull", attraction: "100%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Deus Ex Maconnais", stage: "Writing Fantasy", mouse: "Janis the Grey Witch", attraction: "100%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Deus Ex Maconnais", stage: "Writing Romance", mouse: "Dilemma Woodmouse", attraction: "100%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Deus Ex Maconnais", stage: "Writing Suspense", mouse: "Becca de Frost", attraction: "100%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Deus Ex Maconnais", stage: "Writing Tragedy", mouse: "Aching Heels", attraction: "100%", sample: 1 },
    ]);

    // Postscript AR pool varies
    data.push(...[
      { location: "Conclusion Cliffs", cheese: "Plotting Paneer/Storied Saga/Deus Ex Maconnais", stage: "Postscript", mouse: "Adventure Weaver", attraction: "20%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Plotting Paneer/Storied Saga/Deus Ex Maconnais", stage: "Postscript", mouse: "Comedy Weaver", attraction: "20%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Plotting Paneer/Storied Saga/Deus Ex Maconnais", stage: "Postscript", mouse: "Romance Weaver", attraction: "20%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Plotting Paneer/Storied Saga/Deus Ex Maconnais", stage: "Postscript", mouse: "Suspense Weaver", attraction: "20%", sample: 1 },
      { location: "Conclusion Cliffs", cheese: "Plotting Paneer/Storied Saga/Deus Ex Maconnais", stage: "Postscript", mouse: "Tragedy Weaver", attraction: "20%", sample: 1 },
    ]);

    data.push(...[
      { location: "Conclusion Cliffs", cheese: "Plotting Paneer/Storied Saga/Deus Ex Maconnais", stage: "Fantasy Postscript", mouse: "Ultimate Mythweaver", attraction: "100%", sample: 1 },
    ]);

    // sort data by stage then AR descending
    data.sort((a, b) => {
      const stageOrder = {
        "Not Writing": 0,
        "Writing Adventure": 1,
        "Writing Comedy": 2,
        "Writing Fantasy": 3,
        "Writing Romance": 4,
        "Writing Suspense": 5,
        "Writing Tragedy": 6,
        "Postscript": 7,
        "Fantasy Postscript": 8,
      };
      if (stageOrder[a.stage] !== stageOrder[b.stage]) {
        return stageOrder[a.stage] - stageOrder[b.stage];
      }
      return parseFloat(b.attraction) - parseFloat(a.attraction);
    });

    return data;
  },
};

