// PreToolUse guardrail: block reading or editing secret files (.env, keys, certificates).
// Allows templates such as .env.example / .env.sample / .env.template.
// Exit code 2 blocks the tool call and shows stderr to Claude.

let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(input).tool_input?.file_path ?? "";
  } catch {
    process.exit(0);
  }

  const name = filePath.replace(/\\/g, "/").split("/").pop().toLowerCase();
  const isEnvTemplate = /^\.env\.(example|sample|template)$/.test(name);
  const isSecret =
    (/^\.env(\..+)?$/.test(name) && !isEnvTemplate) ||
    /\.(pem|key|pfx|p12)$/.test(name) ||
    /^id_(rsa|ed25519|ecdsa)$/.test(name);

  if (isSecret) {
    console.error(
      `Blocked by sdd-core guardrail: "${name}" looks like a secret file. ` +
        "Use .env.example for documentation and ask the user to edit secrets manually."
    );
    process.exit(2);
  }
  process.exit(0);
});
