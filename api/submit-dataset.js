export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const dataset = req.body;

    const token = process.env.GITHUB_TOKEN;

    const owner = "forzayt";
    const repo = "FData";
    const base = "main";
    const branch = "dataset-" + Date.now();

    // get main branch SHA
    const refRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    const refData = await refRes.json();
    const sha = refData.object.sha;

    // create branch
    await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          ref: `refs/heads/${branch}`,
          sha,
        }),
      }
    );

    // create dataset file
    const content = Buffer.from(
      JSON.stringify(dataset, null, 2)
    ).toString("base64");

    const path = `datasets/${dataset.name}-${Date.now()}.json`;

    await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `Add dataset: ${dataset.name}`,
          content,
          branch,
        }),
      }
    );

    // create PR
    const prRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          title: `New dataset: ${dataset.name}`,
          head: branch,
          base,
          body: "Dataset submitted via FData",
        }),
      }
    );

    const pr = await prRes.json();

    res.status(200).json(pr);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}