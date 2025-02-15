import { useState, useEffect } from "react";
import { Box, TextField, InputAdornment, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchSeachProductDetails } from "../../store/productSlice";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.products.products);
  // const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);
  console.log(products);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(
        fetchSeachProductDetails({ searchQuery: debouncedQuery }) as any
      );
    }
  }, [debouncedQuery, dispatch]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      localStorage.setItem("query", searchQuery);
      navigate(`/search`);
      setSearchQuery("");
    }
  };
  const noResultsPlaceholder = { name: "No results found" } as { name: string };
  return (
    <Box sx={{ flexGrow: 1, mx: 2, maxWidth: { xs: 200, sm: 300, md: 500 } }}>
      <Autocomplete
        freeSolo
        size="small"
        options={products.length > 0 ? products : [noResultsPlaceholder]}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.name
        }
        inputValue={searchQuery}
        onInputChange={(_, value) => setSearchQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search for products, brands, and more"
            sx={{ bgcolor: "white", borderRadius: 1 }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleSearch}
                  sx={{ cursor: "pointer" }}
                >
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  );
};

export default SearchBar;
