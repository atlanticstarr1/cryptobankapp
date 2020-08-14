import React from "react";
import {Container, createMuiTheme, CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import Landing from "./Landing";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg">
        <CssBaseline />
        <Landing />
      </Container>
    </ThemeProvider>
  );
}
