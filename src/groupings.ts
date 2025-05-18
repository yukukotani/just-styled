export const groupingMap = {
  marginX: { props: ["marginLeft", "marginRight"], kind: "spaces" },
  marginY: { props: ["marginTop", "marginBottom"], kind: "spaces" },
  paddingX: { props: ["paddingLeft", "paddingRight"], kind: "spaces" },
  paddingY: { props: ["paddingTop", "paddingBottom"], kind: "spaces" },
  size: { props: ["width", "height"], kind: "sizes" },
  minSize: { props: ["minWidth", "minHeight"], kind: "sizes" },
  maxSize: { props: ["maxWidth", "maxHeight"], kind: "sizes" },
} as const;

export type GroupingProps = keyof typeof groupingMap;
