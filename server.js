// ═══════════════════════════════════════════════════════
//  Narayan e-Gurukul — Full LMS Backend v2.0
//  Express + SQLite (JSON fallback)
//  Endpoints: auth, users, batches, library, tests, progress
// ═══════════════════════════════════════════════════════

const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const crypto   = require('crypto');
const app      = express();
const PORT     = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});
app.use(express.static(path.join(__dirname)));

// ── Database Setup ──────────────────────────────────────
let dbType     = 'JSON';
let dbInstance = null;
const SQLITE   = path.join(__dirname, 'database.db');
const JSON_DB  = path.join(__dirname, 'database.json');

try {
    const sqlite3 = require('sqlite3').verbose();
    dbInstance = new sqlite3.Database(SQLITE, (err) => {
        if (err) { initJsonDb(); return; }
        dbType = 'SQLite';
        console.log('✅ SQLite database connected.');
        createTables();
    });
} catch(e) {
    console.log('⚠️  SQLite not found — using JSON fallback.');
    initJsonDb();
}

function initJsonDb() {
    dbType = 'JSON';
    if (!fs.existsSync(JSON_DB)) {
        fs.writeFileSync(JSON_DB, JSON.stringify({
            users:[], batches:[], enrollments:[],
            pdfs:[], tests:[], attempts:[], inquiries:[]
        }, null, 2));
    }
    console.log('✅ JSON database initialized.');
}

function getDB() {
    try {
        return JSON.parse(fs.readFileSync(JSON_DB, 'utf8'));
    } catch { return {users:[],batches:[],enrollments:[],pdfs:[],tests:[],attempts:[],inquiries:[]}; }
}
function saveDB(data) {
    fs.writeFileSync(JSON_DB, JSON.stringify(data, null, 2));
}

function createTables() {
    const tables = [
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            mobile TEXT,
            passwordHash TEXT,
            branch TEXT DEFAULT 'B.Tech CSE',
            semester INTEGER DEFAULT 1,
            targetExam TEXT DEFAULT 'GATE CSE',
            xp INTEGER DEFAULT 0,
            rank INTEGER DEFAULT 0,
            city TEXT,
            createdAt TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS batches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            icon TEXT DEFAULT 'ri-book-3-line',
            branch TEXT,
            semesters TEXT DEFAULT '1-8',
            price INTEGER DEFAULT 0,
            originalPrice INTEGER DEFAULT 0,
            isPaid INTEGER DEFAULT 0,
            language TEXT DEFAULT 'English',
            link TEXT DEFAULT '#',
            createdAt TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS enrollments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            batchId INTEGER,
            enrolledAt TEXT NOT NULL,
            progress INTEGER DEFAULT 0
        )`,
        `CREATE TABLE IF NOT EXISTS pdfs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            branch TEXT,
            semester TEXT,
            subject TEXT,
            type TEXT DEFAULT 'notes',
            pages INTEGER DEFAULT 0,
            driveLink TEXT,
            createdAt TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            branch TEXT,
            subject TEXT,
            totalQuestions INTEGER DEFAULT 0,
            totalMarks INTEGER DEFAULT 0,
            duration INTEGER DEFAULT 60,
            difficulty TEXT DEFAULT 'Medium',
            type TEXT DEFAULT 'chapter',
            attempted INTEGER DEFAULT 0,
            createdAt TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            testId INTEGER,
            score INTEGER DEFAULT 0,
            totalMarks INTEGER DEFAULT 0,
            timeTaken INTEGER DEFAULT 0,
            completedAt TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT,
            phone TEXT,
            message TEXT,
            createdAt TEXT NOT NULL
        )`
    ];
    tables.forEach(sql => dbInstance.run(sql, err => { if(err) console.error(err.message); }));

    // Seed default batches if empty
    dbInstance.get('SELECT COUNT(*) as c FROM batches', (err, row) => {
        if (!err && row.c === 0) seedBatches();
    });
    dbInstance.get('SELECT COUNT(*) as c FROM pdfs', (err, row) => {
        if (!err && row.c === 0) seedPdfs();
    });
    dbInstance.get('SELECT COUNT(*) as c FROM tests', (err, row) => {
        if (!err && row.c === 0) seedTests();
    });
}

// ── Seed Data ───────────────────────────────────────────
function seedBatches() {
    const now = new Date().toISOString();
    const batches = [
        ['B.Tech CSE – Complete Study Material','All 8 semesters CSE notes, PYQs & tests','ri-cpu-line','CSE','1-8',1999,4999,1,'English','#'],
        ['B.Tech ECE – Electronics & Communication','ECE complete study material Sem 1-8','ri-radio-line','ECE','1-8',1799,4499,1,'English','#'],
        ['B.Tech ME – Mechanical Engineering','Mechanical engineering full notes','ri-settings-3-line','ME','1-8',1699,3999,1,'Hinglish','#'],
        ['B.Tech CE – Civil Engineering','Civil engineering complete material','ri-building-line','CE','1-8',1599,3999,1,'English','#'],
        ['B.Tech EE – Electrical Engineering','Electrical engineering notes & PYQs','ri-flashlight-line','EE','1-8',1799,4499,1,'English','#'],
        ['B.Tech IT – Information Technology','IT complete study material','ri-computer-line','IT','1-8',1899,4499,1,'English','#'],
        ['B.Tech CSE – Data Science & AI/ML','AIDS & AIML specialization notes','ri-brain-line','AIDS/AIML','1-8',0,0,0,'English','#']
    ];
    const sql = `INSERT INTO batches (name,description,icon,branch,semesters,price,originalPrice,isPaid,language,link,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    batches.forEach(b => dbInstance.run(sql, [...b, now]));
    console.log('✅ Default batches seeded.');
}

function seedPdfs() {
    const now = new Date().toISOString();
    const pdfs = [
        ['Data Structures – Complete Notes PDF','CSE','3','DSA','notes',85,'https://drive.google.com/'],
        ['DBMS – ER Diagrams & Normalization Notes','CSE','4','DBMS','notes',60,'https://drive.google.com/'],
        ['Computer Networks – OSI & TCP/IP Model','CSE','5','CN','notes',72,'https://drive.google.com/'],
        ['Operating Systems – Process Scheduling PDF','CSE','5','OS','notes',55,'https://drive.google.com/'],
        ['Theory of Computation – Automata Notes','CSE','6','TOC','notes',90,'https://drive.google.com/'],
        ['Machine Learning – Algorithms & Models','CSE','7','ML','notes',110,'https://drive.google.com/'],
        ['Engineering Mathematics I – Complete Notes','CORE','1','Maths','notes',75,'https://drive.google.com/'],
        ['Engineering Physics – Notes & PYQs','CORE','1','Physics','pyq',68,'https://drive.google.com/']
    ];
    const sql = `INSERT INTO pdfs (title,branch,semester,subject,type,pages,driveLink,createdAt) VALUES (?,?,?,?,?,?,?,?)`;
    pdfs.forEach(p => dbInstance.run(sql, [...p, now]));
    console.log('✅ Default PDFs seeded.');
}

function seedTests() {
    const now = new Date().toISOString();
    const tests = [
        ['B.Tech CSE – Full Mock Test 01','CSE','All Subjects',100,200,180,'Hard','full',2340],
        ['B.Tech CSE – Full Mock Test 02','CSE','All Subjects',100,200,180,'Hard','full',1890],
        ['DSA Mock Test – Set 01','CSE','DSA',60,120,120,'Hard','chapter',1200],
        ['DBMS Mock Test – Set 01','CSE','DBMS',60,120,120,'Hard','chapter',980],
        ['GATE CSE 2024 – Full Paper','CSE','All Subjects',65,100,180,'Hard','pyq',8760],
        ['GATE CSE 2023 – Full Paper','CSE','All Subjects',65,100,180,'Hard','pyq',12400]
    ];
    const sql = `INSERT INTO tests (title,branch,subject,totalQuestions,totalMarks,duration,difficulty,type,attempted,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    tests.forEach(t => dbInstance.run(sql, [...t, now]));
    console.log('✅ Default tests seeded.');
}

// ── Simple token helper ─────────────────────────────────
function makeToken(userId) {
    return Buffer.from(`${userId}:${Date.now()}:narayan`).toString('base64');
}
function hashPassword(pass) {
    return crypto.createHash('sha256').update(pass + 'narayan_salt').digest('hex');
}

// ── Auth Middleware ─────────────────────────────────────
function auth(req, res, next) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    try {
        const decoded = Buffer.from(token, 'base64').toString('utf8');
        const [userId] = decoded.split(':');
        req.userId = parseInt(userId);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}

// ═══════════════════════════════════════════════════════
//  API ROUTES
// ═══════════════════════════════════════════════════════

// ── 1. Server Status ────────────────────────────────────
app.get('/api/status', (req, res) => {
    res.json({ status: 'online', database: dbType, version: '2.0', timestamp: new Date().toISOString() });
});

// ── 2. Auth: Register ───────────────────────────────────
app.post('/api/auth/register', (req, res) => {
    const { name, email, mobile, password, branch, semester } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

    const hash    = hashPassword(password || 'narayan123');
    const now     = new Date().toISOString();

    if (dbType === 'SQLite') {
        dbInstance.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
            if (row) return res.status(409).json({ error: 'Email already registered.' });
            dbInstance.run(
                `INSERT INTO users (name,email,mobile,passwordHash,branch,semester,createdAt) VALUES (?,?,?,?,?,?,?)`,
                [name, email, mobile||null, hash, branch||'B.Tech CSE', semester||1, now],
                function(err) {
                    if (err) return res.status(500).json({ error: err.message });
                    const token = makeToken(this.lastID);
                    res.status(201).json({ message: 'Registered!', token, userId: this.lastID, name });
                }
            );
        });
    } else {
        const db = getDB();
        if (db.users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already registered.' });
        const id = (db.users[db.users.length - 1]?.id || 0) + 1;
        const user = { id, name, email, mobile:mobile||null, passwordHash:hash, branch:branch||'B.Tech CSE', semester:semester||1, xp:0, rank:0, createdAt:now };
        db.users.push(user);
        saveDB(db);
        res.status(201).json({ message: 'Registered!', token: makeToken(id), userId: id, name });
    }
});

// ── 3. Auth: Login ──────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required.' });
    const hash = hashPassword(password);

    if (dbType === 'SQLite') {
        dbInstance.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
            if (!user || user.passwordHash !== hash)
                return res.status(401).json({ error: 'Invalid credentials.' });
            res.json({ message: 'Login successful!', token: makeToken(user.id), user: { id:user.id, name:user.name, email:user.email, branch:user.branch, semester:user.semester, xp:user.xp } });
        });
    } else {
        const db = getDB();
        const user = db.users.find(u => u.email === email && u.passwordHash === hash);
        if (!user) return res.status(401).json({ error: 'Invalid credentials.' });
        res.json({ message: 'Login successful!', token: makeToken(user.id), user: { id:user.id, name:user.name, email:user.email, branch:user.branch, semester:user.semester, xp:user.xp||0 } });
    }
});

// ── 4. Get My Profile ───────────────────────────────────
app.get('/api/profile', auth, (req, res) => {
    if (dbType === 'SQLite') {
        dbInstance.get('SELECT id,name,email,mobile,branch,semester,targetExam,xp,rank,city,createdAt FROM users WHERE id=?',
            [req.userId], (err, user) => {
                if (!user) return res.status(404).json({ error: 'User not found.' });
                // Get stats
                dbInstance.get('SELECT COUNT(*) as tests, AVG(CAST(score AS REAL)/totalMarks*100) as avg FROM attempts WHERE userId=?',
                    [req.userId], (e, stats) => {
                        res.json({ ...user, testsAttempted: stats?.tests||0, avgScore: Math.round(stats?.avg||0) });
                    });
            });
    } else {
        const db = getDB();
        const user = db.users.find(u => u.id === req.userId);
        if (!user) return res.status(404).json({ error: 'User not found.' });
        const attempts = db.attempts.filter(a => a.userId === req.userId);
        const avg = attempts.length ? Math.round(attempts.reduce((s,a) => s + (a.score/a.totalMarks*100), 0) / attempts.length) : 0;
        res.json({ ...user, testsAttempted: attempts.length, avgScore: avg });
    }
});

// ── 5. Update Profile ───────────────────────────────────
app.put('/api/profile', auth, (req, res) => {
    const { name, mobile, city, branch, semester, targetExam } = req.body;
    if (dbType === 'SQLite') {
        dbInstance.run(`UPDATE users SET name=COALESCE(?,name), mobile=COALESCE(?,mobile), city=COALESCE(?,city),
            branch=COALESCE(?,branch), semester=COALESCE(?,semester), targetExam=COALESCE(?,targetExam) WHERE id=?`,
            [name, mobile, city, branch, semester, targetExam, req.userId], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Profile updated!' });
            });
    } else {
        const db = getDB();
        const idx = db.users.findIndex(u => u.id === req.userId);
        if (idx === -1) return res.status(404).json({ error: 'User not found.' });
        db.users[idx] = { ...db.users[idx], ...(name&&{name}), ...(mobile&&{mobile}), ...(city&&{city}), ...(branch&&{branch}), ...(semester&&{semester}), ...(targetExam&&{targetExam}) };
        saveDB(db);
        res.json({ message: 'Profile updated!' });
    }
});

// ── 6. Get All Batches ──────────────────────────────────
app.get('/api/batches', (req, res) => {
    if (dbType === 'SQLite') {
        dbInstance.all('SELECT * FROM batches ORDER BY isPaid DESC, id ASC', (err, rows) => {
            res.json(rows || []);
        });
    } else {
        res.json(getDB().batches);
    }
});

// ── 7. Enroll in Batch ──────────────────────────────────
app.post('/api/enroll', auth, (req, res) => {
    const { batchId } = req.body;
    if (!batchId) return res.status(400).json({ error: 'batchId required.' });
    const now = new Date().toISOString();

    if (dbType === 'SQLite') {
        dbInstance.get('SELECT id FROM enrollments WHERE userId=? AND batchId=?', [req.userId, batchId], (err, row) => {
            if (row) return res.status(409).json({ error: 'Already enrolled.' });
            dbInstance.run('INSERT INTO enrollments (userId,batchId,enrolledAt,progress) VALUES (?,?,?,0)',
                [req.userId, batchId, now], function(err) {
                    if (err) return res.status(500).json({ error: err.message });
                    res.status(201).json({ message: 'Enrolled successfully!', enrollmentId: this.lastID });
                });
        });
    } else {
        const db = getDB();
        if (db.enrollments.find(e => e.userId===req.userId && e.batchId===batchId))
            return res.status(409).json({ error: 'Already enrolled.' });
        const id = (db.enrollments[db.enrollments.length-1]?.id||0)+1;
        db.enrollments.push({ id, userId:req.userId, batchId, enrolledAt:now, progress:0 });
        saveDB(db);
        res.status(201).json({ message: 'Enrolled!', enrollmentId: id });
    }
});

// ── 8. My Enrolled Batches ──────────────────────────────
app.get('/api/my-batches', auth, (req, res) => {
    if (dbType === 'SQLite') {
        dbInstance.all(`SELECT b.*, e.enrolledAt, e.progress FROM batches b
            JOIN enrollments e ON b.id=e.batchId WHERE e.userId=? ORDER BY e.enrolledAt DESC`,
            [req.userId], (err, rows) => res.json(rows||[]));
    } else {
        const db = getDB();
        const enrolled = db.enrollments.filter(e => e.userId===req.userId);
        const result = enrolled.map(e => {
            const batch = db.batches.find(b => b.id===e.batchId);
            return batch ? { ...batch, enrolledAt:e.enrolledAt, progress:e.progress } : null;
        }).filter(Boolean);
        res.json(result);
    }
});

// ── 9. Get Library PDFs ─────────────────────────────────
app.get('/api/library', (req, res) => {
    const { branch, semester, type } = req.query;
    if (dbType === 'SQLite') {
        let sql = 'SELECT * FROM pdfs WHERE 1=1';
        const params = [];
        if (branch) { sql += ' AND branch=?'; params.push(branch); }
        if (semester) { sql += ' AND semester=?'; params.push(semester); }
        if (type) { sql += ' AND type=?'; params.push(type); }
        sql += ' ORDER BY id DESC';
        dbInstance.all(sql, params, (err, rows) => res.json(rows||[]));
    } else {
        let pdfs = getDB().pdfs;
        if (branch) pdfs = pdfs.filter(p => p.branch===branch);
        if (semester) pdfs = pdfs.filter(p => p.semester===semester);
        if (type) pdfs = pdfs.filter(p => p.type===type);
        res.json(pdfs);
    }
});

// ── 10. Get Test Series ─────────────────────────────────
app.get('/api/tests', (req, res) => {
    const { type, branch } = req.query;
    if (dbType === 'SQLite') {
        let sql = 'SELECT * FROM tests WHERE 1=1';
        const params = [];
        if (type) { sql += ' AND type=?'; params.push(type); }
        if (branch) { sql += ' AND branch=?'; params.push(branch); }
        sql += ' ORDER BY attempted DESC';
        dbInstance.all(sql, params, (err, rows) => res.json(rows||[]));
    } else {
        let tests = getDB().tests;
        if (type) tests = tests.filter(t => t.type===type);
        if (branch) tests = tests.filter(t => t.branch===branch);
        res.json(tests);
    }
});

// ── 11. Submit Test Attempt ─────────────────────────────
app.post('/api/tests/:id/attempt', auth, (req, res) => {
    const testId  = parseInt(req.params.id);
    const { score, totalMarks, timeTaken } = req.body;
    const now = new Date().toISOString();

    if (dbType === 'SQLite') {
        dbInstance.run('INSERT INTO attempts (userId,testId,score,totalMarks,timeTaken,completedAt) VALUES (?,?,?,?,?,?)',
            [req.userId, testId, score||0, totalMarks||100, timeTaken||0, now], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                // Award XP
                const xp = Math.round((score/totalMarks) * 50);
                dbInstance.run('UPDATE users SET xp=xp+? WHERE id=?', [xp, req.userId]);
                res.status(201).json({ message: 'Test submitted!', xpEarned: xp, attemptId: this.lastID });
            });
    } else {
        const db = getDB();
        const id = (db.attempts[db.attempts.length-1]?.id||0)+1;
        db.attempts.push({ id, userId:req.userId, testId, score:score||0, totalMarks:totalMarks||100, timeTaken:timeTaken||0, completedAt:now });
        const xp = Math.round(((score||0)/(totalMarks||100)) * 50);
        const userIdx = db.users.findIndex(u => u.id===req.userId);
        if (userIdx > -1) db.users[userIdx].xp = (db.users[userIdx].xp||0) + xp;
        saveDB(db);
        res.status(201).json({ message: 'Test submitted!', xpEarned: xp, attemptId: id });
    }
});

// ── 12. My Test History ─────────────────────────────────
app.get('/api/my-attempts', auth, (req, res) => {
    if (dbType === 'SQLite') {
        dbInstance.all(`SELECT a.*, t.title, t.subject FROM attempts a
            JOIN tests t ON a.testId=t.id WHERE a.userId=? ORDER BY a.completedAt DESC LIMIT 20`,
            [req.userId], (err, rows) => res.json(rows||[]));
    } else {
        const db = getDB();
        const attempts = db.attempts.filter(a => a.userId===req.userId)
            .map(a => { const t = db.tests.find(t => t.id===a.testId); return { ...a, title:t?.title, subject:t?.subject }; })
            .reverse().slice(0,20);
        res.json(attempts);
    }
});

// ── 13. Leaderboard ─────────────────────────────────────
app.get('/api/leaderboard', (req, res) => {
    if (dbType === 'SQLite') {
        dbInstance.all('SELECT id,name,branch,xp,rank FROM users ORDER BY xp DESC LIMIT 20', (err, rows) => {
            const ranked = (rows||[]).map((u,i) => ({ ...u, rank: i+1 }));
            res.json(ranked);
        });
    } else {
        const db = getDB();
        const sorted = [...db.users].sort((a,b) => (b.xp||0)-(a.xp||0)).slice(0,20).map((u,i) => ({ id:u.id, name:u.name, branch:u.branch, xp:u.xp||0, rank:i+1 }));
        res.json(sorted);
    }
});

// ── 14. Contact / Inquiry ───────────────────────────────
app.post('/api/inquiries', (req, res) => {
    const { type, name, email, phone, message } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required.' });
    const now = new Date().toISOString();

    if (dbType === 'SQLite') {
        dbInstance.run('INSERT INTO inquiries (type,name,email,phone,message,createdAt) VALUES (?,?,?,?,?,?)',
            [type||'general', name, email||null, phone||null, message||null, now], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Inquiry saved!', id: this.lastID });
            });
    } else {
        const db = getDB();
        const id = (db.inquiries[db.inquiries.length-1]?.id||0)+1;
        db.inquiries.push({ id, type:type||'general', name, email:email||null, phone:phone||null, message:message||null, createdAt:now });
        saveDB(db);
        res.status(201).json({ message: 'Inquiry saved!', id });
    }
});

app.get('/api/inquiries', (req, res) => {
    if (dbType === 'SQLite') {
        dbInstance.all('SELECT * FROM inquiries ORDER BY id DESC', (err, rows) => res.json(rows||[]));
    } else {
        res.json([...getDB().inquiries].reverse());
    }
});

app.delete('/api/inquiries/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (dbType === 'SQLite') {
        dbInstance.run('DELETE FROM inquiries WHERE id=?', [id], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: `Inquiry #${id} deleted.` });
        });
    } else {
        const db = getDB();
        db.inquiries = db.inquiries.filter(i => i.id !== id);
        saveDB(db);
        res.json({ message: `Inquiry #${id} deleted.` });
    }
});

// ── 15. AI Guru Chatbot ─────────────────────────────────
app.post('/api/chat', (req, res) => {
    const q = (req.body.message || '').toLowerCase().trim();
    let reply = '', suggestions = [];

    if (q.includes('hello') || q.includes('hi')) {
        reply = 'Hello! I am **AI Guru** 🎓 — your smart study assistant at Narayan e-Gurukul. How can I help you today?';
        suggestions = ['Explore B.Tech Notes', 'Test Series', 'My Profile', 'Leaderboard'];
    } else if (q.includes('batch') || q.includes('course')) {
        reply = 'We have 7 B.Tech batches covering CSE, ECE, ME, CE, EE, IT, and AIDS/AIML. Use `/api/batches` to see all.';
        suggestions = ['Enroll in CSE', 'View all batches', 'Check my batches'];
    } else if (q.includes('test') || q.includes('mock')) {
        reply = 'Access **Full Mock Tests**, **PYQ Tests**, and **Chapter Tests** from the Test Series section!';
        suggestions = ['Start a test', 'View my scores', 'Leaderboard'];
    } else if (q.includes('pdf') || q.includes('notes') || q.includes('library')) {
        reply = 'Our **NG Library** has 200+ PDFs, Short Notes, Mindmaps, and Formula Sheets for all semesters!';
        suggestions = ['Open Library', 'Download DSA Notes', 'Open PDF Bank'];
    } else {
        reply = 'I am here to help with study materials, tests, batches, and your profile. What would you like to explore?';
        suggestions = ['B.Tech Batches', 'Test Series', 'Library', 'Contact Support'];
    }

    res.json({ response: reply, suggestions, timestamp: new Date().toISOString() });
});

// ── Serve Frontend ──────────────────────────────────────
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Start Server ────────────────────────────────────────
app.listen(PORT, () => {
    console.log('═══════════════════════════════════════════════');
    console.log(`🚀  Narayan e-Gurukul Backend v2.0 is running!`);
    console.log(`📡  URL:      http://localhost:${PORT}`);
    console.log(`🗄️   Database: ${dbType}`);
    console.log('═══════════════════════════════════════════════');
    console.log('');
    console.log('API Endpoints:');
    console.log('  GET  /api/status');
    console.log('  POST /api/auth/register');
    console.log('  POST /api/auth/login');
    console.log('  GET  /api/profile          (auth)');
    console.log('  PUT  /api/profile          (auth)');
    console.log('  GET  /api/batches');
    console.log('  POST /api/enroll           (auth)');
    console.log('  GET  /api/my-batches       (auth)');
    console.log('  GET  /api/library');
    console.log('  GET  /api/tests');
    console.log('  POST /api/tests/:id/attempt (auth)');
    console.log('  GET  /api/my-attempts      (auth)');
    console.log('  GET  /api/leaderboard');
    console.log('  POST /api/inquiries');
    console.log('  GET  /api/inquiries');
    console.log('  POST /api/chat');
    console.log('═══════════════════════════════════════════════');
});
