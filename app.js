var allProducts = [];
var choicesLeft = 26;
var imageLeft = document.getElementById('left');
var imageCenter = document.getElementById('center');
var imageRight = document.getElementById('right');
var photoFrame = document.getElementById('photo-frame');
var images = [imageLeft, imageCenter, imageRight];
var lastSixPics = [];
var allUsedPics = [];
var productViewTotals = [];
var productClickTotals = [];
var allChoices = [];
var displayedImages = [];


function Merchandise(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Merchandise('R2D2 suitcase', 'img/bag.jpg');
new Merchandise('Banana slicer', 'img/banana.jpg');
new Merchandise('iPad toilet paper roll holder', 'img/bathroom.jpg');
new Merchandise('Open-toed rainboots', 'img/boots.jpg');
new Merchandise('Complete breakfast machine', 'img/breakfast.jpg');
new Merchandise('Meatball flavored bubblegum', 'img/bubblegum.jpg');
new Merchandise('Strange chair', 'img/chair.jpg');
new Merchandise('Cthulhu action figure', 'img/cthulhu.jpg');
new Merchandise('Duck beak for dogs', 'img/dog-duck.jpg');
new Merchandise('Freshly-slayed dragon meat', 'img/dragon.jpg');
new Merchandise('Pen-top utensils', 'img/pen.jpg');
new Merchandise('Swiffer booties for pets', 'img/pet-sweep.jpg');
new Merchandise('Pizza-cutting scissors', 'img/scissors.jpg');
new Merchandise('Shark bite Sleeping Bag', 'img/shark.jpg');
new Merchandise('Baby sweeper onesie', 'img/sweep.jpg');
new Merchandise('Tauntaun(?) sleeping bag', 'img/tauntaun.jpg');
new Merchandise('Canned unicorn meat(!)', 'img/unicorn.jpg');
new Merchandise('Octopus tentacle thumb drive', 'img/usb.jpg');
new Merchandise('Everfull watering can', 'img/water-can.jpg');
new Merchandise('Bad idea wine glass', 'img/wine-glass.jpg');

function randomProduct() {
  displayedImages = [];
  if (choicesLeft === 1) {
    photoFrame.removeEventListener('click', randomProduct);
    photoFrame.textContent = '';
    render();
    return;
  }
  for (var i = 0; i < 3; i++) {
    var productIndex = Math.floor(Math.random() * allProducts.length);
    for (var j = 0; j < lastSixPics.length; j++) {
      if (productIndex === lastSixPics[j]) {
        productIndex = Math.floor(Math.random() * allProducts.length);
        j = 0;
      }
    }
    lastSixPics.push(productIndex);
    allUsedPics.push(productIndex);
    images[i].src = allProducts[productIndex].filepath;
    images[i].alt = allProducts[productIndex].name;
    images[i].title = allProducts[productIndex].name;
    displayedImages[i] = allProducts[productIndex];
    allProducts[productIndex].views += 1;
    if (lastSixPics.length === 7) {
      lastSixPics.shift();
    }
  }
  choicesLeft--;
}

function countClicksOne() {
  displayedImages[0].clicks += 1;
  localStorage.setItem('productStorage', JSON.stringify(allProducts));
}

function countClicksTwo() {
  displayedImages[1].clicks += 1;
  localStorage.setItem('productStorage', JSON.stringify(allProducts));
}

function countClicksThree() {
  displayedImages[2].clicks += 1;
  localStorage.setItem('productStorage', JSON.stringify(allProducts));
}

function getRandomColorHex() {
  var hex = "0123456789ABCDEF",
      color = "#";
  for (var i = 1; i <= 6; i++) {
    color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

function render() {
  var titles = [];
  var votes = [];
  for (var a = 0; a < allProducts.length; a++) {
    console.log(allProducts[a].name);
    titles.push(allProducts[a].name);
    votes.push(allProducts[a].clicks);
  }
  var ctx = document.getElementById("myChart").getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: titles,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
          getRandomColorHex(),
        ],
        borderColor: [
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      }
    }
  });
}
if (localStorage.getItem('productStorage', JSON.stringify(allProducts)) === null) {
  randomProduct();
} else {
  var productsRetrieved = localStorage.getItem('productStorage', JSON.stringify(allProducts));
  allProducts = JSON.parse(productsRetrieved);
}
randomProduct();

photoFrame.addEventListener('click', randomProduct);
imageLeft.addEventListener('click', countClicksOne);
imageCenter.addEventListener('click', countClicksTwo);
imageRight.addEventListener('click', countClicksThree);