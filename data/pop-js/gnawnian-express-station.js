const utils = require("../_utils");

const allStagesMice = [
  "Angry Train Staff",
  "Bartender",
  "Farrier",
  "Mysterious Traveller",
  "Parlour Player",
  "Passenger",
  "Photographer",
  "Stowaway",
  "Stuffy Banker",
  "Tonic Salesman",
  "Train Conductor",
  "Travelling Barber",
  "Upper Class Lady",
];

const cheeseVarField = [
  {
    vars: {
      cheese: {
        "SB+": true,
      },
    },
    fields: {
      cheese: "SB+",
    },
  },
  {
    vars: {
      cheese: {
        "Gouda": true,
        "Brie": true,
        "Swiss": true,
        "White Cheddar": true,
        "Marble": true,
        "Mozzarella": true,
        "Cheddar": true,
      },
    },
    fields: {
      cheese: "Gouda/Brie/Swiss/White Cheddar/Marble/Mozzarella/Cheddar",
    },
  },
]

module.exports = {
  default: {
    location: utils.genVarField("location", "Gnawnian Express Station"),
    config: [
      {
        opts: {
          include: allStagesMice,
        },
      },
    ],
  },
  series: [
    {
      cheese: cheeseVarField,
      stage: utils.genVarField("stage", "Station"),
    },
    {
      cheese: cheeseVarField,
      charm: [
        {
          vars: {
            charm: {
              "Supply Schedule Charm": false,
            },
          }
        }
      ],
      stage: [
        {
          vars: {
            stage: {
              "1. Supply Depot - No Rush": true,
            },
          },
          fields: {
            stage: "Supply Depot (No Rush)",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Crate Camo",
              "Cute Crate Carrier",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "1. Supply Depot - No Rush + SS Charm": true,
            },
          },
          fields: {
            charm: "Supply Schedule",
            stage: "Supply Depot (No Rush)",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Crate Camo",
              "Cute Crate Carrier",
              "Warehouse Manager",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "1. Supply Depot - Rush": true,
            },
          },
          fields: {
            stage: "Supply Depot (Supply Rush)",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Crate Camo",
              "Cute Crate Carrier",
              "Supply Hoarder",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "2. Raider River - Defending Target": true,
            },
          },
          fields: {
            stage: "Raider River (Defending Target)",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Automorat",
              "Cannonball",
              "Dangerous Duo",
              "Hookshot",
              "Mouse With No Name",
              "Sharpshooter",
              "Steel Horse Rider",
              "Stoutgear",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "2. Raider River - Defending Other": true,
            },
          },
          fields: {
            stage: "Raider River (Defending Other)",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Automorat",
              "Cannonball",
              "Dangerous Duo",
              "Hookshot",
              "Mouse With No Name",
              "Sharpshooter",
              "Steel Horse Rider",
              "Stoutgear",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "2. Raider River - Not Defending": true,
            },
          },
          fields: {
            stage: "Raider River (Not Defending)",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Automorat",
              "Cannonball",
              "Dangerous Duo",
              "Hookshot",
              "Mouse With No Name",
              "Sharpshooter",
              "Steel Horse Rider",
              "Stoutgear",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "3. Daredevil Canyon - No Fuelers": true,
            },
          },
          fields: {
            stage: "Raider River",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Fuel",
              "Train Engineer",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "3. Daredevil Canyon - Magmatic Crystal": true,
            },
          },
          fields: {
            charm: "Magmatic Crystal",
            stage: "Daredevil Canyon",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Fuel",
              "Magmatic Crystal Thief",
              "Magmatic Golem",
              "Train Engineer",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "3. Daredevil Canyon - Black Powder": true,
            },
          },
          fields: {
            charm: "Black Powder",
            stage: "Daredevil Canyon",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Black Powder Thief",
              "Fuel",
              "Train Engineer",
            ]
          }
        }
      ]
    },
    {
      cheese: cheeseVarField,
      stage: [
        {
          vars: {
            stage: {
              "3. Daredevil Canyon - Dusty Coal": true,
            },
          },
          fields: {
            charm: "Dusty Coal",
            stage: "Daredevil Canyon",
          },
        }
      ],
      config: [
        {
          opts: {
            include: [
              ...allStagesMice,
              "Coal Shoveller",
              "Fuel",
              "Train Engineer",
            ]
          }
        }
      ]
    },
  ],
  /**
   *
   * @param {import('../_utils').AttractionData[]} data
   * @returns {import('../_utils').AttractionData[]}
   */
    postProcess: function(data) {
      return data;
    },
};
