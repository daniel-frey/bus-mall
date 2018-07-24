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
    if (lastSixPics.length === 7) {
      lastSixPics.shift();
    }
  }
  choicesLeft--;
}

function countClicksOne() {
  allChoices.push(imageLeft.alt);
}

function countClicksTwo() {
  allChoices.push(imageCenter.alt);
}

function countClicksThree() {
  allChoices.push(imageRight.alt);
}

function countViews() {
  for (var i = 0; i < allProducts.length; i++) {
    var viewTotal = 0;
    for (var j = 0; j < allUsedPics.length; j++) {
      if (i === allUsedPics[j]) {
        viewTotal++;
      }
    }
    productViewTotals.push(viewTotal);
  }
}

function countClicks() {
  for (var i = 0; i < allProducts.length; i++) {
    var clickTotal = 0;
    for (var j = 0; j < allChoices.length; j++) {
      if (allChoices[j] === allProducts[i].name) {
        clickTotal++;
      }
    }
    productClickTotals.push(clickTotal);
  }
}

function render() {
  countViews();
  countClicks();
  var h2El = document.getElementById('votes');
  h2El.textContent = 'Final Vote Count is: ';
  var listEl = document.getElementById('list');
  for (var i = 0; i < allProducts.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = productClickTotals[i] + ' vote(s) for the ' + allProducts[i].name;
    listEl.appendChild(liEl);
  }
}
randomProduct();

photoFrame.addEventListener('click', randomProduct);
imageLeft.addEventListener('click', countClicksOne);
imageCenter.addEventListener('click', countClicksTwo);
imageRight.addEventListener('click', countClicksThree);