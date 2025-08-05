// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { db } from './firebase.js';
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Get the project type (e.g., upcoming) from the URL
const params = new URLSearchParams(window.location.search);
const statusFilter = params.get("type")?.toLowerCase() || "upcoming";

document.querySelector("h1").textContent = `${statusFilter} Projects`;

const projectList = document.getElementById("projectList");
const projectCollection = collection(db, "projects");
const storage = getStorage();

async function loadProjects() {
  projectList.innerHTML = "<p>Loading projects...</p>";

  try {
    const snapshot = await getDocs(projectCollection);
    projectList.innerHTML = "";
    let found = false;

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.status?.toLowerCase() === statusFilter) {
        found = true;
        const div = document.createElement("div");
        div.className = "project";

        let imagesHTML = "";
        if (Array.isArray(data.imagePaths)) {
          for (const path of data.imagePaths) {
            try {
              const url = await getDownloadURL(ref(storage, path));
              imagesHTML += `<img src="${url}" alt="Project Image">`;
            } catch (err) {
              console.error("Error fetching image URL:", err.message);
              imagesHTML += `<p style="color:red;">Image not found</p>`;
            }
          }
        }

        div.innerHTML = `
          <h3>${data.title}</h3>
          <p>${data.description}</p>
          ${imagesHTML}
        `;
        projectList.appendChild(div);
      }
    }

    if (!found) {
      projectList.innerHTML = `<p>No ${statusFilter} projects found.</p>`;
    }
  } catch (error) {
    console.error("Error loading projects:", error);
    projectList.innerHTML = "<p>Error loading projects.</p>";
  }
}

loadProjects();



