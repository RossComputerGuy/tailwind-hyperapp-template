#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, extname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import(join(__dirname, '..', `server${extname(__filename)}`));
