# ResumeBuilder 📄✨

**Domain:** Productivity SaaS / Web Application

ResumeBuilder is a modern, full-stack web application designed to significantly reduce the time it takes to create professional, ATS-friendly resumes. It provides users with a seamless, highly responsive interface where they can input their details into structured forms and instantly see their resume generated in a pixel-perfect "Live Preview." 

With built-in user authentication, cloud data persistence, and intelligent auto-saving capabilities, the platform ensures that users never lose their progress and can instantly export their final resume to PDF.

---

## 🏗️ Architecture & Core Features

The application follows a standard **Client-Server Architecture** utilizing the **MERN** stack.

*   **Real-Time Live Preview Engine:** As users type into the editor, a custom dynamic template engine instantly reflects the changes on an A4-sized digital paper without page reloads.
*   **Intelligent Auto-Save:** The platform implements a debounced auto-save mechanism that quietly synchronizes form data to the MongoDB database in the background, eliminating the need for manual "Save" buttons.
*   **Fully Responsive UI/UX:** 
    *   **Desktop:** Utilizes a split-screen layout (Editor on the left, Preview on the right).
    *   **Mobile:** Uses a custom `ResizeObserver` and CSS transforms to perfectly scale the massive A4 preview down to phone screens, paired with a sleek bottom navigation bar for toggling views.
*   **Secure Authentication:** Complete JWT-based authentication flow with encrypted passwords, ensuring that each user has private, persistent access to their specific resume document.
*   **PDF Generation:** Client-side high-fidelity PDF rendering using `react-to-print` that preserves strict Tailwind CSS print styles and exact A4 dimensions.

---

## 🛠️ Technology Stack & Tools

### Frontend (Client-Side)
*   **React 19 (via Vite):** For building a lightning-fast, component-driven user interface.
*   **Tailwind CSS v4:** For highly customizable, utility-first styling and responsive design.
*   **Zustand:** For global state management, perfectly syncing the deeply nested resume data between the Editor Forms and the Live Preview component.
*   **React Hook Form:** For highly performant form validation and handling complex nested arrays (e.g., adding multiple Jobs or Projects).
*   **React-to-Print:** For extracting the DOM node of the Live Preview and converting it into a clean, printable PDF without injecting browser margins.
*   **Lucide-React:** For crisp, modern SVG iconography.

### Backend (Server-Side)
*   **Node.js & Express.js (v5):** For building the robust RESTful API routing and handling cross-origin requests (CORS).
*   **MongoDB & Mongoose:** For NoSQL database management. The schema is specifically designed to handle complex, deeply nested JSON document structures (arrays of Objects for Education, Experience, and Projects) without strict draft constraints.
*   **JSON Web Tokens (JWT) & Bcrypt.js:** For stateless user session management and secure password hashing.
*   **Dotenv:** For securely managing environment variables (Database URIs, Secret Keys) across local and cloud deployments.

---

## 🚀 Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/manishyadav02/Resume_Builder.git
   ```
2. **Setup Backend:**
   ```bash
   cd server
   npm install
   # Create a .env file with PORT, MONGODB_URI, JWT_SECRET, CLIENT_URL
   npm run dev
   ```
3. **Setup Frontend:**
   ```bash
   cd client
   npm install
   # Create a .env file with VITE_API_URL
   npm run dev
   ```
