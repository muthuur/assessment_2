const projectForm = document.getElementById("project-form");
const projectsList = document.getElementById("projects-list");
const projectDetails = document.getElementById("project-details");

let projects = [];

const storedProjects = JSON.parse(localStorage.getItem("projects"));
if (storedProjects) {
  projects = storedProjects;
  renderProjects();
}

projectForm.addEventListener("submit", createProject);

function createProject(e) {
  e.preventDefault();
  const projectName = document.getElementById("project-name").value;
  const projectDescription = document.getElementById(
    "project-description"
  ).value;

  if (projectName && projectDescription) {
    const project = {
      id: Date.now(),
      name: projectName,
      description: projectDescription,
    };

    projects.push(project);
    saveProjectsToLocalStorage();
    renderProjects();
    projectForm.reset();
  }
}

function renderProjects() {
  projectsList.innerHTML = "";
  projects.forEach((project) => {
    const projectItem = document.createElement("li");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
            <span>${project.name}</span>
            <button onclick="viewProjectDetails(${project.id})">View</button>
            <button onclick="deleteProject(${project.id})">Delete</button>
        `;
    projectsList.appendChild(projectItem);
  });
}

function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function viewProjectDetails(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    projectDetails.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
        `;
  } else {
    projectDetails.innerHTML = "<p>Project not found.</p>";
  }
}

function deleteProject(projectId) {
  projects = projects.filter((p) => p.id !== projectId);
  saveProjectsToLocalStorage();
  renderProjects();
}
