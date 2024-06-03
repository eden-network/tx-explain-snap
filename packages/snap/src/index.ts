import type { OnTransactionHandler } from '@metamask/snaps-sdk';
import { heading,panel, text } from '@metamask/snaps-sdk';


export const onTransaction: OnTransactionHandler = async ({ transaction,chainId,transactionOrigin, }) => {



  // Get fields from the transaction object.
  var from=transaction.from
  var to=transaction.to
  var gas=Number(transaction.gas)
  var value=Number(transaction.value)
  var input=transaction.data
  var random_hash=(Math.random() + 1).toString(36).substring(2)
  var post_data={
    "network_id": chainId,
    "tx_hash": random_hash,
    "block_number": 20009777,//TODO: Need to change this so it gets the latest block number
    "from_address": from,
    "to_address": to,
    "gas": gas,
    "value": value,
    "input": input,
    "transaction_index": 0, //IMPORTANT: This is not needed for tenderly but it is required in the backend, need to change the backend
    "recaptcha_token": "03AFcWeA4Wbf99o28wj_I-RgbHd-ID5zMeCxtHapexuvJYc2r1o3Iv-lsPlzbPlK-c0Y_78lnDAqaC1iP-Oi4wus7MPnRiCVRU2fFZoy5L0nzF3e13O3HQmM4JiVFaWi7Vbty15QFEHu1ITTMaKsYZOFzughiUxMSHoWZVKompc6X2qXYx1HQlbqPXKy-pA96Y-xdg-9BnaqURv9twFClsRp9FDBUcmbR3Yco-sGjhtAf8ucxuT0mX0Ds__AD31B2cCWES7pEMiyCDZIweb892_2zvA-FhHgoTZ0DDA9ek8RnkmnzHuzHkLWy-xCKAKwrY3ODUQXRk3WxKV5C16nKH2mmLNFkYMkIvBaCjfUenjTV746XPRLg1IjI4iHCBs_ZDhyU4AbMAChHX01-eQeAYkRPesxQ2jDCZDDgVl05OzZ0ilZgewYUG4DQ3CZL83puxNGxEmNrzRv6dzv0MvTzzGDT1eWLO5e5eq_wx48XreIfdE6O6_4noHm4RbkfucwOLofTJXJn5Z8klzuiSCkhCygZVekLLjzHyjzDspRKXHvtAtFtKlyKbQKzk0ojAy_bf155HcJBavAsfcZd-zLlcKpESZi4lOI3bVlC3YQygCN9o1bjADO0w0LPrzsEDQFbIgDt9DgQ3V4toLPHQq7SftD4P1T23mAgDpzK64qmQR5ysHFn_LaJMD3AsFCzJJlx218lJhuW9DffXi8jCbuTqu_OqlB7dXyXYS-cwHG9zvfDUBgtqJMwWKF8AJEqyZoF26Tp6GhxmFg9nzRS7K74Qeh2xbIik7uLibT3QDnAe3EDNIU9ibuEdu6UEbtnPfyaqr6pHGeffab0X3tssDve_1nN58yRbY8ynEtzGFN5JJsYWgZtRDp04xMHq9_EqbkSYso95ggSGNw9TgSGGSQzcpAbgnnmw5_Xfx2dVxyBGXs5sWS_Gv6Px1T8B_nrjmjZWrMRdJr6ESctbCa7rMx27QkVeKzravkMGfYBboNOqvnZVeGcsNwJojMeQmU9y3allcViavQvUPWgar0Af-_-q5JpQ5Pm0TgvEk2ZUaum8aPj3YtUmmXvgc0m6f37XduSjoWXDNfz6vHtIjcrfZI7qh42-ZOGe17sCDWcUh7ftnc39d5T0pUQ35ZSuTbAb0yrhaHqctjanJvOV0rmpDixuGLNLVPYD3XckciASzhPoQjK5gO7Vh3jceAG6ITlxZ1Co7NO-y5buaO7BWdCBMjMg-Nb3fP_2PuEyx3ZMM3tKkOU_onnYmcAf9ZcUsqWUjbf4NNfVHiVdgl8jaEEI4aqntRAeL8_yvLxGK7mht9H6tCAyykZCorCrX0T8OJpq9RXocR_4tVaqlXAtbp3-GMikMLjPSiRdo5Ns8HN7eNq3XCLou63OKWfmDUsvcOqf5fTcvk2O1Ibk66B3A3MzY4wOcDYUY-C-Y91i0tQtjgtl8uctSWIb2fkagFjjdV3VPHOfJbSFX81Oj3d7bR3HwmszYtIi5IHF72JAB7lRILcMk1RgS6Gz3ZvQv5EZlZ7j4fv4XjmR0nYragQyfUGETufJPtC67IGTMM_7PDvOWLmH0EX48glOO6I-M7EOjuFhA4eQFxgrlNjUJhQra-fVXdpYk8543xxNQg5xd1Um4nO4HUVplR_Qg-KZ7vED--vHfS6UDGij7IVWTep7t6ufpw6A0_CN6OCRgsclmLO26EM3Mdp2-IC-fgb4BuJAWPDxOPRt62bjGJsDUurjZyza7MvvcsUGdRMhadKvbQ"
}
  const settings = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test'
    },
    body:JSON.stringify(post_data)
};
try {
    const fetchResponse = await fetch(`http://localhost:5002/v1/transaction/simulate_pending`, settings );
    //TODO: Need to change backend so it does not do streaming response
    var data = await fetchResponse.json();
    var post_data2={
      "network" :chainId,
      "transactions": [
        //TODO: Need to check what is actually needed here...
        data
          
      ],
      "model": "claude-3-haiku-20240307",
      "system": "You are an Ethereum blockchain researcher tasked with concisely summarizing the key steps of transactions. For the given transaction data, your summary should adhere to the following guidelines:\n\n- Provide a detailed but concise summary of the transaction overall. This summary should be no longer than 3 sentences.\n- Provide a bulleted list of the critical steps in the transaction, focusing on the core actions taken and the key entities involved (contracts, addresses, tokens, etc.). IMPORTANT: Each step should be listed in the same order as it is found in the call trace.\n- IMPORTANT: If the transaction status is false then the transaction fails. When it fails, none of the steps in the transaction succeed. Work backwards from the last step in the call trace to identify which step caused the error.\n- Each bullet should be 1-2 concise sentences \n- Include specific and accurate details like token amounts, contract names, function names, and relevant addresses\n- Avoid speculation, commentary, or extraneous details not directly related to the transaction steps\n- Carefully review your summary to ensure factual accuracy and precision\n",
      "force_refresh": false,
      "recaptcha_token": "emptyForLocalTesting"
    }
    const settings2 = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test'
      },
      body:JSON.stringify(post_data2)
    };
    try {
      const fetchResponse = await fetch(`http://localhost:5002/v1/transaction/explain`, settings2 );
      var data2 = await fetchResponse.json();
      
    } catch (e) {
      var err= e;
    } 
} catch (e) {
    var err= e;
}  



  return {
    content: panel([
      heading("Tx explain"),
      text(
        `THIS IS DEMO, showing simulation result: **${JSON.stringify(data2)}**`
      ),
    ]),
  };
};
