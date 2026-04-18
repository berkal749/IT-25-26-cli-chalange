import { Router } from "express";

const routerPrayer = Router();

routerPrayer.get("/daily/:name/:country", async (req, res) => {
  try {
    const { name, country } = req.params;
    const { monthly, daily } = req.query;

    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${name}&country=${country}&method=2`,
    );

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

routerPrayer.get("/monthly/:name/:country/:month/:year", async (req, res) => {
  try {
    const { name, country, month, year } = req.params;

    const response = await fetch(
      `https://api.aladhan.com/v1/calendarByCity?city=${name}&country=${country}&method=2&month=${month}&year=${year}`,
    );

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


routerPrayer.get("/:lat/:lng", async (req, res) => {
  const { lat, lng } = req.params;
  const response = await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=2`,
  );
  const data = await response.json();
  console.log(data);

  res.json(data);
});



// current prayer
routerPrayer.get("/current/:name/:country", async (req, res) => {
  try {
    const { name, country } = req.params;
    const response = await fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${name}&country=${country}&method=2`
    );
    const data = await response.json();
    const timings = data.data.timings;

    // get current time
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // convert to minutes

    // convert prayer time "HH:MM" to minutes
    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const prayers = [
      { name: "Fajr",    time: timings.Fajr },
      { name: "Sunrise", time: timings.Sunrise },
      { name: "Dhuhr",   time: timings.Dhuhr },
      { name: "Asr",     time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha",    time: timings.Isha },
    ];

    // find current prayer (last one that already passed)
    let currentPrayer = prayers[0];
    let nextPrayer = prayers[1];

    for (let i = 0; i < prayers.length; i++) {
      if (currentTime >= toMinutes(prayers[i].time)) {
        currentPrayer = prayers[i];
        nextPrayer = prayers[i + 1] || prayers[0]; 
      }
    }

    res.json({
      current: currentPrayer,
      next: nextPrayer,
      allTimings: timings
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

export default routerPrayer;
