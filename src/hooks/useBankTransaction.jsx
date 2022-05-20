import { useEffect, useState } from "react";
import axios from "axios";
import { useMoralis } from "react-moralis";

const useBankTransactions = () => {
  const { user } = useMoralis();
  const [response, setResponse] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const listAccounts = () => {
    if (user) {
      const bankId = user.get("bankId");
      axios
        .post("http://localhost:5200/list", { id: bankId })
        .then(({ data }) =>
          data.accounts.forEach((acc) =>
            axios
              .post("http://localhost:5200/account", { id: acc })
              .then(({ data }) => setResponse(data))
              .catch((err) => setError(err))
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
