const { ExifImage } = require('exif');
const exifParser = require('exif-parser');
const { Buffer } = require('buffer');


const imageBuffer = Buffer.from(imageData, 'base64');

// Extract metadata
const parser = exifParser.create(imageBuffer);
const result = parser.parse();
// const metadataq = exiftool.read(imageBuffer);
const metadata = result.tags;

console.log(metadata)


function extractMetadata(imageBuffer) {
    return new Promise(async (resolve, reject) => {
        new ExifImage({ image: imageBuffer }, async (error, metadata) => {
            if (error) {
                reject(error);
            } else {
                console.log(metadata);
                console.log(metadata.exif["FlashpixVersion"].toString('utf8').replace(/\0/g, ''))
            }
        });
    });
}
extractMetadata(imageBuffer)

