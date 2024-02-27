import crypto from 'crypto';
import https from 'https';
import axios from "axios";

/**
 * Handle this problem with Node 18
 * write EPROTO B8150000:error:0A000152:SSL routines:final_renegotiate:unsafe legacy renegotiation disabled
 * see https://stackoverflow.com/questions/74324019/allow-legacy-renegotiation-for-nodejs/74600467#74600467
 **/
const allowLegacyRenegotiationforNodeJsOptions = {
  httpsAgent: new https.Agent({
    // for self signed you could also add
    // rejectUnauthorized: false,
    // allow legacy server
    secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
  }),
};

export async function postRequest(url, headers, data) {
  const response =  axios({
    ...allowLegacyRenegotiationforNodeJsOptions,
    url,
    headers: headers,
    method: 'POST',
    data: data,
    validateStatus: () => true,
  });
  return response
}