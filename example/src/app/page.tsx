import { styled } from "just-styled";

const GrayBox = styled("div", {
	backgroundColor: "lightgray",
});

export default function Home() {
	return <GrayBox style={{ color: "red" }}>aa</GrayBox>;
}
