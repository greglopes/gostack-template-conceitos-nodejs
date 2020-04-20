const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const likes = 0;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes
  }

  repositories.push(repository);

  return response.json(repository);
  
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id );
  if(repositoryIndex < 0 ){
    return response.status(400).json({error: "Repository not found."});
  } else {
    const { title, url, techs } = request.body;
    const likes = repositories[repositoryIndex].likes;
    repository = { id, title, url, techs, likes };
    repositories[repositoryIndex] = repository;
    return response.json(repository);
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id );
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found."});
  } else {
    repositories.splice(repositoryIndex, 1);
    return response.status(204).send();
  }
});

app.put("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id );
  if(repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found." });
  } else {
    const { id, title, url, techs, likes } = repositories[repositoryIndex];
    const newLikes = likes + 1;
    const updatedRepository = { id, title, url, techs, likes: newLikes }
    repositories[repositoryIndex] = updatedRepository;
    return response.json(updatedRepository);
  }
});

module.exports = app;
