const bookMarkContainer = document.querySelector("#bookMarkContainer");
const bookMarkList = document.querySelector("#bookMarkList");
const addBookMarkContainer = document.querySelector("#add-bookmark-container");
const addBookmarkForm = document.querySelector("#add-bookmark-form");
const saveBtn = document.querySelector("#add-bookmark-save");
const inputs = addBookmarkForm.querySelectorAll("input");

const BOOK_MARK_KEY = "bookmark";
let bookmarks = [];
/* bookmark 를 추가하는 폼을 닫는버튼입니다. */
const formCloseBtn = inputs[0];
/* url 과 title 를 입력받는 input = text 입니다. */
const titleInput = inputs[1];
const urlInput = inputs[2];
/* bookmark 를 추가하는것을 취소하는 버튼입니다. */
const cancelBtn = inputs[3];

const bookmarkAddBtn = () => {
  const li = document.createElement("li");
  const input = document.createElement("input");
  li.id = "addList";
  input.type = "button";
  input.classList.add("borderBox");
  input.addEventListener("click", showTodoAddBox);
  input.style.transition = "all 0.2s ease-in-out";
  li.appendChild(input);
  bookMarkList.appendChild(li);
};

const showTodoAddBox = (event) => {
  event.target.parentElement.remove();
  /* class name => js/global.js*/
  addBookMarkContainer.classList.remove(HIDDEN_CLASS_NAME);
  bookMarkList.classList.add("focus-border");
};

const hideTodoAddBox = () => {
  bookmarkAddBtn();
  titleInput.value = "";
  urlInput.value = "";
  /* class name => js/global.js*/
  addBookMarkContainer.classList.add(HIDDEN_CLASS_NAME);
  bookMarkList.classList.remove("focus-border");
};

/* http://youtube.com/search => http://youtube.com/favicon.ico */
const getDomainFavIcon = (url) => {
  const cutUrl = url.split("/");
  return `${cutUrl[0]}//${cutUrl[2]}/favicon.ico`;
};

const bookMarkHandler = (event) => {
  event.preventDefault();
  let title = titleInput.value;
  const url = urlInput.value;
  if (!url) return;
  if (!title) title = url;

  const httpCheck = url.split("://");
  if (httpCheck[0] === "http" || httpCheck[0] === "https") {
    submitBookMark(title, url);
  } else if (httpCheck[0].split(".")[1] !== undefined) {
    /* title 부분 없어도 알아서 받아오게.. */
    submitBookMark(title, `http://${url}`);
  } else {
    return;
  }
};

const submitBookMark = (title, url) => {
  const bookMarkObj = {
    id: Date.now(),
    title,
    url,
  };
  paintBookMark(bookMarkObj);
  bookmarks.push(bookMarkObj);
  hideTodoAddBox();
  saveBookMark();
};

const saveBookMark = () => {
  localStorage.setItem(BOOK_MARK_KEY, JSON.stringify(bookmarks));
};
const loadBookMark = () => {
  const savedBookMarks = localStorage.getItem(BOOK_MARK_KEY);
  if (!savedBookMarks) {
    return;
  }
  const parsedBookMarks = JSON.parse(savedBookMarks);
  bookmarks = parsedBookMarks;
  bookmarks.forEach(paintBookMark);
};
const deleteBookMark = (event) => {
  const li = event.target.parentElement;
  bookmarks = bookmarks.filter((bookmark) => bookmark.id !== Number(li.id));
  saveBookMark();
  li.remove();
};

const paintBookMark = (newBookMark) => {
  const { id, title, url } = newBookMark;
  const li = document.createElement("li");
  const a = document.createElement("a");
  const span = document.createElement("span");
  const icon = document.createElement("img");
  const button = document.createElement("button");
  icon.classList.add("fav-icon");
  a.href = url;
  a.rel = "noreferrer noopener";
  icon.draggable = "false";
  li.id = id;
  /* icon image 를 받아옵니다. */
  const iconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;
  /* favicon.ico 방식으로 못받아오는 이미지가 xbox 가되버려서 처리합니다. */
  icon.onerror = () => (icon.src = "img/errorIcon.png");
  icon.src = iconUrl;
  icon.classList.add("borderBox");
  span.innerText = title.length >= 8 ? `${title.substring(0, 8)} ..` : title;
  button.innerText = "x";
  button.classList.add(HIDDEN_CLASS_NAME);
  button.addEventListener("click", deleteBookMark);
  a.appendChild(icon);
  a.appendChild(span);
  li.appendChild(a);
  li.appendChild(button);
  li.addEventListener("mouseenter", bookMarkMouseEnter);
  li.addEventListener("mouseleave", bookMarkMouseLeave);
  bookMarkList.appendChild(li);
  setTimeout(() => {
    icon.src = icon.naturalWidth <= 16 ? getDomainFavIcon(url) : iconUrl;
  }, 500);
  /* api 에서 없는 favicon 이있어서.. favicon.ico 주소로 받아옵니다. */
};

const bookMarkMouseEnter = (event) => {
  const image = event.target.querySelector("img");
  event.target.querySelector("button").classList.remove(HIDDEN_CLASS_NAME);
  image.style.boxShadow = "0 0 20px 5px rgba(0,0,0,0.5)";
  image.style.backgroundColor = "#f6f9fa";
  image.style.transition = "all 0.2s ease-in-out";

  formCloseBtn.classList.remove(HIDDEN_CLASS_NAME);
};

const bookMarkMouseLeave = (event) => {
  const image = event.target.querySelector("img");
  event.target.querySelector("button").classList.add(HIDDEN_CLASS_NAME);
  image.style.boxShadow = null;
  image.style.backgroundColor = "#353b48";
};

formCloseBtn.addEventListener("click", hideTodoAddBox);
cancelBtn.addEventListener("click", hideTodoAddBox);
addBookmarkForm.addEventListener("submit", bookMarkHandler);

loadBookMark();
bookmarkAddBtn();
