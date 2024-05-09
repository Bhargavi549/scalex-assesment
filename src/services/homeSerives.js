const csv = require("csv-parser");
const { Readable } = require("stream");
// const adminUsers = require('../../config/adminUser.csv');
// const regularUsers = require('../../config/regularUser.csv')

const getBooksForAdmin = async (req, res) => {
    const uploadedFile = req?.files?.file;
    const fileData = uploadedFile?.data?.toString("utf8");
    const csvData = [];
    await new Promise((resolve, reject) => {
      const stream = Readable?.from(fileData);

      stream
        .pipe(csv())
        .on("data", (row) => {
          const mappedData = {
            title: row["title"]
          };
          csvData.push(mappedData);
        })
        .on("end", () => {
          resolve();
        })
        .on("error", (error) => {
          reject(error);
        });
    });
    return csvData
} 

const getBooksForUser = async (req, res) => {
    
} 

module.exports = {getBooksForAdmin, getBooksForUser}