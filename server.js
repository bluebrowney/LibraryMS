/*Configure Environment Variables (For Security)*/
require('dotenv').config()

/*Imports*/
const mysql = require('mysql2');
const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const ip = '127.0.0.1'



/*Define Connect through MySQL Server to Database (LibraryMS)*/
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    multipleStatements: true
});

/*Connect to the Database*/
connection.connect();

app.use(express.static(path.join(__dirname, 'public', 'styles')));
app.use(express.static(path.join(__dirname, 'public', 'scripts')));
app.use(express.json());

// SUPPLY INITIAL PAGE
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './login.html'));
});

app.post('/validate', (req, res) => {

    console.log(req.body);

    connection.query(`SELECT Count(member) as Is_Member, Count(librarian) as Is_Librarian, Count(admin) as Is_Admin 
                      FROM role_table
                      WHERE member IN 
                            (SELECT Member_ID 
                             FROM Member
                             WHERE (Email='${req.body.login}' OR Phone_Number='${req.body.login}') AND passwd='${req.body.passwd}');`,
                    (err, results, fields) => {
                        if(err) {
                            console.log(err);
                            return;
                        }
                        
                        console.log(results);

                        if(results[0]['Is_Member'] != 0) {
                            res.redirect(301, '/home');
                        } else {
                            res.send({ error: "incorrect_credentials"});
                        }
                    });
});

//PAGES
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get('/history', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './history.html'));
});

app.get('/productInput', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './productInput.html'));
});

app.get('/RegisterUser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', './RegisterUser.html'));
});

app.post('/api/register', (req, res) => {
    let query = req.body;
    connection.query(`SELECT Count(*)
                      FROM member
                      WHERE email='${query.email}' OR phone_number='${query.phonenumber}'`,
                    (err, results, field) => {
                        if(results[0]['Count(*)'] == 0) {
                            connection.query(`INSERT INTO member (FName, MInit, LName, Email, Phone_Number, passwd)
                                                VALUES ('${query.fname}', '${query.minit}', '${query.lname}', '${query.email}', '${query.phonenumber}', '${query.passwd}');`,
                                                (err, results, field) => {
                                                    if(err) {
                                                        console.log(err);
                                                        res.send({msg: "Failed to register, please try again later.", color: "red"});
                                                    } else {
                                                        res.send({msg: "Register Successful, please go to login page.", color: "green"});
                                                    }
                                                });
                        }
                        else {
                            res.send({msg: "An account with that email or phonenumber already exists", color: "red"})
                        }
                    });
});

app.post('/api/upload_book', (req, res) => {
    let query = req.body;
    let book = query.productType == "book" ? true : false;
    connection.query(`SELECT Count(*)
                      FROM ${query.productType}
                      WHERE ${query.isan ? "ISAN" : "ISBN"}='${book ? query.isan : query.isbn}'`,
                    (err, results, field) => {
                        if(results[0]['Count(*)'] == 0) {
                            connection.query(`INSERT INTO Product (Price, Genre) VALUES ('${query.price}', '${query.genre}');
                                              SET @prev_id = LAST_INSERT_ID();
                                              INSERT INTO  ${query.productType} (Product_ID, ${book ? "ISBN" : "ISAN, Rating"})
                                                VALUES (@prev_id, '${book ? query.isbn : query.isan}' ${book ? "" : ", "} ${book ? "" : query.rating});`,
                                                (err, results, field) => {
                                                    if(err) {
                                                        console.log(err);
                                                        res.send({msg: "Failed to add book, please try again later.", color: "red"});
                                                    } else {
                                                        res.send({msg: "Upload Successful, please go to search page to confirm update.", color: "green"});
                                                    }
                                                });
                        }
                        else {
                            res.send({msg: "That product already exists", color: "red"})
                        }
                    });
});

// SEARCH QUERY
app.get('/api/search', (req, res) => {
    condition = '';
    let cond_start = true;

    //HANDLING GENRE FILTER
    if (req.query.genre != undefined) {
        console.log(req.query.genre);
        if(typeof req.query.genre == 'string') {
            condition += `genre IN ('${req.query.genre}')`
        } else {
            condition += `genre IN ('${req.query.genre[0]}'`
            for(let idx = 1; idx < req.query.genre.length; idx++) {
                condition += `, '${req.query.genre[idx]}'`
            }
            condition += ") "
        }

        cond_start = false;
    }

    /*Checking Search String*/
    if(req.query.search_str != undefined && req.query.search_str.trim() != '') {
        condition += `${cond_start?"":"AND"} (ISAN LIKE '%${req.query.search_str}%' OR 
                           Title LIKE '%${req.query.search_str}%' OR 
                           Studio LIKE '%${req.query.search_str}%' OR 
                           ISBN LIKE '%${req.query.search_str}%' OR
                           Publisher LIKE '%${req.query.search_str}%') `;
        cond_start = false;
    }

    if(req.query.mediaType != undefined) {
        condition += `${cond_start?"":"AND "}${(req.query.mediaType == 'book' ? "ISBN IS NOT NULL " : "" )}`
        condition += `${cond_start?"":"AND "}${(req.query.mediaType == 'movie' ? "ISAN IS NOT NULL " : "" )}`
        cond_start = false;
    }

    /*Construct Query*/
    if(condition!="") {
        condition = "WHERE " + condition + " ";
    }


    if(req.query.searchOption != undefined) {
        condition += `ORDER BY ${req.query.searchOption}`;
    }

    connection.query(`SELECT *
                      FROM search_table
                      ${condition};`, (err, results, fields) => {
                        if(err) {
                            console.log(err);
                        }
                        
                        console.log(results);
                        res.send(results);
                      })
});



app.listen(port, ip, () => {
    console.log(`Server is listening on ${ip} port ${port}`);
});

