import type { OnTransactionHandler } from '@metamask/snaps-sdk';
import { heading, panel, text } from '@metamask/snaps-sdk';
import type { OnRpcRequestHandler } from "@metamask/snaps-sdk";

/**
 * Handle incoming JSON-RPC requests, sent through wallet_invokeSnap.
 *
 * @param args - The request handler arguments as an object.
 * @param args.origin - The origin of the request, e.g., the website that invoked the Snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of snap_dialog.
 * @throws If the request method is not valid for this Snap.
 */
 export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case "hello":
      return snap.request({
        method: "snap_dialog",
        params: {
          type: "confirmation",
          content: panel([
            text(`Hello, **${origin}**!`),
            text("This custom confirmation is just for display purposes."),
            text(
              "But you can edit the Snap source code to make it do something, if you want to!",
            ),
          ]),
        },
      });
    default:
      throw new Error("Method not found.");
  }
};

export const onTransaction: OnTransactionHandler = async ({ transaction, chainId }) => {

  // Get fields from the transaction object.
  const gas=Number(transaction.gas)
  const value=Number(transaction.value)
  const randomTxHash=(Math.random() + 1).toString(36).substring(2)
  const networkId = chainId.split(':', 2)[1]

  const latestBlock = await ethereum.request({
    method: "eth_blockNumber"
  })

  const post_data = {
    "network_id": networkId,
    "tx_hash": randomTxHash,
    "block_number": 20009777,//TODO: Need to change this so it gets the latest block number
    "from_address": transaction.from,
    "to_address": transaction.to,
    "gas": gas,
    "value": value,
    "input": transaction.data || "",
    "transaction_index": 0,
  }

  const settings = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(post_data)
};
  try {
    const fetchResponse = await fetch(`${process.env.API_URL}/v1/transaction/snap`, settings)
    const data = await fetchResponse.json();

    const insights = data.split('\n')
    return {
      content: panel([
        ...insights.map((insight: string) => text(insight)),
      ]),
    };
  } catch (e) {
    var err = e;
    return {
      content: panel([
        heading("Debug"),
        text(JSON.stringify(post_data)),
      ]),
    }
  }
};
