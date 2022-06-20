import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./useUser";

const useBankAccount = () => {
  const { user } = useUser();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDetails = () => {
    if (user && !response) {
      const bankId = user.get("bankId");
      if (bankId) {
        axios
          .post(process.env.REACT_APP_BANK_PROXY_URL + "/list", { id: bankId })
          .then(({ data }) =>
            data.accounts.forEach((acc) =>
              axios
                .post(process.env.REACT_APP_BANK_PROXY_URL + "/details", {
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
      } else {
        setError("Compte en banque non connecté");
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getDetails();
  }, [user]);

  return { response, error, loading };
};

export default useBankAccount;
