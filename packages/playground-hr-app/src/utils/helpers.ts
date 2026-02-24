export function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

export function getRandomAvatarColor(): string {
    const colors = [
        '#9B59B6', '#3498DB', '#1ABC9C', '#E74C3C', '#F39C12',
        '#F1C40F', '#2ECC71', '#E67E22', '#16A085', '#8E44AD',
        '#D35400', '#27AE60'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}