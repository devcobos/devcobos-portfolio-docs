import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  tabWidth: 2,
  useDarkModeMediaQuery: false,
  useThemedScrollbars: true,

  themes: ["catppuccin-latte", "catppuccin-mocha"],
  themeCssSelector: (theme) => {
    return theme.name === "catppuccin-mocha" ? ".dark" : ":root:not(.dark)";
  },

  frames: {
    showCopyToClipboardButton: true,
    extractFileNameFromCode: false,
    removeCommentsWhenCopyingTerminalFrames: false,
  },

  styleOverrides: {
    borderRadius: "0.5rem",
    borderWidth: "1px",
    borderColor: "var(--color-border)",

    codePaddingBlock: "1rem",
    codePaddingInline: "1.5rem",
    codeFontSize: "0.85rem",
    codeLineHeight: "1.7",
    codeBackground: "var(--color-card)",

    uiLineHeight: "1.65",

    frames: {
      shadowColor: "transparent",
      frameBoxShadowCssValue: "none",

      editorBackground: "var(--color-card)",
      editorTabBarBackground: "var(--color-muted)",
      editorTabBarBorderColor: "var(--color-border)",
      editorTabBarBorderBottomColor: "var(--color-border)",
      editorActiveTabBackground: "var(--color-card)",
      editorActiveTabForeground: "var(--color-foreground)",
      editorActiveTabBorderColor: "transparent",
      editorActiveTabIndicatorTopColor: "var(--color-primary)",
      editorActiveTabIndicatorBottomColor: "transparent",

      terminalBackground: "var(--color-card)",
      terminalTitlebarBackground: "var(--color-muted)",
      terminalTitlebarForeground: "var(--color-foreground)",
      terminalTitlebarBorderBottomColor: "var(--color-border)",

      inlineButtonForeground: "var(--color-foreground)",
      inlineButtonBackground: "var(--color-muted)",
      inlineButtonBorder: "var(--color-border)",
      inlineButtonBackgroundIdleOpacity: "0",
      inlineButtonBackgroundHoverOrFocusOpacity: "0.1",
      inlineButtonBackgroundActiveOpacity: "0.2",

      tooltipSuccessBackground: "var(--color-primary)",
      tooltipSuccessForeground: "var(--color-primary-foreground)",
    },
  },
});
