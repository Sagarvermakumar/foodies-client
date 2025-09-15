// components/Pagination.jsx
import { Button, HStack, Text } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
const Pagination = ({ pagination, setPageAction, fetchAction }) => {
  const dispatch = useDispatch()

  const { page, pages, hasNextPage, hasPrevPage } = pagination;


  const handlePageChange = (type) => {
    let newPage = page;
    if (type === "pre") {
      newPage = page - 1;
    } else if (type === "next") {
      newPage = page + 1;
    }

    dispatch(setPageAction(newPage));
    dispatch(fetchAction(newPage));
  };



  if (!pagination || pagination.pages <= 1) return null;

  return (
    <HStack spacing={2} justify="center" mt={6} mb={24}>
      <Button
        size="sm"
        variant="outline"
        isDisabled={!hasPrevPage}
        onClick={() => handlePageChange("pre")}
      >
        Previous
      </Button>

      <Text fontSize="sm" color="gray.300">
        Page {page} of {pages}
      </Text>

      <Button
        size="sm"
        variant="outline"
        isDisabled={!hasNextPage}
        onClick={() => handlePageChange("next")}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
