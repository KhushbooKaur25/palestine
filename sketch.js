// Global Variables for data (csv file).
let palpeople = []; // Array to store all People objects
let data_count = 0;  // Initializing data_count, how many data lines to read
let people_dist;     // The distance between a people drawing and user's mouse coordinates
// let customFont;

// Different People Images
let kids_img;
let men_img;
let women_img;
let people_designs = [];  // Array to store all people images

function preload() {
  
customFont = loadFont('bloody.ttf');
  
  palpeople_data = loadStrings("People.csv");

  kids_img = loadImage("Kids.png");
  append(people_designs, kids_img);

  men_img = loadImage("Men.png");
  append(people_designs, men_img);

  women_img = loadImage("Women.png");
  append(people_designs, women_img);
  
  backgroundImage = loadImage('gaza.jpg');
   
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('data');
  imageMode(CENTER);
  textFont(customFont);
  // If the file fails to open, then it will print the error and exit.
  if (palpeople_data == null) {
    print("Failed to open palpeople.csv");
    noLoop(); // Stop the draw loop.
  } else {
    // Print out that it was successful and how many lines were loaded.
    print("File successfully loaded:", palpeople_data.length, "lines scanned.");
  }

}

function draw() {
  
image(backgroundImage,width/2,height/2);
  // This draws the stars in the background.
  fill("red");
  textAlign(CENTER);
  textSize(80);
  text("Number of Palestinians killed per day in Gaza so far", width / 2, height / 8);
  
  fill("white");
  textAlign(CENTER);
  textSize(40);
  text("Click for more info", width / 2, height / 2);

  // Here we continuously draw the people on the canvas
  for (let i = 0; i < palpeople.length; i++) {
    palpeople[i].draw();
    people_dist = dist(palpeople[i].x, palpeople[i].y, mouseX, mouseY);

    // If the mouse coordinates hit the people, it will print the data of that date.
    if (people_dist < palpeople[i].people_radius) {
      palpeople[i].displayData();
    }
  }
}

// If the mouse is clicked, it will add a new people image into the people array.
function mouseClicked() {
  append(palpeople, new PalPeople());
}

class PalPeople {
  constructor() {
    this.x;                  // X coordinate for the people                    
    this.y;                  // Y coordinate for the people 
    this.people_radius;      // Radius of the people image
    this.design_num;         // Type of people design from people_designs
    this.data;               // String data of the people
    this.data_split;         // Splits the data into an array of its data

    this.init();
    // this.printData(); // Commented out to avoid excessive printing
  }

  // This function initializes all the variables for each category.
  init() {
    this.design_num = int(random(3));
    this.people_radius = people_designs[this.design_num].width / 10;

    this.x = mouseX;
    this.y = mouseY;

    this.data = palpeople_data[data_count];
    this.data_split = split(this.data, ',');
    if (data_count < palpeople_data.length) {
      data_count++;
    } else {
      print("All people printed!");
    }
  }

  // This function takes a random category people image and draws it at a random (x, y) coordinate on the canvas
  draw() {
    image(people_designs[this.design_num], this.x, this.y, people_designs[this.design_num].width / 5, people_designs[this.design_num].height / 5);
  }

  displayData() {
    fill(128, 128, 128);
    rect(mouseX+125, mouseY-80, 250, 370,110,110,60,60);
    rect(mouseX+100, mouseY+225, 300, 25,5)
    rect(mouseX+80, mouseY+250, 340, 50,5)

    textAlign(LEFT);
    textSize(24);
    fill("black");
    text("Killed on", mouseX + 145, mouseY + 40);
    text("Children", mouseX + 145, mouseY + 90);
    text("Women", mouseX + 145, mouseY + 140);
    text("Men", mouseX + 145, mouseY + 190);

    fill("white");
    textSize(24);
    text(this.data_split[0], mouseX + 250, mouseY + 40);
    text(this.data_split[1], mouseX + 250, mouseY + 90);
    text(this.data_split[2], mouseX + 250, mouseY + 140);
    text(this.data_split[3], mouseX + 250, mouseY + 190);
  }

  // This function is for debugging and code checking to ensure everything runs smoothly.
  printData() {
    print("People Image:", this.design_num);
    print("People Radius:", this.people_radius);
    print("People Data:", this.data);

    if (this.data_split[0] == "") {
      this.data_split[0] = "undefined";
    }

    if (this.data_split[1] == "") {
      this.data_split[1] = "undefined";
    }

    if (this.data_split[2] == "") {
      this.data_split[2] = "undefined";
    }

    if (this.data_split[3] == "") {
      this.data_split[3] = "undefined";
    }

    print("Killed", this.data_split[0]);
    print("Children", this.data_split[1]);
    print("Women", this.data_split[2]);
    print("Men", this.data_split[3]);
  }
}

function windowResized() {
  // Resize the canvas to match the new window size
  resizeCanvas(windowWidth, windowHeight);
}