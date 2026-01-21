const logos = [
  { name: "Claude", icon: "/logos/claude.svg" },
  { name: "GPT", icon: "/logos/openai.svg" },
  { name: "Cursor", icon: "/logos/cursor.svg" },
  { name: "Windsurf", icon: "/logos/windsurf.svg" },
  { name: "VS Code", icon: "/logos/vscode.svg" },
];

const LogoBar = () => {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10 opacity-60 grayscale">
      {logos.map((logo) => (
        <div
          key={logo.name}
          className="flex items-center justify-center"
          title={logo.name}
        >
          <img
            src={logo.icon}
            alt={logo.name}
            className="h-6 w-6 sm:h-7 sm:w-7"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoBar;
