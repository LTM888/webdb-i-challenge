const express = require('express');

const server = express();


const db = require("./data/dbConfig.js");
// your code here

server.get('/', async (req, res) => {
    try {
      const db = await db.find(res.body);
      res.status(200).json(db);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Account',
      });
    }
  });
  
  server.get('/:id', async (req, res) => {
    try {
      const account = await db.findById(res.params.id);
  
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Account',
      });
    }
  });
  
  server.post('/', async (req, res) => {
    try {
      const account = await db.add(res.body);
      res.status(201).json(account);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the Account',
      });
    }
  });
  
  server.delete('/:id', async (req, res) => {
    try {
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The Account has been nuked' });
      } else {
        res.status(404).json({ message: 'The Account could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the Account',
      });
    }
  });
  
  server.put('/:id', async (req, res) => {
    try {
      const account = await db.update(req.params.id, req.body);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'The Account could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });
  
  
  server.get('/:id/db', (req, res) => {
    Hubs.findById(req.params.id)
      .then(id => {
        res.status(200).json(id);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  
  

module.exports = server;