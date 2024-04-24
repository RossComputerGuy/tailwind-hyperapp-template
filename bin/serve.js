#!/usr/bin/env node

import path from 'path';
import(path.join(new URL('.', import.meta.url).pathname, '..', 'dist', 'server.cjs'));
