const images = ["00.jpg", "01.jpg", "02.jpg", "03.jpg"];

const ranImage = images[Math.floor(Math.random() * images.length)];

const wallpaper = document.querySelector("#wallpaper");

wallpaper.style.backgroundImage = `linear-gradient(
    to top,
    rgba(0 , 0 ,0 , 0.9) 3%,
    transparent,
    transparent,
    transparent,
    transparent
  ),url("/img/${ranImage}")`;

//wallpaper.style.backgroundColor = "rgba(255,255,255)";
