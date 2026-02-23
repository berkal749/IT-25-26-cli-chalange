const express = require('express');
const router = express.Router(); 

// i had to vibe code to relaize the idea , i had a problem with onpen wther api sense it only tkaes cornadntes as input , and the user in the frontend will give only the name of the city
// soo i  had to use some ayayaya to get this working 

// {
//   "city": "Algiers"   example
// }




// MAJOR UPADTE: i used first gemine api and ope whthter to access it (explain in the last comment u think) now i discoverd that
// google api can do the same thing as open weather api and it can give us the weather of any city without the need to get the coordinates first


// deprecated code :
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyCB6CtIcY0rVaPz08Q2N7FqLPHLuEOFk3c");
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



// async function getCoordinates(cityName) {
//     const prompt = `Return the latitude and longitude of ${cityName} as a JSON object with the keys "lat" and "lon". Only return the JSON, nothing else.`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

    
//     const cleanJson = text.replace(/```json|```/g, "").trim();
//     return JSON.parse(cleanJson);
// }

// i used now a lirvarry calles fused api to deal with typose soo i can send the names directly to the googel api


router.post('/weather', async (req, res) => {
    
    const cityName = req.body.city; 

    if (!cityName) {
        return res.status(400).json({ error: "Please provide a city in the request body" });
    }
    
    try {
        // const apiKey = "a95a95f4e85ca9d612b04f8dbd33c7af"; 
        
       
      //  const { lat, lon } = await getCoordinates(cityName);
  
      
        const weatherUrl;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        

    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Failed to coordinate or fetch weather." });
    }
}); 
module.exports = router;