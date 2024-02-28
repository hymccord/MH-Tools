const _ = require("lodash");
const Promise = require("bluebird");
const rp = require("request-promise");
const debug = require("debug")("pop-ht");

function requestForm(form, opts) {
  debug("debug", "requesting", form);
  return rp
    .post("http://horntracker.com/backend/new/viewer.php", {
      form
    })
    .then(data => JSON.parse(data))
    .catch(function(err) {
      debug("error", err);
      if (opts.retry)
        return Promise.delay(30000).then(requestForm.bind(this, opts));
      return Promise.reject(err);
    });
}

function serializeVars(vars) {
  const form = {};
  _.forEach(vars, (ids, type) => {
    _.forEach(ids, (props, id) => {
      _.forEach(props, (value, prop) => {
        form[`vars[${type}][${id}][${prop}]`] = value;
      });
    });
  });
  return form;
}

function fetch(filter, opts) {
  opts.form = serializeFilter(filter, opts);
  return requestForm(opts);
}

module.exports = function(vars, opts) {
  opts = opts || {};
  return requestForm(serializeVars(vars), opts).then(data => {
    if (!data.getDetailedSAEncounterRateDataJSON)
      return Promise.reject(
        `no data.getDetailedSAEncounterRateDataJSON in response: ${JSON.stringify(
          vars
        )}`
      );
    if (!data.getDetailedSAEncounterRateDataJSON.mice)
      return Promise.reject(
        `no data.getDetailedSAEncounterRateDataJSON.mice in response: ${JSON.stringify(
          vars
        )}`
      );
    const total = +data.getDetailedSAEncounterRateDataJSON.totalAttracted;
    const sample = +data.getDetailedSAEncounterRateDataJSON.totalHunts;
    return data.getDetailedSAEncounterRateDataJSON.mice
      .map(mice => ({
        location: opts.location,
        phase: opts.phase,
        cheese: opts.cheese,
        charm: opts.charm,
        attraction: +mice.seen / total,
        mouse: mice.name.replace(/ Mouse$/, ""),
        sample
      }))
      .sort((a, b) => b.attraction - a.attraction);
  });
};
