# Materi Linux & Docker

---

## 1. Linux Kernel dan Linux Distro

### Linux Kernel

Linux Kernel adalah inti dari sistem operasi Linux. Kernel merupakan perangkat lunak inti yang menjembatani antara Hardware (CPU, storage, RAM) dengan Software (aplikasi, layanan).

Fungsi utama Linux Kernel:

- Mengelola hardware (CPU, RAM, I/O)
- Menjadi penghubung antara hardware dan software
- Mengatur proses dan memori

Contoh: Linux Kernel versi 6.0

### Linux Distro

Linux Distro adalah sistem operasi lengkap yang dibangun di atas Linux Kernel. Sebuah distro menggabungkan kernel dengan beberapa komponen seperti:

- Package manager
- Init system
- Desktop environment
- Berbagai aplikasi pendukung lainnya

Contoh distro: Ubuntu, Debian, Fedora

### Perbedaan Kernel vs Distro

| Aspek    | Linux Kernel        | Linux Distro                    |
| -------- | ------------------- | ------------------------------- |
| Definisi | Inti sistem operasi | Sistem operasi lengkap          |
| Fungsi   | Mengelola hardware  | Menyediakan pengalaman OS penuh |
| Komponen | Hanya kernel        | Kernel + software tambahan      |
| Contoh   | Linux 6.0           | Ubuntu, Debian, Fedora          |

---

## 2. File System Hierarchy Standard (FHS)

FHS (File System Hierarchy Standard) adalah standar yang mendefinisikan struktur direktori dan isinya pada sistem Linux.

### Struktur Direktori

| Direktori | Kegunaan                                                        |
| --------- | --------------------------------------------------------------- |
| `/`       | Root — direktori tertinggi, berisi file milik root              |
| `/home`   | Berisi file-file milik user                                     |
| `/etc`    | Berisi file-file konfigurasi (nginx.conf, hosts)                |
| `/bin`    | Berisi program esensial (ls, cp, mv, cat)                       |
| `/sbin`   | Berisi program admin sistem (fdisk, iptables)                   |
| `/usr`    | Berisi program non-esensial                                     |
| `/var`    | Berisi file tambahan/pendukung (log, cache)                     |
| `/mnt`    | Storage yang dipasang sementara atau manual                     |
| `/media`  | Removable media terpasang secara otomatis (USB, eksternal HDD)  |
| `/tmp`    | Berisi file sementara yang dihapus saat reboot                  |
| `/proc`   | Virtual filesystem berisi informasi proses yang sedang berjalan |

### Contoh Penggunaan

```bash
# File konfigurasi nginx
sudo nano /etc/nginx/nginx.conf

# File web (konten website)
cd /var/www/html/
```

---

## 3. File Permission dan Ownership

Setiap file dan direktori memiliki batasan akses melalui permission (izin) dan ownership (kepemilikan).

### Entitas Permission

| Entitas | Simbol | Keterangan                                     |
| ------- | ------ | ---------------------------------------------- |
| Owner   | `u`    | Pemilik file (sebuah user)                     |
| Group   | `g`    | Pengelompokan user yang memiliki akses berbagi |
| Other   | `o`    | Pengguna lain, tidak termasuk owner dan group  |

### Jenis Permission

| Simbol | Angka | Nama    | Arti pada File  | Arti pada Direktori          |
| ------ | ----- | ------- | --------------- | ---------------------------- |
| `r`    | 4     | Read    | Baca isi file   | List isi direktori (ls)      |
| `w`    | 2     | Write   | Ubah/tulis file | Buat/hapus file dalam dir    |
| `x`    | 1     | Execute | Jalankan file   | Bisa masuk ke direktori (cd) |
| `-`    | 0     | None    | Tidak ada izin  | Tidak ada izin               |

### Perintah `chown` — Mengubah Kepemilikan

```bash
# Mengubah owner file
chown user:group namafile

# Contoh: mengubah owner file ke user "aqilk" dan group "developer"
chown aqilk:developer /var/www/html/index.html

# Mengubah kepemilikan secara rekursif pada direktori
chown -R aqilk:developer /var/www/html/
```

### Perintah `chmod` — Mengubah Permission

#### Metode Numerik (Absolute)

```bash
# Mengatur permission 744 pada direktori data
chmod 744 data/
# drwxr--r-- => d: direktori | rwx: owner | r--: group | r--: other

# Contoh lainnya
chmod 755 /var/www/html/    # rwxr-xr-x
chmod 600 ~/.ssh/id_rsa     # rw------- (private key)
chmod 644 file.txt          # rw-r--r--
```

#### Metode Simbolik

```bash
# Menambah permission write untuk group di direktori data
chmod g+w data/

# Mengurangi permission execute untuk other
chmod o-x script.sh

# Menimpa permission user menjadi read dan write saja
chmod u=rw file.txt

# Kombinasi: menambah execute untuk owner dan group
chmod u+x,g+x script.sh
```

---

## 4. Prinsip Enkripsi pada SSH

SSH (Secure Shell) merupakan protokol standar untuk masuk ke sistem jarak jauh secara aman dan mentransfer file melalui jaringan.

### Konsep Dasar

- Enkripsi (Encryption): Proses mengubah data asli yang dapat dibaca (_plain text_) menjadi format kode acak dan tidak terbaca (_ciphertext_).
- Dekripsi (Decryption): Kebalikan dari enkripsi — mengubah ciphertext kembali menjadi plaintext.
- Encoding: Berbeda dari enkripsi karena **tidak menggunakan kunci (keys)**.

### Jenis Enkripsi pada SSH

#### 1. Enkripsi Simetris

Jenis enkripsi di mana satu kunci rahasia digunakan untuk mengunci (enkripsi) sekaligus membuka (dekripsi) data.

```
[Data Asli] --[Kunci Sama]--> [Ciphertext] --[Kunci Sama]--> [Data Asli]
```

#### 2. Enkripsi Asimetris

Jenis enkripsi yang memerlukan **sepasang kunci berbeda** namun saling terhubung:

| Kunci           | Sifat                   | Fungsi                                                       |
| --------------- | ----------------------- | ------------------------------------------------------------ |
| **Public Key**  | Publik / bisa dibagikan | Mengenkripsi pesan & memverifikasi tanda tangan digital      |
| **Private Key** | Rahasia / hanya pemilik | Mendekripsi data yang dienkripsi oleh public key pasangannya |

Penting: Private key harus memiliki permission read-only untuk owner saja (`chmod 600`), sisa permission lainnya harus dihilangkan.

### Membuat SSH Key

```bash
ssh-keygen -t <tipe> -C <komentar> -f <namafile>

# Contoh: membuat key RSA dengan komentar email
ssh-keygen -t rsa -b 4096 -C "user@email.com" -f ~/.ssh/id_rsa

```

---

## 5. Perbedaan HTTP dan HTTPS

| Aspek        | HTTP                                | HTTPS                                    |
| ------------ | ----------------------------------- | ---------------------------------------- |
| Kepanjangan  | HyperText Transfer Protocol         | HyperText Transfer Protocol Secure       |
| Port Default | 80                                  | 443                                      |
| Enkripsi     | Tidak ada                           | Menggunakan SSL/TLS                      |
| Keamanan     | Data dikirim dalam bentuk plaintext | Data dienkripsi sebelum dikirim          |
| Sertifikat   | Tidak diperlukan                    | Memerlukan SSL/TLS Certificate           |
| Kecepatan    | Sedikit lebih cepat                 | Sedikit lebih lambat (overhead enkripsi) |
| Penggunaan   | Konten statis, tidak sensitif       | Login, transaksi, data sensitif          |

> **HTTPS** menjamin tiga hal utama: **Kerahasiaan** (data dienkripsi), **Integritas** (data tidak dimodifikasi), dan **Autentikasi** (server terverifikasi).

---

## 6. Docker OCI Compliance Standard

**OCI (Open Container Initiative) Compliance Standard** adalah standarisasi industri yang memastikan bahwa sebuah container dapat berjalan di berbagai platform atau runtime **tanpa masalah kompatibilitas**.

### Manfaat OCI Standard

- Portabilitas container antar platform
- Interoperabilitas dengan berbagai container runtime
- Standarisasi format image dan runtime

### Platform yang Mendukung OCI

- Kubernetes
- OpenShift
- Docker
- containerd
- Podman

---

## 7. Perbedaan Container dan VM

| Aspek        | Container              | Virtual Machine (VM)               |
| ------------ | ---------------------- | ---------------------------------- |
| Isolasi      | Berbagi kernel OS host | Memiliki kernel & OS sendiri       |
| Ukuran       | Ringan (MB)            | Berat (GB)                         |
| Startup      | Detik                  | Menit                              |
| Resource     | Efisien, berbagi OS    | Lebih boros (full OS)              |
| Keamanan     | Isolasi lebih ringan   | Isolasi lebih kuat                 |
| Portabilitas | Sangat tinggi          | Cukup tinggi                       |
| Penggunaan   | Microservices, CI/CD   | Aplikasi legacy, full OS isolation |

```
┌─────────────────────────────┐   ┌─────────────────────────────┐
│         Container           │   │     Virtual Machine (VM)    │
├──────┬──────┬──────┬───────-┤   ├──────────┬──────────────────┤
│ App1 │ App2 │ App3 │  ...   │   │  Guest OS│     App          │
├─────────────────────────────┤   ├──────────┤                  │
│     Container Runtime       │   │  Kernel  │                  │
├─────────────────────────────┤   ├──────────┴──────────────────┤
│          Host OS            │   │         Hypervisor          │
├─────────────────────────────┤   ├─────────────────────────────┤
│         Hardware            │   │           Hardware          │
└─────────────────────────────┘   └─────────────────────────────┘
```

---

## 8. Docker Image Layer

Docker Image Layer adalah lapisan sistem file _read-only_ yang bertumpuk secara hierarkis, di mana setiap lapisan merepresentasikan perubahan dari instruksi Dockerfile.

### Manfaat Image Layer

- Efisiensi penyimpanan — Layer yang sama di-share antar image
- Kecepatan build — Caching layer yang belum berubah
- Distribusi lebih ringan — Hanya layer baru yang perlu diunduh

### Contoh Pembentukan Layer

Penting: Urutkan instruksi Dockerfile dari yang jarang berubah ke yang sering berubah agar cache layer lebih optimal.

```dockerfile
FROM ubuntu           # Layer 1: Base image Ubuntu
RUN apt-get update    # Layer 2: Perubahan hasil update sistem
COPY . /app           # Layer 3: File aplikasi ditambahkan
RUN pip install -r /app/requirements.txt  # Layer 4: Dependensi Python
CMD ["python", "/app/main.py"]           # Metadata (bukan layer baru)
```

```
┌────────────────────────────┐  ← Writable Layer (Container Layer)
├────────────────────────────┤  ← Layer 4: pip install
├────────────────────────────┤  ← Layer 3: COPY . /app
├────────────────────────────┤  ← Layer 2: apt-get update
└────────────────────────────┘  ← Layer 1: FROM ubuntu (Base Image)
```

---

## 9. Docker Volume dan Network

### Docker Volume

Docker Volume adalah virtual disk container yang digunakan untuk menyimpan data secara persisten agar data tidak hilang saat container dihapus, dihentikan, atau diperbarui.

Keunggulan:

- Data tetap ada meskipun container dihapus
- Memungkinkan beberapa container berbagi data
- Lebih efisien dan aman dibanding bind mounts
- Dikelola oleh Docker Engine dan tersimpan di bagian khusus sistem host

```bash
# Membuat volume baru
docker volume create mysql_data

# Menjalankan MySQL dengan volume persisten
docker run -d \
  --name mysql-db \
  -v mysql_data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  mysql:latest

# Melihat daftar volume
docker volume ls

# Menghapus volume
docker volume rm mysql_data
```

---

### Docker Network

Docker Network adalah jaringan virtual yang memungkinkan container berkomunikasi, bahkan jika berada pada host berbeda. Container dapat saling menemukan dan memanggil berdasarkan nama container tanpa harus mengetahui alamat IP-nya.

#### Jenis Network

| Jenis       | Deskripsi                                                  | Penggunaan                           |
| ----------- | ---------------------------------------------------------- | ------------------------------------ |
| **Bridge**  | Komunikasi antar container di host yang sama               | Default, development                 |
| **Host**    | Container menggunakan jaringan host langsung tanpa isolasi | Performa tinggi, production tertentu |
| **None**    | Container tidak terhubung ke jaringan manapun              | Isolasi penuh, keamanan maksimal     |
| **Overlay** | Komunikasi antar container di host berbeda                 | Docker Swarm, multi-host             |

#### Contoh Penggunaan

Container dalam network yang sama dapat saling berkomunikasi menggunakan nama container sebagai hostname, contoh: `http://db-container:3306`

```bash
# Membuat network kustom
docker network create my-app-net

# Menjalankan database dalam network
docker run -d \
  --name db-container \
  --network my-app-net \
  -e MYSQL_DATABASE=wordpress \
  mysql:latest

# Menjalankan web app dalam network yang sama
docker run -d \
  --name web-container \
  --network my-app-net \
  -p 80:80 \
  nginx:latest

# Melihat daftar network
docker network ls
```

---

## 10. Web Server dan Reverse Proxy

### Web Server

Web Server adalah perangkat lunak yang melayani permintaan HTTP/HTTPS dari client (browser) dan mengembalikan respons berupa file statis (HTML, CSS, JS, gambar) atau meneruskan permintaan ke aplikasi backend.

Contoh Web Server populer: Nginx, Apache HTTP Server, Caddy

```bash
# Instalasi Nginx
sudo apt install nginx

# Menjalankan Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Konfigurasi dasar Nginx untuk serve static file
# /etc/nginx/sites-available/default
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.html;
}
```

---

### Reverse Proxy

Reverse Proxy adalah server perantara yang menerima request dari client dan meneruskannya ke server backend, lalu mengembalikan respons dari backend ke client. Client tidak mengetahui server backend yang sebenarnya.

Manfaat Reverse Proxy:

- Load Balancing — Mendistribusikan traffic ke beberapa server
- SSL Termination — Menangani enkripsi HTTPS di satu titik
- Caching — Menyimpan respons untuk performa lebih baik
- Keamanan — Menyembunyikan server backend dari publik
- Kompresi — Mengompres respons sebelum dikirim ke client

```
Client → [Reverse Proxy / Nginx] → [Backend App 1]
                                 → [Backend App 2]
                                 → [Backend App 3]
```

```bash
# Konfigurasi Nginx sebagai Reverse Proxy
# /etc/nginx/sites-available/myapp

server {
    listen 80;
    server_name myapp.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
