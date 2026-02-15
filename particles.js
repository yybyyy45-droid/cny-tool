// ============================================
// 烟花粒子效果 — Canvas动画
// ============================================

export class FireworksCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.fireworks = [];
        this.running = true;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.autoLaunch();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // 自动发射烟花
    autoLaunch() {
        if (!this.running) return;
        const delay = 1500 + Math.random() * 3000;
        setTimeout(() => {
            this.launchFirework();
            this.autoLaunch();
        }, delay);
    }

    launchFirework() {
        const x = Math.random() * this.canvas.width;
        const targetY = this.canvas.height * (0.15 + Math.random() * 0.35);
        this.fireworks.push({
            x, y: this.canvas.height,
            targetY,
            speed: 4 + Math.random() * 3,
            color: this.randomCNYColor(),
            trail: [],
        });
    }

    randomCNYColor() {
        const colors = [
            '#ff4444', '#ff6b35', '#ffd700', '#ff8c00',
            '#ff1744', '#ff3d00', '#ffab00', '#ff6d00',
            '#e53935', '#f4511e', '#ffc107', '#ff9800',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    explode(x, y, color) {
        const count = 30 + Math.floor(Math.random() * 30);
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
            const speed = 1.5 + Math.random() * 3;
            const hue = Math.random() * 30 - 15; // slight color var
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.01 + Math.random() * 0.015,
                color,
                size: 1.5 + Math.random() * 1.5,
                glow: Math.random() > 0.5,
            });
        }
    }

    animate() {
        if (!this.running) return;
        requestAnimationFrame(() => this.animate());

        // Semi-transparent clear for trail effect
        this.ctx.fillStyle = 'rgba(26, 5, 5, 0.15)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update fireworks (rising)
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const fw = this.fireworks[i];
            fw.trail.push({ x: fw.x, y: fw.y });
            if (fw.trail.length > 8) fw.trail.shift();

            fw.y -= fw.speed;

            // Draw trail
            for (let j = 0; j < fw.trail.length; j++) {
                const t = fw.trail[j];
                const alpha = j / fw.trail.length * 0.5;
                this.ctx.beginPath();
                this.ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = fw.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
                this.ctx.fill();
            }

            // Draw head
            this.ctx.beginPath();
            this.ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = fw.color;
            this.ctx.fill();

            if (fw.y <= fw.targetY) {
                this.explode(fw.x, fw.y, fw.color);
                this.fireworks.splice(i, 1);
            }
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.04; // gravity
            p.vx *= 0.99;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            if (p.glow) {
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = p.color;
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }

            this.ctx.globalAlpha = 1;
        }
    }

    // 手动触发烟花（用于生成成功时）
    burst(count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.launchFirework(), i * 200);
        }
    }

    destroy() {
        this.running = false;
    }
}
