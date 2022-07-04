module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        // "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    rules: {
        'indent': [2, 2, { // 保持上下代码位置一致
            'SwitchCase': 1
        }],
        // created() created  ()
        'space-before-function-paren': 0,
        // 控制逗号前后的空格
        "comma-spacing": [2, {"before":false,"after":true}],
        // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
        "computed-property-spacing": [2,"never"],
        // 强制在花括号中使用一致的空格
        "object-curly-spacing":[2,"always"],
        // 强制圆括号内没有空格
        "space-in-parens":[2,"never"],
        // 要求中缀操作符周围有空格
        "space-infix-ops":2,
        // 强制在注释中 // 或 /* 使用一致的空格
        "spaced-comment": [2,"always", {"markers": ["global","globals","eslint","eslint-disable","*package","!"] }],
        "no-unused-vars":'warn'
    }
};