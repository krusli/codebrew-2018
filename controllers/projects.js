const express = require('express');
const router = express.Router();

const globals = require('../globals');
const mongoose = globals.mongoose;
const winston = globals.winston;
const upload = globals.upload;

const Project = require('../models/project');

let handleError = (res, err) => {
  if (err.toString() == 'ProjectNotFound') {
    winston.debug('ProjectNotFound');
    res.send({});
  }
  else
    winston.debug(err);
}

// get projects
router.get('/', (req, res) => {
  Project.find()
  .then(projects => res.send(projects));
})

// get a project
router.get('/:projectID', (req, res) => {
  let id = req.params.projectID;

  Project.findOne({_id: id})
  .then(project => {
    if (!project)
      throw 'ProjectNotFound'

    res.send(project);

  })
  .catch(err => handleError(res, err));
})

// create a new project
router.post('/', (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let until = Date.parse(req.body.until);
  let author = req.body.author;

  Project.create(req.body)
  .then(project => {
    winston.debug(project);
    winston.debug('Project created successfully');

    res.send(project);
  })
  .catch(err => {
    winston.debug(err);
    res.status(400).send();
  })
})

router.delete('/:projectID', (req, res) => {
  let id = req.params.id;

  Project.findOne({_id: id})
  .then(project => {
    if (!project)
      throw 'ProjectNotFound'

    // else
    return project.delete();
  })
  .then(() => {
    winston.debug('Project deleted.');
    res.send({});
  })
  .catch(err => handleError(res, err));
})

// modify a project by ID
router.post('/:projectID', (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let until = Date.parse(req.body.until);
  let id = req.params.id;

  Project.findOne({_id: id})
  .then(project => {
    if (!project)
      throw 'ProjectNotFound'

    // else
    if (title)
      project.title = title;
    if (description)
      project.description = description;
    if (until)
      project.until = until;

    return project.save();
  })
  .then(project => {
    winston.debug('Saved project.');
    res.send(project);
  })
  .catch(err => handleError(res, err));
})

// upload profile pic. TODO STUB
router.post('/:projectID/profilepic', upload.single('pic'), (req, res) => {
  let id = req.body.id;
  let file = req.file;

  if (id) {
    // TODO STUB
  } else {
    res.send();
  }

});


// new contribution
router.post('/:projectID/contributor', (req, res) => {
  // sketch: append to contributors, add current

})

module.exports = router;
