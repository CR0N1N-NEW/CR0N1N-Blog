import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTLmK7VSRGSAzonp_C1GYx-FqOY-nbO3A",
  authDomain: "my-blog-cms-a5121.firebaseapp.com",
  projectId: "my-blog-cms-a5121",
  storageBucket: "my-blog-cms-a5121.firebasestorage.app",
  messagingSenderId: "705537874533",
  appId: "1:705537874533:web:ad0125a22999c8aaae848c",
  measurementId: "G-6BJVR4TEYZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const gridWrapper = document.querySelector('.grid-wrapper');


// удаляем только CMS блоги
function clearCMSBlogs(){

  document.querySelectorAll('.blog-element').forEach(el => {

    if(el.id !== "blog-0"){
      el.remove()
    }

  })

}


// рендер
function renderBlogs(blogs){

  blogs.forEach(data => {

    const blogEl = document.createElement('div');
    blogEl.classList.add('blog-element');
    blogEl.id = `blog-${data.index}`;

    let galleryHTML = '';

    if (data.images && Array.isArray(data.images) && data.images.length) {
      galleryHTML = `
      <div class="blog-gallery">
        ${data.images.map(url => `<img src="${url}">`).join('')}
      </div>`;
    }

    blogEl.innerHTML = `
      ${galleryHTML}
      <div class="blog-wrapper">
        <div class="link-wrapper">
          <h3 class="blog-title">${data.title}</h3><svg class="copy-link" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"  ><path d="M318-120q-82 0-140-58t-58-140q0-40 15-76t43-64l134-133 56 56-134 134q-17 17-25.5 38.5T200-318q0 49 34.5 83.5T318-200q23 0 45-8.5t39-25.5l133-134 57 57-134 133q-28 28-64 43t-76 15Zm79-220-57-57 223-223 57 57-223 223Zm251-28-56-57 134-133q17-17 25-38t8-44q0-50-34-85t-84-35q-23 0-44.5 8.5T558-726L425-592l-57-56 134-134q28-28 64-43t76-15q82 0 139.5 58T839-641q0 39-14.5 75T782-502L648-368Z"/></svg>
        </div>
        <p class="blog-info">${data.text}</p>
      </div>
    `;

    gridWrapper.appendChild(blogEl);

  });

}


// загрузка
async function loadBlogs(){

  const cached = localStorage.getItem("blogsCache")

  if(cached){

    const blogs = JSON.parse(cached)

    clearCMSBlogs()
    renderBlogs(blogs)

  }

  const blogsRef = collection(db,"blogs")
  const q = query(blogsRef, orderBy("index"))
  const snapshot = await getDocs(q)

  const blogs = []

  snapshot.forEach(doc => {

    const data = doc.data()

    if(data.index === 0) return

    blogs.push(data)

  })

  clearCMSBlogs()
  renderBlogs(blogs)

  localStorage.setItem("blogsCache", JSON.stringify(blogs))

}

loadBlogs()