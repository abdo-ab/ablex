# 🚀 Ablex - The Future of Learning

![Ablex Banner](public/images/ablex_dashboard.png) 


**Project Name:** Ablex  
**Team:** The Visionaries (Abdo, Mohammed, Kamil M., Abdurazak)  
**Institution:** Semara University  
**developed by:** Abdo Mohammed (abdo-ab) 

---

## 💡 The Problem
In today's fast-paced world, educational materials become outdated almost as soon as they are printed. Students struggle with:
- 📚 **Static Resources:** Textbooks that don't evolve with new discoveries.
- 💾 **Fragmented content:** Learning materials scattered across different platforms.
- 🚫 **Lack of Interaction:** Passive learning without community engagement.

## 🌟 The Solution
**Ablex** is a dynamic, real-time learning platform designed to bridge the gap between educators and students. We believe education should be living, breathing, and accessible anywhere.

Ablex ensures:
- **Real-Time Updates:** Lecturers can update content instantly, ensuring students always have the latest version.
- **Community Driven:** Students can comment, discuss, and like modules to foster collaborative learning.
- **Seamless Access:** Read online with our integrated PDF viewer or download for offline study.

---

## 🔥 Key Features

- **🔎 Smart Dashboard:** A powerful search engine to discover modules by title or topic.
- **📖 Integrated PDF Viewer:** Read heavy documentation and course slides directly in the browser without downloading.
- **💬 Interactive Community:** Comment section and "Like" system to engage with content creators and peers.
- **📱 Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **🌙 Dark Mode Support:** Built-in dark mode for comfortable late-night study sessions.
- **🔒 Secure Data:** Role-based authentication and encrypted data handling.

---

## 🛠️ Tech Stack

**Frontend:**
- [React](https://react.dev) (UI Framework)
- [Inertia.js](https://inertiajs.com) (Monolith-like SPA experience)
- [Tailwind CSS](https://tailwindcss.com) (Modern Styling)
- [Lucide React](https://lucide.dev) (Icons)

**Backend:**
- [Laravel](https://laravel.com) (Robust PHP Framework)
- MySQL / PostgreSQL (Database)

**Tools & Libraries:**
- `react-pdf-viewer` (PDF Rendering)
- `ziggy-js` (Laravel Routes in JS)

---

## 🚀 Getting Started

Follow these steps to set up the project locally for judging/testing.

### Prerequisites
- PHP >= 8.1
- Composer
- Node.js & NPM

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ablex.git
   cd ablex
   ```

2. **Install Backend Dependencies**
   ```bash
   composer install
   ```

3. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Copy the example environment file and configure your database settings.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   *Edit `.env` and set your `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`.*

5. **Database Migration**
   ```bash
   php artisan migrate --seed
   ```

6. **Run the Application**
   You need two terminals running:

   *Terminal 1 (Backend):*
   ```bash
   php artisan serve
   ```

   *Terminal 2 (Frontend):*
   ```bash
   npm run dev
   ```

7. **Visit the App**
   Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 👥 The Team

- **Abdo** - CEO & Co-founder
- **Mohammed** - Lead Developer
- **Kamil M.** - Supervisor
- **Abdurazak** - Lecturer & School Director

---

*made by Abdo mohammed ( abdo-ab).*
