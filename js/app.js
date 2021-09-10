function Char(char) {
  return Didact.createElement(
    'div', 
    {
      className: "ch ch-" + char
    }
  )
}

function Row(row) {
  var children = row.map( c => Char(c));

  return Didact.createElement(
    'div',
    {
      className: "row"
    }, ...children
  );
}

function Screen(props) {
  var rows = props.scrn.map(
    r => Row(r)
  );

  return Didact.createElement(
    'div',
    {
      className: "screen"
    }, ...rows
  );
}

const frameSpeed = 10000;
var scrn = [];
var chars = ['00', '01', '02', '03', '04'];
for(var i = 0; i < 24; i++) {
  row = []
  for(var j = 0; j < 40; j++) {
    row.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  scrn.push(row);
}

var screen = Didact.createElement(
  Screen,
  {
    scrn: scrn
  }
)

const container = document.getElementById("app")
Didact.render(screen, container)

/*
setInterval(() => {
  var i1 = Math.floor(Math.random() * 24);
  var j1 = Math.floor(Math.random() * 40);
  var i2 = Math.floor(Math.random() * 24);
  var j2 = Math.floor(Math.random() * 40);

  var t = scrn[i1][j1];
  scrn[i1][j1] = scrn[i2][j2];
  scrn[i2][j1] = t;
  Didact.render(screen, container)
}, frameSpeed);
*/
