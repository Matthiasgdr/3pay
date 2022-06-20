import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";

const useBankTransactions = () => {
  const { user } = useUser();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const listAccounts = () => {
    if (user && !response) {
      const bankId = user.get("bankId");
      axios
        .post(process.env.REACT_APP_BANK_PROXY_URL + "/list", { id: bankId })
        .then(({ data }) =>
          data.accounts.forEach((acc) =>
            axios
              .post(process.env.REACT_APP_BANK_PROXY_URL + "/account", {
                id: acc,
              })
              .then(({ data }) => setResponse(data))
              .catch((err) => {
                setError(err);
                setLoading(false);
              })
              .finally(() => {
                setLoading(false);
              })
          )
        );
    }
  };

  useEffect(() => {
    listAccounts();
  }, [user]);

  return { response, error, loading };
};

export default useBankTransactions;
