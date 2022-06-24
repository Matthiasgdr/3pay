import React from "react";
import { Table } from "@mantine/core";
import PropTypes from "prop-types";
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
        {mocks.map((t) => (
          <tr key={t.symbol}>
            <td>
              {t.icon} {t.name} {t.symbol}
            </td>
            <td>
              {t.euro} {t.sold} {t.symbol}
            </td>
            <td>{t.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

Assets.propTypes = {};

export default Assets;
