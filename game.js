class HackerGame {
    constructor() {
        this.level = 1;
        this.exp = 0;
        this.skills = {
            'bruteforce': 1, // 暴力破解
            'network': 1,    // 网络技术
            'crypto': 1,     // 密码学
            'stealth': 1     // 隐身技术
        };
        
        this.tools = {
            'nmap': { 
                unlocked: true, 
                description: '网络扫描工具', 
                skillBonus: 'network',
                tutorial: '使用说明：\n' +
                    '1. 基础扫描: nmap <目标IP>\n' +
                    '2. 端口扫描: nmap -p 1-1000 <目标IP>\n' +
                    '3. 服务版本扫描: nmap -sV <目标IP>\n' +
                    '4. 操作系统探测: nmap -O <目标IP>\n' +
                    '提示：-p指定端口范围，-sV探测服务版本，-O探测操作系统'
            },
            'hydra': { 
                unlocked: false, 
                description: '密码破解工具', 
                skillBonus: 'bruteforce',
                tutorial: '使用说明：\n' +
                    '1. SSH服务破解: hydra -l 用户名 -P 密码字典.txt ssh://目标IP\n' +
                    '2. FTP服务破解: hydra -l 用户名 -P 密码字典.txt ftp://目标IP\n' +
                    '3. Web表单破解: hydra -l 用户名 -P 密码字典.txt 目标IP http-post-form\n' +
                    '提示：-l指定用户名，-P指定密码字典文件'
            },
            'wireshark': { 
                unlocked: false, 
                description: '网络嗅探工具', 
                skillBonus: 'network',
                tutorial: '使用说明：\n' +
                    '1. 捕获过滤器: host 目标IP\n' +
                    '2. 显示过滤器: http or ftp\n' +
                    '3. 常用过滤: tcp.port == 80\n' +
                    '提示：可以使用and/or组合多个过滤条件'
            },
            'metasploit': { 
                unlocked: false, 
                description: '漏洞利用工具', 
                skillBonus: 'network',
                tutorial: '使用说明：\n' +
                    '1. 启动命令: msfconsole\n' +
                    '2. 搜索漏洞: search <关键词>\n' +
                    '3. 使用模块: use <模块路径>\n' +
                    '4. 设置参数: set RHOST <目标IP>\n' +
                    '提示：exploit命令开始攻击，info查看模块信息'
            },
            'hashcat': { 
                unlocked: false, 
                description: '高级密码破解工具', 
                skillBonus: 'crypto',
                tutorial: '使用说明：\n' +
                    '1. 破解MD5: hashcat -m 0 -a 0 hash值 字典文件\n' +
                    '2. 破解SHA1: hashcat -m 100 -a 0 hash值 字典文件\n' +
                    '3. 掩码攻击: hashcat -m 0 -a 3 hash值 ?a?a?a?a?a?a\n' +
                    '提示：-m指定哈希类型，-a指定攻击模式'
            },
            'proxychains': { 
                unlocked: false, 
                description: '代理链工具', 
                skillBonus: 'stealth',
                tutorial: '使用说明：\n' +
                    '1. 配置文件: /etc/proxychains.conf\n' +
                    '2. 使用方法: proxychains <要代理的命令>\n' +
                    '3. 示例: proxychains nmap 目标IP\n' +
                    '提示：可以配置多级代理，支持socks4/5和http代理'
            },
            'sqlmap': { 
                unlocked: false, 
                description: 'SQL注入工具', 
                skillBonus: 'bruteforce',
                tutorial: '使用说明：\n' +
                    '1. 基础扫描: sqlmap -u "http://网站/page.php?id=1"\n' +
                    '2. 获取数据库: sqlmap -u URL --dbs\n' +
                    '3. 获取表名: sqlmap -u URL -D 数据库名 --tables\n' +
                    '4. 获取数据: sqlmap -u URL -D 数据库名 -T 表名 --dump\n' +
                    '提示：--batch自动选择默认选项，--random-agent随机切换User-Agent'
            }
        };

        this.missions = [
            {
                id: 1,
                name: '端口扫描训练',
                description: '学习使用nmap进行端口扫描',
                details: '使用nmap扫描目标系统，发现开放端口和服务。',
                difficulty: '简单',
                requiredLevel: 1,
                requiredSkill: 'network',
                requiredTool: 'nmap',
                reward: 100,
                completed: false,
                available: true,
                steps: [
                    {
                        instruction: '使用nmap扫描目标IP (命令: nmap 192.168.1.100)',
                        verify: (cmd) => {
                            if (cmd.trim() === 'nmap 192.168.1.100') {
                                return {
                                    success: true,
                                    message: `正在扫描 192.168.1.100 ...\n\n扫描结果：\n端口\t状态\t服务\n22/tcp\topen\tssh\n80/tcp\topen\thttp\n443/tcp\topen\tssl/http\n3306/tcp\topen\tmysql\n\n扫描完成！发现4个开放端口。\n\n下一步：使用-sV参数识别服务版本 (命令: nmap -sV 192.168.1.100)`
                                };
                            }
                            return { success: false, message: '命令错误。请使用: nmap 192.168.1.100' };
                        }
                    },
                    {
                        instruction: '使用-sV参数识别服务版本 (命令: nmap -sV 192.168.1.100)',
                        verify: function(cmd) {
                            const normalizedCmd = cmd.trim().toLowerCase();
                            
                            // 检查命令格式
                            if (normalizedCmd === "nmap -sv 192.168.1.100") {
                                return {
                                    success: false,
                                    message: "命令语法错误。\n\n- 参数应为 -sV (注意大写V)"
                                };
                            }
                            
                            if (normalizedCmd === "nmap -sV 192.168.1.100") {
                                return {
                                    success: true,
                                    message: `正在进行服务版本探测 ...\n\n扫描结果：\n端口\t状态\t服务\t\t版本\n22/tcp\topen\tssh\t\tOpenSSH 8.2p1\n80/tcp\topen\thttp\t\tApache 2.4.41\n443/tcp\topen\tssl/http\tApache 2.4.41\n3306/tcp\topen\tmysql\t\tMySQL 5.7.32\n\n服务版本探测完成！\n\n下一步：使用-O参数进行操作系统探测`
                                };
                            }
                            
                            if (!normalizedCmd.startsWith("nmap")) {
                                return {
                                    success: false,
                                    message: "错误：需要使用 nmap 命令。"
                                };
                            }
                            
                            if (!normalizedCmd.includes("-sv") && !normalizedCmd.includes("-sV")) {
                                return {
                                    success: false,
                                    message: "命令语法错误。\n\n- 缺少服务版本扫描参数 (-sV)"
                                };
                            }
                            
                            if (!normalizedCmd.includes("192.168.1.100")) {
                                return {
                                    success: false,
                                    message: "命令语法错误。\n\n- 缺少目标IP地址"
                                };
                            }
                            
                            return {
                                success: false,
                                message: "命令错误。请使用: nmap -sV 192.168.1.100"
                            };
                        }
                    }
                ]
            },
            {
                id: 2,
                name: '密码破解训练',
                description: '破解一个简单的密码保护系统',
                details: '目标系统使用了弱密码。\n' +
                    '目标：破解用户登录密码\n\n' +
                    '学习内容：\n' +
                    '1. 什么是密码破解？\n' +
                    '   密码破解是通过各种方法尝试获取系统密码的过程。\n' +
                    '   常见方法：字典攻击、暴力破解、组合攻击\n\n' +
                    '2. 使用hydra工具：\n' +
                    '   - 基础语法：hydra -l 用户名 -P 密码字典.txt 服务类型://目标\n' +
                    '   - 示例：hydra -l admin -P common_passwords.txt ssh://192.168.1.100\n\n' +
                    '3. 密码字典：\n' +
                    '   - 常用密码\n' +
                    '   - 键盘组合\n' +
                    '   - 社会工程学信息\n\n' +
                    '安全提示：仅在授权的系统上进行测试',
                reward: 150,
                requiredLevel: 1,
                difficulty: 2,
                completed: false,
                requiredSkill: 'bruteforce',
                requiredTool: 'hydra'
            },
            {
                id: 3,
                name: '网络流量分析',
                description: '分析网络流量寻找敏感信息',
                details: '捕获并分析目标网络流量。\n' +
                    '目标：找出用户的登录凭证\n\n' +
                    '学习内容：\n' +
                    '1. 网络嗅探基础：\n' +
                    '   - 什么是数据包\n' +
                    '   - TCP/IP协议\n' +
                    '   - 明文传输的危险\n\n' +
                    '2. Wireshark使用方法：\n' +
                    '   - 选择网卡\n' +
                    '   - 设置过滤器\n' +
                    '   - 分析数据包\n\n' +
                    '3. 常用过滤器：\n' +
                    '   - http.request.method == "POST"\n' +
                    '   - tcp.port == 80\n' +
                    '   - http.host contains "login"\n\n' +
                    '安全建议：使用HTTPS加密传输敏感信息',
                reward: 200,
                requiredLevel: 2,
                difficulty: 2,
                completed: false,
                requiredSkill: 'network',
                requiredTool: 'wireshark'
            },
            {
                id: 4,
                name: 'SQL注入训练',
                description: '利用SQL注入漏洞获取数据库信息',
                details: '目标网站存在SQL注入漏洞。\n' +
                    '目标：获取用户表内容\n\n' +
                    '学习内容：\n' +
                    '1. SQL注入原理：\n' +
                    '   - 什么是SQL语句\n' +
                    '   - 注入点判断\n' +
                    '   - 常见注入类型\n\n' +
                    '2. SQLMap使用方法：\n' +
                    '   - 检测注入点\n' +
                    '   - 获取数据库信息\n' +
                    '   - 提取数据\n\n' +
                    '3. 防御方法：\n' +
                    '   - 参数化查询\n' +
                    '   - 输入过滤\n' +
                    '   - 最小权限原则\n\n' +
                    '提示：先使用--dbs获取数据库列表',
                reward: 300,
                requiredLevel: 2,
                difficulty: 3,
                completed: false,
                requiredSkill: 'bruteforce',
                requiredTool: 'sqlmap'
            },
            {
                id: 5,
                name: '隐匿渗透',
                description: '在不被发现的情况下渗透目标系统',
                details: '使用代理链隐藏踪迹。\n' +
                    '目标：获取系统访问权限且不触发警报\n\n' +
                    '学习内容：\n' +
                    '1. 代理基础：\n' +
                    '   - 代理类型\n' +
                    '   - 代理链原理\n' +
                    '   - 匿名性级别\n\n' +
                    '2. ProxyChains配置：\n' +
                    '   - 代理服务器设置\n' +
                    '   - 链式代理\n' +
                    '   - DNS处理\n\n' +
                    '3. 隐匿技巧：\n' +
                    '   - 流量伪装\n' +
                    '   - 时间控制\n' +
                    '   - 痕迹清理\n\n' +
                    '安全提示：使用代理不等于完全匿名',
                reward: 400,
                requiredLevel: 3,
                difficulty: 4,
                completed: false,
                requiredSkill: 'stealth',
                requiredTool: 'proxychains'
            },
            {
                id: 6,
                name: '高级密码破解',
                description: '破解加密的密码哈希',
                details: '目标系统使用了哈希加密。\n' +
                    '目标：破解加密的管理员密码\n\n' +
                    '学习内容：\n' +
                    '1. 哈希算法：\n' +
                    '   - MD5\n' +
                    '   - SHA1\n' +
                    '   - bcrypt\n\n' +
                    '2. Hashcat使用方法：\n' +
                    '   - 选择正确的哈希模式\n' +
                    '   - 设置攻击规则\n' +
                    '   - 使用字典和掩码\n\n' +
                    '3. 破解技巧：\n' +
                    '   - 彩虹表\n' +
                    '   - 规则组合\n' +
                    '   - GPU加速\n\n' +
                    '提示：注意区分哈希类型，选择合适的攻击模式',
                reward: 450,
                requiredLevel: 3,
                difficulty: 4,
                completed: false,
                requiredSkill: 'crypto',
                requiredTool: 'hashcat'
            },
            {
                id: 7,
                name: '完全控制',
                description: '获取目标系统的完整控制权',
                details: '这是最终任务，需要综合运用所有技能。\n' +
                    '目标：获取系统root权限并清除入侵痕迹\n\n' +
                    '学习内容：\n' +
                    '1. 渗透测试流程：\n' +
                    '   - 信息收集\n' +
                    '   - 漏洞扫描\n' +
                    '   - 权限提升\n' +
                    '   - 后门维持\n' +
                    '   - 痕迹清理\n\n' +
                    '2. Metasploit框架：\n' +
                    '   - 模块选择\n' +
                    '   - 参数配置\n' +
                    '   - 后渗透模块\n\n' +
                    '3. 综合技巧：\n' +
                    '   - 多工具配合\n' +
                    '   - 绕过防御\n' +
                    '   - 权限维持\n\n' +
                    '安全建议：记录所有操作，方便回溯和报告',
                reward: 1000,
                requiredLevel: 4,
                difficulty: 5,
                completed: false,
                requiredSkill: 'network',
                requiredTool: 'metasploit',
                requiredTools: ['metasploit', 'proxychains', 'wireshark']
            }
        ];
    }

    getMissionStatus() {
        return this.missions
            .filter(mission => mission.requiredLevel <= this.level)
            .map(mission => {
                const hasRequiredTools = mission.requiredTools ? 
                    mission.requiredTools.every(tool => this.tools[tool].unlocked) :
                    !mission.requiredTool || this.tools[mission.requiredTool].unlocked;
                
                return {
                    ...mission,
                    available: hasRequiredTools,
                    skillLevel: this.skills[mission.requiredSkill],
                    difficulty: this.getDifficultyText(mission.difficulty)
                };
            });
    }

    getDifficultyText(level) {
        const difficulties = ['新手', '简单', '中等', '困难', '专家'];
        return difficulties[level - 1] || '未知';
    }

    getAvailableTools() {
        return Object.entries(this.tools)
            .filter(([_, tool]) => tool.unlocked)
            .map(([name, tool]) => ({
                name,
                description: tool.description,
                skillBonus: tool.skillBonus
            }));
    }

    calculateSuccessChance(mission) {
        const baseChance = 0.5; // 基础成功率50%
        const skillLevel = this.skills[mission.requiredSkill];
        const toolBonus = this.tools[mission.requiredTool].unlocked ? 0.1 : 0;
        const difficultyPenalty = (mission.difficulty - 1) * 0.1;
        
        // 技能等级提供10%加成，工具提供10%加成，难度每级降低10%
        let chance = baseChance + (skillLevel * 0.1) + toolBonus - difficultyPenalty;
        
        // 如果有多个所需工具且全部解锁，额外增加10%成功率
        if (mission.requiredTools && mission.requiredTools.every(tool => this.tools[tool].unlocked)) {
            chance += 0.1;
        }

        // 确保成功率在10%到90%之间
        return Math.min(Math.max(chance, 0.1), 0.9);
    }

    async startMission(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (!mission) return { success: false, message: '任务不存在' };
        if (mission.completed) return { success: false, message: '任务已完成' };
        if (mission.requiredLevel > this.level) return { success: false, message: '等级不足' };
        
        // 检查工具需求
        if (mission.requiredTools) {
            const missingTools = mission.requiredTools.filter(tool => !this.tools[tool].unlocked);
            if (missingTools.length > 0) {
                return { success: false, message: `需要解锁以下工具: ${missingTools.join(', ')}` };
            }
        } else if (mission.requiredTool && !this.tools[mission.requiredTool].unlocked) {
            return { success: false, message: `需要解锁工具: ${mission.requiredTool}` };
        }

        const successChance = this.calculateSuccessChance(mission);
        const success = Math.random() < successChance;

        if (success) {
            // 计算奖励
            let expReward = mission.reward;
            // 难度加成
            expReward *= (1 + (mission.difficulty - 1) * 0.2);
            // 首次完成加成
            if (!mission.completed) {
                expReward *= 1.5;
            }
            
            this.exp += Math.floor(expReward);
            mission.completed = true;
            this.checkLevelUp();
            
            return {
                success: true,
                message: `任务完成！获得 ${Math.floor(expReward)} 经验值\n成功率: ${Math.floor(successChance * 100)}%`,
                expGained: Math.floor(expReward)
            };
        }

        return { 
            success: false, 
            message: `任务失败，请重试\n当前成功率: ${Math.floor(successChance * 100)}%\n提示：提升相关技能或解锁更多工具可以提高成功率` 
        };
    }

    checkLevelUp() {
        const expNeeded = this.level * 1000;
        if (this.exp >= expNeeded) {
            this.level++;
            this.exp -= expNeeded;
            return true;
        }
        return false;
    }

    upgradeSkill(skillName) {
        if (!this.skills[skillName]) return false;
        const cost = this.skills[skillName] * 100;
        if (this.exp >= cost) {
            this.exp -= cost;
            this.skills[skillName]++;
            return true;
        }
        return false;
    }

    unlockTool(toolName) {
        const tool = this.tools[toolName];
        if (!tool || tool.unlocked) return false;
        const cost = 500;
        if (this.exp >= cost) {
            this.exp -= cost;
            tool.unlocked = true;
            return true;
        }
        return false;
    }

    getStatus() {
        return {
            level: this.level,
            exp: this.exp,
            nextLevelExp: this.level * 1000,
            skills: this.skills,
            unlockedTools: this.getAvailableTools()
        };
    }

    async initializeMission(missionId) {
        const mission = this.missions.find(m => m.id === missionId);
        if (!mission) return { success: false, message: '任务不存在' };
        if (mission.completed) return { success: false, message: '任务已完成' };
        if (mission.requiredLevel > this.level) return { success: false, message: '等级不足' };
        
        // 检查工具需求
        if (mission.requiredTools) {
            const missingTools = mission.requiredTools.filter(tool => !this.tools[tool].unlocked);
            if (missingTools.length > 0) {
                return { success: false, message: `需要解锁以下工具: ${missingTools.join(', ')}` };
            }
        } else if (mission.requiredTool && !this.tools[mission.requiredTool].unlocked) {
            return { success: false, message: `需要解锁工具: ${mission.requiredTool}` };
        }

        // 初始化任务状态
        mission.progress = {
            steps: [],
            currentStep: 0,
            completed: false
        };

        // 添加命令验证工具类
        class CommandValidator {
            static validateNmap(cmd) {
                const args = cmd.split(' ');
                if (args[0] !== 'nmap') return false;
                
                // 检查IP地址格式
                const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                const hasValidIP = args.some(arg => ipPattern.test(arg));
                if (!hasValidIP) return false;

                return true;
            }

            static validateHydra(cmd) {
                const args = cmd.split(' ');
                if (args[0] !== 'hydra') return false;

                // 检查必要参数
                if (!args.includes('-l') || !args.includes('-P')) return false;
                
                // 检查服务类型
                const servicePattern = /^(ssh|ftp|http):\/\//;
                const hasValidService = args.some(arg => servicePattern.test(arg));
                if (!hasValidService) return false;

                return true;
            }

            static validateSqlmap(cmd) {
                const args = cmd.split(' ');
                if (args[0] !== 'sqlmap') return false;

                // 检查URL参数
                if (!args.includes('-u')) return false;
                
                // 检查URL格式
                const urlPattern = /^"?http[s]?:\/\/.+\?.+=.+"?$/;
                const hasValidUrl = args.some(arg => urlPattern.test(arg.replace(/^"|"$/g, '')));
                if (!hasValidUrl) return false;

                return true;
            }

            static validateHashcat(cmd) {
                const args = cmd.split(' ');
                if (args[0] !== 'hashcat') return false;

                // 检查哈希模式
                if (!args.includes('-m')) return false;
                
                // 检查攻击模式
                if (!args.includes('-a')) return false;

                return true;
            }
        }

        // 根据任务ID设置具体步骤
        switch(mission.id) {
            case 1: // 端口扫描任务
                mission.progress.steps = [
                    {
                        description: '使用nmap扫描目标主机 (命令: nmap 192.168.1.100)',
                        verify: (cmd) => {
                            if (!CommandValidator.validateNmap(cmd)) return false;
                            return cmd.split(' ').length === 2; // 只允许基本扫描
                        },
                        feedback: '正确！发现开放端口：\n' +
                            'PORT     STATE  SERVICE\n' +
                            '22/tcp   open   ssh\n' +
                            '80/tcp   open   http\n' +
                            '443/tcp  open   https\n' +
                            '3306/tcp open   mysql',
                        hint: '提示：命令格式为 "nmap IP地址"'
                    },
                    {
                        description: '使用-p参数扫描1-1000端口范围 (命令: nmap -p 1-1000 192.168.1.100)',
                        verify: (cmd) => {
                            if (!CommandValidator.validateNmap(cmd)) return false;
                            const args = cmd.split(' ');
                            const pIndex = args.indexOf('-p');
                            if (pIndex === -1) return false;
                            const portRange = args[pIndex + 1];
                            return /^1-1000$/.test(portRange);
                        },
                        feedback: '扫描结果：\n' +
                            '发现更多开放端口：\n' +
                            'PORT     STATE  SERVICE\n' +
                            '21/tcp   open   ftp\n' +
                            '22/tcp   open   ssh\n' +
                            '23/tcp   open   telnet\n' +
                            '80/tcp   open   http\n' +
                            '443/tcp  open   https\n' +
                            '3306/tcp open   mysql',
                        hint: '提示：使用 -p 参数指定端口范围，例如 -p 1-1000'
                    },
                    {
                        description: '使用-sV参数识别服务版本 (命令: nmap -sV 192.168.1.100)',
                        verify: (cmd) => {
                            if (!CommandValidator.validateNmap(cmd)) return false;
                            const args = cmd.split(' ');
                            return args.includes('-sV');
                        },
                        feedback: '服务版本识别结果：\n' +
                            'PORT     STATE  SERVICE     VERSION\n' +
                            '21/tcp   open   ftp         vsftpd 3.0.3\n' +
                            '22/tcp   open   ssh         OpenSSH 8.2p1\n' +
                            '23/tcp   open   telnet      Linux telnetd\n' +
                            '80/tcp   open   http        Apache httpd 2.4.41\n' +
                            '443/tcp  open   ssl/http    Apache httpd 2.4.41\n' +
                            '3306/tcp open   mysql       MySQL 8.0.27',
                        hint: '提示：使用 -sV 参数进行服务版本探测'
                    }
                ];
                break;

            case 2: // 密码破解任务
                mission.progress.steps = [
                    {
                        description: '准备密码字典 (命令: ls /usr/share/wordlists/)',
                        verify: (cmd) => cmd.startsWith('ls') && cmd.includes('wordlists'),
                        feedback: '可用密码字典：\n' +
                            'common_passwords.txt\n' +
                            'rockyou.txt\n' +
                            'top1000.txt'
                    },
                    {
                        description: '使用hydra破解SSH服务 (命令: hydra -l admin -P common_passwords.txt ssh://192.168.1.100)',
                        verify: (cmd) => cmd.startsWith('hydra') && cmd.includes('ssh://') && cmd.includes('admin'),
                        feedback: '开始破解SSH密码...\n' +
                            '[STATUS] 16 tries/min, 16 tries in 00:01h, 984 to do in 01:02h\n' +
                            '[22][ssh] host: 192.168.1.100   login: admin   password: admin123'
                    },
                    {
                        description: '使用找到的凭据登录SSH (命令: ssh admin@192.168.1.100)',
                        verify: (cmd) => cmd.startsWith('ssh') && cmd.includes('admin@'),
                        feedback: '成功登录系统！\n' +
                            'Welcome to Ubuntu 20.04.3 LTS\n' +
                            'Last login: Thu Mar 14 10:30:15 2024 from 192.168.1.50'
                    }
                ];
                break;

            case 3: // 流量分析任务
                mission.progress.steps = [
                    {
                        description: '启动Wireshark并设置HTTP过滤器 (命令: http)',
                        verify: (cmd) => cmd === 'http' || cmd.includes('tcp.port == 80'),
                        feedback: '过滤器设置成功！捕获到HTTP流量：\n' +
                            'Source          Destination     Protocol  Info\n' +
                            '192.168.1.50    192.168.1.100  HTTP      GET /login.php\n' +
                            '192.168.1.50    192.168.1.100  HTTP      POST /login.php'
                    },
                    {
                        description: '查找HTTP POST请求 (命令: http.request.method == "POST")',
                        verify: (cmd) => cmd.includes('http.request.method') && cmd.includes('POST'),
                        feedback: '发现登录请求！\n' +
                            'POST数据：\n' +
                            'username=admin&password=secretpass123\n' +
                            '注意：这些是明文传输的凭据，存在安全风险！'
                    },
                    {
                        description: '导出捕获的数据包 (命令: file -> save as)',
                        verify: (cmd) => cmd.includes('save') || cmd.includes('export'),
                        feedback: '数据包已保存到 capture.pcap\n' +
                            '建议：向系统管理员报告发现的安全问题'
                    }
                ];
                break;

            case 4: // SQL注入任务
                mission.progress.steps = [
                    {
                        description: '使用sqlmap检测注入点 (命令: sqlmap -u "http://192.168.1.100/page.php?id=1")',
                        verify: (cmd) => cmd.startsWith('sqlmap') && cmd.includes('-u'),
                        feedback: '发现SQL注入漏洞！\n' +
                            'Parameter: id (GET)\n' +
                            '    Type: boolean-based blind\n' +
                            '    Title: AND boolean-based blind - WHERE or HAVING clause\n' +
                            '    Payload: id=1 AND 1=1'
                    },
                    {
                        description: '获取数据库列表 (命令: sqlmap -u "http://192.168.1.100/page.php?id=1" --dbs)',
                        verify: (cmd) => cmd.includes('--dbs'),
                        feedback: '可用数据库：\n' +
                            '[*] information_schema\n' +
                            '[*] mysql\n' +
                            '[*] performance_schema\n' +
                            '[*] webapp_db'
                    },
                    {
                        description: '获取webapp_db数据库的表 (命令: sqlmap -u "URL" -D webapp_db --tables)',
                        verify: (cmd) => cmd.includes('--tables') && cmd.includes('webapp_db'),
                        feedback: '数据库表：\n' +
                            '[*] users\n' +
                            '[*] products\n' +
                            '[*] orders'
                    },
                    {
                        description: '导出users表数据 (命令: sqlmap -u "URL" -D webapp_db -T users --dump)',
                        verify: (cmd) => cmd.includes('--dump') && cmd.includes('users'),
                        feedback: '用户表数据：\n' +
                            'id  username  password_hash                            email\n' +
                            '1   admin     5f4dcc3b5aa765d61d8327deb882cf99        admin@local\n' +
                            '2   user1     e10adc3949ba59abbe56e057f20f883e        user1@local\n' +
                            '提示：这些是MD5加密的密码，可以尝试破解'
                    }
                ];
                break;

            case 5: // 隐匿渗透任务
                mission.progress.steps = [
                    {
                        description: '配置代理链 (命令: nano /etc/proxychains.conf)',
                        verify: (cmd) => cmd.includes('proxychains.conf'),
                        feedback: '代理配置已更新：\n' +
                            '[ProxyList]\n' +
                            'socks5 127.0.0.1 9050\n' +
                            'socks4 proxy1.example.com 1080\n' +
                            'http proxy2.example.com 8080'
                    },
                    {
                        description: '通过代理链进行端口扫描 (命令: proxychains nmap -p 80,443 target.com)',
                        verify: (cmd) => cmd.startsWith('proxychains') && cmd.includes('nmap'),
                        feedback: '通过代理链扫描结果：\n' +
                            'PORT    STATE  SERVICE\n' +
                            '80/tcp  open   http\n' +
                            '443/tcp open   https\n' +
                            '注意：扫描速度较慢，这是使用代理的正常现象'
                    },
                    {
                        description: '使用代理链连接目标 (命令: proxychains ssh user@target.com)',
                        verify: (cmd) => cmd.startsWith('proxychains') && cmd.includes('ssh'),
                        feedback: '成功通过代理链建立连接！\n' +
                            '连接路径：\n' +
                            'Local -> Proxy1 -> Proxy2 -> Target\n' +
                            '成功隐藏了真实IP地址'
                    }
                ];
                break;

            case 6: // 高级密码破解任务
                mission.progress.steps = [
                    {
                        description: '识别哈希类型 (命令: hashid 5f4dcc3b5aa765d61d8327deb882cf99)',
                        verify: (cmd) => cmd.startsWith('hashid'),
                        feedback: '可能的哈希类型：\n' +
                            '[+] MD5\n' +
                            '[+] MD4\n' +
                            '最可能是：MD5'
                    },
                    {
                        description: '使用hashcat破解MD5 (命令: hashcat -m 0 hash.txt rockyou.txt)',
                        verify: (cmd) => cmd.startsWith('hashcat') && cmd.includes('-m 0'),
                        feedback: '破解进度：\n' +
                            'Session..........: hashcat\n' +
                            'Status...........: Cracked\n' +
                            'Hash.Mode........: 0 (MD5)\n' +
                            'Recovered........: 1/1 (100.00%)\n' +
                            '5f4dcc3b5aa765d61d8327deb882cf99:password'
                    },
                    {
                        description: '使用规则破解更多密码 (命令: hashcat -m 0 hashes.txt -r rules/best64.rule)',
                        verify: (cmd) => cmd.includes('-r') && cmd.includes('rule'),
                        feedback: '使用规则破解结果：\n' +
                            'e10adc3949ba59abbe56e057f20f883e:123456\n' +
                            '25d55ad283aa400af464c76d713c07ad:12345678\n' +
                            '注意：这些都是非常弱的密码！'
                    }
                ];
                break;

            case 7: // 完全控制任务
                mission.progress.steps = [
                    {
                        description: '启动Metasploit框架 (命令: msfconsole)',
                        verify: (cmd) => cmd === 'msfconsole',
                        feedback: '       =[ metasploit v6.1.27-dev                          ]\n' +
                            '+ -- --=[ 2214 exploits - 1171 auxiliary - 398 post       ]\n' +
                            '+ -- --=[ 592 payloads - 45 encoders - 10 nops            ]\n' +
                            '+ -- --=[ 9 evasion                                       ]'
                    },
                    {
                        description: '搜索可用漏洞 (命令: search type:exploit platform:linux)',
                        verify: (cmd) => cmd.startsWith('search') && cmd.includes('exploit'),
                        feedback: '匹配的漏洞模块：\n' +
                            'exploit/linux/http/apache_mod_cgi_bash_env_exec\n' +
                            'exploit/linux/misc/jenkins_java_deserialize\n' +
                            'exploit/linux/postgres/postgres_payload'
                    },
                    {
                        description: '使用漏洞模块 (命令: use exploit/linux/http/apache_mod_cgi_bash_env_exec)',
                        verify: (cmd) => cmd.startsWith('use') && cmd.includes('exploit'),
                        feedback: '已加载漏洞模块：\n' +
                            'Module options (exploit/linux/http/apache_mod_cgi_bash_env_exec):\n' +
                            '   Name     Current Setting  Required  Description\n' +
                            '   ----     ---------------  --------  -----------\n' +
                            '   RHOSTS                    yes       The target host(s)'
                    },
                    {
                        description: '设置目标参数 (命令: set RHOSTS 192.168.1.100)',
                        verify: (cmd) => cmd.startsWith('set') && cmd.includes('RHOSTS'),
                        feedback: 'RHOSTS => 192.168.1.100'
                    },
                    {
                        description: '执行漏洞利用 (命令: exploit)',
                        verify: (cmd) => cmd === 'exploit',
                        feedback: '[*] Started reverse TCP handler\n' +
                            '[*] Sending CGI payload...\n' +
                            '[*] Command shell session 1 opened\n' +
                            '获得了shell访问权限！'
                    },
                    {
                        description: '清理入侵痕迹 (命令: clear_logs)',
                        verify: (cmd) => cmd.includes('clear') && cmd.includes('logs'),
                        feedback: '系统日志已清理：\n' +
                            '- 删除了访问日志\n' +
                            '- 清理了命令历史\n' +
                            '- 移除了临时文件\n' +
                            '成功完成任务！'
                    }
                ];
                break;
        }

        return {
            success: true,
            message: `任务已开始！\n${mission.details}\n\n当前步骤：${mission.progress.steps[0].description}`,
            mission: mission
        };
    }

    async executeMissionCommand(command) {
        const mission = this.missions.find(m => m.progress && !m.progress.completed);
        if (!mission) return { success: false, message: '没有正在进行的任务' };

        const currentStep = mission.progress.steps[mission.progress.currentStep];
        
        // 检查命令是否为空
        if (!command.trim()) {
            return {
                success: false,
                message: '请输入命令。\n' +
                    `当前步骤：${currentStep.description}\n` +
                    (currentStep.hint ? `\n${currentStep.hint}` : '')
            };
        }

        // 检查基本命令是否正确
        const cmd = command.trim().toLowerCase();
        const expectedCmd = currentStep.description.match(/命令: ([^\)]+)/)?.[1];
        
        if (expectedCmd) {
            const baseCmd = expectedCmd.split(' ')[0];
            if (!cmd.startsWith(baseCmd)) {
                return {
                    success: false,
                    message: `错误：需要使用 ${baseCmd} 命令。\n` +
                        `当前步骤：${currentStep.description}\n` +
                        (currentStep.hint ? `\n${currentStep.hint}` : '') +
                        `\n提示：输入 "help" 查看命令帮助。`
                };
            }
        }

        // 验证完整命令
        if (currentStep.verify(cmd)) {
            // 命令正确，更新进度
            await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟命令执行时间
            const result = {
                success: true,
                message: currentStep.feedback
            };

            mission.progress.currentStep++;
            
            // 检查是否完成所有步骤
            if (mission.progress.currentStep >= mission.progress.steps.length) {
                mission.progress.completed = true;
                mission.completed = true;
                
                // 计算奖励
                let expReward = mission.reward;
                expReward *= (1 + (mission.difficulty - 1) * 0.2);
                expReward *= 1.5; // 首次完成加成
                this.exp += Math.floor(expReward);
                
                result.message += `\n\n恭喜！任务完成！\n` +
                    `获得 ${Math.floor(expReward)} 经验值！\n` +
                    `完成难度：${this.getDifficultyText(mission.difficulty)} 级任务\n` +
                    `技能提升：${mission.requiredSkill} 经验增加\n` +
                    `提示：可以使用 "status" 命令查看当前状态。`;
                result.completed = true;
            } else {
                // 显示下一步
                const nextStep = mission.progress.steps[mission.progress.currentStep];
                result.message += '\n\n' +
                    '下一步：' + nextStep.description + '\n' +
                    (nextStep.hint ? `\n${nextStep.hint}` : '') +
                    '\n提示：如果遇到困难，可以使用 "help" 命令查看帮助。';
            }

            return result;
        } else {
            // 分析命令错误
            const args = cmd.split(' ');
            let errorMessage = '命令语法错误。\n\n';
            
            // 根据不同工具提供具体错误提示
            switch(args[0]) {
                case 'nmap':
                    if (!args.some(arg => /^\d+\.\d+\.\d+\.\d+$/.test(arg))) {
                        errorMessage += '- 缺少有效的IP地址\n';
                    }
                    if (currentStep.description.includes('-p') && !args.includes('-p')) {
                        errorMessage += '- 缺少端口参数 (-p)\n';
                    }
                    if (currentStep.description.includes('-sV') && !args.includes('-sV')) {
                        errorMessage += '- 缺少服务版本扫描参数 (-sV)\n';
                    }
                    if (currentStep.description.includes('-O') && !args.includes('-O')) {
                        errorMessage += '- 缺少操作系统探测参数 (-O)\n';
                    }
                    break;
                    
                case 'hydra':
                    if (!args.includes('-l')) {
                        errorMessage += '- 缺少用户名参数 (-l)\n';
                    }
                    if (!args.includes('-P')) {
                        errorMessage += '- 缺少密码字典参数 (-P)\n';
                    }
                    if (!args.some(arg => /^(ssh|ftp|http):\/\//.test(arg))) {
                        errorMessage += '- 缺少或服务类型格式错误 (例如: ssh://)\n';
                    }
                    break;
                    
                case 'sqlmap':
                    if (!args.includes('-u')) {
                        errorMessage += '- 缺少URL参数 (-u)\n';
                    }
                    if (currentStep.description.includes('--dbs') && !args.includes('--dbs')) {
                        errorMessage += '- 缺少数据库列举参数 (--dbs)\n';
                    }
                    if (currentStep.description.includes('--tables') && !args.includes('--tables')) {
                        errorMessage += '- 缺少表列举参数 (--tables)\n';
                    }
                    if (currentStep.description.includes('--dump') && !args.includes('--dump')) {
                        errorMessage += '- 缺少数据导出参数 (--dump)\n';
                    }
                    break;

                case 'hashcat':
                    if (!args.includes('-m')) {
                        errorMessage += '- 缺少哈希模式参数 (-m)\n';
                    }
                    if (!args.includes('-a')) {
                        errorMessage += '- 缺少攻击模式参数 (-a)\n';
                    }
                    if (currentStep.description.includes('-r') && !args.includes('-r')) {
                        errorMessage += '- 缺少规则文件参数 (-r)\n';
                    }
                    break;

                case 'proxychains':
                    if (!args[1]) {
                        errorMessage += '- 缺少要代理的命令\n';
                    }
                    break;
            }
            
            return {
                success: false,
                message: errorMessage + '\n' +
                    `当前步骤：${currentStep.description}\n` +
                    (currentStep.hint ? `\n${currentStep.hint}` : '') +
                    '\n提示：使用 "help" 命令查看帮助，或 "exit" 退出当前任务。'
            };
        }
    }
}

// 导出游戏类
window.HackerGame = HackerGame; 