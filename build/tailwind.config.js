/** Production Tailwind build for autismabroad.org.
 *  Scans index.html + the generated static article pages so every used class
 *  (including those built inside inline <script> strings) is included. */
module.exports = {
  content: ["../index.html", "../*.html"],
  theme: { extend: {
    colors: {
      ink: "#2B2420",
      teal: {50:"#F7F3ED",100:"#E7EFEA",200:"#D6E0D8",300:"#A9BDB2",400:"#7C998C",500:"#5F8072",600:"#4F6F63",700:"#43625A",800:"#33453D"},
      coral: {500:"#D9724B",600:"#C15F39"},
      muted: "#6E655C"
    },
    borderRadius: { "4xl": "2rem" },
    fontFamily: { sans: ["Inter","ui-sans-serif","system-ui","sans-serif"] }
  }},
};
