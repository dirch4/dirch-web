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
        "Sejarah dan Latar Belakang",
        "IEEE (Institute of Electrical and Electronics Engineers) adalah organisasi profesional teknis terbesar di dunia yang didedikasikan untuk memajukan teknologi demi kesejahteraan umat manusia. Organisasi ini didirikan pada tahun 1963 melalui penggabungan dua organisasi pendahulu, yaitu American Institute of Electrical Engineers (AIEE) yang didirikan pada tahun 1884 dan berfokus pada pengembangan teknologi listrik dan tenaga, serta Institute of Radio Engineers (IRE) yang didirikan pada tahun 1912 dan memusatkan perhatian pada teknologi komunikasi dan radio. Penggabungan ini mencerminkan evolusi teknologi dari sistem listrik menuju era elektronik dan komunikasi yang lebih kompleks. Hingga kini, IEEE terus berkomitmen untuk mendukung penelitian, pengembangan, dan penerapan teknologi yang memberikan dampak positif bagi masyarakat global.",
        "Keanggotaan dan Jangkauan Global",
        "IEEE memiliki lebih dari 1.300.000 anggota yang tersebar di lebih dari 160 negara. Keanggotaan ini mencakup para profesional, akademisi, peneliti, dan mahasiswa dalam bidang teknik, ilmu komputer, serta teknologi terkait. Manfaat yang diperoleh anggota meliputi akses ke berbagai jurnal, konferensi, dan makalah teknis, peluang untuk membangun jaringan profesional melalui forum diskusi, seminar, dan kelompok kerja, serta program sertifikasi untuk meningkatkan kompetensi teknis. Dengan kehadirannya di seluruh dunia, IEEE menjadi wadah penting bagi komunitas teknis untuk berkolaborasi dan berbagi pengetahuan.",
        "Publikasi dan Konferensi",
        "IEEE dikenal sebagai penerbit terkemuka untuk publikasi ilmiah dan teknis. Organisasi ini menyediakan lebih dari 200 jurnal yang membahas berbagai topik, mulai dari kecerdasan buatan hingga energi terbarukan. Salah satu publikasi terkenalnya adalah IEEE Spectrum, sebuah buletin yang memberikan wawasan terbaru tentang teknologi, sains, dan teknik. Selain itu, IEEE Xplore, platform digital organisasi ini, menawarkan akses ke jutaan artikel ilmiah. Setiap tahun, IEEE juga menyelenggarakan lebih dari 2.000 acara global, termasuk konferensi internasional, workshop, dan seminar yang membahas tantangan teknis terbaru dan solusi inovatif.",
        "Standar Teknologi",
        "Salah satu peran penting IEEE adalah pengembangan standar teknologi yang memastikan interoperabilitas, keamanan, dan efisiensi dalam berbagai industri. Standar-standar ini mencakup berbagai bidang seperti komunikasi, energi, dan otomatisasi. Contoh terkenal termasuk IEEE 802.11 untuk komunikasi nirkabel (Wi-Fi), IEEE 2030 untuk pengembangan Smart Grid, dan IEEE 11073 untuk perangkat kesehatan elektronik. Standar ini membantu memastikan bahwa produk dan sistem dari berbagai produsen dapat bekerja sama dengan lancar, sehingga meningkatkan kepercayaan dan efisiensi dalam industri.",
        "Program Pengembangan Profesional",
        "IEEE menawarkan berbagai program untuk mendukung pengembangan karier anggotanya, termasuk pelatihan teknis melalui webinar, kursus daring, dan sertifikasi di bidang teknologi terkini. Selain itu, workshop dan program pengembangan kepemimpinan dirancang untuk meningkatkan keterampilan manajerial. Bagi mahasiswa, IEEE menyediakan program mentorship dan beasiswa untuk mendukung generasi muda. Organisasi ini juga berkomitmen untuk mempromosikan diversitas, kesetaraan, dan inklusi melalui inisiatif seperti peningkatan kesetaraan gender dan dukungan untuk kelompok minoritas, menciptakan lingkungan yang inklusif bagi semua individu.",
        "Kesimpulan",
        "IEEE adalah organisasi yang berperan penting dalam mendorong perkembangan teknologi di berbagai bidang. Melalui publikasi, konferensi, standar teknologi, dan program pengembangan profesional, IEEE terus berkontribusi dalam memajukan ilmu pengetahuan dan teknik demi kesejahteraan umat manusia. Dengan jaringan global dan fokus pada inovasi, IEEE menjadi salah satu pendorong utama transformasi teknologi di dunia."
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
