"use client";

import {acceptTransferRequest, declineTransferRequest} from "@/lib/data/orders";
import ErrorMessage from "@/modules/checkout/components/error-message";
import {Button, Text} from "@medusajs/ui";
import {useState} from "react";

type TransferStatus = "error" | "pending" | "success";

const TransferActions = ({id, token}: {id: string; token: string}) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [status, setStatus] = useState<{
    accept: TransferStatus | null;
    decline: TransferStatus | null;
  } | null>({
    accept: null,
    decline: null,
  });

  const acceptTransfer = async () => {
    setStatus({accept: "pending", decline: null});
    setErrorMessage(null);

    const {error, success} = await acceptTransferRequest(id, token);

    if (error) setErrorMessage(error);
    setStatus({accept: success ? "success" : "error", decline: null});
  };

  const declineTransfer = async () => {
    setStatus({accept: null, decline: "pending"});
    setErrorMessage(null);

    const {error, success} = await declineTransferRequest(id, token);

    if (error) setErrorMessage(error);
    setStatus({accept: null, decline: success ? "success" : "error"});
  };

  return (
    <div className="flex flex-col gap-y-4">
      {status?.accept === "success" && (
        <Text className="text-emerald-500">
          Order transferred successfully!
        </Text>
      )}
      {status?.decline === "success" && (
        <Text className="text-emerald-500">
          Order transfer declined successfully!
        </Text>
      )}
      {status?.accept !== "success" && status?.decline !== "success" && (
        <div className="flex gap-x-4">
          <Button
            disabled={
              status?.accept === "pending" || status?.decline === "pending"
            }
            isLoading={status?.accept === "pending"}
            onClick={acceptTransfer}
            size="large"
          >
            Accept transfer
          </Button>
          <Button
            disabled={
              status?.accept === "pending" || status?.decline === "pending"
            }
            isLoading={status?.decline === "pending"}
            onClick={declineTransfer}
            size="large"
            variant="secondary"
          >
            Decline transfer
          </Button>
        </div>
      )}
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </div>
  );
};

export default TransferActions;
