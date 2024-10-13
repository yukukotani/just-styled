import { Box, styled } from "just-styled";

export default function Home() {
	return (
		<Box style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
			<WithStyledFunction />
			<WithBoxComponent />
			<WithSemanticToken />
		</Box>
	);
}

const StyledBox = styled("div", {
	backgroundColor: "$colors.gray.200",
	color: "$colors.red.600",
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
		<Box
			style={{ color: "$colors.primary", backgroundColor: "$colors.gray.600" }}
		>
			Inline styling using builtin Box component
		</Box>
	);
}
