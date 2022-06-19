import React, { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { useMoralis } from "react-moralis";
import useGetBalance from "../hooks/useGetBalance";

const NativeBalance = () => {
  const balance = useGetBalance();
  return (
    <Text
      sx={(theme) => ({
        ...theme.headings,
        ...theme.headings.sizes.h1,
        color: theme.colors.blue[8],
      })}
    >{20} ETH</Text>
  )
}

export default NativeBalance;
