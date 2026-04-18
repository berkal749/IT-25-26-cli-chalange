import express from 'express'
import routerPrayer from './routes/routes.js'

const app = express();

const PORT = 3000 ;

app.use(express.json());
app.use('/test',routerPrayer)



app.get("/", async (req, res) => {  // ✅ req first, res second
  try {
    console.log("djdj")
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT , ()=>{
    console.log("heyyy");
})