// Carga Playwright igual en la nube (/opt/node-tools) y en un computador local (node_modules de fuente/3d).
// En local, si Playwright no descargó su propio Chromium, usa el Google Chrome instalado (channel: 'chrome').
const path = require('path');
let pw;
try { pw = require('/opt/node-tools/node_modules/playwright'); } catch { pw = require(path.join(__dirname, 'node_modules', 'playwright')); }
const launch0 = pw.chromium.launch.bind(pw.chromium);
pw.chromium.launch = async (opts = {}) => {
  try { return await launch0(opts); }
  catch (e) {
    if (!/Executable doesn't exist|browserType\.launch/i.test(e.message) || opts.channel) throw e;
    return launch0({ ...opts, channel: 'chrome' });
  }
};
module.exports = pw;
