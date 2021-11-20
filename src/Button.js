import * as React from "react";
import PropTypes from "prop-types";
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
})(({ theme, ownerState }) => [
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
    [`&.${buttonClasses.focusVisible}`]: theme.focus.default,
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
  theme.variant[ownerState.variant]?.[ownerState.color],
  theme.variant[`${ownerState.variant}Hover`]?.[ownerState.color],
  theme.variant[`${ownerState.variant}Active`]?.[ownerState.color],
  theme.variant[`${ownerState.variant}Disabled`]?.[ownerState.color],
]);

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

Button.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref for imperative actions. It currently only supports `focusVisible()` action.
   */
  action: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        focusVisible: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(["brand", "neutral"]),
  /**
   * The component used for the Root slot.
   * Either a string to use a HTML element or a component.
   * This is equivalent to `components.Root`. If both are provided, the `component` is used.
   */
  component: PropTypes /* @typescript-to-proptypes-ignore */.elementType,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
};

export default Button;
