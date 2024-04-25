const { getImageFolderName, saveImageAndGetURL } = require("../utils/imageHandeling");

module.exports = utils = {
    tokenGenerator: async (length) => {
        if (typeof length == "undefined")
            length = 32;
        var token = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < length; i++)
            token += possible.charAt(Math.floor(Math.random() * possible.length));
        return token;
    },
    handleImage: async (id, files, type) => {
        try {
            if (files.length === 1) return await handleImage(id, files[0], type)
            else {
                // console.log('files>>>>',await handleImages(id, files, type))
                return await handleImages(id, files, type)
            }
        } catch (error) {
            console.log(error)
        }
    }
};

const handleImage = async (id, file, type) => {
    try {
        let imageName = id + await utils.tokenGenerator(4) + '.jpg'
        let url = await getImageFolderName(type)
        let imageUrl = await saveImageAndGetURL(file, imageName, type)
        return url + imageName
    } catch (error) {
        console.log(error)
    }
}

const handleImages = async (id, files, type) => {
    try {
        const data = [];
        for (const file of files) {
            const imageName = id + await utils.tokenGenerator(4) + '.jpg';
            const url = await getImageFolderName(type);
            const imageUrl = await saveImageAndGetURL(file, imageName, type);
            data.push(url + imageName);
        }
        console.log('data>>>', data);
        return data;
    } catch (error) {
        console.log(error)
    }
}
