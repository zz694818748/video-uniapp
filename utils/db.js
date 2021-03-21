var tablesInfo = {
    upload: {
        id: 'VARCHAR(20)',
        network: 'VARCHAR(500)',
        location: 'VARCHAR(500) DEFAULT ""',
        title: 'VARCHAR(255)',
        duration: 'VARCHAR(255)',
        finish: 'INT(1)'
    },
    playrecord: {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        network: 'VARCHAR(500)',
        title: 'VARCHAR(255)',
        duration: 'VARCHAR(255)',
        currentTime: 'VARCHAR(10)',
        timeStamp: 'INT(10)'
    },
    playlist: {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        network: 'VARCHAR(500)',
        title: 'VARCHAR(255)',
        duration: 'VARCHAR(255)',
    },
    collect: {
        id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
        title: 'VARCHAR(255)',
        url: 'VARCHAR(255)',
    },
    msg: {
        id: 'INT(11) unsigned',
        type:'INT(1) DEFAULT 1',
        sendid: 'INT(11) unsigned',
        acceptid: 'INT(11) unsigned',
        timestamp: 'DATETIME',
        content: 'TEXT',
    },
    user: {
        id: 'INT(11) unsigned',
        username: 'VARCHAR(255)',
        avatar: 'VARCHAR(255)',
    },
    group: {
        id: 'INT(11) unsigned',
        groupname: 'VARCHAR(255)',
        avatar: 'VARCHAR(255)',
    }
}

function docallback(callback, data, e) {
    if (data.code != 1) {
        console.log(e)
    }
    if (typeof docallback == 'function') {
        callback(data)
    }
}

function createTable(tablename) {
    if (tablesInfo.hasOwnProperty(tablename)) {
        let s = ''
        for (let i in tablesInfo[tablename]) {
            s += s == '' ? '`' + i + '` ' + tablesInfo[tablename][i] : ',`' + i + '` ' + tablesInfo[tablename][i]
        }
        s = "(" + s + ")"
        return s
    }
}

function getWhereStr(pram) {
    if (typeof pram == 'object') {
        if (Array.isArray(pram)) {
            var sql = pram[0] + ' '
            switch (pram[0]) {
                case '=':
                case '<':
                case '>':
                case '>=':
                case '<=':
                    var bool = typeof pram[1] == 'string'
                    sql += bool ? '"' + pram[1] + '"' : pram[1]
                    break;
                case 'NOT BETWEEN':
                case 'BETWEEN':
                    var bool1 = typeof pram[1] == 'string'
                    var bool2 = typeof pram[2] == 'string'
                    sql += (bool1 ? '"' + pram[1] + '"' : pram[1]) + ' AND ' + (bool2 ? '"' + pram[2] + '"' : pram[2])
                    break;
                case 'NOT IN':
                case 'IN':
                    let str = ''
                    for (let i in pram[1]) {
                        let s = typeof pram[1][i] == 'string' ? '"' + pram[1][i] + '"' : pram[1][i]
                        str += str == '' ? s : ',' + s
                    }
                    sql += '(' + str + ')'
                    break;
            }
            return sql
        }
    } else {
        var bool = typeof pram == 'string'
        return bool ? '= "' + pram + '"' : '= ' + pram + ''
    }
}

function getSqlWhere(obj) {
    var str = ''
    for (let i in obj) {
        let s = i + ' ' + getWhereStr(obj[i])
        str += str == '' ? s : ' and ' + s
    }
    return str
    console.log(str)
}

function getInsertSql(tablename, data) {
    var baseSql = 'create table if not exists ' + tablename + createTable(tablename)
    var s = ''
    var v = ''
    for (let i in data) {
        if (tablesInfo[tablename].hasOwnProperty(i)) {
            s += s == '' ? i : ',' + i
            let str = typeof data[i] == 'string' ? '"' + data[i] + '"' : data[i]
            v += v == '' ? str : ',' + str
        }
    }
    var sql = '';
    if (s != '') {
        var sql = 'INSERT INTO ' + tablename + ' (' + s + ') VALUES (' + v + ')'
    }
    return [baseSql, sql]
}

function Db(name) {
    var option = {
        name: name,
        path: '_documents/' + name + '.db'
    }
    this.dbname = name

    this.insertGetId = function(tablename, data, callback) {
        var sql = getInsertSql(tablename, data);
        var getid = 'SELECT LAST_INSERT_ROWID() as id'
        this.executeSql(sql, function() {
            this.selectSql(getid, callback)
        }.bind(this))
    }
    this.insert = function(tablename, data, callback) {
        this.executeSql(getInsertSql(tablename, data), callback)
    }
    this.update = function(tablename, data, where, callback) {
        var set = ''
        for (let i in data) {
            if (tablesInfo[tablename].hasOwnProperty(i)) {
                let str = typeof data[i] == 'string' ? '"' + data[i] + '"' : data[i]
                set += set == '' ? i + '=' + str : ',' + i + '=' + str
            }
        }
        if (set != '') {
            var s = ''
            if (typeof where == 'object') {
                s = getSqlWhere(where)
            } else {
                s = where
            }
            s = s == '' ? '' : ' WHERE ' + s
            var sql = 'UPDATE ' + tablename + ' SET ' + set + s
            this.executeSql(sql, callback)
        }
    }
    this.del = function(tablename, where, callback) {
        var s = ''
        if (typeof where == 'object') {
            s = getSqlWhere(where)
        } else {
            s = where
        }
        s = s == '' ? '' : ' WHERE ' + s
        var sql = 'DELETE FROM ' + tablename + s
        this.executeSql(sql, callback)
    }
    this.select = function(tablename, where, callback, option = {}) {
        // option = {
        //     order:'',
        // limit:''
        // }
        var s = ''
        if (typeof where == 'object') {
            s = getSqlWhere(where)
        } else {
            s = where
        }
        s = s == '' ? '' : ' WHERE ' + s
        sql = 'select * from ' + tablename + s
        this.selectSql(sql, callback)
    }

    //读操作
    this.selectSql = function(sql, success) {
        console.log(sql)
        this.openDataBase()
        plus.sqlite.selectSql({
            name: this.dbname,
            sql: sql,
            success: function(data) {
                docallback(success, {
                    code: 1,
                    data: data
                })
                plus.sqlite.closeDatabase(option)
            },
            fail: function(e) {
                docallback(success, {
                    code: 0,
                    data: []
                }, e)
                plus.sqlite.closeDatabase(option)
            }
        });

    }

    // 写操作
    this.executeSql = function(sql, callback = false) {
        console.log(sql)
        this.openDataBase()
        plus.sqlite.executeSql({
            name: this.dbname,
            sql: sql,
            success: function(e) {
                console.log('executeSql success')
                if (typeof callback == 'function') {
                    callback()
                }
                plus.sqlite.closeDatabase(option)
            },
            fail: function(e) {
                console.log('executeSql failed: ' + JSON.stringify(e));
                plus.sqlite.closeDatabase(option)
            }
        });
    }

    this.openDataBase = function() {
        if (!plus.sqlite.isOpenDatabase(option)) {
            plus.sqlite.openDatabase(option)
        }
    }
}

module.exports = Db
