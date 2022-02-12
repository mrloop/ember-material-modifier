#!/usr/bin/env node

import https from 'node:https';
import Url from 'node:url';
import { readFile, writeFile } from 'node:fs/promises';

const url = new URL('https://unpkg.com/material-components-web@latest/package.json');

async function request({ host, path }) {
  return new Promise((resolve, reject) => {
    https.get({ host, path }, (res) => {
      if (res.statusCode === 302) {
        let loc = res.headers.location;
        if (loc.match(/^http/)) {
          url = new Url(loc)
          host = url.host;
          path = url.pathname;
        } else {
          path = loc;
        }
        resolve(request({ host, path: loc }));
      } else {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('error', err => {
          reject(err);
        });
        res.on('end', () => {
          const json = JSON.parse(data);
          resolve(json);
        });
      }
    });
  });
};

async function updatePeerDependencies(dependencies) {
  let pkg = JSON.parse(await readFile('package.json', 'utf8'));
  Object.entries(dependencies).forEach(([name]) => {
    pkg.peerDependencies[name] = "*";
    pkg.peerDependenciesMeta[name] = {
      optional: true
    };
  });
  pkg.peerDependencies = Object.fromEntries(Object.entries(pkg.peerDependencies).sort());
  pkg.peerDependenciesMeta = Object.fromEntries(Object.entries(pkg.peerDependenciesMeta).sort());
  let data = JSON.stringify(pkg, null, 2);
  await writeFile('package.json', data);
}

try {
  const { host, pathname: path } = url;
  let { dependencies } = await request({ host, path} )
  updatePeerDependencies(dependencies);
} catch (err) {
  console.error(err);
}
