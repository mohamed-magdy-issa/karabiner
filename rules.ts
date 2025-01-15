import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      // {
      //   type: "basic",
      //   description: "Disable CMD + Tab to force Hyper Key usage",
      //   from: {
      //     key_code: "tab",
      //     modifiers: {
      //       mandatory: ["left_command"],
      //     },
      //   },
      //   to: [
      //     {
      //       key_code: "tab",
      //     },
      //   ],
      // },
    ],
  },
  ...createHyperSubLayers({
    // b = "B"rowse
    b: {
      f: open("https://facebook.com"),
      y: open("https://youtube.com"),
      h: open("https://console-openshift-console.apps.fr01.paas.tech.orange/k8s/cluster/projects/disco-review"),
      o: open("https://gitlab.tech.orange/disco/disco-oda-components/disco-order-orchestration/"),
      j: open("https://portail.agir.orange.com/secure/RapidBoard.jspa?rapidView=30337&projectKey=IPCEISCOOD#"),
    },
    // o = "Open" applications
    o: {
      v: app("Visual Studio Code"),
      g: app("Google Chrome"),
      t: app("Terminal"),
      f: app("Finder"),
      i: app("intellij idea ce"),
      m: app("microsoft teams"),
      s: app("obsidian"),
      b: app("bruno"),
      a: app("vial"),
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      comma: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      period: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      period: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      comma: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      g: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["right_control"],
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
    },

    // v = "Vim motions"
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // m = Microsoft teams
    m: {
      // go to messa(g)es tab
      g: {
        to: [{ key_code: "2", modifiers: ["right_command"] }],
      },
      // go to calen(d)er tab
      d: {
        to: [{ key_code: "4", modifiers: ["right_command"] }]
      },
      // go to (b)ell tab
      b: {
        to: [{ key_code: "1", modifiers: ["right_command"] }]
      },
      // mu(t)e microphone when in a call
      t: {
        to: [{ key_code: "m", modifiers: ["right_shift", "right_command"] }]
      },
      // (c)all start
      c: {
        to: [{ key_code: "a", modifiers: ["left_option", "left_shift"] }]
      },
      // (a)ccept an incomming call
      a: {
        to: [{ key_code: "a", modifiers: ["left_shift", "right_command"] }]
      },
      // (r)eject an incomming call
      r: {
        to: [{ key_code: "d", modifiers: ["left_shift", "right_command"] }]
      },
      // (l)eave when inside a call
      l: {
        to: [{ key_code: "h", modifiers: ["left_shift", "right_command"] }]
      },
      // (l)eave when inside a call
      s: {
        to: [{ key_code: "e", modifiers: ["left_shift", "right_command"] }]
      },

      // "f"ind chat
      f: {
        to: [{ key_code: "e", modifiers: ["right_command"] }]
      },
    },
    // d = "d"igits num pad style
    d: {
      m: {
        to: [{ key_code: "1"}]
      },
      comma: {
        to: [{ key_code: "2"}]
      },
      period: {
        to: [{ key_code: "3"}]
      },
      j: {
        to: [{ key_code: "4"}]
      },
      k: {
        to: [{ key_code: "5"}]
      },
      l: {
        to: [{ key_code: "6"}]
      },
      u: {
        to: [{ key_code: "7"}]
      },
      i: {
        to: [{ key_code: "8"}]
      },
      o: {
        to: [{ key_code: "9"}]
      },
      spacebar: {
        to: [{ key_code: "0"}]
      },
    },
  })
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
