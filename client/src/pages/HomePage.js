import React from "react";
const HomePage = () => {
  return (
    <>
      <body>
        <section className="intro">
          <h1 className="title">
            <span id="name">ENGAGE</span> better, with data.
          </h1>
        </section>

        <section className="menu">
          <button className="btnHome btn-green">WHAT</button>
          <button className="btnHome btn-yellow">WHO </button>
          <button className="btnHome btn-red">HOW</button>
        </section>
      </body>
    </>
  );
};

var img = new Image();
var div = document.getElementById("foo");

img.onload = function() {
  div.appendChild(img);
};

img.src = "/Users/wp/Engagement/client/media/audience.jpg";

var names = ["TEACH", "PERFORM", "ENTERTAIN", "SELL", "PRESENT"];

let num = 0;
setInterval(function() {
  if (num == names.length) {
    num = 0;
  } else {
    // var rand = Math.floor(Math.random() * names.length);
    console.log(num);
    document.getElementById("name").innerHTML = names[num];
    num++;
  }
}, 2500);

export default HomePage;

{
  /* 
      <a href="#" className="btnHome btn-green">WHAT</a>
      <a href="#" className="btnHome btn-yellow">WHO </a>
      <a href="#" className="btnHome btn-red">HOW</a> */
}
