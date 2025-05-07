const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

module.exports = async function runOCR(imagePath) {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    const response = await axios.post('http://localhost:5001/ocr', formData, {
      headers: formData.getHeaders()
    });

    return response.data; // { raw_text, medicines, category }
  } catch (err) {
    console.error('OCR Error:', err.message);
    return { keywords: [], category: "Uncategorized" };
  }
};
