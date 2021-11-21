import * as React from "react";
import { Box } from "@mui/system";
import { useColorScheme } from "@mui/joy/styles";
import { styled } from "@mui/joy/styles";
import Avatar from "../src/Avatar";
import {
  Moon,
  Sun,
  System,
  Apps,
  Notifications,
  Search,
  Shield,
  PieChart,
  Person,
  Settings,
  FolderOutlined,
  ReplyOutlined,
  FlagOutlined,
  DeleteOutlined,
  Refresh,
  KeyboardArrowDown,
} from "../src/icons";

const PushButton = styled("button", {
  shouldForwardProp: (prop) => prop !== "selected",
})(({ theme, selected }) => [
  {
    width: 36,
    height: 36,
    borderRadius: 18,
    cursor: selected ? "initial" : "pointer",
    border: "none",
    background: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:focus-visible": theme.focus.default,
  },
  selected ? theme.variant.filled?.primary : theme.variant.text?.neutral,
]);

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        minHeight: "48px",
        border: "1px solid",
        borderRadius: "24px",
        ...theme.variant.outlined.primary,
      })}
    >
      <Box sx={{ display: "flex", gap: "8px", p: "6px" }}>
        {["system", "light", "dark"].map((modeId) => {
          const icons = {
            system: System,
            light: Sun,
            dark: Moon,
          };
          const Icon = icons[modeId];
          return (
            <PushButton
              key={modeId}
              selected={mode === modeId}
              onClick={() => {
                setMode(modeId);
              }}
            >
              <Icon />
            </PushButton>
          );
        })}
      </Box>
    </Box>
  );
};

const Button = styled("button")(
  ({
    theme,
    variant = "contained",
    color = "primary",
    roundness = "default",
  }) => [
    {
      minHeight: 48,
      border: 0,
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5rem 2rem",
      cursor: "pointer",
      background: "transparent",
      borderRadius: theme.borderRadius?.[roundness],
      "&:focus-visible": theme.focus.default,
    },
    theme.typography.button,
    theme.variant[variant]?.[color],
    theme.variant[`${variant}Hover`]?.[color],
    theme.variant[`${variant}Active`]?.[color],
    theme.variant[`${variant}Disabled`]?.[color],
  ]
);

const Paper = styled("div")(
  ({
    theme,
    variant = "text",
    color = "neutral",
    enableContext = false,
    elevation,
  }) => [
    {
      "--joy-palette-neutral-textBg": "var(--joy-palette-surface-level1)",
      "--joy-palette-neutral-filledBg": "var(--joy-palette-surface-level2)",
      minWidth: 100,
      minHeight: 120,
      padding: "1rem",
      borderRadius: 4,
      ...(elevation && {
        boxShadow: theme.elevation?.[elevation],
      }),
    },
    theme.variant[variant]?.[color],
    enableContext &&
      variant === "contained" &&
      theme.variant.containedContext?.[color],
  ]
);

const List = styled("ul")(({ theme, variant = "text", color = "neutral" }) => [
  {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: 4,
    listStyle: "none",
    padding: "0.5rem 0.25rem",
    borderRadius: 4,
    margin: 0,
    backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-surface-level1))`,
  },
  theme.variant[variant]?.[color],
]);

const ListItem = styled("li")(
  ({ theme, variant = "text", color = "neutral" }) => [
    theme.typography.body,
    {
      padding: "0.25rem 0.5rem",
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      gap: "16px",
      "&:focus-visible": theme.focus.default,
    },
    theme.variant[variant]?.[color],
    theme.variant[`${variant}Hover`]?.[color],
    theme.variant[`${variant}Disabled`]?.[color],
  ]
);

const IconButton = styled("button")(
  ({ theme, variant = "filled", color = "primary", roundness = "default" }) => [
    {
      border: 0,
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.25rem",
      minWidth: 36,
      minHeight: 36,
      cursor: "pointer",
      background: "transparent",
      borderRadius: theme.borderRadius?.[roundness],
      "&:focus-visible": theme.focus.default,
    },
    theme.typography.button,
    theme.variant[variant]?.[color],
    theme.variant[`${variant}Hover`]?.[color],
    theme.variant[`${variant}Disabled`]?.[color],
  ]
);

const Divider = styled("hr")(
  ({ theme, color = "neutral", direction = "horizontal" }) => [
    {
      display: "block",
      alignSelf: "stretch",
      margin: 0,
      border: 0,
      backgroundColor: `var(--joy-variant-outlinedBorder, ${theme.vars.palette[color].outlinedBorder})`,
      opacity: 0.6,
    },
    direction === "horizontal" && {
      height: 1,
      margin: "1rem 0",
    },
    direction === "vertical" && {
      width: 1,
      margin: "0 1rem",
    },
  ]
);

const Input = styled("input")(
  ({ theme, variant = "outlined", color = "neutral" }) => [
    {
      minHeight: 48,
      maxWidth: "100%",
      border: "2px solid transparent",
      backgroundColor: `var(--joy-variant-${variant}Bg, var(--joy-palette-surface-level1))`,
      borderRadius: "4px",
      display: "inline-flex",
      alignItems: "center",
      padding: "0.5rem 1rem",
      "&:focus-visible": theme.focus.default,
      "&::placeholder": {
        opacity: 0.72,
        color: `var(--joy-variant-${variant}Color, ${theme.vars.palette.letter.minor})`,
      },
    },
    theme.typography.body,
    theme.variant[variant]?.[color],
    theme.variant[`${variant}Hover`]?.[color],
    theme.variant[`${variant}Disabled`]?.[color],
  ]
);

const Chip = styled("span")(
  ({ theme, variant = "filled", color = "neutral" }) => [
    {
      display: "inline-block",
      padding: "0.25rem 0.75rem",
      borderRadius: "20px",
    },
    theme.typography.detail,
    theme.variant[variant]?.[color],
  ]
);

const Typography = styled("p", {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "as",
})(({ theme, variant = "body" }) => ({
  margin: 0,
  ...theme.typography[variant],
}));

const SelectButton = styled(Button)(({ theme }) => ({
  minHeight: "22px",
  padding: "0px 0.5rem",
  fontWeight: 400,
  fontSize: "12px",
  border: "1px solid",
  borderColor: "transparent",
  "&:hover": {
    borderColor: "currentColor",
  },
}));

export default function JoySketching() {
  return (
    <React.Fragment>
      <Paper
        variant="contained"
        enableContext
        color="primary"
        as="header"
        sx={{
          minHeight: 56,
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          py: 0,
          position: "sticky",
          top: 0,
          gap: "16px",
        }}
      >
        <IconButton variant="outlined">
          <Shield />
        </IconButton>
        <Divider direction="vertical" />
        <Typography sx={{ color: "inherit" }}>Email</Typography>
        <Divider direction="vertical" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Search />
          <Input variant="text" placeholder="Search..." />
        </Box>
        <IconButton variant="text" sx={{ ml: "auto" }}>
          <Apps />
        </IconButton>
        <IconButton variant="text">
          <Notifications />
        </IconButton>
        <ColorSchemePicker />
      </Paper>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 66, flexShrink: 0 }}>
          <Box
            sx={{
              position: "sticky",
              width: "100%",
              height: "calc(100vh - 56px)",
              top: "56px",
              bgcolor: "var(--joy-palette-primary-900)",
              py: "1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              "--joy-variant-outlinedColor": "var(--joy-palette-primary-200)",
              "--joy-variant-outlinedBorder": "var(--joy-palette-primary-700)",
              "--joy-variant-outlinedHoverBorder":
                "var(--joy-palette-primary-500)",
              "--joy-variant-outlinedHoverBg": "var(--joy-palette-primary-700)",
            }}
          >
            <IconButton variant="outlined">
              <PieChart />
            </IconButton>
            <IconButton variant="outlined">
              <Person />
            </IconButton>
            <Avatar
              src="https://avatars.githubusercontent.com/u/18292247?s=128&v=4"
              sx={{ mt: "auto" }}
            />
            <IconButton variant="outlined">
              <Settings />
            </IconButton>
          </Box>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            "& > *:not(:last-child)": { flexShrink: 0 },
          }}
        >
          <Paper sx={{ width: 200, px: "0px" }}>
            <Box sx={{ px: "1rem" }}>
              <Typography variant="overline">Browse</Typography>
            </Box>
            <List sx={{ px: "0.5rem" }}>
              <ListItem variant="filled" color="primary">
                <FolderOutlined />
                Inbox
              </ListItem>
              <ListItem>
                <ReplyOutlined /> Sent
              </ListItem>
              <ListItem>
                <FolderOutlined /> Draft
              </ListItem>
              <ListItem>
                <FlagOutlined /> Flagged
              </ListItem>
              <ListItem>
                <DeleteOutlined /> Trash
              </ListItem>
            </List>
            <br />
            <Box sx={{ px: "1rem" }}>
              <Typography variant="overline">TAGS</Typography>
            </Box>
            <List sx={{ px: "0.5rem" }}>
              <ListItem>Personal</ListItem>
              <ListItem>Work</ListItem>
              <ListItem>Friends</ListItem>
              <ListItem>Travel</ListItem>
            </List>
          </Paper>
          <Divider color="neutral" direction="vertical" sx={{ m: "0px" }} />
          <Paper sx={{ width: 320, p: "0px" }}>
            <Box
              sx={{
                p: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="overline">Inbox</Typography>
              <IconButton sx={{ minWidth: 28, minHeight: 28 }}>
                <Refresh />
              </IconButton>
            </Box>
            {[...Array(5)].map((_, index) => (
              <React.Fragment key={index}>
                <Box
                  sx={{
                    p: "1rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    ...(index === 0 && {
                      bgcolor: "var(--joy-palette-primary-filledBg)",
                    }),
                  }}
                >
                  <Paper
                    variant="filled"
                    sx={{
                      minWidth: 32,
                      minHeight: 32,
                      ...(index === 0 && {
                        "--joy-variant-filledBg":
                          "var(--joy-palette-primary-filledHoverBg)",
                      }),
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: "0.25rem",
                      }}
                    >
                      <Typography variant="detail">Janet Ericson</Typography>
                      <Typography variant="detail">14 Oct 2016</Typography>
                    </Box>
                    <Typography variant="caption" sx={{ mb: "0.25rem" }}>
                      Blank slates for new website
                    </Typography>
                    <Typography variant="detail">
                      Hi, Thomas, You don&apos;t have...
                    </Typography>
                    {index === 0 && (
                      <Chip color="success" sx={{ mt: "8px" }}>
                        Travel
                      </Chip>
                    )}
                  </Box>
                </Box>
                <Divider color="neutral" sx={{ m: 0 }} />
              </React.Fragment>
            ))}
          </Paper>
          <Divider color="neutral" direction="vertical" sx={{ m: "0px" }} />
          <Box sx={{ flexGrow: 1, p: "1rem" }}>
            <Paper elevation="md" sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                  p: "1rem",
                }}
              >
                <Paper variant="filled" sx={{ minWidth: 32, minHeight: 32 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" sx={{ mb: "0.25rem" }}>
                    Janet Erickson
                  </Typography>
                  <Typography variant="detail">Today at 15:45</Typography>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ minHeight: 36, p: "0.25rem 1rem" }}
                >
                  Reply
                </Button>
                <IconButton variant="outlined" color="primary">
                  <ReplyOutlined />
                </IconButton>
                <IconButton variant="outlined" color="primary">
                  <DeleteOutlined />
                </IconButton>
              </Box>
              <Divider sx={{ m: 0 }} />
              <Box sx={{ p: "1rem" }}>
                <Typography variant="h5" sx={{ mb: "1rem" }}>
                  Blank slates for new website
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    mb: "1rem",
                  }}
                >
                  <Typography variant="detail">From</Typography>
                  <SelectButton variant="filled">
                    janet@mail.com{" "}
                    <KeyboardArrowDown fontSize="md" sx={{ mr: "-4px" }} />
                  </SelectButton>
                  <Typography variant="detail">To</Typography>
                  <SelectButton variant="filled">
                    janet@mail.com{" "}
                    <KeyboardArrowDown fontSize="md" sx={{ mr: "-4px" }} />
                  </SelectButton>
                </Box>
                <Divider />
                <Typography>
                  Hi, Thomas,
                  <br />
                  <br />
                  You don’t have to be a designerto appreciate good typography –
                  just check out this student-made device that can detect and
                  namefonts just by looking at it. While the pop culture world
                  obsesses over the latest Snapchat filter fads and Instagram
                  friending, skilled photographers are taking the shots that
                  transcend social media Share Quote. Take advantage of an
                  incredible offer to become a skilled and certified
                  photographer, taking frame-worthy shots every time with The
                  Hollywood Art Institute Photography Course and Certification.{" "}
                  <br />
                  <br />
                  Regards, Janet Erickson
                </Typography>
                <Divider />
                <Typography variant="caption" sx={{ mb: "1rem" }}>
                  Attachments
                </Typography>
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Paper
                    variant="filled"
                    sx={{ minWidth: "64px", minHeight: "64px" }}
                  />
                  <Paper
                    variant="filled"
                    sx={{ minWidth: "64px", minHeight: "64px" }}
                  />
                  <Paper
                    variant="outlined"
                    sx={{ display: "flex", p: 0, minHeight: 0 }}
                  >
                    <Paper
                      variant="filled"
                      sx={{
                        minWidth: "64px",
                        minHeight: "64px",
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}
                    />
                    <Box sx={{ p: "0.75rem" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "var(--joy-palette-primary-500)" }}
                      >
                        blank_slates.doc
                      </Typography>
                      <Typography variant="detail">blank_slates.doc</Typography>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
