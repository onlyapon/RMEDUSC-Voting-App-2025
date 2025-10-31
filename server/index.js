const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

const dbPath = path.join(__dirname, '../database');

// API endpoints
app.get('/api/election-data', (req, res) => {
  const positions = JSON.parse(fs.readFileSync(path.join(dbPath, 'positions.json')));
  const candidates = JSON.parse(fs.readFileSync(path.join(dbPath, 'candidates.json')));
  res.json({ positions, candidates });
});

app.post('/api/vote', (req, res) => {
  const votes = JSON.parse(fs.readFileSync(path.join(dbPath, 'votes.json')));
  const newVote = req.body;
  votes.push(newVote);
  fs.writeFileSync(path.join(dbPath, 'votes.json'), JSON.stringify(votes, null, 2));
  res.json({ message: 'Vote cast successfully' });
});

app.get('/api/results', (req, res) => {
  const votes = JSON.parse(fs.readFileSync(path.join(dbPath, 'votes.json')));
  const positions = JSON.parse(fs.readFileSync(path.join(dbPath, 'positions.json')));
  const candidates = JSON.parse(fs.readFileSync(path.join(dbPath, 'candidates.json')));

  const results = {};

  positions.forEach(position => {
    results[position.id] = {
      name: position.name,
      candidates: {},
    };
    const positionCandidates = candidates.filter(c => c.positionId === position.id);
    positionCandidates.forEach(candidate => {
      results[position.id].candidates[candidate.id] = {
        name: candidate.name,
        votes: 0,
      };
    });
  });

  votes.forEach(vote => {
    Object.keys(vote.selection).forEach(positionId => {
      const selectedCandidates = vote.selection[positionId];
      if (Array.isArray(selectedCandidates)) {
        selectedCandidates.forEach(candidateId => {
          if (results[positionId] && results[positionId].candidates[candidateId]) {
            results[positionId].candidates[candidateId].votes++;
          }
        });
      } else {
        const candidateId = selectedCandidates;
        if (results[positionId] && results[positionId].candidates[candidateId]) {
          results[positionId].candidates[candidateId].votes++;
        }
      }
    });
  });

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
