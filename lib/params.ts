import data from "@/parameters.json" assert { type: "json" };

const paramsData = {
  decayPeriod: parseFloat(data.decayPeriod),
  decayRate: parseFloat(data.decayRate),
  threshold: parseFloat(data.threshold),
  viewsWeight: parseFloat(data.viewsWeight),
  clicksWeight: parseFloat(data.clicksWeight),
};

export default paramsData;
