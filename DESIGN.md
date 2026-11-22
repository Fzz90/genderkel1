# Representasi Perempuan dan Stereotip Feminitas (Tema Handwritten Paper)

## Brief
Presentasi HTML interaktif 7 slide berbahasa Indonesia (`lang="id"`) untuk **Kelompok 1** mata kuliah **Kajian Gender dan Perempuan Jepang**. Studi kasus membahas adegan Mahiru Shiina menyiapkan dan memasakkan makanan untuk Amane Fujimiya sebagai bentuk balas budi dalam anime *Otonari no Tenshi-sama* (*The Angel Next Door Spoils Me Rotten*), diperluas dengan bahasan ideologi *ryousai kenbo*, praktik balas budi Jepang (*ongaeshi* / *okaeshi*), serta sudut pandang kritis mengenai pelanggengan stereotip feminin dalam anime Jepang.

- **URL publikasi target**: `https://fzz90.github.io/genderkel1/`
- **Anggota Kelompok 1 (7 mahasiswa)**:
  - Lathifa Naya (`125231023`)
  - Noureen Avifah (`125231065`)
  - Arkana Raisa Nayaka (`125241014`)
  - Andre Ahmad Dani (`125241020`)
  - Devin Andi Firmansyah (`125241029`)
  - Muhammad Galang Raya (`125241049`)
  - Faiz Syihab (`125241046`)

## Physical Scene & Design Read
- **Physical Scene**: Mahasiswa Kajian Gender dan Perempuan Jepang memaparkan catatan diskusi tulisan tangan dari buku catatan spiral bergaris di proyektor ruang kuliah yang terang, menggunakan tinta pulpen biru-hitam, garis bawah stabilo oker hangat, dan coretan koreksi tinta merah marun.
- **Design Read**: Reading this as an academic seminar presentation deck for university Japanese-studies classmates and lecturer, in a tactile Handwritten Spiral Notebook Paper style following a 16:9 ink-framed stage, dial **ENERGY 2 / RHYTHM 3 / MOTION 2**.

## Visual System (Handwritten Paper: Fountain-Pen Indigo, Marking Red, Ochre Highlighter on Warm Cotton Paper)
Palette cap: 2 warna inti (Fountain-Pen Indigo dan Marking Red) + 1 aksen (Ochre Highlighter) di atas neutral kertas hangat. Seluruh pasangan warna teruji lewat `contrast-check.py` (semua >= 6.02:1, lolos WCAG AA).

- **Warm Desk & Paper Neutrals**:
  - `--desk`: `#E6DFD1` (alas meja di luar bingkai kertas)
  - `--paper`: `#FAF6EC` (kertas buku catatan utama)
  - `--paper-soft`: `#F2EBDC` (kartu catatan sekunder)
  - `--surface`: `#FFFDF7` (lembar catatan terangkat)
  - `--ink`: `#1E2430` (tinta pulpen biru-hitam; `14.41:1` pada `--paper`, `15.29:1` pada `--surface`)
  - `--muted`: `#4A515E` (tinta grafit sekunder; `7.40:1` pada `--paper`, `6.02:1` pada `--desk`)
- **Core 1: Fountain-Pen Indigo**:
  - `--navy`: `#1F3A5F` (`10.64:1` pada `--paper`)
  - `--navy-deep`: `#152842` (panel sampul belakang & catatan gelap; teks `--paper` `#FAF6EC` = `13.76:1`, `--mist` `#D6E2F0` = `11.31:1`)
  - `--navy-soft`: `#E4ECF5` (`9.63:1` dengan `--navy`)
- **Core 2: Marking Red**:
  - `--red`: `#A82924` (garis margin buku, stempel posisi, penanda anotasi; `6.47:1` pada `--paper`)
  - `--red-deep`: `#7E1C18` (`8.72:1` pada `--red-soft` `#FBEAE7`)
- **Accent: Ochre Highlighter**:
  - `--ochre`: `#E8B849` (selotip/stabilo/tombol utama; `8.43:1` dengan `--ink`, `8.05:1` pada `--navy-deep`)
  - `--ochre-light`: `#F2C96B` (`9.44:1` pada `--navy-deep`)
  - `--ochre-soft`: `#FDF1CC` (`9.00:1` dengan `--ochre-ink` `#593C00`)

## Typography Rationale (R-06 & R-31)
- **Handwritten Display & Margin Notes**: `Caveat` (`600;700`) dipilih untuk judul slide, penanda pertanyaan, dan catatan pinggir karena meniru goresan pulpen buku catatan kuliah yang hangat dan spontan, sesuai foto catatan spiral asli Kelompok 1.
- **Readable Lecture Body & Headings**: `Bitter` (`400;500;600;700;800`) dipilih untuk teks analisis, daftar anggota, dan UI kontrol karena slab-serif ber-x-height tinggi ini mudah dibaca dari kursi belakang ruang kelas sekaligus memberi karakter cetakan makalah akademis.
- **Japanese Kanji Terms**: `Zen Maru Gothic` (fallback `Yu Gothic`) dipakai pada istilah kanji seperti 良妻賢母 dan 恩返し agar bentuk guratan serasi dengan karakter tulisan tangan.

## Decision Reasons Log (R-31)
- **Warna**: Mengambil rujukan langsung dari buku catatan bergaris mahasiswa Jepang (kertas krem, tinta biru-hitam *mannenhitsu*, garis margin merah, stabilo oker) sekaligus menghindari stereotip warna merah muda untuk topik gender.
- **Tekstur Garis Buku (R-07)**: Garis horizontal 34px dan garis margin merah vertikal 1px dipakai secara terukur untuk menghadirkan metafora kertas catatan tulis tangan yang diminta pengguna.
- **Jilid Spiral Kiri**: Motif identitas berulang di tepi kiri kanvas 16:9 (berubah ke tepi atas pada layar sempit) yang menghubungkan keseluruhan 7 slide sebagai satu buku catatan diskusi.
- **Ritme Komposisi (R-05 / RHYTHM 3)**: Setiap slide memakai struktur berbeda sesuai jenis jawaban (sampul asimetris, tab alur adegan interaktif, perbandingan dua lembar + catatan kaki heteronormatif, peta konsep SVG interaktif, banner stempel posisi + analisis industri anime, papan sketsa bukti visual dengan 3 pin klik, dan sampul belakang gelap).
- **Bayangan & Radius (R-11, R-12)**: Radius berbeda per peran elemen (`2px` selotip kertas, `8px` kartu catatan, `10px` tombol kontrol, `14px` bingkai panggung); bayangan tinta offset keras (`4px 4px 0`) dipakai selektif pada lembar yang menempel di atas kertas.
- **Ilustrasi & Bukti Visual (R-22, R-23)**: Semua ilustrasi adalah sketsa tinta SVG orisinal yang relevan dengan adegan dapur Mahiru dan catatan kuliah. Pada Slide 6 tidak dipasang gambar anime palsu, melainkan papan sketsa observasi interaktif beserta catatan jelas jika kelompok ingin melampirkan cuplikan episode asli.

## Slide Architecture (7 Slides)
1. **Sampul (`Cover`)**: Judul topik, objek kajian, daftar 7 anggota Kelompok 1 + NIM, sketsa catatan tangan di sisi gelap, tombol `Mulai Presentasi`.
2. **Pertanyaan 1 (`Adegan`)**: Apa yang ditampilkan dalam adegan? Dilengkapi tab interaktif 3 tahap alur adegan dan kaitannya dengan praktik balas budi *ongaeshi*.
3. **Pertanyaan 2 (`Representasi`)**: Bagaimana karakter perempuan, laki-laki, atau *queer* direpresentasikan? Profil kontras Mahiru vs Amane + catatan khusus bingkai heteronormatif.
4. **Pertanyaan 3 (`Norma Gender`)**: Norma gender apa yang muncul? Peta konsep SVG interaktif menghubungkan *ryousai kenbo*, *ongaeshi*, dan kerja domestik memasak + inspektor catatan.
5. **Pertanyaan 4 (`Posisi Analisis`)**: Memperkuat atau menantang norma gender? Stempel posisi tegas "Memperkuat", uji pembacaan tandingan, dan analisis pelanggengan stereotip feminin dalam anime Jepang.
6. **Pertanyaan 5 (`Bukti Visual`)**: Apa bukti visual yang mendukung interpretasi kelompok? Papan sketsa adegan interaktif dengan 3 pin anotasi visual yang dapat diklik.
7. **Penutup (`Penutup`)**: Rangkuman dua temuan utama, ajakan sesi diskusi kelas, kredit Kelompok 1, emblem buku catatan & pena, dan tombol kembali ke sampul.
