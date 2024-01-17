import cloudinary from 'cloudinary';

const { CLOUNDINARY_NAME, CLOUNDINARY_API_KEY, CLOUNDINARY_API_SECRET } = process.env;

cloudinary.v2.config({
    cloud_name: CLOUNDINARY_NAME,
    api_key: CLOUNDINARY_API_KEY,
    api_secret: CLOUNDINARY_API_SECRET
});

const uploadFile = (file: string, folder: string): Promise<{ public_id: string, url: string }> => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(file, {
            resource_type: 'auto',
            folder
        }, (error, result: any) => {
            if (error) return reject(error);
            resolve({
                public_id: result.public_id,
                url: result.url
            });
        });
    });
};

const deleteFile = async (file: string): Promise<boolean> => {
    const destroy = await cloudinary.v2.uploader.destroy(file);
    return (destroy?.result === 'ok');
};

export { uploadFile, deleteFile };