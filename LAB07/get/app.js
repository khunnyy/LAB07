const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

loadUserBtn.addEventListener("click", async () => {
  statusDiv.textContent = "Loading...";
  loadUserBtn.disabled = true;

  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";

  try {
    const res = await fetch("https://randomuser.me/api/");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    const user = data.results[0];

    resultDiv.innerHTML = `
  <p class="font-semibold mt-2">
    ${user.name.first} ${user.name.last}
  </p>

  <p class="text-sm text-gray-700 mb-2">
    Email: ${user.email}
  </p>

  <img
    src="${user.picture.large}"
    alt="avatar"
    class="w-32 h-32 object-cover rounded mt-1"
  />
`;

    resultDiv.classList.remove("hidden");

    statusDiv.textContent = "Loaded successfully.";
  } catch (err) {
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    loadUserBtn.disabled = false;
  }
  const clearBtn = document.getElementById("btnClear");

  clearBtn.addEventListener("click", () => {
  statusDiv.textContent = "";
  resultDiv.innerHTML = "";
  resultDiv.classList.add("hidden");
});

});
