function Char(c) {
  const zeroPad = (num, places) => String(num).padStart(places, '0');

  let char = c.toString(16);

  return Didact.createElement(
    'div', 
    {
      className: "ch ch-" + zeroPad(char, 2)
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

const frameSpeed = 100;
var scrn = [];
var c = 0;
//  0 => inverted @
//  1 => inverted A
// 26 => inverted Z
// 32 => inverted space
// 40 => inverted (
// 41 => inverted )
// 43 => inverted +
// 44 => inverted ,
// 46 => inverted .
// 48 => inverted 0
// 57 => inverted 9
// 96 => space
// 128 => @
// 129 => a
// 154 => z
// 159 => _
// 160 => space
// 171 => +
// 172 => ,
// 173 => -
// 174 => .
// 175 => /
// 176 => 0
// 185 => 9
// 186 => :
// 187 => ;
// 188 => <
// 189 => =
// 190 => >
// 191 => ?

let time = 0;

const drawFrame = (t) => {

  scrn  = [];

  const crossPattern = (i,j) => {
    const p = [
      "0010111010",
      "0111010001",
      "1010001011",
      "0001011101",
      "1011101000",
      "1101000101",
      "1000101110",
      "0101110100",
      "1110100010",
      "0100010111",
    ]
    const r = i % 10;
    const c = j % 10;
    const v = p[r].slice(c,c+1);
    return v == '0' ? 0 : 1;
  }

  const barPattern = (i,j) => {
    const b = j + 4 & 8; // vertical bar
    //const b = (i + j) & 8; // diagonal bar
    //const b = (i ^ j) & 16; // checkerboard
    return b > 0 ? 1 : 0;
  }

  const pattern = (i,j) => {
    // checkerboard pattern
    c = ( ((i + Math.floor(1 * t)) ^ j ) & 8 ) > 0 ? 160 : 128;

    //fg = crossPattern(i,j+Math.floor(t*1)) // cross pattern
    fg = barPattern(i,j+Math.floor(2*t)) // bar or checkerboard
    if (fg) {
      if (c == 128) { c =  0; }
      if (c == 160) { c = 32; }
    }

    return c;
  }


  for(var i = 0; i < 24; i++) {
    row = []
    for(var j = 0; j < 40; j++) {
      row.push(pattern(i,j));
    }
    scrn.push(row);
  }
}

drawFrame(0);
var screen = Didact.createElement(
  Screen,
  {
    scrn: scrn
  }
)

const container = document.getElementById("app")
Didact.render(screen, container)

if (frameSpeed) {
  setInterval(() => {
    time++;
    drawFrame(time);
    screen = Didact.createElement(
      Screen,
      {
        scrn: scrn
      }
    )

    Didact.render(screen, container)
  }, frameSpeed);
}
