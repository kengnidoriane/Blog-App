const { PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();
const s3Client = require('./s3Client');
const { v4: uuidv4 } = require('uuid')

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    key: `${Date.now()}-${file.originalname}`,
    Body: file.Buffer,
    ContentType: file.mimetype
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    return `https://${process.env.AWS_BUCKET_NAME}.s3Client.${process.env.AWS_REGION}.amazone.com/${params.key}`
  } catch (err) {
    console.error('Erreur lors du telechargement du fichier', err);
    
    
  }
}

module.exports = { uploadFile };

