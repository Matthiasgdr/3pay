import React, { useState, useMemo } from "react";
import { Box, Text, Title, Input } from "@mantine/core";
import { Search } from "tabler-icons-react";
import PropTypes from "prop-types";
import Fuse from "fuse.js";

const options = {
  minMatchCharLength: 1,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  ignoreLocation: true,
  threshold: 0.4,
  keys: ["symbol", "name"],
};

const InchModal = ({ open, onClose, setToken, tokenList: tList }) => {
  const [searchValue, setSearchValue] = useState("");
  const tokenList = useMemo(() => {
    const array = Object.keys(tList).map((t) => {
      return tList[t];
    });
    const fuse = new Fuse(array, options);

    return searchValue.length > 0
      ? fuse.search(searchValue).map((r) => r.item)
      : array;
  }, [tList, searchValue]);

  if (!open) return null;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Input value={searchValue} onChange={handleSearch} icon={<Search />} />
      <Box
        sx={(t) => ({
          marginTop: t.spacing.sm,
          overflow: "auto",
          height: "60vh",
        })}
      >
        {tokenList?.map((token, index) => (
          <div
            style={{
              padding: "5px 20px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onMouseDown={() => setToken(token)}
            onClick={() => {
              onClose();
            }}
            key={index}
          >
            <img
              style={{
                height: "32px",
                width: "32px",
                marginRight: "20px",
              }}
              src={token.logoURI}
              alt="noLogo"
            />
            <div>
              <Title order={4}>{token.name}</Title>
              <Text color="gray">{token.symbol}</Text>
            </div>
          </div>
        ))}
      </Box>
    </>
  );
};

export default InchModal;

InchModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  setToken: PropTypes.any,
  tokenList: PropTypes.array,
};
