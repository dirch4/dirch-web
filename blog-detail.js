import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Konfigurasi Firebase
const appSettings = {
    databaseURL: "https://dirch-a33ce-default-rtdb.firebaseio.com/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);

// Ambil blogId dari URL
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogId");

const blogDetailEl = document.getElementById("blog-detail");

// Fungsi untuk mengambil dan menampilkan detail blog
function loadBlogDetail() {
    if (!blogId) {
        blogDetailEl.innerHTML = `<p class="text-red-500">Blog tidak ditemukan!</p>`;
        return;
    }

    const blogRef = ref(database, `blogsList/${blogId}`);
    get(blogRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const blog = snapshot.val();

                const date = new Date(blog.timestamp);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                
                const detailHTML = `
                    <article class="max-w-4xl mx-auto">
                        <h1 class="text-3xl font-bold text-gray-900">${blog.title}</h1>
                        <p class="mt-2 text-sm text-gray-500">Published on ${formattedDate} by ${blog.author}</p>
                        <div class="mt-6">
                            <img src="${blog.image}" alt="${blog.title}" class="w-full h-auto rounded-lg">
                        </div>
                        <p class="mt-6 text-lg text-justify text-gray-700">
                            <strong>${Array.isArray(blog.body) ? blog.body[0] : blog.body}</strong>
                        </p>
                        
                        <p class="mt-4 text-md text-justify text-gray-700">
                            ${Array.isArray(blog.body) ? blog.body[1] : ""}
                        </p>
                        
                        <p class="mt-4 text-lg text-justify text-gray-700">
                            <strong>${Array.isArray(blog.body) ? blog.body[2] : ""}</strong>
                        </p>
                        
                        <p class="mt-4 text-md text-justify text-gray-700">
                            ${Array.isArray(blog.body) ? blog.body[3] : ""}
                        </p>
                        
                        <p class="mt-4 text-lg text-justify text-gray-700">
                            <strong>${Array.isArray(blog.body) ? blog.body[4] : ""}</strong>
                        </p>
                        
                        <p class="mt-4 text-md text-justify text-gray-700">
                            ${Array.isArray(blog.body) ? blog.body[5] : ""}
                        </p>
                        
                        <p class="mt-4 text-lg text-justify text-gray-700">
                            <strong>${Array.isArray(blog.body) ? blog.body[6] : ""}</strong>
                        </p>
                        <p class="mt-4 text-md text-justify text-gray-700">
                            ${Array.isArray(blog.body) ? blog.body[7] : ""}
                        </p>
                        <p class="mt-4 text-lg text-justify text-gray-700">
                            <strong>${Array.isArray(blog.body) ? blog.body[8] : ""}</strong>
                        </p>
                        <p class="mt-4 text-md text-justify text-gray-700">
                            ${Array.isArray(blog.body) ? blog.body[9] : ""}
                        </p>
                        <p class="mt-4 text-lg text-justify text-gray-700">
                            <strong>${Array.isArray(blog.body) ? blog.body[10] : ""}</strong>
                        </p>
                        <p class="mt-4 text-md text-justify text-gray-700">
                            ${Array.isArray(blog.body) ? blog.body[11] : ""}
                        </p>
                        <div class="mt-4 text-sm text-gray-600">Reference: <a class="hover:underline" target="_blank" href="${Array.isArray(blog.references) ? blog.references[1] : blog.references}">${Array.isArray(blog.references) ? blog.references[0] : blog.references}</a></div>
                        <div class="mt-4 text-sm text-gray-600">Category: ${blog.categories}</div>
                    </article>
                `;

                blogDetailEl.innerHTML = detailHTML;
            } else {
                blogDetailEl.innerHTML = `<p class="text-red-500">Blog tidak ditemukan!</p>`;
            }
        })
        .catch((error) => {
            console.error("Error fetching blog:", error);
            blogDetailEl.innerHTML = `<p class="text-red-500">Terjadi kesalahan saat mengambil data.</p>`;
        });
}

// Panggil fungsi untuk memuat detail blog
loadBlogDetail();
