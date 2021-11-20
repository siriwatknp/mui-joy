import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { unstable_composeClasses as composeClasses } from "@mui/base";
import { unstable_capitalize as capitalize } from "@mui/utils";
import { useThemeProps } from "@mui/system";
import { styled } from "@mui/joy/styles";
import { getSvgIconUtilityClass } from "./svgIconClasses";

const useUtilityClasses = (ownerState) => {
  const { color, fontSize, classes } = ownerState;

  const slots = {
    root: [
      "root",
      color !== "inherit" && `color${capitalize(color)}`,
      `fontSize${capitalize(fontSize)}`,
    ],
  };

  return composeClasses(slots, getSvgIconUtilityClass, classes);
};

const SvgIconRoot = styled("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.color !== "inherit" &&
        styles[`color${capitalize(ownerState.color)}`],
      styles[`fontSize${capitalize(ownerState.fontSize)}`],
    ];
  },
})(({ theme, ownerState }) => ({
  userSelect: "none",
  width: "1em",
  height: "1em",
  display: "inline-block",
  fill: "currentColor",
  flexShrink: 0,
  fontSize: {
    inherit: "inherit",
    small: theme.vars.fontSize.sm,
    medium: theme.vars.fontSize.md,
    large: theme.vars.fontSize.lg,
  }[ownerState.fontSize],
}));

const SvgIcon = React.forwardRef(function SvgIcon(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: "MuiSvgIcon" });
  const {
    children,
    className,
    color = "inherit",
    component = "svg",
    fontSize = "medium",
    htmlColor,
    titleAccess,
    viewBox = "0 0 24 24",
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    component,
    fontSize,
    viewBox,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <SvgIconRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      focusable="false"
      viewBox={viewBox}
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? "img" : undefined}
      ref={ref}
      {...other}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </SvgIconRoot>
  );
});

SvgIcon.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf([
      "inherit",
      "action",
      "disabled",
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning",
    ]),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(["inherit", "large", "medium", "small"]),
    PropTypes.string,
  ]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: PropTypes.string,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: PropTypes.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: PropTypes.string,
};

SvgIcon.muiName = "SvgIcon";

export default SvgIcon;
