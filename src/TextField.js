import { styled } from "@mui/joy/styles";

const Label = styled("label")(({ theme }) => [
  {
    display: "block",
    position: "var(--label-position, initial)",
    left: "10px",
    top: "4px",
    transition: "font-size 0.2s, transform 0.2s",
  },
  theme.typography.detail,
]);

const Legend = styled("legend")(({ theme }) => [
  {
    marginLeft: "-2px",
    opacity: 0,
    whiteSpace: "nowrap",
    visibility: "hidden",
    padding: "0px",
    maxWidth: "0px",
  },
  theme.typography.detail,
]);

const InputRoot = styled("input")(({ theme, ownerState }) => [
  {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: "var(--input-padding, 8px)",
    "--svg-size": "18px",
    ...(ownerState.startAdornment && {
      "--svg-margin": "0 4px 0 0",
    }),
    ...(ownerState.endAdornment && {
      "--svg-margin": "0 0 0 4px",
    }),
    ...(ownerState.label && {
      "--label-position": "absolute",
      "--input-padding":
        ownerState.component === "fieldset" ? "6px 8px 12px" : "24px 8px 8px",
    }),
    ...(ownerState.margin === "normal" && {
      marginTop: "16px",
      marginBottom: "8px",
    }),
  },
  theme.variant[ownerState.variant]?.[ownerState.color],
  theme.variant[`${ownerState.variant}Hover`]?.[ownerState.color],
  theme.variant[`${ownerState.variant}Disabled`]?.[ownerState.color],
]);

const InputInput = styled("input")(({ theme, ownerState }) => [
  theme.typography.body,
  {
    border: "none",
    outline: 0,
    width: "100%",
    backgroundColor: "transparent",
    "&::placeholder": {
      color: theme.vars.palette.neutral[300],
    },
    ...(ownerState.label && {
      ...(ownerState.component === "fieldset" && {
        "&:focus ~ label, &:not(:placeholder-shown) ~ label, &.label-shrink ~ label":
          {
            color: theme.vars.palette.neutral[500],
            fontSize: "0.75rem !important",
            transform: "translateY(-26px) !important",
          },
        "&:focus ~ legend, &:not(:placeholder-shown) ~ legend, &.label-shrink ~ legend":
          {
            visibility: "visible",
            padding: "0px 4px",
            maxWidth: "unset",
          },
      }),
      ...(ownerState.component !== "fieldset" && {
        "&:focus ~ label, &:not(:placeholder-shown) ~ label, &.label-shrink ~ label":
          {
            fontSize: "0.75rem",
            transform: "translateY(-10px)",
          },
      }),
      ...(!ownerState.labelShrink && {
        "&::placeholder": {
          color: "transparent",
        },
      }),
      "&:focus::placeholder": {
        color: theme.vars.palette.neutral[300],
      },
    }),
  },
]);

const TextField = ({
  component = "div",
  variant = "outlined",
  color = "neutral",
  margin,
  label,
  labelShrink,
  startAdornment,
  endAdornment,
  ...props
}) => {
  const ownerState = {
    component,
    color,
    label,
    labelShrink,
    startAdornment,
    endAdornment,
    variant,
    margin,
  };
  return (
    <InputRoot as={component} ownerState={ownerState}>
      {startAdornment}
      <InputInput
        {...props}
        className={labelShrink ? "label-shrink" : ""}
        ownerState={ownerState}
      />
      {label && (
        <Label
          htmlFor={props.id}
          sx={{
            fontSize: "0.875rem",
            top: component === "fieldset" ? "8px" : "16px",
          }}
        >
          {label}
        </Label>
      )}
      {component === "fieldset" && <Legend>{label}</Legend>}
      {endAdornment}
    </InputRoot>
  );
};

export default TextField;
