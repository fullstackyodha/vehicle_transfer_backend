import multer from 'multer';
import fs from 'fs';

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Default folder
        let folderName = 'uploads/';

        switch (file.fieldname) {
            case 'profilePhoto':
                folderName = 'uploads/profilePhotos';
                break;
            case 'pucCertificate':
                folderName = 'uploads/pucCertificates';
                break;
            case 'insuranceCertificate':
                folderName = 'uploads/insuranceCertificates';
                break;
        }

        // Creates the folder is it doesn exisits
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName, { recursive: true });
        }

        cb(null, folderName);
    },
    filename: function (req, file, cb) {
        // Name of the file on the uploader's computer.
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});