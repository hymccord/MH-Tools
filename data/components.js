#!/usr/bin/env node
/* eslint-disable no-console */

const util = require("node:util");
const request = require("request");

const requestAsync = util.promisify(request);

const recognizedComponents = ["base", "weapon", "trinket"];

(async () => {
  const arg = process.argv.slice(2);
  const component = arg[0];

  if (!recognizedComponents.includes(component)) {
    console.error(`Component "${component}" is not supported`);
    process.exit(1);
  }

  const { body } = await requestAsync(
    `https://www.mousehuntgame.com/api/get/item/${component}/all`
  );

  const data = JSON.parse(body);
  const transformedComponents = {};

  data.forEach(item => {
    transformedComponents[item.name] = [
      item.power,
      Math.trunc(item.power_bonus * 100),
      Math.trunc(item.attraction_bonus * 100),
      item.luck,
      item.cheese_effect
    ];
  });

  const sortedKeys = Object.keys(transformedComponents).sort();

  // const finalData = {};
  // sortedKeys.forEach(key => {
  //   finalData[key] = transformedComponents[key];
  // });

  process.stdout.write(`{\n`);
  sortedKeys.forEach(key => {
    const a = transformedComponents[key];
    process.stdout.write(
      `  "${key}": [${a[0]}, ${a[1]}, ${a[2]}, ${a[3]}, "${a[4]}"],\n`
    );
  });
  process.stdout.write(`}\n`);
  // process.stdout.write(JSON.stringify(finalData, null, 2));
  process.exit(0);
})();
