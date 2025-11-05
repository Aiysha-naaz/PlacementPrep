# Platform for Placement Preparation

A full-stack **MERN** application for students to prepare for placements.  
Users can navigate via a sidebar to access courses, practice tests, schedule interviews, and create/download resumes.

---

## Features

- **User Authentication**  
  - **Register** – Create a new account  
  - **Login** – Access account securely  
  - **Logout** – End session safely
  - 
- **Sidebar Navigation**  
  - Home – Overview of the platform  
  - Dashboard – User progress  
  - Courses – Browse and view course details  
  - Practice Test – Take placement-related tests  
  - Interviews – Schedule interviews and access tips/resources  
  - Resume Building – Create, edit, and download resumes  

- **Course Management** – Display courses with images, descriptions, and details  
- **Practice Tests** – Take tests and track performance  
- **Interview Scheduling** – Schedule interviews directly from the platform  
- **Resume Builder** – Build, edit, and download resumes in PDF format  
- **Responsive UI** – Works on desktop and mobile  
- **UI Improvements** – Fixed intentional Figma bugs for better user experience  

---

## Tech Stack

- **Frontend:** React.js, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Deployment (optional):** [Deployed URL]  

---

## Project Structure

placement-prep/
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Sidebar, Navbar, CourseCard, ResumeForm, InterviewScheduler
│ │ ├── pages/ # Home, Dashboard, Courses, PracticeTest, Interviews, ResumeBuilding
│ │ └── App.js
│ └── package.json
├── backend/ # Node.js backend
│ ├── models/ # User, Courses, Interview, Resume
│ ├── routes/ # APIs for courses, interviews, resumes
│ ├── server.js
│ └── package.json
└── README.md

---

## Installation & Running Locally

1. **Clone the repository**
```bash
git clone <your-repo-link>
cd placement-prep
```
2. Install backend dependencies

```bash
Copy code
cd backend
npm install
```

3. ## Install frontend dependencies

```bash
cd ../frontend
npm install
```

4. ## Run the backend

```bash
cd ../backend
npm start
```

5. ## Run the frontend

```bash
cd ../frontend
npm start
```

6. Open http://localhost:3000 to view the app.

### Improvements from Figma
- Fully functional sidebar navigation

- Fixed layout and alignment issues

- Added interview scheduling and resume creation/download

- Improved responsiveness for mobile and desktop

- Added missing images, descriptions, and detailed course content

- Optimized UI for better readability and user experience

## GitHub Repository
https://github.com/Aiysha-naaz/PlacementPrep.git


## Author
Ayesha Naz
Final-year Computer Science Engineering student
Email: aishaanaazz@gmail.com


