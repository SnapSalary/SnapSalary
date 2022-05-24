import AWS from 'aws-sdk';
import {rdsSecret} from './types';

let secret: rdsSecret;

export const getRDSSecret = (): Promise<rdsSecret> => {
  const region = 'us-west-2';
  const client = new AWS.SecretsManager({region});

  const SecretId = 'RDS_SECRET';
  return new Promise((resolve, reject) => {
    if (secret === undefined) {
      console.log('RDS keys not found in storage');
      client.getSecretValue({SecretId}, (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (data.SecretString) {
            secret = JSON.parse(data.SecretString);
            resolve(secret);
          }
        }
      });
    } else {
      resolve(secret);
    }
  });
};
