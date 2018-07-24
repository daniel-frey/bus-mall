'use strict';

var allProducts = [];
var clicksLeft = 26;
var imageOne = document.getElementById('one');
var imageTwo = document.getElementById('two');
var imageThree = document.getElementById('three');
var photoFrame = document.getElementById('photo-frame');
var images = [imageOne, imageTwo, imageThree];
var lastSixPics = [];
var allUsedPics = [];
var productViewTotals = [];
var productClickTotals = [];
var allSelections = [];

function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Product('R2D2 suitcase', 'img/bag.jpg');
new Product('Banana slicer', 'img/banana.jpg');
new Product('iPad toilet paper roll holder', 'img/bathroom.jpg');
new Product('Open-toed rainboots', 'img/boots.jpg');
new Product('All-in-one breakfast happiness', 'img/breakfast.jpg');
new Product('Meatball-flavored bubblegum', 'img/bubblegum.jpg');
new Product('Strange chair', 'img/chair.jpg');
new Product('Cthulhu action figure', 'img/cthulhu.jpg');
new Product('Duck beak for dogs', 'img/dog-duck.jpg');
new Product('Freshly-slayed dragon meat', 'img/dragon.jpg');
new Product('Pen-top utensils', 'img/pen.jpg');
new Product('Sweeper booties for pets', 'img/pet-sweep.jpg');
new Product('Pizza-cutting scissors', 'img/scissors.jpg');
new Product('Shark bite Sleeping Bag', 'img/shark.jpg');
new Product('Baby sweeper onesie', 'img/sweep.png');
new Product('Tauntaun(?) sleeping bag', 'img/tauntaun.jpg');
new Product('Canned unicorn meat', 'img/unicorn.jpg');
new Product('Octopus tentacle thumb drive', 'img/usb.gif');
new Product('Everfull watering can', 'img/water-can.jpg');
new Product('Bad Idea wine glass', 'img/wine-glass.jpg');

function randomProduct() {
  if (clicksLeft === 1) {
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
  clicksLeft--;
}

function countClicksOne() {
  allSelections.push(imageOne.alt);
}

function countClicksTwo() {
  allSelections.push(imageTwo.alt);
}

function countClicksThree() {
  allSelections.push(imageThree.alt);
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
    for (var j = 0; j < allSelections.length; j++) {
      if (allSelections[j] === allProducts[i].name) {
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
imageOne.addEventListener('click', countClicksOne);
imageTwo.addEventListener('click', countClicksTwo);
imageThree.addEventListener('click', countClicksThree);