import React from "react";
import { Table, Box, Title, Text } from "@mantine/core";
import PropTypes from "prop-types";
import { mocks } from "./mocks";

const Assets = (props) => {
  return (
    <Box>
      <Title order={3}>Détail du wallet</Title>
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
                  <Box
                    sx={(theme) => ({
                      margin: `${theme.spacing.sm}px 0px`,
                      display: "flex",
                    })}
                  >
                    <Box sx={(theme) => ({ marginRight: theme.spacing.md })}>
                      {t.icon}
                    </Box>
                    <Box>
                      <Text color="blue" weight="bold">
                        {t.name}
                      </Text>
                      <Text
                        sx={(theme) => ({
                          color: theme.colors.grey[5],
                        })}
                        weight="500"
                      >
                        {t.symbol}
                      </Text>
                    </Box>
                  </Box>
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
    </Box>
  );
};

Assets.propTypes = {};

export default Assets;
