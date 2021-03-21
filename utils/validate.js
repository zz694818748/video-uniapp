class Validate {
    dereg = {
        password: /^([a-zA-Z0-9]|[._]){6,15}$/,
        mobile: /^1[3-9][0-9]\d{8}$/,
        email: /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/,
        money:  /^\d+$|^[0-9]\.\d+$/g,
        ip: /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/,
        id: /^[1-9]{1}\d+$/,
        integer: /^[-]{0,1}[0-9]{1,15}$/,
        required: /^\S{1,20}$/,
        Cardnum: /^[0-9a-fA-F]{8}$/
    }
    data = null
    rule = null
    constructor(data,rule) {
        this.data = data;
        this.data = data;
    }
    
    initrule(rule) {
        this.rule = rule
    }
    initdata(data) {
        this.data = data;
    }
    chack(data, rule) {
        rule = rule == undefined ? this.rule : rule
        data = data == undefined ? this.data : data
        var errormsg = false
        if (data == null) {
            errormsg = '缺少验证数据'
        }
        if (rule == null) {
            errormsg = '缺少验证规则'
        }
        if (errormsg !== false) {
            this.toast(errormsg)
            return false
        }

        for (let i in rule) {
            if (rule[i][0].constructor === Array) {
                for (let j in rule[i][0]) {
                    var b = this.vali(rule[i][0][j], data[i], rule[i][1])
                    if (b === false) {
                        return b;
                    }
                }
            } else {
                var b = this.vali(rule[i][0], data[i], rule[i][1])
                if (b === false) {
                    return b;
                }
            }
        }
        return true
    }

    vali(reg, data, msg) {
        var regu = this.dereg.hasOwnProperty(reg) ? this.dereg[reg] : reg
        // console.log(regu,data)
        var re = new RegExp(regu);
        var bool = re.test(data)
        if (!bool) {
            this.toast(msg)
        }
        return bool
    }

    toast(msg) {
        uni.showToast({
            title: msg,
            duration: 3000,
            icon: 'none',
        });
    }
}
module.exports = new Validate()
