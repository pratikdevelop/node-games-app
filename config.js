const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("node_app.db");
db.serialize(() => {
  db.run(`CREATE TABLE if not exists users (
      user_id  INT NOT NULL, 
      first_name varchar(250) NOT NULL,
      last_name varchar(250) NOT NULL,
      username varchar(250) NOT NULL,
      email varchar(250) NOT NULL,
      password text not null,
      confirm_password text not null,
      created_date datetime,
      PRIMARY KEY(user_id)
      )`);

  db.run(`CREATE TABLE if not exists games( 
        game_id   INT AUTO_INCREMENT,
        game_name  VARCHAR(100) NOT NULL, 
        game_image VARCHAR(50) NULL, 
        url VARCHAR(50) NULL, 
        created_date datetime,
        PRIMARY KEY(game_id)
    )`);

  /* const games = [
    {
      name: "Planet destroy",
      image: "images/planet_destroy.jpg",
      url: "planet_destroy",
      created_date: new Date(),
    },
    {
      name: "Ninja game",
      image: "images/menja.jpg",
      url: "min_game",
      created_date: new Date(),
    },
    {
      name: "Snake game",
      image: "images/snake_game.jpg",
      url: "snake_game",
      created_date: new Date(),
    },
    {
      name: "Typing master",
      image: "images/typing.jpg",
      url: "typing_master",
      created_date: new Date(),
    },
    {
      name: "Photo editing",
      image: "images/photo_editing.jpg",
      url: "photo_editing",
      created_date: new Date(),
    },
    {
      name: "Memory game",
      image: "images/memory.jpg",
      url: "memory",
      created_date: new Date(),
    },
    {
      name: "Color blast",
      image: "images/color_blast.jpg",
      url: "color_blast",
      created_date: new Date(),
    },
    {
      name: "Tic Tac Toe",
      image: "images/tic.jpg",
      url: "tic-tac_toe",
      created_date: new Date(),
    },
    {
      name: "Word scramble ",
      image: "images/word_scramble.jpg",
      url: "word_scramble",
      created_date: new Date(),
    },
    {
      name: "Drawing ",
      image: "images/drawing.jpg",
      url: "drawing",
      created_date: new Date(),
    },
    {
      name: "Word Guessing ",
      image: "images/guess_word.jpg",
      url: "drawing",  
      created_date: new Date(),
    },
  ];


 games.forEach((game, index)=>{
   db.run("INSERT INTO games (game_id, game_name , game_image, url, created_date) VALUES (?,?,?,?,?)",
   [index+1,game['name'], game['image'], game['url'], new Date()], (err)=>{
      if (err) {
        console.error('err',err);
      }    
   })

 }) */
});



module.exports = db;
