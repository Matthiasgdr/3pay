import React from "react";
import PropTypes from "prop-types";
import { Table, Box, Text } from "@mantine/core";

import CryptoName from "../../../blocks/CryptoName/CryptoName";
import { mocks } from "./mocks";

const Assets = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Mon solde</th>
          <th>Prix</th>
        </tr>
      </thead>
      <tbody>
        {mocks.map((t) => {
          return (
            <tr key={t.symbol}>
              <td>
                <CryptoName crypto={t} />
              </td>
              <td>
                <Box>
                  <Text color="blue" weight="500">
                    {t.sold} {t.symbol}
                  </Text>
                  <Text size="sm" color="gray">
                    ≈ {t.euro} €
                  </Text>
                </Box>
              </td>
              <td>{t.price}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

Assets.propTypes = {};

export default Assets;
