/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {

                /* ---------- BASE ---------- */
                background: "hsl(210, 40%, 98%)",
                foreground: "hsl(222.2, 84%, 4.9%)",

                card: "hsl(0, 0%, 100%)",
                cardForeground: "hsl(222.2, 84%, 4.9%)",

                popover: "hsl(0, 0%, 100%)",
                popoverForeground: "hsl(222.2, 84%, 4.9%)",

                primary: "hsl(142, 76%, 36%)",
                primaryForeground: "hsl(355.7, 100%, 97.3%)",

                secondary: "hsl(210, 40%, 96.1%)",
                secondaryForeground: "hsl(222.2, 47.4%, 11.2%)",

                muted: "hsl(210, 40%, 96.1%)",
                mutedForeground: "hsl(215.4, 16.3%, 46.9%)",

                accent: "hsl(210, 40%, 96.1%)",
                accentForeground: "hsl(222.2, 47.4%, 11.2%)",

                destructive: "hsl(0, 84.2%, 60.2%)",
                destructiveForeground: "hsl(210, 40%, 98%)",

                border: "hsl(214.3, 31.8%, 91.4%)",
                input: "hsl(214.3, 31.8%, 91.4%)",
                ring: "hsl(142, 76%, 36%)",

                /* ---------- CHART COLORS ---------- */
                chart1: "hsl(142, 76%, 36%)",
                chart2: "hsl(173, 58%, 39%)",
                chart3: "hsl(197, 37%, 24%)",
                chart4: "hsl(43, 74%, 66%)",
                chart5: "hsl(27, 87%, 67%)",

                /* ---------- SIDEBAR ---------- */
                sidebar: {
                    background: "hsl(222.2, 84%, 4.9%)",
                    foreground: "hsl(210, 40%, 98%)",
                    primary: "hsl(142, 76%, 36%)",
                    primaryForeground: "hsl(0, 0%, 100%)",
                    accent: "hsl(217.2, 32.6%, 17.5%)",
                    accentForeground: "hsl(210, 40%, 98%)",
                    border: "hsl(217.2, 32.6%, 17.5%)",
                    ring: "hsl(142, 76%, 36%)",
                },
            },
        },
    },
    plugins: [],
}