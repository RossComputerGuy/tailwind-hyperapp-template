#!/usr/bin/env node

const path = require('path');
const server = require(path.join(__dirname, '..', 'dist', 'server.cjs'));
server();
