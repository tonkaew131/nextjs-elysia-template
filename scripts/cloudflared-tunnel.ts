import { spawn } from "node:child_process";

const MANAGED_BLOCK_HEADER =
"# ======= Automatically added by cloudflared-tunnel.ts (please don't change anything) =======";
const MANAGED_BLOCK_FOOTER =
"# ===========================================================================================";
const MANAGED_BLOCK_REGEX =
/# ======= Automatically added by cloudflared-tunnel\.ts \(please don't change anything\) =======\s*([\s\S]*?)\s*# ===========================================================================================/;

function buildManagedBlock(values: {
    apiUrl?: string;
    trustedOrigin?: string;
    s3Endpoint?: string;
}): string {
    const lines: string[] = [];
    if (values.apiUrl) lines.push(`NEXT_PUBLIC_API_URL="${values.apiUrl}"`);
    if (values.trustedOrigin)
        lines.push(`BETTER_AUTH_TRUSTED_ORIGINS="${values.trustedOrigin}"`);
    if (values.s3Endpoint) lines.push(`S3_ENDPOINT="${values.s3Endpoint}"`);
    return `${MANAGED_BLOCK_HEADER}\n${lines.join("\n")}\n${MANAGED_BLOCK_FOOTER}`;
}

async function upsertManagedEnv(update: {
    apiUrl?: string;
    trustedOrigin?: string;
    s3Endpoint?: string;
}) {
    const env = (await Bun.file(".env").exists())
    ? await Bun.file(".env").text()
    : "";
    const match = env.match(MANAGED_BLOCK_REGEX);
    
    if (match) {
        // Parse current block values
        const currentBlock = match[1];
        const current: {
            apiUrl?: string;
            trustedOrigin?: string;
            s3Endpoint?: string;
        } = {};
        const apiMatch = currentBlock.match(/NEXT_PUBLIC_API_URL="([^"]+)"/);
        const trustedMatch = currentBlock.match(
            /BETTER_AUTH_TRUSTED_ORIGINS="([^"]+)"/
        );
        const s3Match = currentBlock.match(/S3_ENDPOINT="([^"]+)"/);
        if (apiMatch) current.apiUrl = apiMatch[1];
        if (trustedMatch) current.trustedOrigin = trustedMatch[1];
        if (s3Match) current.s3Endpoint = s3Match[1];
        
        const merged = {
            apiUrl: update.apiUrl ?? current.apiUrl,
            trustedOrigin: update.trustedOrigin ?? current.trustedOrigin,
            s3Endpoint: update.s3Endpoint ?? current.s3Endpoint,
        };
        
        const newEnv = env.replace(MANAGED_BLOCK_REGEX, buildManagedBlock(merged));
        await Bun.write(".env", newEnv);
    } else {
        const block = buildManagedBlock(update);
        const newEnv = `${env.trim()}\n\n${block}`.trim() + "\n";
        await Bun.write(".env", newEnv);
    }
}

function extractTryCloudflareUrl(stderrText: string): string | undefined {
    if (
        !stderrText.includes("https://") ||
        !stderrText.includes(".trycloudflare.com")
    )
    return undefined;
    return stderrText.match(/https:\/\/[a-z0-9\-]+\.trycloudflare\.com/)?.[0];
}

const proc = spawn("cloudflared", ["tunnel", "--url", "http://localhost:3000"]);
const s3proc = spawn("cloudflared", [
    "tunnel",
    "--url",
    "http://localhost:9000",
]);
proc.stderr.pipe(process.stdout);
s3proc.stderr.pipe(process.stdout);

proc.stderr.on("data", async (data: Buffer) => {
    const url = extractTryCloudflareUrl(data.toString());
    if (!url) return;
    await upsertManagedEnv({ apiUrl: `${url}/api`, trustedOrigin: url });
    console.log("\n✅ Updated API envs in .env (managed block).\n");
});

s3proc.stderr.on("data", async (data: Buffer) => {
    const url = extractTryCloudflareUrl(data.toString());
    if (!url) return;
    await upsertManagedEnv({ s3Endpoint: url });
    console.log("\n✅ Updated S3_ENDPOINT in .env (managed block).\n");
});

proc.on("close", (code) => {
    console.log(`\nChild process exited with code ${code}`);
});
s3proc.on("close", (code) => {
    console.log(`\nChild process exited with code ${code}`);
});
