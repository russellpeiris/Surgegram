//IMPORTS
import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import {register} from './controllers/auth.js';
import {createPost} from './controllers/post.js';
import authRoutes from './routes/auth-routes.js';
import userRoutes from './routes/users-routes.js';
import postRoutes from './routes/post-routes.js';
import { verifyToken } from "./middleware/auth.js";
import User from './models/User.js';
import Post from './models/Post.js';
import {users, posts} from './data/index.js';

//Supress warning
mongoose.set('strictQuery', true);

//CONFIG & MIDDLEWARE
const __filename = fileURLToPath(import.meta.url); //to grab the file URL
const __dirname = path.dirname(__filename);

dotenv.config(); 
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "32mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "32mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); //store images locally


//STORAGE TO SAVE UPLOADED IMAGES
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage});

//ROUTES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts",verifyToken,  upload.single("picture"), createPost);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);

//MONGODB
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server running on PORT ${PORT}`));

    //inserting dummy data only once
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((err)=> console.log(err));
