class HackerSimulator {
    constructor() {
        this.output = document.querySelector('.output');
        this.input = document.querySelector('.command-input');
        this.game = new HackerGame();
        this.currentMission = null;
        
        this.commands = {
            'help': '可用命令：\nhelp - 显示帮助\nclear - 清屏\nstatus - 显示角色状态\nmissions - 显示可用任务\nstart <任务ID> - 开始任务\ntools - 显示可用工具\nupgrade <技能名> - 升级技能\nunlock <工具名> - 解锁工具\nexit - 退出当前任务',
            'clear': () => this.clearScreen(),
            'status': () => this.showStatus(),
            'missions': () => this.showMissions(),
            'start': (id) => this.startMission(parseInt(id)),
            'tools': () => this.showTools(),
            'upgrade': (skill) => this.upgradeSkill(skill),
            'unlock': (tool) => this.unlockTool(tool),
            'exit': () => this.exitMission()
        };
        
        this.setupEventListeners();
        this.welcomeMessage();
    }

    setupEventListeners() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const input = this.input.value.trim().toLowerCase();
                if (this.currentMission) {
                    this.handleMissionCommand(input);
                } else {
                    const [command, ...args] = input.split(' ');
                    this.executeCommand(command, args);
                }
                this.input.value = '';
            }
        });
    }

    async handleMissionCommand(command) {
        this.printCommand(command);
        const result = await this.game.executeMissionCommand(command);
        await this.typeText(result.message);
        
        if (result.success && result.completed) {
            await this.typeText('恭喜！任务完成！');
            if (this.game.checkLevelUp()) {
                await this.typeText('等级提升！');
            }
            this.currentMission = null;
            this.updatePrompt();
        }
    }

    updatePrompt() {
        const promptElement = document.querySelector('.prompt');
        if (this.currentMission) {
            promptElement.textContent = `mission${this.currentMission.id}@hack:~$`;
        } else {
            promptElement.textContent = 'root@system:~$';
        }
    }

    async exitMission() {
        if (this.currentMission) {
            this.currentMission = null;
            this.updatePrompt();
            await this.typeText('已退出任务模式');
        } else {
            await this.typeText('当前不在任务中');
        }
    }

    async startMission(missionId) {
        if (isNaN(missionId)) {
            await this.typeText('请输入有效的任务ID');
            return;
        }
        
        const result = await this.game.initializeMission(missionId);
        if (result.success) {
            this.currentMission = result.mission;
            this.updatePrompt();
            await this.typeText(result.message);
            await this.typeText('\n任务模式已开启，请输入相应的命令来完成任务。\n输入 "exit" 可以退出任务。');
        } else {
            await this.typeText(result.message);
        }
    }

    async typeText(text, speed = 50) {
        const lines = text.split('\n');
        for (const line of lines) {
            const element = document.createElement('div');
            element.classList.add('typing');
            this.output.appendChild(element);
            
            for (const char of line) {
                element.textContent += char;
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            element.classList.remove('typing');
            this.output.appendChild(document.createElement('br'));
        }
        this.scrollToBottom();
    }

    executeCommand(command, args = []) {
        this.printCommand(command + (args.length ? ' ' + args.join(' ') : ''));
        
        if (command === '') return;
        
        if (this.commands[command]) {
            if (typeof this.commands[command] === 'function') {
                this.commands[command](...args);
            } else {
                this.typeText(this.commands[command]);
            }
        } else {
            this.typeText('命令未找到。输入 "help" 获取可用命令列表。');
        }
    }

    printCommand(command) {
        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span class="prompt">root@system:~$</span> ${command}`;
        this.output.appendChild(cmdLine);
        this.scrollToBottom();
    }

    clearScreen() {
        this.output.innerHTML = '';
    }

    async showStatus() {
        const status = this.game.getStatus();
        const statusText = [
            '===== 角色状态 =====',
            `等级: ${status.level}`,
            `经验值: ${status.exp}/${status.nextLevelExp}`,
            '',
            '技能等级:',
            `暴力破解: ${status.skills.bruteforce}`,
            `网络技术: ${status.skills.network}`,
            `密码学: ${status.skills.crypto}`,
            `隐身技术: ${status.skills.stealth}`,
            '===================='
        ].join('\n');
        
        await this.typeText(statusText);
    }

    async showMissions() {
        const missions = this.game.getMissionStatus();
        const missionText = ['===== 可用任务 ====='];
        
        missions.forEach(mission => {
            missionText.push(
                `[任务 ${mission.id}] ${mission.name}`,
                `描述: ${mission.description}`,
                `详情: ${mission.details}`,
                `难度: ${mission.difficulty}`,
                `需求等级: ${mission.requiredLevel}`,
                `需求技能: ${mission.requiredSkill} (当前等级: ${mission.skillLevel})`,
                `需求工具: ${mission.requiredTools ? mission.requiredTools.join(', ') : mission.requiredTool}`,
                `奖励: ${mission.reward} exp`,
                `状态: ${mission.completed ? '已完成' : mission.available ? '可接取' : '需要解锁工具'}`,
                ''
            );
        });
        
        missionText.push('====================');
        await this.typeText(missionText.join('\n'));
    }

    async showTools() {
        const tools = this.game.getAvailableTools();
        const toolsText = ['===== 已解锁工具 ====='];
        
        tools.forEach(tool => {
            toolsText.push(
                `\n${tool.name}: ${tool.description}`,
                `技能加成: ${tool.skillBonus}`,
                `${tool.tutorial}`,
                ''
            );
        });
        
        toolsText.push('解锁新工具需要 500 经验值');
        toolsText.push('====================');
        await this.typeText(toolsText.join('\n'));
    }

    async upgradeSkill(skillName) {
        if (!skillName) {
            await this.typeText('请指定要升级的技能名称');
            return;
        }
        
        const success = this.game.upgradeSkill(skillName);
        if (success) {
            await this.typeText(`${skillName} 技能升级成功！`);
        } else {
            await this.typeText('升级失败：经验值不足或技能名称无效');
        }
    }

    async unlockTool(toolName) {
        if (!toolName) {
            await this.typeText('请指定要解锁的工具名称');
            return;
        }
        
        const success = this.game.unlockTool(toolName);
        if (success) {
            await this.typeText(`${toolName} 工具解锁成功！`);
        } else {
            await this.typeText('解锁失败：经验值不足或工具名称无效');
        }
    }

    async welcomeMessage() {
        const welcome = [
            '欢迎使用黑客模拟器 v2.0',
            '你现在是一名初级黑客，完成任务获得经验值来提升等级和技能',
            '输入 "help" 获取可用命令列表',
            '----------------'
        ];
        
        for (const line of welcome) {
            await this.typeText(line);
        }
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// 黑客帝国动画类
class MatrixAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resizeCanvas();
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.initialize();

        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.initialize();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initialize() {
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters[Math.floor(Math.random() * this.characters.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
}

// 加载动画类
class LoadingAnimation {
    constructor() {
        this.matrixLoading = document.getElementById('matrixLoading');
        this.canvas = document.getElementById('matrixCanvas');
        this.progressBar = this.matrixLoading.querySelector('.progress-bar');
        this.progressText = this.matrixLoading.querySelector('.progress-text');
        this.statusText = this.matrixLoading.querySelector('.status-text');
        this.matrixAnimation = new MatrixAnimation(this.canvas);
        this.loadingMessages = [
            '正在连接目标系统...',
            '正在扫描系统漏洞...',
            '正在破解防火墙...',
            '正在绕过安全系统...',
            '正在注入恶意代码...',
            '正在获取系统权限...',
            '正在植入后门程序...',
            '正在清除入侵痕迹...',
            '正在建立安全连接...',
            '正在完成最终配置...'
        ];
    }

    start() {
        this.matrixLoading.style.display = 'flex';
        this.matrixLoading.style.opacity = '0';
        // 淡入效果
        setTimeout(() => {
            this.matrixLoading.style.transition = 'opacity 1s ease-in';
            this.matrixLoading.style.opacity = '1';
        }, 100);
        
        this.currentProgress = 0;
        this.animationFrame = null;
        this.startMatrixAnimation();
        this.updateProgress();
    }

    startMatrixAnimation() {
        const animate = () => {
            this.matrixAnimation.draw();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    updateProgress() {
        const duration = 8000; // 总持续时间（毫秒）
        const interval = 80; // 更新间隔（毫秒）
        const steps = duration / interval;
        const increment = 100 / steps;
        let currentStep = 0;

        const update = () => {
            currentStep++;
            const progress = Math.min(Math.floor((currentStep * increment)), 100);
            
            // 使用缓动函数使进度更自然
            const easedProgress = this.easeInOutQuad(progress / 100) * 100;
            this.progressBar.style.width = `${easedProgress}%`;
            this.progressText.textContent = `${progress}%`;

            // 更新状态消息
            if (progress % 10 === 0) {
                const messageIndex = Math.floor(progress / 10);
                if (this.loadingMessages[messageIndex]) {
                    this.fadeText(this.statusText, this.loadingMessages[messageIndex]);
                }
            }

            if (progress < 100) {
                setTimeout(update, interval);
            } else {
                setTimeout(() => {
                    this.complete();
                }, 1000); // 完成后等待一秒再消失
            }
        };

        update();
    }

    // 缓动函数
    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    // 文字淡入淡出效果
    fadeText(element, newText) {
        element.style.transition = 'opacity 0.5s ease';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = '1';
        }, 500);
    }

    complete() {
        // 淡出效果
        this.matrixLoading.style.transition = 'opacity 1.5s ease-out';
        this.matrixLoading.style.opacity = '0';
        
        setTimeout(() => {
            cancelAnimationFrame(this.animationFrame);
            this.matrixLoading.style.display = 'none';
            
            // 聚焦到命令输入框
            const commandInput = document.querySelector('.command-input');
            commandInput.focus();
            
            // 显示欢迎信息（带淡入效果）
            const output = document.querySelector('.output');
            output.style.opacity = '0';
            output.innerHTML = `
                <pre style="color: #00ff00; margin-bottom: 15px; line-height: 1.2;">
 ██╗  ██╗ █████╗  ██████╗██╗  ██╗███████╗██████╗ 
 ██║  ██║██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
 ███████║███████║██║     █████╔╝ █████╗  ██████╔╝
 ██╔══██║██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
 ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
 ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                SIMULATOR v2.0</pre>
                <div class="welcome-text" style="opacity: 0; transform: translateY(20px); transition: all 1s ease-out;">欢迎来到黑客模拟器！输入 <span style="color: #00ff00">help</span> 查看可用命令。</div>
            `;
            
            // 欢迎信息淡入
            setTimeout(() => {
                output.style.transition = 'opacity 1s ease-in';
                output.style.opacity = '1';
                // 添加延迟显示欢迎文本的动画效果
                setTimeout(() => {
                    const welcomeText = output.querySelector('.welcome-text');
                    welcomeText.style.opacity = '1';
                    welcomeText.style.transform = 'translateY(0)';
                }, 500);
            }, 100);
        }, 1500);
    }
}

// 游戏介绍弹窗逻辑
document.addEventListener('DOMContentLoaded', () => {
    const introModal = document.getElementById('introModal');
    const startGameBtn = document.getElementById('startGame');
    const langBtns = document.querySelectorAll('.lang-btn');
    const zhSection = document.querySelector('.intro-section.zh');
    const enSection = document.querySelector('.intro-section.en');
    const loadingAnimation = new LoadingAnimation();

    // 语言切换
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (lang === 'zh') {
                zhSection.style.display = 'block';
                enSection.style.display = 'none';
                startGameBtn.textContent = '开始游戏';
            } else {
                zhSection.style.display = 'none';
                enSection.style.display = 'block';
                startGameBtn.textContent = 'Start Game';
            }
        });
    });

    // 开始游戏按钮点击事件
    startGameBtn.addEventListener('click', () => {
        introModal.style.display = 'none';
        loadingAnimation.start();
    });

    // 初始化模拟器
    new HackerSimulator();
}); 