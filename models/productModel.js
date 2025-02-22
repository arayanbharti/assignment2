const fs = require("fs");
const DATA_FILE = "./data.json";

const readData = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify({ Products: [] }, null, 2));
    }
    const fileContent = fs.readFileSync(DATA_FILE, "utf8").trim();
    return fileContent ? JSON.parse(fileContent) : { Products: [] };
  } catch (err) {
    console.error("Error reading data file:", err);
    return { Products: [] }; // Return empty array on failure
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to data file:", err);
  }
};

module.exports = { readData, writeData };
