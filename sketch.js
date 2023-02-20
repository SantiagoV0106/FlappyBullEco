const anchoescenario = 1280
const largoescenario = 720
let canvas
let toro
let limite
let tubos = []
let vellimite = 5
let gravedad = false
let fps = 0

function setup() {
  canvas = createCanvas(anchoescenario, largoescenario);
  windowResized()
  toro = new Toro();
  limite = new Limite()
  tubos.push(new Tubo)
}

function draw() {
  background(220);
  toro.pintar()
  limite.pintar()
  for (const tubo of tubos) {
    tubo.pintar()
  }

  if (fps * vellimite % 400 == 0) {
    tubos.push(new Tubo)
  }

  if (gravedad) {
    fps ++
  }
}

function windowResized(){
  if (windowWidth < anchoescenario) {
    canvas.style('transform', `scale(${windowWidth / width})`)
  }
}
function keyPressed() {
  click()
}

function mousePressed() {
  click()
}


function click(){
  if (gravedad) {
    toro.gravedadtoro.set(createVector(0,-5))
  } else {
    toro.resetVariable()
    gravedad = true
    fps = 0
    tubos = []
  }
}

function perder() {
  gravedad = false
}

function Toro() {
    this. radio = 60
    this.resetVariable = function() {
      this.vector = createVector(width / 2, height / 2)
      this.gravedadtoro = createVector(0,0)
    }
  this.resetVariable()
  this.pintar = function(){
    fill ('red')
    circle(this.vector.x, this.vector.y, this.radio)
    if (gravedad) {
      this.gravedadtoro.add(createVector(0,0.2))
      this.vector.add(this.gravedadtoro)      
    }
    if (this.hit().collideRect(limite.hit())) {
      perder()
    }
    for (const tubo of tubos) {
      let hittubos = tubo.hit()
      for (const hit of hittubos) {
        
        if (this.hit().collideRect(hit)) {
          perder()
        }
      }
    }
  }
  this.hit = function(){
    return new Circle(this.vector.x,this.vector.y,this.radio)
  }
}

function Limite() {
  this.width = anchoescenario
  this.height = 30
  this.x = 0
  this.y = largoescenario - this.height
  this.pintar = function(){
    fill('black')
    rect(this.x,this.y,this.width,this.height)
  }
  this.hit = function(){
    return new Rectangle(this.x, this.y, this.width, this.height)
  }
}

function Tubo() {
  const division = 170
  let randomheight = 300 * Math.random() - 200
  this.width = 100
  this.height = 550
  this.x = width
  this.y = (height / 2) + randomheight
  this.y2 = this.y - this.height - division
  this.pintar = function(){
    fill('orange')
    rect(this.x, this.y, this.width, this.height)
    rect(this.x, this.y2, this.width, this.height)
    if (gravedad) {
      this.x -= vellimite
    }
  }
  this.hit = function(){
    return [
      new Rectangle(this.x, this.y, this.width, this.height),
      new Rectangle(this.x, this.y2, this.width, this.height),
      
    ]
  }
}


