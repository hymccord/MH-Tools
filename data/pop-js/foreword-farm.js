const utils = require("../_utils")

const standardCheese = ['Gouda', 'SB+'];

module.exports = {
  default: {
    location: utils.genVarField('location', 'Foreword Farm'),
  },
  series: [
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "No Plants"),
      config: [ {
        opts: {
          exclude: [
            'Grit Grifter',
            'Land Loafer',
            'Root Rummager',
            'Crazed Cultivator'
          ]
        }
      } ]
    },    
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "One Plant"),
      config: [ {
        opts: {
          exclude: [
            'Angry Aphid',
            'Grit Grifter',
            'Root Rummager',
            'Crazed Cultivator'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Two Plants"),
      config: [ {
        opts: {
          exclude: [
            'Angry Aphid',
            'Grit Grifter',
            'Wily Weevil',
            'Crazed Cultivator'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Three Plants"),
      config: [ {
        opts: {
          exclude: [
            'Angry Aphid',
            'Mighty Mite',
            'Wily Weevil',
            'Crazed Cultivator'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Three Papyrus"),
      config: [ {
        opts: {
          exclude: [
            'Angry Aphid',
            'Mighty Mite',
            'Wily Weevil',
            'Crazed Cultivator',
            'Loathsome Locust'
          ]
        }
      } ]
    },
    { 
      cheese: utils.genVarField("cheese", standardCheese),
      stage: utils.genVarField("stage", "Boss"),
      config: [ {
        opts: {
          exclude: [
            'Monstrous Midge'
          ]
        }
      } ]
    },
  ]
}
