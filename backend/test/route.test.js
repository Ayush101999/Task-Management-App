const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/notesSchema');
const route = require('../routes/route'); // Adjust the path as necessary
const chai = require('chai');
const expect = chai.expect;
const connectToMongo = require('../db'); // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use('/api/notes', route);

describe('Notes API', () => {
  before(async () => {
    // Connect to a test database
    await connectToMongo('mongodb://127.0.0.1:27017/taskManagementTest');
  });

  after(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the test database before each test
    await Note.deleteMany({});
  });

  describe('GET /api/notes/fetchallnotes', () => {
    it('should return all notes', async () => {
      const note = new Note({
        title: 'Test Note',
        status: 'pending',
        desc: 'Test Description',
        date: new Date(),
        priority: 'high',
      });
      await note.save();

      const res = await request(app).get('/api/notes/fetchallnotes');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(1);
      expect(res.body[0]).to.have.property('title', 'Test Note');
    });
  });

  describe('POST /api/notes/addnote', () => {
    it('should add a new note', async () => {
      const noteData = {
        title: 'New Note',
        status: 'pending',
        desc: 'New Description',
        date: new Date(),
        priority: 'medium',
      };

      const res = await request(app).post('/api/notes/addnote').send(noteData);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'New Note');
    });

    it('should return an error if the note already exists', async () => {
      const note = new Note({
        title: 'Duplicate Note',
        status: 'pending',
        desc: 'Duplicate Description',
        date: new Date(),
        priority: 'low',
      });
      await note.save();

      const res = await request(app).post('/api/notes/addnote').send({
        title: 'Duplicate Note',
        status: 'pending',
        desc: 'Duplicate Description',
        date: new Date(),
        priority: 'low',
      });
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('success', 'error');
      expect(res.body).to.have.property('errors', 'Task Already Exists');
    });
  });

  describe('PUT /api/notes/updatenote/:id', () => {
    it('should update an existing note', async () => {
      const note = new Note({
        title: 'Update Note',
        status: 'pending',
        desc: 'Update Description',
        date: new Date(),
        priority: 'low',
      });
      await note.save();

      const res = await request(app)
        .put(`/api/notes/updatenote/${note._id}`)
        .send({ title: 'Updated Note' });
      expect(res.status).to.equal(200);
      expect(res.body.note).to.have.property('title', 'Updated Note');
    });

    it('should return an error if the note is not found', async () => {
      const res = await request(app)
        .put('/api/notes/updatenote/60c72b2f9b1d8c1a4c8b4567')
        .send({ title: 'Non-existent Note' });
      expect(res.status).to.equal(400);
      expect(res.text).to.equal('not found');
    });
  });

  describe('DELETE /api/notes/deletenote/:id', () => {
    it('should delete an existing note', async () => {
      const note = new Note({
        title: 'Delete Note',
        status: 'pending',
        desc: 'Delete Description',
        date: new Date(),
        priority: 'low',
      });
      await note.save();

      const res = await request(app).delete(`/api/notes/deletenote/${note._id}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', 'Sucessfully deleted');
    });

    it('should return an error if the note is not found', async () => {
      const res = await request(app).delete('/api/notes/deletenote/60c72b2f9b1d8c1a4c8b4567');
      expect(res.status).to.equal(400);
      expect(res.text).to.equal('not found');
    });
  });
});