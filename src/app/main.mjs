import express from 'express'
import path from 'path'
import slugify from 'slugify'
import { Database } from "json-sql-query"


const app = express()
const PORT = process.env.port || 5010

const filePath = (name) => path.resolve(__dirname, `../datas/${slugify(name)}.json`)


app.get('/create/:id', (req,res) => {
    const dbName = filePath(req.params.id)
    const db = new Database(dbName)
    db.prepare(`CREATE TABLE IF NOT EXISTS "DEMO" ("key" TEXT, "value" TEXT)`).run()
})
app.get('/insert/:id', (req,res) => {
    const dbName = filePath(req.params.id)
    const db = new Database(dbName)
    db.prepare(`INSERT INTO "DEMO" ("key","value") VALUES ("test_key", "test_value")`).run()
})


app.listen(PORT, ()=> {
    console.log(`server listen at http://localhost:${PORT}`)
})