/**
 * 202f Academy — Barista OS · progress API
 *
 * Zero-config, dependency-light (Express only) progress store keyed by a device
 * code. State lives in one JSON file written atomically, so the whole thing can
 * run on a 1-vCPU box or inside a container without a database.
 *
 *   GET    /api/health                     → { ok, devices, uptime }
 *   GET    /api/progress/:id               → { ok, state|null, updatedAt }
 *   PUT    /api/progress/:id   {state}     → { ok, updatedAt }
 *   DELETE /api/progress/:id               → { ok }
 *
 * Env:
 *   PORT         listen port                    (default 8787)
 *   HOST         bind address                   (default 0.0.0.0)
 *   DATA_FILE    path of the JSON store         (default ./data/progress.json)
 *   DIST_DIR     built frontend to serve        (default ../dist if it exists)
 *   ALLOW_ORIGIN CORS origin                    (default *; set to your domain)
 *   MAX_BYTES    max body size                  (default 262144)
 */

import express from 'express'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PORT = Number(process.env.PORT ?? 8787)
const HOST = process.env.HOST ?? '0.0.0.0'
const DATA_FILE = path.resolve(__dirname, process.env.DATA_FILE ?? 'data/progress.json')
const MAX_BYTES = Number(process.env.MAX_BYTES ?? 262144)
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ?? '*'

const distCandidate = path.resolve(__dirname, process.env.DIST_DIR ?? '../dist')
const DIST_DIR = fs.existsSync(path.join(distCandidate, 'index.html')) ? distCandidate : null

const ID_RE = /^[A-Za-z0-9_-]{4,64}$/

/* ----------------------------- storage ----------------------------- */

let store = { version: 1, devices: {} }
let writeQueue = Promise.resolve()

function loadStore() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object' && parsed.devices) store = parsed
    console.log(`[store] loaded ${Object.keys(store.devices).length} device(s) from ${DATA_FILE}`)
  } catch (err) {
    if (err.code !== 'ENOENT') console.warn('[store] could not read store, starting fresh:', err.message)
    else console.log('[store] no store yet, will create', DATA_FILE)
  }
}

/** Atomic write: temp file + rename, serialised through a promise chain. */
function persist() {
  writeQueue = writeQueue.then(async () => {
    await fsp.mkdir(path.dirname(DATA_FILE), { recursive: true })
    const tmp = `${DATA_FILE}.${process.pid}.tmp`
    await fsp.writeFile(tmp, JSON.stringify(store, null, 0), 'utf8')
    await fsp.rename(tmp, DATA_FILE)
  }).catch((err) => {
    console.error('[store] write failed:', err.message)
  })
  return writeQueue
}

loadStore()

/* ------------------------------ server ----------------------------- */

const app = express()
app.disable('x-powered-by')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', ALLOW_ORIGIN)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Max-Age', '86400')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  next()
})

app.use(express.json({ limit: MAX_BYTES }))
app.use((err, _req, res, next) => {
  if (err) return res.status(400).json({ ok: false, error: 'bad_request' })
  next()
})

const badId = (res) => res.status(400).json({ ok: false, error: 'invalid_id' })

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: '202f-barista-os',
    devices: Object.keys(store.devices).length,
    uptime: Math.round(process.uptime()),
    storage: path.basename(DATA_FILE),
  })
})

app.get('/api/progress/:id', (req, res) => {
  const { id } = req.params
  if (!ID_RE.test(id)) return badId(res)
  const entry = store.devices[id]
  res.json({ ok: true, state: entry?.state ?? null, updatedAt: entry?.updatedAt ?? null })
})

app.put('/api/progress/:id', async (req, res) => {
  const { id } = req.params
  if (!ID_RE.test(id)) return badId(res)
  const state = req.body?.state
  if (!state || typeof state !== 'object' || Array.isArray(state)) {
    return res.status(400).json({ ok: false, error: 'state_required' })
  }
  const updatedAt = new Date().toISOString()
  store.devices[id] = { state, updatedAt }
  await persist()
  res.json({ ok: true, updatedAt, devices: Object.keys(store.devices).length })
})

app.delete('/api/progress/:id', async (req, res) => {
  const { id } = req.params
  if (!ID_RE.test(id)) return badId(res)
  delete store.devices[id]
  await persist()
  res.json({ ok: true })
})

if (DIST_DIR) {
  app.use(express.static(DIST_DIR, { maxAge: '1h', index: false }))
  app.get(/^\/(?!api\/).*/, (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')))
  console.log(`[static] serving frontend from ${DIST_DIR}`)
} else {
  app.get('/', (_req, res) => res.json({ ok: true, hint: 'API only — build the frontend or set DIST_DIR' }))
}

const server = app.listen(PORT, HOST, () => {
  console.log(`202f Academy progress API → http://${HOST}:${PORT}  (data: ${DATA_FILE})`)
})

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => {
    console.log(`\n[${sig}] flushing store…`)
    await writeQueue
    server.close(() => process.exit(0))
  })
}
