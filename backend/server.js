import express from "express";
import helmet from "helmet"; // to call helmet middleware
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js"; // always add .js at the end, its good practice and also ure in type:module
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot Access Denied" });
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
      return;
    }

    // check for spoofed bots, spoofed means when a bot tries to act not like a bot
    if(decision.results.some((result)=>result.reason.isBot()&&result.reason.isSpoofed())){
      res.status(403).json({ error: "Spoofed Bot Detected" });
      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet Error: ", error);
    next(error);
  }
});

app.use("/api/products", productRoutes); // the /api/products is the initial endpoint, and the rest should be ddefined under productRoutes

async function initDB() {
  try {
    await sql`
            CREATE TABLE IF NOT EXISTS products (
             id SERIAL PRIMARY KEY,
             name VARCHAR(255) NOT NULL,
             image VARCHAR(255) NOT NULL,
             price DECIMAL(10, 2) NOT NULL, 
             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `; // means price can have decimal number upto 10 digits with 2 precision

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error in initDB: ", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT);
  });
});
