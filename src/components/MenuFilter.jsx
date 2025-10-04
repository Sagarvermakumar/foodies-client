import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Switch,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";

const MenuFilters = ({ onFilterChange, categories = [], isOpen, onClose }) => {

  const [filters, setFilters] = useState({
    query: "",
    category: "",
    isVeg: false,
    minPrice: "",
    maxPrice: "",
    isAvailable: false,
    minRating: "",
    sortBy: "",
    order: "asc",
    outlet: ""
  });



  // Handle all filter changes
  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    // debouncedFilter(updated);
  };

  const handleApply = () => {
    onFilterChange(filters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      query: "",
      category: "",
      isVeg: false,
      minPrice: "",
      maxPrice: "",
      isAvailable: false,
      minRating: "",
      sortBy: "",
      order: "asc",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <>


      {/* Filter Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="Search dishes..."
                value={filters.query}
                onChange={(e) => handleChange("query", e.target.value)}
              />

              <Select
                placeholder="Select Category"
                value={filters.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>


              <Switch
                isChecked={filters.isVeg}
                onChange={(e) => handleChange("isVeg", e.target.checked)}
              >
                Vegetarian
              </Switch>

              <HStack>
                <NumberInput
                  min={0}
                  value={filters.minPrice}
                  onChange={(value) => handleChange("minPrice", value)}
                  flex={1}
                >
                  <NumberInputField placeholder="Min Price" />
                </NumberInput>

                <NumberInput
                  min={0}
                  value={filters.maxPrice}
                  onChange={(value) => handleChange("maxPrice", value)}
                  flex={1}
                >
                  <NumberInputField placeholder="Max Price" />
                </NumberInput>
              </HStack>

              <Switch
                isChecked={filters.isAvailable}
                onChange={(e) => handleChange("isAvailable", e.target.checked)}
              >
                Available
              </Switch>

              <NumberInput
                min={0}
                max={5}
                value={filters.minRating}
                onChange={(value) => handleChange("minRating", value)}
              >
                <NumberInputField placeholder="Minimum Rating (0–5)" />
              </NumberInput>

              <Select
                placeholder="Sort By"
                value={filters.sortBy}
                onChange={(e) => handleChange("sortBy", e.target.value)}
              >
                <option value="price">Price</option>
                <option value="ratingAvg">Rating</option>
                <option value="createdAt">Newest</option>
                <option value="name">Name</option>
              </Select>

              <Select
                placeholder="Order"
                value={filters.order}
                onChange={(e) => handleChange("order", e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>

              <HStack justify="space-between" pt={2}>
                <Button variant="ghost" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit" colorScheme="orange" onClick={handleApply}>
                  Apply
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MenuFilters;
