import express from 'express'
import path from 'path'
import slugify from 'slugify'
import { Database } from "json-sql-query"
import { randFullName } from '@ngneat/falso'
import crypto from 'crypto'


const app = express()
const PORT = process.env.port || 5010

const filePath = (name) => path.resolve(__dirname, `../datas/${slugify(name)}.json`)

const getNewKeyValue = () => {return {key: crypto.randomBytes(32).toString('hex'), value: randFullName()}}


app.get('/create/:id', (req,res) => {
    const start = process.hrtime()
    const action = 'create'
    const dbName = filePath(req.params.id)
    const db = new Database(dbName)
    const name = path.basename(db)
    const dttm = new Date().toISOString()
    db.prepare(`CREATE TABLE IF NOT EXISTS "DEMO" ("key" TEXT, "value" TEXT)`).run()
    const data = db.prepare(`SELECT * FROM "DEMO"`).run().parse()
    const end = process.hrtime(start)
    return res.json({
        name,
        action,
        data,
        dttm,
        exectution: `Execution time (hr): ${end[0]}s ${end[1] / 1000000}ms` 
    })
})

app.get('/insert/:id', (req,res) => {
    const start = process.hrtime()
    const action = 'insert'
    const dbName = filePath(req.params.id)
    const db = new Database(dbName)
    const kv = getNewKeyValue()
    const name = path.basename(db)
    const dttm = new Date().toISOString()
    db.prepare(`INSERT INTO "DEMO" ("key","value") VALUES (${kv.key}, ${key.value})`).run()
    const data = db.prepare(`SELECT * FROM "DEMO"`).run().parse()
    const end = process.hrtime(start)
    return res.json({
        name,
        action,
        data,
        dttm,
        exectution: `Execution time (hr): ${end[0]}s ${end[1] / 1000000}ms` 
    })
})

app.get('/get', (req, res) => {
    const start = process.hrtime()
    const action = 'insert'
    const dbName = filePath(req.params.id)
    const db = new Database(dbName)
    const name = path.basename(db)
    const dttm = new Date().toISOString()
    try {
        const data = db.prepare(`SELECT * FROM "DEMO"`).run().parse()
        const end = process.hrtime(start)
        return res.json({
            name,
            action,
            data,
            dttm,
            exectution: `Execution time (hr): ${end[0]}s ${end[1] / 1000000}ms` 
        })
    } catch(error) {
        const end = process.hrtime(start)
        return res.json({
            name,
            action,
            error,
            dttm,
            exectution: `Execution time (hr): ${end[0]}s ${end[1] / 1000000}ms` 
        })
    }
})


app.listen(PORT, ()=> {
    console.log(`server listen at http://localhost:${PORT}`)
})