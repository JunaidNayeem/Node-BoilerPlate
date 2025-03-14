const fs = require('fs')

module.exports = imageHandlers = {
    saveImageAndGetURL: async (req, imageName, type) => {
        console.log(req)
        let urlSavePicture = await saveImageFolderPath(type);
        console.log(urlSavePicture)
        urlSavePicture = urlSavePicture + imageName;
        console.log(urlSavePicture)
        fs.writeFile(urlSavePicture, req.buffer, function (err) {
            if(!err) return urlSavePicture
            else return false
        })
    },
    getImageFolderName: async (id) => {
        switch (id) {
            case 1:// user
                return 'user_profile/';
            case 2: // product_images
                return 'product_images/';
            case 3: // category_images
                return 'category_images/';
            case 4:
                return 'banner_images/';
            case 5:
                return 'slider_images/';
            case 6: // category_images
                return 'subCategory_images/';
            default:
                break;
        }
    }    
}
async function getImageFolderName(id) {
    switch (id) {
        case 1:// user
                return 'user_profile/';
            case 2: // product_images
                return 'product_images/';
            case 3: // category_images
                return 'category_images/';
            case 4:
                return 'banner_images/';
            case 5:
                return 'slider_images/';
            case 6: // category_images
                return 'subCategory_images/';
            default:
                break;
    }
}

async function saveImageFolderPath(id) {
    try {
        return './data/' + await getImageFolderName(id);
    } catch (error) {
        
    }
}

async function decodeBase64Image(pictureData) {
    pictureData = Buffer.from(pictureData.buffer, 'base64');
    return pictureData;
}