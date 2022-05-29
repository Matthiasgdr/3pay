import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../hooks/useUser";

const useBankTransactions = () => {
  const { user } = useUser();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);

  const listAccounts = () => {
    if (user && !response) {
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
