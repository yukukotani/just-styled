import { Box, styled } from "just-styled";

export default function Home() {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "$spaces.sm",
        padding: "$spaces.md",
      }}
    >
      <WithStyledFunction />
      <WithBoxComponent />
      <WithSemanticToken />
      <WithPseudoSelector />
      <WithMediaQuery />
    </Box>
  );
}

const StyledBox = styled("div", {
  backgroundColor: "$colors.red.200",
});

export function WithStyledFunction() {
  return <StyledBox>Styled using styled function</StyledBox>;
}

export function WithBoxComponent() {
  return (
    <Box style={{ color: "$colors.gray.600", border: "1px solid black" }}>
      Inline styling using builtin Box component
    </Box>
  );
}

export function WithSemanticToken() {
  return (
    <Box style={{ color: "$colors.primary", backgroundColor: "$colors.bg" }}>
      Styled using semantic tokens which refers other tokens
    </Box>
  );
}

export function WithPseudoSelector() {
  return (
    <Box
      style={{
        color: "$colors.red.200",
        ":hover": { color: "$colors.red.600", backgroundColor: "$colors.bg" },
      }}
    >
      Styled using :hover pseudo selector
    </Box>
  );
}

export function WithMediaQuery() {
  return (
    <Box
      style={{
        backgroundColor: "$colors.red.200",
        "@media (max-width: 768px)": {
          backgroundColor: "$colors.gray.200",
        },
      }}
    >
      Styled using media query (red in 768px or larger width, otherwise gray)
    </Box>
  );
}
