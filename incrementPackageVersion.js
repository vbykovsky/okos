const fs = require("fs");
const path = require("path");
const packageJson = require("./package.json");

const MAX_BUG_FIX_VERSION = 9;
const MAX_MINOR_VERSION = 9;

const currentVersion = packageJson.version;
const currentVersionArray = currentVersion.split(".");

let currentBugFix = currentVersionArray[2];
let currentMinor = currentVersionArray[1];
let currentMajor = currentVersionArray[0];

currentBugFix++;

if (currentBugFix > MAX_BUG_FIX_VERSION) {
  currentBugFix = 0;
  currentMinor++;
}

if (currentMinor > MAX_MINOR_VERSION) {
  currentMinor = 0;
  currentMajor++;
}

const newVersion = [currentMajor, currentMinor, currentBugFix].join(".");

packageJson.version = newVersion;

const newPackageJsonContent = JSON.stringify(packageJson, null, 4);

fs.writeFile(path.resolve("package.json"), newPackageJsonContent, "utf-8", (error) => {
  if (error) {
    console.error("Package version incrementing error", error);
  }
});
