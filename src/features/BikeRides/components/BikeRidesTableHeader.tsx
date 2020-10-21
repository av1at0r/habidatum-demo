import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";

export const BikeRidesTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Время начала поездки</TableCell>
        <TableCell>Точка отправления</TableCell>
        <TableCell>Время окончания поездки</TableCell>
        <TableCell>Точка прибытия</TableCell>
        <TableCell>Продолжительность поездки</TableCell>
      </TableRow>
    </TableHead>
  );
};
