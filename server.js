const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Dual-mode Database Initialization (SQLite with JSON File fallback)
let dbType = 'JSON';
let dbInstance = null;
const JSON_DB_PATH = path.join(__dirname, 'database.json');
const SQLITE_DB_PATH = path.join(__dirname, 'database.db');

try {
    // Attempt to load sqlite3
    const sqlite3 = require('sqlite3').verbose();
    dbInstance = new sqlite3.Database(SQLITE_DB_PATH, (err) => {
        if (err) {
            console.error('Failed to open SQLite database, falling back to JSON storage:', err.message);
            initJsonDb();
        } else {
            console.log('Connected to the SQLite database.');
            dbType = 'SQLite';
            dbInstance.run(`
                CREATE TABLE IF NOT EXISTS inquiries (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    type TEXT NOT NULL,
                    name TEXT NOT NULL,
                    parentName TEXT,
                    phone TEXT NOT NULL,
                    classStage TEXT,
                    investmentRange TEXT,
                    createdAt TEXT NOT NULL
                )
            `);
        }
    });
} catch (e) {
    console.log('sqlite3 npm package not found or failed to compile. Using fail-safe JSON File database.');
    initJsonDb();
}

function initJsonDb() {
    dbType = 'JSON';
    if (!fs.existsSync(JSON_DB_PATH)) {
        fs.writeFileSync(JSON_DB_PATH, JSON.stringify([], null, 2));
    }
    console.log('JSON File-Based database initialized successfully.');
}

// Helper functions for JSON database operations
function getJsonInquiries() {
    try {
        const data = fs.readFileSync(JSON_DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveJsonInquiries(inquiries) {
    fs.writeFileSync(JSON_DB_PATH, JSON.stringify(inquiries, null, 2));
}

// API Endpoints

// 1. Get Server & Database Status
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        database: dbType,
        timestamp: new Date().toISOString()
    });
});

// 2. Submit a New Inquiry (Admission or Franchise)
app.post('/api/inquiries', (req, res) => {
    const { type, name, parentName, phone, classStage, investmentRange } = req.body;

    if (!type || !name || !phone) {
        return res.status(400).json({ error: 'Type, Name, and Phone are required fields.' });
    }

    const newInquiry = {
        type,
        name,
        parentName: parentName || null,
        phone,
        classStage: classStage || null,
        investmentRange: investmentRange || null,
        createdAt: new Date().toISOString()
    };

    if (dbType === 'SQLite' && dbInstance) {
        const query = `
            INSERT INTO inquiries (type, name, parentName, phone, classStage, investmentRange, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        dbInstance.run(query, [
            newInquiry.type,
            newInquiry.name,
            newInquiry.parentName,
            newInquiry.phone,
            newInquiry.classStage,
            newInquiry.investmentRange,
            newInquiry.createdAt
        ], function(err) {
            if (err) {
                console.error('SQLite insert error:', err.message);
                return res.status(500).json({ error: 'Failed to write to SQLite database.' });
            }
            res.status(201).json({
                message: 'Inquiry saved successfully to SQLite database!',
                id: this.lastID,
                data: newInquiry
            });
        });
    } else {
        // Fallback JSON DB
        const inquiries = getJsonInquiries();
        const id = inquiries.length > 0 ? inquiries[inquiries.length - 1].id + 1 : 1;
        const entry = { id, ...newInquiry };
        inquiries.push(entry);
        saveJsonInquiries(inquiries);

        res.status(201).json({
            message: 'Inquiry saved successfully to JSON File database!',
            id: id,
            data: entry
        });
    }
});

// 3. Get All Inquiries
app.get('/api/inquiries', (req, res) => {
    if (dbType === 'SQLite' && dbInstance) {
        dbInstance.all('SELECT * FROM inquiries ORDER BY id DESC', [], (err, rows) => {
            if (err) {
                console.error('SQLite read error:', err.message);
                return res.status(500).json({ error: 'Failed to fetch inquiries.' });
            }
            res.json(rows);
        });
    } else {
        // Fallback JSON DB
        const inquiries = getJsonInquiries();
        // Sort descending by ID to match database query
        res.json([...inquiries].reverse());
    }
});

// 4. Delete an Inquiry
app.delete('/api/inquiries/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (dbType === 'SQLite' && dbInstance) {
        dbInstance.run('DELETE FROM inquiries WHERE id = ?', id, function(err) {
            if (err) {
                console.error('SQLite delete error:', err.message);
                return res.status(500).json({ error: 'Failed to delete inquiry.' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Inquiry not found.' });
            }
            res.json({ message: `Inquiry #${id} deleted successfully from SQLite database!` });
        });
    } else {
        // Fallback JSON DB
        const inquiries = getJsonInquiries();
        const initialLength = inquiries.length;
        const filtered = inquiries.filter(item => item.id !== id);

        if (filtered.length === initialLength) {
            return res.status(404).json({ error: 'Inquiry not found.' });
        }

        saveJsonInquiries(filtered);
        res.json({ message: `Inquiry #${id} deleted successfully from JSON File database!` });
    }
});

// Serve frontend home page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Narayan e-Gurukul Backend Server is Running!`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🗄️  Active Database Engine: ${dbType}`);
    console.log(`====================================================`);
});
