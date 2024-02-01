import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

const jsonParser = bodyParser.json()

const app = express();
app.use(cors());
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nusantara_resep_makan",
});

app.get("/", (req, res) => {
    res.json("hello");
});

// create middleware to check token when user access resep post, put, delete
const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    const q = "SELECT * FROM users WHERE token = ?";

    db.query(q, [token], (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) return res.send("Token is not valid");
        next();
    });
};

// Create User
app.post("/users", (req, res) => {


    // validate email and password is not same with other user from db and not empty
    const q1 = "SELECT * FROM users WHERE email = ? ";

    const values = {
        email: req.body.email,
    };

    if (req.body.email === "" || req.body.password === "") return res.send("Email or password is empty");

    db.query(q1, [values.email], (err, data1) => {
        res.status(400);
        if (err) return res.send(err);
        if (data1.length > 0) return res.send("Email is already exist");
    });

    const q = "INSERT INTO users SET ?";

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        res.status(200);
        return res.json({
            status: "success",
            message: "User created successfully",
            data
        });
    });
});

// Login user, generate token and save in db table users.token return {email, token}
app.post("/users/login", (req, res) => {
    console.log(req)
    const q = "SELECT * FROM users WHERE email = ? AND password = ?";

    const values = [req.body.email, req.body.password];

    db.query(q, values, (err, data) => {
        if (err) return res.send(err);
        if (data.length === 0) return res.send("Email or password is wrong");

        const token = Math.random().toString(36).slice(2);

        const q2 = "UPDATE users SET token = ? WHERE email = ?";
        db.query(q2, [token, req.body.email], (err2, data2) => {
            if (err2) return res.send(err2);
            return res.json({ email: req.body.email, token });
        });
    });
});

// Get all resep
app.get("/resep", (req, res) => {
    const q = "SELECT * FROM resep";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});


// Create resep with upload image to folder uploads and save image name to db
app.post("/resep", checkToken, (req, res) => {
    const q = "INSERT INTO resep SET ?";

    const values = {
        title: req.body.title,
        description: req.body.description,
    };

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// Get single resep
app.get("/resep/:id", (req, res) => {
    const resepId = req.params.id;
    const q = "SELECT * FROM resep WHERE id = ?";
    db.query(q, [resepId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data[0]);
    });
});

// Update resep with upload image to folder uploads and save image name to db
app.put("/resep/:id", upload.single('image'), (req, res) => {
    const resepId = req.params.id;
    const q = "UPDATE resep SET `title`= ?, `description`= ?, `image`= ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.file.filename,
    ];

    db.query(q, [...values, resepId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// Delete resep
app.delete("/resep/:id", (req, res) => {
    const resepId = req.params.id;
    const q = " DELETE FROM resep WHERE id = ? ";

    db.query(q, [resepId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

// app.post("/books", (req, res) => {
//     const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

//     const values = [
//         req.body.title,
//         req.body.desc,
//         req.body.price,
//         req.body.cover,
//     ];

//     db.query(q, [values], (err, data) => {
//         if (err) return res.send(err);
//         return res.json(data);
//     });
// });

// app.delete("/books/:id", (req, res) => {
//     const bookId = req.params.id;
//     const q = " DELETE FROM books WHERE id = ? ";

//     db.query(q, [bookId], (err, data) => {
//         if (err) return res.send(err);
//         return res.json(data);
//     });
// });

// app.put("/books/:id", (req, res) => {
//     const bookId = req.params.id;
//     const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

//     const values = [
//         req.body.title,
//         req.body.desc,
//         req.body.price,
//         req.body.cover,
//     ];

//     db.query(q, [...values, bookId], (err, data) => {
//         if (err) return res.send(err);
//         return res.json(data);
//     });
// });

app.listen(8800, () => {
    console.log("Connected to backend.");
});