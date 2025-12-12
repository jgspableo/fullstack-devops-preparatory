// Export a function named 'getDate' from the module
module.exports.getDate = function getDate() {
  // Get the current date and time in the timezone "Australia/Brisbane"
  let phString = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
  });
  let phTime = new Date(phString);
  return phTime; // Return the formatted date and time
};
