import express from "express"
const app = express()
import fetch from "node-fetch";
import * as cheerio from 'cheerio';


app.get("/:id", async (req, res) => {
    const queryparams = req.params.id;
    try {
        const response = await fetch(`https://www.imdb.com/title/${queryparams}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const html = await response.text();
        
        // Extract content inside <script type="application/ld+json"> tag using regex
        const regex = /<script type="application\/ld\+json">(.*?)<\/script>/s;
        const match = html.match(regex);
        if (!match) {
            throw new Error('No JSON content found');
        }
        const jsonContent = match[1];
        
        // Parse JSON content
        const jsonData = JSON.parse(jsonContent);

        // Return JSON data
        res.json(jsonData);
    } catch (error) {
        console.error(`Error found: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    }
});




app.listen(4000, () => {
    console.log("Server is running at port 4000")
})