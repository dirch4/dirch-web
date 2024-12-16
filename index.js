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
    title: "Memahami IEEE 802.11: Evolusi dan Standar Teknologi Wi-Fi",
    references: ["IEEE - Standards Association","https://standards.ieee.org/beyond-standards/the-evolution-of-wi-fi-technology-and-standards/"],
    categories: "Quality Assurance",
    body: `<p class='mt-4 text-md text-justify text-gray-700'>Wi-Fi adalah bagian integral dari kehidupan modern, memungkinkan konektivitas tanpa kabel yang mendukung berbagai aplikasi mulai dari streaming video hingga komunikasi bisnis. Di balik teknologi ini adalah serangkaian standar yang dikenal sebagai IEEE 802.11. Artikel ini akan menjelaskan apa itu IEEE 802.11, bagaimana evolusinya, dan mengapa ia menjadi pilar utama dalam dunia konektivitas nirkabel.</p><h2 class='mt-4 text-lg font-semibold text-gray-800'>Apa Itu IEEE 802.11?</h2><p class='mt-2 text-md text-justify text-gray-700'>IEEE 802.11 adalah standar yang dikembangkan oleh Institute of Electrical and Electronics Engineers (IEEE) untuk komunikasi jaringan lokal nirkabel (Wireless Local Area Network/WLAN). Standar ini pertama kali diperkenalkan pada tahun 1997 dan telah mengalami berbagai iterasi untuk meningkatkan kecepatan, efisiensi, dan jangkauan jaringan Wi-Fi.</p><h2 class='mt-4 text-lg font-semibold text-gray-800'>Sejarah dan Evolusi Standar IEEE 802.11</h2><p class='mt-2 text-md text-justify text-gray-700'>Berikut adalah evolusi utama dari standar IEEE 802.11:</p><ul class='list-disc list-inside mt-2 text-md text-gray-700'><li><strong>IEEE 802.11 (1997):</strong> Kecepatan transfer data hingga 2 Mbps.</li><li><strong>IEEE 802.11b (1999):</strong> Kecepatan hingga 11 Mbps pada pita 2,4 GHz.</li><li><strong>IEEE 802.11a (1999):</strong> Kecepatan hingga 54 Mbps pada pita 5 GHz.</li><li><strong>IEEE 802.11g (2003):</strong> Kombinasi kecepatan tinggi dengan kompatibilitas pita 2,4 GHz.</li><li><strong>IEEE 802.11n (2009):</strong> Teknologi MIMO dengan kecepatan hingga 600 Mbps.</li><li><strong>IEEE 802.11ac (2013):</strong> Kecepatan hingga 1 Gbps pada pita 5 GHz.</li><li><strong>IEEE 802.11ax (2019):</strong> Wi-Fi 6 dengan efisiensi tinggi dan kecepatan hingga 10 Gbps.</li></ul><h2 class='mt-4 text-lg font-semibold text-gray-800'>Dampak IEEE 802.11 terhadap Teknologi Modern</h2><p class='mt-2 text-md text-justify text-gray-700'>Standar IEEE 802.11 telah memberikan dampak besar pada:</p><ul class='list-disc list-inside mt-2 text-md text-gray-700'><li><strong>Konektivitas Universal:</strong> Wi-Fi menjadi standar global untuk konektivitas nirkabel.</li><li><strong>Produktivitas Bisnis:</strong> Mendukung kerja jarak jauh dan kolaborasi.</li><li><strong>Inovasi IoT:</strong> Mendukung perangkat Internet of Things dengan daya rendah dan jangkauan panjang.</li>
    <li><strong>Peningkatan Kualitas Hidup:</strong> Dari rumah pintar hingga hiburan berkualitas tinggi.</li>
    </ul>
    <h2 class='mt-4 text-lg font-semibold text-gray-800'>Masa Depan IEEE 802.11</h2>
    <p class='mt-2 text-md text-justify text-gray-700'>
        Dengan teknologi seperti 5G dan Wi-Fi 7 (802.11be), masa depan IEEE 802.11 terlihat cerah. Wi-Fi 7 diharapkan mendukung kecepatan hingga 30 Gbps, latensi ultra-rendah, dan efisiensi tinggi untuk aplikasi seperti augmented reality (AR) dan virtual reality (VR).
    </p>

    <h2 class='mt-4 text-lg font-semibold text-gray-800'>Kesimpulan</h2>
    <p class='mt-2 text-md text-justify text-gray-700'>
        IEEE 802.11 adalah inti dari revolusi nirkabel yang telah mengubah cara kita bekerja, belajar, dan hidup. Dengan setiap iterasi, standar ini terus memenuhi tantangan baru dan mendukung ekosistem teknologi yang semakin kompleks. Sebagai pengguna, kita dapat berharap bahwa inovasi di bidang ini akan terus meningkatkan konektivitas, efisiensi, dan kenyamanan dalam kehidupan kita sehari-hari.
    </p>`,
    timestamp: new Date("2024-12-14T00:00:00Z").getTime()//Date.now() // Timestamp saat ini
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
                            <div class="mt-5 line-clamp-2 text-sm/6 text-gray-600" style="overflow: hidden;" dangerouslySetInnerHTML={{ __html: ${blog.body} }}></div>
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
