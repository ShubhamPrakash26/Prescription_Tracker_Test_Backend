const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.processOCR = async (filePath) => {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    const response = await axios.post('http://localhost:5001/ocr', formData, {
      headers: formData.getHeaders()
    });

    return response.data; // { raw_text, medicines, category }
  } catch (error) {
    throw new Error('Error processing OCR: ' + error.message);
  }
};
