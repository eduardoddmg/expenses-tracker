import {
  TableContainer,
  Table as TableChakra,
  Thead,
  Tr,
  Th,
  Tbody,
} from "@chakra-ui/react";

export const Table = ({ color, header, children }) => {
  return (
    <TableContainer bg={color} borderRadius={10}>
      <TableChakra variant="unstyled">
        <Thead>
          <Tr>
            {header.map((item, index) => (
              <Th key={index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
      </TableChakra>
    </TableContainer>
  );
};
