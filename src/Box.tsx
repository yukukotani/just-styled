import type { CSSProperties, FC, PropsWithChildren } from "react";
import React from "react";
import { styled } from "./styled";

type Props = PropsWithChildren<CSSProperties>;

export const Box: FC<Props> = ({ children, ...props }) => {
	const Component = styled("div", props);

	return <Component>{children}</Component>;
};
