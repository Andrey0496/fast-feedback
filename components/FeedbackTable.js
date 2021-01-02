import { Box } from "@chakra-ui/react";
import FeedbackRow from "./FeedbackRow";

import { Table, Td, Tr, Th } from "./Table";

const FeedbackTable = ({ allFeedback }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {allFeedback.map((feedback) => (
            <FeedbackRow key={feedback.id} {...feedback}></FeedbackRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default FeedbackTable;
