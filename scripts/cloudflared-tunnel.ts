import { spawn } from "node:child_process";

const proc = spawn("cloudflared", ["tunnel", "--url", "http://localhost:3000"]);
proc.stderr.pipe(process.stdout);

proc.stderr.on("data", async (data: Buffer) => {
    const text = data.toString();
    if (text.includes("https://") && text.includes(".trycloudflare.com")) {
        const url = text.match(/https:\/\/[a-z0-9\-]+\.trycloudflare\.com/)?.[0];
        if (url) {
            const env = await Bun.file(".env").text();
            const regex =
            /# ======= Automatically added by cloudflared-tunnel\.ts \(please don't change anything\) =======\s*([\s\S]*?)\s*# ===========================================================================================/;
            const match = env.match(regex);
            if (match) {
                const newEnv = env.replace(
                    regex,
                    `# ======= Automatically added by cloudflared-tunnel.ts (please don't change anything) =======
NEXT_PUBLIC_API_URL="${url}/api"
BETTER_AUTH_TRUSTED_ORIGINS="${url}"
# ===========================================================================================`
                );
                await Bun.write(".env", newEnv);
                console.log("\n✅ Updated NEXT_PUBLIC_API_URL in .env file.");
            } else {
                const newEnv = `${env.trim()}
# ======= Automatically added by cloudflared-tunnel.ts (please don't change anything) =======
NEXT_PUBLIC_API_URL="${url}/api"
BETTER_AUTH_TRUSTED_ORIGINS="${url}"
# ===========================================================================================`;
                await Bun.write(".env", newEnv);
                console.log("\n✅ Added NEXT_PUBLIC_API_URL to .env file.");
            }
        }
    }
});

proc.on("close", (code) => {
    console.log(`\nChild process exited with code ${code}`);
});
