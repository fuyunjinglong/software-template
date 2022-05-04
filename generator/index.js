const fs = require('fs');
const tool = (api) => {
    return {
        deleteFile(path) {
            const file = api.resolve(path);
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        },
        deleteDir(path) {
            const dir = api.resolve(path);
            if (fs.existsSync(dir)) {
                fs.readdirSync(dir).forEach((o) => {
                    const file = dir + '\\' + o;
                    if (fs.statSync(file).isDirectory()) {
                        fs.readdirSync(dir).forEach((p) => {
                            fs.unlinkSync(dir + '\\' + o + '\\' + p);
                        });
                    } else {
                        fs.unlinkSync(file);
                    }
                });
                fs.rmdirSync(dir);
            }
        }
    };
};
module.exports = (api, options, rootOptions) => {
    const utils = tool(api);
    // 命令
    api.extendPackage({
        scripts: {
            "serve": "vue-cli-service serve",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
        },
    });

    // 安装一些基础公共库
    api.extendPackage({
        dependencies: {
            "core-js": "^3.6.4",
            "vue": "^2.6.11",
            "vue-router": "^3.1.5",
            "vuex": "^3.1.2",
            "element-ui": "^2.15.6",
            "vant": "^2.12.31",
            "axios": "^0.24.0",
        },
        devDependencies: {
            "@vue/cli-plugin-babel": "~4.5.0",
            "@vue/cli-plugin-router": "~4.5.0",
            "@vue/cli-plugin-vuex": "~4.5.0",
            "@vue/cli-service": "~4.5.0",
            "less": "^3.0.4",
            "less-loader": "^5.0.0",
            "vue-template-compiler": "^2.6.11"
        }
    });
    api.render('../template');
    api.onCreateComplete(() => {
        process.env.VUE_CLI_SKIP_WRITE = true;
    });
};