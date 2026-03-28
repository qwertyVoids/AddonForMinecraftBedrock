import path from "path";
import webpack from "webpack";

type Mode = "development" | "production";

interface EnvVariables {
    mode: Mode;
}

export default (env: EnvVariables): webpack.Configuration => {
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'main.ts'),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            path: path.resolve(__dirname, 'scripts'),
            filename: 'main.js',
            library: {
                type: 'module'
            },
            clean: true
        },
        experiments: {
            outputModule: true
        },
        externals: {
            "@minecraft/server": "@minecraft/server",
            "@minecraft/server-ui": "@minecraft/server-ui",
            "@minecraft/server-admin": "@minecraft/server-admin",
            "@minecraft/server-gametest": "@minecraft/server-gametest",
            "@minecraft/debug-utilities": "@minecraft/debug-utilities"
        },
        externalsType: 'module'
    };
};