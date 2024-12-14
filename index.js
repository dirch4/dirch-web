import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Konfigurasi aplikasi Firebase
const appSettings = {
    databaseURL: "https://dirch-a33ce-default-rtdb.firebaseio.com/"
};

// Inisialisasi aplikasi Firebase
const app = initializeApp(appSettings);

// Mendapatkan instance database
const database = getDatabase(app);

const blogsListEl = document.getElementById("blogs");

// Data blog untuk ditambahkan
const blogData = {
    author: "Dimas Nurcahya",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    title: "Belajar Visualisasi",
    categories: "Data Science",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae sed incidunt possimus tempore unde. Qui, voluptatum. Recusandae ipsum corporis mollitia provident aliquid officiis veritatis dolore reiciendis vel, ducimus veniam sunt?",
    timestamp: Date.now() // Timestamp saat ini
};

// Tentukan id secara manual
const blogId = "blog_001";

// Referensi ke path dengan id
const blogRef = ref(database, `blogsList/${blogId}`);

// Menyimpan data ke database
set(blogRef, blogData)
    .then(() => {
        console.log(`Blog dengan id '${blogId}' berhasil ditambahkan ke database!`);
    })
    .catch((error) => {
        console.error("Terjadi kesalahan saat menyimpan blog:", error);
    });

// Fungsi untuk memuat data blog dari Firebase
function loadBlogs() {
    const blogsRef = ref(database, "blogsList/");
    onValue(blogsRef, (snapshot) => {
        blogsListEl.innerHTML = "";

        const blogs = snapshot.val();
        if (blogs) {
            Object.keys(blogs).forEach((key) => {
                const blog = blogs[key];

                const date = new Date(blog.timestamp);
                const formattedDate = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });

                const articleHTML = `
                    <article class="flex max-w-xl flex-col items-start justify-between">
                        <div class="flex items-center gap-x-4 text-xs">
                            <time datetime="${date.toISOString()}" class="text-gray-500">${formattedDate}</time>
                            <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">${blog.categories}</a>
                        </div>
                        <div class="group relative">
                            <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                <a href="blog-detail.html?blogId=${key}">
                                    <span class="absolute inset-0"></span>
                                    ${blog.title}
                                </a>
                            </h3>
                            <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">${blog.body}</p>
                        </div>
                        <div class="relative mt-8 flex items-center gap-x-4">
                            <img src="${blog.image}" alt="${blog.author}" class="h-10 w-10 rounded-full bg-gray-50">
                            <div class="text-sm/6">
                                <p class="font-semibold text-gray-900">
                                    <a href="blog-detail.html?blogId=${key}">
                                        <span class="absolute inset-0"></span>
                                        ${blog.author}
                                    </a>
                                </p>
                                <p class="text-gray-600">Contributor</p>
                            </div>
                        </div>
                    </article>
                `;

                blogsListEl.innerHTML += articleHTML;
            });
        } else {
            blogsListEl.innerHTML = `<p class="text-gray-500">Tidak ada blog yang tersedia.</p>`;
        }
    });
}


// Panggil fungsi loadBlogs saat halaman dimuat
loadBlogs();
