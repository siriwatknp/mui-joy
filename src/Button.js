import * as React from "react";
import clsx from "clsx";
import {
  unstable_capitalize as capitalize,
  unstable_useForkRef as useForkRef,
} from "@mui/utils";
import { useThemeProps } from "@mui/system";
import { useButton } from "@mui/base/ButtonUnstyled";
import composeClasses from "@mui/base/composeClasses";
import { styled } from "@mui/joy/styles";
import buttonClasses, { getButtonUtilityClass } from "./buttonClasses";

const rootShouldForwardProp = (prop) =>
  prop !== "ownerState" &&
  prop !== "theme" &&
  prop !== "sx" &&
  prop !== "as" &&
  prop !== "classes";

const useUtilityClasses = (ownerState) => {
  const {
    color,
    disabled,
    focusVisible,
    focusVisibleClassName,
    fullWidth,
    size,
    variant,
  } = ownerState;

  const slots = {
    root: [
      "root",
      disabled && "disabled",
      focusVisible && "focusVisible",
      fullWidth && "fullWidth",
      `variant${capitalize(variant)}`,
      `color${capitalize(color)}`,
      `size${capitalize(size)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getButtonUtilityClass, {});

  if (focusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

const ButtonRoot = styled("button", {
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`variant${capitalize(ownerState.variant)}`],
      styles[`color${capitalize(ownerState.color)}`],
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
  shouldForwardProp: rootShouldForwardProp,
})(({ theme, ownerState }) => {
  const colorPalette = theme.vars.palette[ownerState.color || "brand"];
  const neutral = theme.vars.palette.neutral;
  return [
    {
      padding: "0.25rem 2rem",
      minHeight: "48px",
      borderRadius: "28px",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      ...theme.typography.button,
      [`&.${buttonClasses.disabled}`]: {
        pointerEvents: "none",
        cursor: "default",
      },
      [`&.${buttonClasses.focusVisible}`]: {
        outline: "4px solid",
        outlineColor: colorPalette[300],
      },
      ...(ownerState.fullWidth && {
        width: "100%",
      }),
    },
    ownerState.size === "small" && {
      minHeight: "40px",
    },
    ownerState.size === "large" && {
      minHeight: "56px",
    },
    ownerState.variant === "text" && {
      color: colorPalette[600],
      [`&.${buttonClasses.focusVisible}`]: {
        outlineColor: neutral[200],
      },
      "&:hover": {
        backgroundColor: neutral[100],
      },
      "&:active": {
        backgroundColor: neutral[200],
      },
      [`&.${buttonClasses.disabled}`]: {
        color: neutral[300],
      },
    },
    ownerState.variant === "contained" && {
      backgroundColor: colorPalette[600],
      color: "#fff",
      "&:hover": {
        backgroundColor: colorPalette[700],
      },
      "&:active": {
        backgroundColor: colorPalette[500],
      },
      [`&.${buttonClasses.disabled}`]: {
        backgroundColor: colorPalette[300],
      },
    },
    ownerState.variant === "outlined" && {
      color: colorPalette[600],
      border: "1px solid",
      borderColor: neutral[300],
      [`&.${buttonClasses.focusVisible}`]: {
        outlineColor: neutral[200],
      },
      "&:hover": {
        backgroundColor: neutral[100],
      },
      "&:active": {
        backgroundColor: neutral[200],
      },
      [`&.${buttonClasses.disabled}`]: {
        borderColor: neutral[200],
        color: neutral[300],
      },
    },
  ];
});

const Button = React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: "MuiButton" });

  const {
    children,
    className,
    action,
    component = "button",
    color = "brand",
    variant = "text",
    size = "medium",
    fullWidth = false,
    ...other
  } = props;

  const buttonRef = React.useRef(null);
  const handleRef = useForkRef(buttonRef, ref);

  const ComponentProp = component;

  const { focusVisible, setFocusVisible, getRootProps } = useButton({
    ...props,
    component: ComponentProp,
    ref: handleRef,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current?.focus();
      },
    }),
    [setFocusVisible]
  );

  const ownerState = {
    ...props,
    component,
    color,
    fullWidth,
    variant,
    size,
    focusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ButtonRoot
      as={ComponentProp}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      {children}
    </ButtonRoot>
  );
});

export default Button;
