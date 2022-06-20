import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import { useMoralis, useTokenPrice } from "react-moralis";
import InchModal from "./Modal";
import useInchDex from "../../hooks/useInchIndex";
import { Button, Card, Image, Text, Input, Modal, Box } from "@mantine/core";
import { tokenValue } from "./helpers/formatters";
import { getWrappedNative } from "./helpers/networks";

const styles = {
  card: {
    width: "430px",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    fontSize: "16px",
    fontWeight: "500",
  },
  input: {
    padding: "0",
    fontWeight: "500",
    fontSize: "23px",
    display: "block",
    width: "100%",
  },
  priceSwap: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    color: "#434343",
    marginTop: "8px",
    padding: "0 10px",
  },
};

const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const chainIds = {
  "0x1": "eth",
  "0x38": "bsc",
  "0x89": "polygon",
};

const getChainIdByName = (chainName) => {
  for (let chainId in chainIds) {
    if (chainIds[chainId] === chainName) return chainId;
  }
};

const IsNative = (address) => address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

function InchDex({ chain }) {
  const { trySwap, tokenList, getQuote } = useInchDex(chain);

  const { Moralis, isInitialized, chainId } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState();
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});
  console.log(fromAmount)

  const fromTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[fromToken?.["address"]] ? tokenPricesUSD[fromToken?.["address"]] : null),
    [tokenPricesUSD, fromToken]
  );

  const toTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[toToken?.["address"]] ? tokenPricesUSD[toToken?.["address"]] : null),
    [tokenPricesUSD, toToken]
  );

  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(4)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    if (!toTokenPriceUsd || !quote) return null;
    return `~$ ${(Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) * toTokenPriceUsd).toFixed(4)}`;
  }, [toTokenPriceUsd, quote]);

  // tokenPrices
  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(fromToken["address"]) ? getWrappedNative(validatedChain) : fromToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken["address"]]: price["usdPrice"],
        }),
    });
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken["address"]) ? getWrappedNative(validatedChain) : toToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [toToken["address"]]: price["usdPrice"],
        }),
    });
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokenList) return null;
    setFromToken(tokenList[nativeAddress]);
  }, [tokenList]);
  console.log(tokenList)

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain) return { isActive: false, text: `Switch to ${chain}` };

    if (!fromAmount) return { isActive: false, text: "Enter an amount" };
    if (fromAmount && currentTrade) return { isActive: true, text: "Swap" };
    return { isActive: false, text: "Select tokens" };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount) setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (currentTrade) getQuote(currentTrade).then((quote) => setQuote(quote));
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.["address"]]) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    console.log(Quote);
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken["decimals"]) / tokenValue(toTokenAmount, toToken["decimals"])
    ).toFixed(6);
    return (
      <Text sx={styles.priceSwap}>
        Price:{" "}
        <Text>{`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[[toToken["address"]]].toFixed(
          6
        )})`}</Text>
      </Text>
    );
  };

  return (
    <>
      <Card sx={styles.card} style={{ padding: "18px" }}>
        <Card sx={{ borderRadius: "1rem" }} style={{ padding: "0.8rem" }}>
          <Box sx={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>From</Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <Box>
              <Input
                placeholder="0.00"
                styles={{ ...styles.input, marginLeft: "-10px" }}
                onChange={e => setFromAmount(e.target.value)}
                value={fromAmount}
              />
              <Text sx={{ fontWeight: "600", color: "#434343" }}>{fromTokenAmountUsd}</Text>
            </Box>
            <Button
              sx={{
                height: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0.6rem",
                padding: "5px 10px",
                fontWeight: "500",
                fontSize: "17px",
                gap: "7px",
                border: "none",
              }}
              onClick={() => setFromModalActive(true)}
            >
              {fromToken ? (
                <Image
                  src={fromToken?.logoURI || "https://etherscan.io/images/main/empty-token.png"}
                  alt="nologo"
                  width="30px"
                  preview={false}
                  sx={{ borderRadius: "15px" }}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{fromToken?.symbol}</span>
              <Arrow />
            </Button>
          </Box>
        </Card>
        <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          \/
        </Box>
        <Card sx={{ borderRadius: "1rem" }} style={{ padding: "0.8rem" }}>
          <Box sx={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>To</Box>
          <Box
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <Box>
              <Input
                placeholder="0.00"
                styles={styles.input}
                readOnly
                value={quote ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6) : ""}
              />
              <Text sx={{ fontWeight: "600", color: "#434343" }}>{toTokenAmountUsd}</Text>
            </Box>
            <Button
              sx={{
                height: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0.6rem",
                padding: "5px 10px",
                fontWeight: "500",
                fontSize: "17px",
                gap: "7px",
                border: "none",
              }}
              onClick={() => setToModalActive(true)}
              type={toToken ? "default" : "primary"}
            >
              {toToken ? (
                <Image
                  src={toToken?.logoURI || "https://etherscan.io/images/main/empty-token.png"}
                  alt="nologo"
                  width="30px"
                  preview={false}
                  sx={{ borderRadius: "15px" }}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{toToken?.symbol}</span>
              <Arrow />
            </Button>
          </Box>
        </Card>
        {quote && (
          <Box>
            <Text
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                color: "#434343",
                marginTop: "8px",
                padding: "0 10px",
              }}
            >
              Estimated Gas: <Text>{quote?.estimatedGas}</Text>
            </Text>
            <PriceSwap />
          </Box>
        )}
        <Button
          type="primary"
          size="large"
          sx={{
            width: "100%",
            marginTop: "15px",
            borderRadius: "0.6rem",
            height: "50px",
          }}
          onClick={() => trySwap(currentTrade)}
          disabled={!ButtonState.isActive}
        >
          {ButtonState.text}
        </Button>
      </Card>
      <Modal
        title="Select a token"
        opened={isFromModalActive}
        onClose={() => setFromModalActive(false)}
        sx={{ padding: 0 }}
        size={450}
      >
        <InchModal
          open={isFromModalActive}
          onClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokenList}
        />
      </Modal>
      <Modal
        title="Select a token"
        opened={isToModalActive}
        onClose={() => setToModalActive(false)}
        sx={{ padding: 0 }}
        size={450}
      >
        <InchModal
          open={isToModalActive}
          onClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={tokenList}
        />
      </Modal>
    </>
  );
}

export default InchDex;

InchDex.propTypes = {
    chain: PropTypes.any
};

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);