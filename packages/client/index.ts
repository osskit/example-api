import * as global from 'window-or-global';

if (!global.FormData) {
  try {
    global.FormData = require('form-data');
  } catch (e) {}
}

export * from './generated/apis';
export * from './generated/models';
export { Configuration } from './generated/runtime';
