import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';

dotenv.config();

const IMAGEBB_API_KEY = '03531e2339d87c83084afdb852198b31';
const IMAGEBB_API_URL = 'https://api.imgbb.com/1/upload?expiration=600';

export const uploadToImageBB = async (base64Image) => {
    try {
        const formData = new FormData();
        formData.append('key', IMAGEBB_API_KEY);
        formData.append('image', base64Image.split(',')[1]);

        const response = await axios.post(IMAGEBB_API_URL, formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.data.url;
    } catch (error) {
        throw new Error(`Failed to upload image to ImageBB: ${error.message}`);
    }
};

export const uploadMultipleToImageBB = async (files) => {
    try {
        const uploadPromises = files.map(file => uploadToImageBB(file));
        return await Promise.all(uploadPromises);
    } catch (error) {
        throw new Error(`Failed to upload images to ImageBB: ${error.message}`);
    }
};