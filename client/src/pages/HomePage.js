import React from "react";
const HomePage = () => {
  return (
    <>
      <section className="intro">
        <h1 className="title">
          <span id="name">ENGAGE</span> better, with data.
        </h1>
      </section>
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
  if (num === names.length) {
    num = 0;
  } else {
    // var rand = Math.floor(Math.random() * names.length);
    // document.getElementById("name").innerHTML = names[num];
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
