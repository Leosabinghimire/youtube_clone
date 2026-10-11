import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { ErrorState } from "../../components/ui";
import { useDocumentTitle } from "../../hooks";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <ErrorState
      icon={SearchOffIcon}
      title="This page isn't available"
      message="The link may be broken or the page may have moved."
    >
      <Button component={RouterLink} to="/" variant="contained" color="primary" sx={{ mt: 1 }}>
        Go to Home
      </Button>
    </ErrorState>
  );
}
