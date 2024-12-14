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
    image: "https://plus.unsplash.com/premium_photo-1661907962224-a2c6087016cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mengenal IEEE: Organisasi Teknis Terbesar di Dunia",
    references: ["IEEE - The world’s largest technical professional organization","https://www.ieee.org/"],
    categories: "Quality Assurance",
    body: [
        "IEEE (Institute of Electrical and Electronics Engineers) adalah organisasi profesional teknis terbesar di dunia yang berdedikasi untuk memajukan teknologi demi kesejahteraan manusia. Didirikan pada tahun 1963 melalui penggabungan dari dua organisasi sebelumnya, American Institute of Electrical Engineers (AIEE) dan Institute of Radio Engineers (IRE), IEEE memiliki tujuan utama untuk mendukung penelitian, pengembangan, dan penerapan teknologi yang bermanfaat bagi masyarakat.",
        "Dengan lebih dari 1.300.000 anggota di seluruh dunia, IEEE menyediakan berbagai layanan, termasuk publikasi, konferensi, standar teknologi, dan kegiatan profesional serta pendidikan. IEEE dikenal dengan publikasi-publikasinya yang sangat dihormati, seperti jurnal-jurnal ilmiah dan buletin. Salah satu publikasi terkenalnya adalah IEEE Spectrum, yang memberikan informasi terbaru tentang perkembangan teknologi, teknik, dan ilmu pengetahuan. IEEE juga mengadakan lebih dari 2.000 acara tahunan di seluruh dunia, termasuk konferensi, seminar, dan workshop yang mencakup berbagai bidang keahlian teknis.",
        "Selain itu, IEEE berperan penting dalam pengembangan standar teknologi yang memastikan interoperabilitas dan keamanan dalam berbagai industri. Standar-standar ini mencakup berbagai aspek dari teknologi listrik dan elektronik, termasuk komunikasi, energi, dan otomatisasi. Dengan menyediakan panduan teknis yang diakui secara luas, IEEE membantu memastikan bahwa produk dan sistem dari berbagai produsen dapat bekerja bersama dengan lancar.",
        "IEEE juga menawarkan berbagai program pengembangan profesional dan pendidikan untuk anggotanya. Program-program ini bertujuan untuk meningkatkan keterampilan manajerial dan teknis anggota, serta memperluas jaringan profesional mereka. Organisasi ini juga berkomitmen untuk memperluas diversitas, kesetaraan, dan inklusi dalam kegiatan-kegiatan teknis dan profesionalnya, bekerja sama dengan berbagai kelompok untuk mempromosikan kesetaraan gender dan ras di bidang teknik."
    ],
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
                        <img src="${blog.image}" alt="${blog.author}" class="mt-3 h-100 w-180 rounded bg-gray-50">
                        <div class="group relative">
                            <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                <a href="blog-detail.html?blogId=${key}">
                                    <span class="absolute inset-0"></span>
                                    ${blog.title}
                                </a>
                            </h3>
                            <p class="mt-5 line-clamp-2 text-sm/6 text-gray-600">${blog.body}</p>
                        </div>
                        <div class="relative mt-8 flex items-center gap-x-4">
                            
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
