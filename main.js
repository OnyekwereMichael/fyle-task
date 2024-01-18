let currentPage = 1;
let repositoriesPerPage = 10;

function getRepos() {
    const username = document.getElementById('username').value;
    repositoriesPerPage = parseInt(document.getElementById('perPage').value);
    const url = `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${repositoriesPerPage}`;

    document.getElementById('loader').style.display = 'block';

    fetch(url)
        .then(response => response.json())
        .then(repos => {
            const reposList = document.getElementById('repos');
            reposList.innerHTML = ''; // Clear previous results

            if (Array.isArray(repos) && repos.length > 0) {
                repos.forEach(repo => {
                    const listItem = document.createElement('li');
                    listItem.className = 'repo';
                    listItem.innerHTML = `
                        <h3>${repo.name}</h3>
                        <p>${repo.description || 'No description available.'}</p>
                        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                    `;
                    reposList.appendChild(listItem);
                });
            } else {
                const noResults = document.createElement('li');
                noResults.textContent = 'No repositories found.';
                reposList.appendChild(noResults);
            }

            document.getElementById('loader').style.display = 'none';
            updatePagination();
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            document.getElementById('loader').style.display = 'none';
        });
}

function updatePagination() {
    document.getElementById('currentPage').textContent = currentPage;
}

function nextPage() {
    currentPage++;
    getRepos();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        getRepos();
    }
}