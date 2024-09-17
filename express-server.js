import express from "express";
import fs from "fs";
import path from "path";

const server = express();
server.use(express.json());  // To handle JSON requests

//Qn-1
server.post('/', (req, res) => {
    try {
        // Get the current timestamp in ISO format
        const timestamp = new Date().toISOString();

        // Define the directory and file path
        const folderPath = path.join('sample-folder');
        const filePath = path.join(folderPath, `${timestamp}.txt`);

        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        // The content to write in the file
        const fileContent = Date.now().toString();

        // Write the file synchronously
        fs.writeFileSync(filePath, fileContent);

        // Send success response
        res.send({
            message: 'File created successfully',
            filename: `${timestamp}.txt`,
            content: fileContent
        });
    } catch (error) {
        // Handle any errors
        res.status(500).send({
            message: 'Error creating file',
            error: error.message
        });
    }
});


//Qn-2
// API to retrieve all file names from the 'sample-folder' directory
server.get('/', (req, res) => {
    try {
        // Define the directory path
        const folderPath = path.join('sample-folder');

        // Ensure the folder exists
        if (!fs.existsSync(folderPath)) {
            return res.status(404).send({
                message: 'Directory does not exist',
            });
        }

        // Read all file names from the directory
        const fileNames = fs.readdirSync(folderPath);

        // Send response with the list of files
        res.send({
            message: 'Files retrieved successfully',
            files: fileNames
        });
    } catch (error) {
        // Handle any errors
        res.status(500).send({
            message: 'Error retrieving files',
            error: error.message
        });
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
