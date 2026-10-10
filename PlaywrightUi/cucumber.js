module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    format: [
      "progress",
      "json:reports/cucumber.json",
      "cucumber-js-extent:reports/extent-report.html"
    ],
    parallel: 1
  }
};
