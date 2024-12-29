const form = document.getElementById("search-form");
const usernameInput = document.getElementById("username");
const profileContainer = document.getElementById("profile-container");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();

  if (username) {
    const url = `https://api.github.com/users/${username}`;
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error("User not found");
      const data = await response.json();
      displayProfile(data);
    } catch (error) {
      profileContainer.innerHTML = `<p class="error">${error.message}</p>`;
    }
  }
});

function displayProfile(profile) {
  profileContainer.innerHTML = `
      <div class="profile-card">
        <div class="profile-header">
          <img class="profile-avatar" src="${profile.avatar_url}" alt="${profile.name}">
          <h2 class="profile-name">${profile.name || "No Name"}</h2>
          <p class="profile-bio">${profile.bio || "No bio available"}</p>
        </div>
        <div class="profile-stats">
          <div class="stat">
            <strong>Followers</strong>
            <p>${profile.followers}</p>
          </div>
          <div class="stat">
            <strong>Following</strong>
            <p>${profile.following}</p>
          </div>
          <div class="stat">
            <strong>Public Repos</strong>
            <p>${profile.public_repos}</p>
          </div>
        </div>
        <div class="profile-link">
          <a href="${profile.html_url}" target="_blank">View GitHub Profile</a>
        </div>
      </div>
    `;
}
