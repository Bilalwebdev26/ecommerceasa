import { app } from "./app.js"
import dotenv from "dotenv"
import { connectDB } from "./db/database.connection.js"
dotenv.config()

connectDB().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server started on PORT: ${port}`);
    });
}).catch((error) => {
    console.error("Error in connecting to the database", error);
});