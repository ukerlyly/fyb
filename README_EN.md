# Hacker Simulator v2.0

[中文](README.md) | English

An interactive hacking skills learning platform that simulates real penetration testing scenarios for learning network security knowledge.

## Game Features

- Realistic Command Line Interface
- Detailed Tutorials
- Progressive Mission System
- Skill Growth System
- Tool Unlock System
- Real-time Feedback
- Detailed Error Messages

## Game Systems

### Skill System
- **Brute Force** - Enhance password cracking and injection attack capabilities
- **Network Technology** - Improve network scanning and vulnerability exploitation
- **Cryptography** - Boost encryption cracking abilities
- **Stealth** - Increase ability to hide traces

### Tool System
Each tool includes detailed tutorials and practical guides:

- **nmap** - Network Scanning Tool
  - Port Scanning
  - Service Version Detection
  - OS Identification

- **hydra** - Password Cracking Tool
  - SSH Service Cracking
  - FTP Service Cracking
  - Web Form Cracking

- **wireshark** - Network Sniffing Tool
  - Traffic Capture
  - Packet Analysis
  - Filter Usage

- **metasploit** - Exploitation Tool
  - Vulnerability Scanning
  - Attack Module Usage
  - Post-exploitation Operations

- **hashcat** - Advanced Password Cracking Tool
  - Hash Identification
  - Dictionary Attacks
  - Rule-based Cracking

- **proxychains** - Proxy Chain Tool
  - Proxy Configuration
  - Anonymous Access
  - Chain Proxying

- **sqlmap** - SQL Injection Tool
  - Injection Point Detection
  - Database Enumeration
  - Data Extraction

### Mission System
Missions are divided into five difficulty levels, each including:
- Detailed Background Information
- Learning Objectives
- Step-by-step Guidance
- Command Examples
- Real-time Feedback
- Error Messages
- Security Tips

## Mission List

1. **Beginner Mission: Port Scanning**
   - Learn basic network scanning techniques
   - Understand ports and services concepts
   - Master basic nmap tool usage

2. **Password Cracking Training**
   - Learn basic password cracking methods
   - Use hydra for service password cracking
   - Understand password security importance

3. **Network Traffic Analysis**
   - Learn network packet analysis
   - Use Wireshark to capture traffic
   - Discover security vulnerabilities

4. **SQL Injection Training**
   - Understand SQL injection principles
   - Use sqlmap for vulnerability exploitation
   - Learn defense methods

5. **Stealth Penetration**
   - Learn proxy techniques
   - Configure proxy chains
   - Hide attack traces

6. **Advanced Password Cracking**
   - Learn hash algorithms
   - Use advanced cracking techniques
   - Understand password strength

7. **Full Control**
   - Apply all learned skills
   - Complete penetration testing process
   - Post-exploitation maintenance

## Command System

- `help` - Display help information
- `status` - Show character status
- `missions` - Display available missions
- `start <mission_id>` - Start specified mission
- `tools` - Show unlocked tools
- `upgrade <skill_name>` - Upgrade specified skill
- `unlock <tool_name>` - Unlock specified tool
- `exit` - Exit current mission

## Game Progression

1. **Skill Improvement**
   - Complete missions to gain experience
   - Use experience to upgrade skills
   - Skill levels affect mission success rates

2. **Tool Unlocking**
   - Use experience to unlock new tools
   - Each tool provides specific skill bonuses
   - Tool combinations provide additional effects

3. **Mission Challenges**
   - Gradually increasing difficulty
   - Requires comprehensive use of multiple skills
   - Real penetration testing scenarios

## Security Notice

- This tool is for learning and research purposes only
- Do not test on unauthorized systems
- Comply with network security laws and regulations
- Protect personal and others' privacy

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Object-Oriented Programming
- Command Line Interface Design
- Security Tool Simulation 