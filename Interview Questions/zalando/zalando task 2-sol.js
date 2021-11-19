'use strict';

const express = require('express');
const app = express();
app.use(express.json());

// Your code starts here. Placeholders for .get and .post are provided for
//  your convenience.
const candidateMap = {};
const skillMap = {};

app.post('/candidates', function (req, res) {
    const candidate = req.body;
    const cid = candidate.id;
    // the hell!! checking for candidate.skills.length here was giving timeout error initially
    // if (candidate?.skills?.length) {
        candidate.skills.forEach(skill => {
            if (skillMap[skill]) {
                skillMap[skill].push(cid);
            } else {
                skillMap[skill] = [cid];
            }
        });
        candidateMap[candidate.id] = candidate;
        res.set('Content-Type', 'application/json').sendStatus(200);
    // }
    // res.sendStatus(400);
});

const getBestCandidate = (skillsToSearch) => {
    const eligibleCandidates = {};
    let maxCandMatches = -1;
    let bestCandidateId = null;
    for (let s = 0; s < skillsToSearch.length; s++) {
        const skill = skillsToSearch[s];
        const candidatesWithSkill = skillMap[skill];
        if (candidatesWithSkill) {
            for (let c = 0; c < candidatesWithSkill.length; c++) {
                const cwskill = candidatesWithSkill[c];
                eligibleCandidates[cwskill] = eligibleCandidates[cwskill] ? eligibleCandidates[cwskill] + 1 : 1;
                if (eligibleCandidates[cwskill] === skillsToSearch.length) {
                    return candidateMap[cwskill];
                }
                if (eligibleCandidates[cwskill] > maxCandMatches) {
                    bestCandidateId = cwskill;
                    maxCandMatches = eligibleCandidates[cwskill];
                }
            }
        }
    }
    return bestCandidateId && candidateMap[bestCandidateId];
};

app.get('/candidates/search', function (req, res) {
    if (req.query.skills) {
        const skillsQuery = req.query.skills.split(',').map(s => s.trim());
        const bestCandidate = getBestCandidate(skillsQuery);
        if (bestCandidate) {
            res.json(bestCandidate);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(400);
    }
});

app.listen(process.env.HTTP_PORT || 3000);
