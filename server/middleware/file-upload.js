const multer = require('multer')
const uuid = require('uuid')

const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
require("dotenv").config()

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
});

const s3 = new aws.S3()

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

const fileUpload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now().toString()); //use Date.now() for unique file keys
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype]
        let error = isValid ? null : JSON.stringify('Invalid mime type')

        cb(error, isValid)
    },
    limits: {
        fileSize: 1024 * 1024
    },
});

// const fileUpload = multer({
//     limits: 500000,
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'uploads/images')
//         },
//         filename: (req, file, cb) => {
//             const ext = MIME_TYPE_MAP[file.mimetype]
//             cb(null, uuid.v1() + '.' + ext)
//         }
//     }),
//     fileFilter: (req, file, cb) => {
//         const isValid = !!MIME_TYPE_MAP[file.mimetype]
//         let error = isValid ? null : new Error('Invalid mime type')

//         cb(error, isValid)
//     }
// })

module.exports = fileUpload
