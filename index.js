const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const consola = require('consola');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/3', {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});

(async () => {

  consola.start(`
┈┈┈╲┈┈┈┈╱
┈┈┈╱▔▔▔▔╲
┈┈┃┈▇┈┈▇┈┃
╭╮┣━━━━━━┫╭╮
┃┃┃┈┈┈┈┈┈┃┃┃
╰╯┃┈┈┈┈┈┈┃╰╯
┈┈╰┓┏━━┓┏╯
┈┈┈╰╯┈┈╰╯ SC PRIVATE CUY MODEL RENAME

`);

  const auth = rs.question('MASUKIN KODE AUTHNYA COY');
  consola.warn('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      consola.error('Authentication Code Not Valid');

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

(consola.info(` [ ${moment().format('HH:mm:ss')} ] ${consola.info(`User : ${username}`)} ${consola.info(`Server : ${country}`)} ${consola.info(`Trophy : ${trophy}`)} ${consola.info(`Crown : ${crown}`)}`));
      await sleep(6500);

    } else if (result == 'BANNED') {
      console.log(consola.error(`Your Account has been Banned`));
     break
    }
  }


})();
