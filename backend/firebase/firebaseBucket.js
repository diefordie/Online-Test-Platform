import { bucket } from './firebaseAdmin.js';
import path from 'path';
import fs from 'fs';

// Fungsi untuk mengunggah file ke Firebase Storage
export const uploadFileToStorage = async (localFilePath, destination) => {
    try {
        // Upload file dari local path ke Firebase Storage
        await bucket.upload(localFilePath, {
            destination, // Path di dalam bucket
            public: true, // Jadikan file public
            metadata: {
                contentType: 'image/jpeg', // Sesuaikan dengan tipe file
            },
        });

        console.log(`File uploaded to ${destination}`);
        return `https://storage.googleapis.com/${bucket.name}/${destination}`;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
};
